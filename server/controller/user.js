const query = require('../db');
const sendMail = require('../utils/sendEmail');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


// 获取验证码并设定验证码过期时间
exports.getCaptcha = async (req, res) => {
    const { email } = req.query;
    if (!email) {
        return res.json({
            code: 400,
            msg: '参数不完整'
        });
    }
    // 判断邮箱格式是否正确
    const reg = /^[a-z0-9]+@[a-z0-9]+\.[a-z]+$/i;
    if (!reg.test(email)) {
        return res.json({
            code: 400,
            msg: '邮箱格式不正确'
        });
    }
    try {
        // 生成验证码
        const captcha = Math.random().toString().slice(2, 6);
        // 发送验证码
        sendMail(email, "验证码", captcha)
        // 设定验证码过期时间1分钟
        const expires = Date.now() + 60 * 1000;
        // 将验证码和过期时间存入session
        req.session.captcha = {
            [email]: {
                captcha,
                expires
            }
        };
        return res.json({
            code: 200,
            msg: '验证码发送成功',
            succeed: true
        });
    } catch (err) {
        console.log(err);
        return res.json({
            code: 500,
            msg: '验证码发送失败'
        });
    }
}

// 创建用户
exports.register = async (req, res) => {
    const { username, password, email, code } = req.body;
    if (!username || !password || !email || !code) {
        return res.json({
            code: 400,
            msg: '参数不完整'
        });
    }
    const sessionCaptcha = req.session.captcha;
    console.log(sessionCaptcha);
    // 判断session中是否有验证码
    if (!sessionCaptcha) {
        return res.json({
            code: 400,
            msg: '请获取验证码'
        });
    }
    // 判断邮箱是否正确
    if (!sessionCaptcha[email]) {
        return res.json({
            code: 400,
            msg: '邮箱错误'
        });
    }
    const { captcha, expires } = sessionCaptcha[email];
    // 判断验证码是否正确
    if (code !== captcha) {
        return res.json({
            code: 400,
            msg: '验证码错误'
        });
    }
    // 判断验证码是否过期

    if (Date.now() > expires) {
        return res.json({
            code: 400,
            msg: '验证码已过期，请重新获取'
        });
    }
    try {
        // 如果用户名或邮箱已经存在
        const sql1 = `select * from user where username = '${username}' or email = '${email}'`;
        const [result1] = await query(sql1);
        if (result1.length >= 1) {
            return res.json({
                code: 400,
                msg: '用户名或邮箱已存在'
            });
        }
        // 对密码进行哈希
        const hashPassword = await bcrypt.hash(password, 10);
        const sql = `insert into user (username, password, email) values ('${username}', '${hashPassword}', '${email}')`;
        const [result] = await query(sql);
        console.log(result.affectedRows);
        if (result.affectedRows === 1) {
            return res.json({
                code: 200,
                msg: '注册成功',
                succeed: true
            })
        } else {
            return res.json({
                code: 500,
                msg: '注册失败',
            })
        }
    } catch (err) {
        console.log(err);
        return res.json({
            code: 500,
            msg: '服务端错误'
        })
    }
}

// 登陆
exports.login = async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.json({
            code: 400,
            msg: '参数不完整'
        });
    }
    try {
        const sql = `select * from user where username = '${username}'`;
        const [result] = await query(sql);
        if (result.length === 0) {
            return res.json({
                code: 400,
                msg: '用户名不存在'
            });
        }
        const isOk = await bcrypt.compare(password, result[0].password);
        if (!isOk) {
            return res.json({
                code: 400,
                msg: '密码错误'
            });
        }
        const user = {
            id: result[0].id,
            username: result[0].username,
            email: result[0].email
        }
        // 生成token
        const token = jwt.sign(user, "CNMB@!#3+2-5dy0", { expiresIn: '1h' });
        // token存入cookie
        res.cookie('token', token, { httpOnly: true, maxAge: 60 * 60 * 1000 });
        return res.json({
            code: 200,
            msg: '登陆成功',
            succeed: true,
            data: {
                ...user,
                avatar: result[0].avatar
            }
        })
    } catch (err) {
        console.log(err);
        return res.json({
            code: 500,
            msg: '服务端错误'
        })
    }
}
// 退出登陆
exports.logout = async (req, res) => {
    // 清除cookie
    req.cookies.token = null;
    console.log(req.cookies);
    return res.json({
        code: 200,
        msg: '退出登陆成功',
        succeed: true
    })
}