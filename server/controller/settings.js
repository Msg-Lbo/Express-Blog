const query = require('../db');
const fs = require('fs');
const path = require('path');
const filePath = path.resolve(__dirname, '../smtp/config.json');
const config = require('../smtp/config.json');
// 保存设置
exports.saveSettings = async (req, res) => {
    try {
        const {
            Title,
            Ico,
            Logo,
            Avatar,
            LogoText,
            LogoText2,
            GongAn,
            Ipc,
            LeftBgLight,
            LeftBgDark,
            AllowRegister,
        } = req.body;
        const allowRegister = AllowRegister === "true" ? 1 : 0;
        const sql = 'update settings set Title = ?, Ico = ?, Logo = ?, Avatar = ?, LogoText = ?, LogoText2 = ?, GongAn = ?, Ipc = ?, LeftBgLight = ?, LeftBgDark = ?, AllowRegister = ? where id = 1';
        const [result] = await query(sql, [Title, Ico, Logo, Avatar, LogoText, LogoText2, GongAn, Ipc, LeftBgLight, LeftBgDark, allowRegister]);
        if (result.affectedRows) {
            return res.json({
                code: 200,
                msg: '保存成功',
                succeed: true
            });
        }
    } catch (err) {
        console.log(err);
        return res.json({
            code: 500,
            msg: '服务端错误'
        })
    }
}

// 获取设置
exports.getSettings = async (req, res) => {
    try {
        const sql = 'select * from settings where id = 1';
        const [result] = await query(sql);
        const data = {
            Title: result[0].Title,
            Ico: result[0].Ico,
            Logo: result[0].Logo,
            Avatar: result[0].Avatar,
            LogoText: result[0].LogoText,
            LogoText2: result[0].LogoText2,
            GongAn: result[0].GongAn,
            Ipc: result[0].Ipc,
            LeftBgLight: result[0].LeftBgLight,
            LeftBgDark: result[0].LeftBgDark,
            AllowRegister: result[0].AllowRegister === 1 ? true : false
        }
        return res.json({
            code: 200,
            msg: '获取成功',
            succeed: true,
            data: data
        });
    } catch (err) {
        console.log(err);
        return res.json({
            code: 500,
            msg: '服务端错误'
        })
    }
}

// 获取邮件设置
exports.getMailSettings = async (req, res) => {
    try {
        if (config) {
            // 敏感信息使用Md5加密
            const data = {
                host: config.host,
                port: config.port,
                user: config.user,
            }
            return res.json({
                code: 200,
                msg: '获取成功',
                succeed: true,
                data: data
            });
        }
    } catch (err) {
        console.log(err);
        return res.json({
            code: 500,
            msg: '服务端错误'
        })
    }
}

// 保存邮件设置
exports.saveMailSettings = async (req, res) => {
    try {
        const {
            host,
            port,
            user,
            pass
        } = req.body;
        // 写入配置文件
        const data = {
            host,
            port,
            user,
            pass
        }
        fs.writeFileSync(filePath, JSON.stringify(data));
        return res.json({
            code: 200,
            msg: '保存成功',
            succeed: true
        })
    } catch (err) {
        console.log(err);
        return res.json({
            code: 500,
            msg: '服务端错误'
        })
    }
}