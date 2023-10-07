const query = require('../db');
const sendMail = require('../utils/sendEmail');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

// 获取所有用户
exports.getAllUser = async (req, res) => {
    try {
        const sql = `select * from user`;
        const [result] = await query(sql);
        return res.json({
            code: 200,
            msg: '获取成功',
            data: {
                id: result[0].id,
                account: result[0].account,
                email: result[0].email
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

// 创建用户
exports.register = async (req, res) => {
    const { account, password, email, code } = req.body;
    if (!account || !password || !email || !code) {
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
        const sql1 = `select * from user where account = '${account}' or email = '${email}'`;
        const [result1] = await query(sql1);
        if (result1.length >= 1) {
            return res.json({
                code: 400,
                msg: '用户名或邮箱已存在'
            });
        }
        // 对密码进行哈希
        const hashPassword = await bcrypt.hash(password, 10);
        const sql = `insert into user (account, password, email) values ('${account}', '${hashPassword}', '${email}')`;
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
// 登录
exports.login = async (req, res) => {
    const { account, password } = req.body;
    if (!account || !password) {
        return res.json({
            code: 400,
            msg: '参数不完整'
        });
    }
    try {
        const sql = `select * from user where account = '${account}'`;
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
            account: result[0].account,
            email: result[0].email,
            identity: result[0].identity,
            nickname: result[0].nickname
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
// 用户退出登录
exports.logout = async (req, res) => {
    res.clearCookie('token', {
        sameSite: "none",
        secure: true,
    })
    // res.cookie('token', '123123',{ httpOnly: true, maxAge: 0 })
    return res.json({
        code: 200,
        msg: '退出登录成功',
        succeed: true
    })
}
// 是否管理员
exports.isAdmin = async (req, res) => {
    const { account } = req.body
    // 信息是否为空
    if (!account) {
        return res.json({
            code: 400,
            msg: '请先登陆'
        })
    }
    try {
        const sql = `select * from user where account = '${account}'`
        const [rows] = await query(sql)
        if (rows.length !== 1) {
            return res.json({
                code: 400,
                msg: '获取信息失败'
            })
        }
        if (rows[0].identity === '管理员') {
            return res.json({
                code: 200,
                msg: '管理员',
                succeed: true,
                data: {
                    identity: rows[0].identity
                }
            })
        }
        if (rows[0].identity === '游客') {
            return res.json({
                code: 200,
                msg: '游客',
                succeed: true,
                data: {
                    identity: rows[0].identity
                }
            })
        }
    } catch (error) {
        console.log('服务端错误：', error);
        return res.json({
            code: 500,
            msg: '服务器错误'
        })
    }
}
// 登陆是否过期
exports.isLogin = async (req, res) => {
    return res.json({
        code: 200,
        msg: '登陆未过期',
        succeed: true
    })
}