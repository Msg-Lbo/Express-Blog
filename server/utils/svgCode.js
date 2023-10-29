
const svgCaptcha = require('svg-captcha');

const refreshCapacht = async (req, res) => {
    try {
        const cap = svgCaptcha.create({
            // 翻转颜色
            inverse: false,
            // 字体大小
            fontSize: 36,
            // 噪声线条数
            noise: 1,
            // 宽度
            width: 70,
            // 高度
            height: 34,
            // 验证码字符中排除 0o1i
            ignoreChars: '0o1I',
        });
        if (req.session.captcha !== cap.text.toLowerCase()) {
            req.session.captcha = cap.text.toLowerCase();
        }
        // console.log("存:", req.session);
        res.type('svg');// 响应的类型
        res.json({
            code: 200,
            msg: '验证码发送成功',
            succeed: true,
            data: cap.data
        })
    } catch (error) {
        console.log(error);
        return res.json({
            code: 500,
            msg: '服务端错误'
        });
    }
}


module.exports = refreshCapacht;