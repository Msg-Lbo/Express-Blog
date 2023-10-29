const nodemailer = require('nodemailer');
const config = require('./config.json');
const nodeMail = nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: true,
    auth: {
        user: config.user,
        pass: config.pass
    }
});

module.exports = nodeMail