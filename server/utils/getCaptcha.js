const sendMail = require('./sendEmail');

// 生成验证码并设定验证码过期时间
const getCaptcha = async (req, res) => {
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
        // 设定验证码过期时间5分钟
        const expires = Date.now() + 5 * 60 * 1000;
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

module.exports = getCaptcha