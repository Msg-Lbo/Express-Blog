const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');
const session = require('express-session');
const cookieParser = require('cookie-parser')
const app = express();
const host = '127.0.0.1'
const port = '9090'

const corsOptions = {
    origin: ['http://192.168.2.22:5173', 'http://127.0.0.1:5173', 'http://localhost:3000', 'http://192.168.2.22:3000'],
    methods: 'GET,POST',
    allowHeaders: 'Content-Type,Authorization',
    exposeHeaders: 'Content-length',
    credentials: true,
}
app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
const upload = multer({
    dest: './public/uploads/temp',
});
app.use(upload.any());
app.use(express.static('./public'));
app.use(cookieParser());
app.use(session({
    secret: 'CNMB@!#3+2-5dy0', // 建议使用 128 个字符的随机字符串
    resave: false, // 是指每次请求都重新设置session cookie，假设你的cookie是6000毫秒过期，每次请求都会再设置6000毫秒。
    saveUninitialized: false, // 是指无论有没有session cookie，每次请求都设置个session cookie ，默认给个标示为 connect.sid。
    cookie: { maxAge: 60 * 60 * 1000, httpOnly: true }
}))

app.use('/api/v1', require('./router'))

app.listen(port, host, () => {
    console.log(`Server is running at ${host}:${port}`);
});