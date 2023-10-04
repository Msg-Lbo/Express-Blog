const jwt = require("jsonwebtoken");

const authToken = (req, res, next) => {
    // 获取cookie中的cookie
    const token = req.cookies.token;
    console.log(token);
    // 如果没有token
    if (!token) {
        return res.json({
            code: 401,
            msg: '未登录'
        });
    }
    // 如果有token
    try {
        // 解析token
        jwt.verify(token, 'CNMB@!#3+2-5dy0');
        // 验证token是否过期
        const { exp } = jwt.decode(token);
        if (Date.now() / 1000 > exp) {
            return res.json({
                code: 401,
                msg: '登录过期'
            });
        }
        next();
    } catch (err) {
        console.log(err);
        return res.json({
            code: 401,
            msg: '登录过期'
        });
    }
}

module.exports = authToken;