const query = require('../db');

// 保存设置
exports.saveSettings = async (req, res) => {
    try {
        const {
            Title,
            Ico,
            Logo,
            LogoText,
            LogoText2,
            GongAn,
            Ipc,
            LeftBgLight,
            LeftBgDark
        } = req.body;
        const sql = 'update settings set Title = ?, Ico = ?, Logo = ?, LogoText = ?, LogoText2 = ?, GongAn = ?, Ipc = ?, LeftBgLight = ?, LeftBgDark = ? where id = 1';
        const [result] = await query(sql, [Title, Ico, Logo, LogoText, LogoText2, GongAn, Ipc, LeftBgLight, LeftBgDark]);
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
        return res.json({
            code: 200,
            msg: '获取成功',
            succeed: true,
            data: result[0]
        });
    } catch (err) {
        console.log(err);
        return res.json({
            code: 500,
            msg: '服务端错误'
        })
    }
}