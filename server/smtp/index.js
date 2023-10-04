const nodemailer = require('nodemailer');

const nodeMail = nodemailer.createTransport({
    host: 'smtp.qq.com',
    port: 465,
    secure: true,
    auth: {
        user: 'ylmty@foxmail.com',
        pass: 'ffxzynmipsmqbief'
    }
});

module.exports = nodeMail