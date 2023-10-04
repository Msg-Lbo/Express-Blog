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
    origin: 'http://localhost:5173',
    methods: 'GET,POST',
    allowHeaders: 'Content-Type,Authorization',
    exposeHeaders: 'Content-length',
    credentials: true,
}

app.use(cors(corsOptions))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
const upload = multer({
    dest: './public/uploads/'
})
app.use(upload.any())
app.use(express.static('./public'))
app.use(cookieParser())
app.use(session({
    secret: 'CNMB@!#3+2-5dy0', // 建议使用 128 个字符的随机字符串
    resave: true,
    saveUninitialized: false,
    cookie: { maxAge: 60 * 1000, httpOnly: true }
}))

app.use('/api/v1', require('./router'))

app.listen(port, host, () => {
    console.log(`Server is running at ${host}:${port}`);
});