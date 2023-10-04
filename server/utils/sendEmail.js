const nodeMail = require("../smtp");
const code = (code) => {
    return `
    <p>您好！</p>
    <p>您的验证码是：<strong style="color:orangered;">${code}</strong></p>
    <p>如果不是您本人操作，请无视此邮件</p>
    `
}

const tips = () => {
    return `
    <p>您好！</p>
    <p>您的评论收到回复,请前往网站查看详细</p>
    `
}

const sendMail = (to, subject, params) => {
    // 发送的配置项
    const mail = {
        from: '"一楼没太阳" <ylmty@foxmail.com>',
        subject: subject,
        to: to,
        html: subject === "验证码" ? code(params) : tips
    }
    try {
        nodeMail.sendMail(mail, (err, info) => {
            if (err) {
                console.log("发送失败", err)
                return err
            }
            console.log("发送成功")
            return info
        })
    } catch (e) {
        console.log(e)
    }

}

module.exports = sendMail
