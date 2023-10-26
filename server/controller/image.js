const query = require('../db');
const GenId = require('../utils/genid');
const genid = new GenId({ WorkerId: 1 });
const fs = require('fs');

// 上传图片
exports.uploadImage = async (req, res) => {
    if (req.files.length === 0) {
        return res.json({
            code: 400,
            msg: '上传文件不能为空'
        });
    }
    try {
        let files = req.files;

        let ret_urls = [];
        for (let file of files) {
            // 获取图片后缀名
            const ext = file.originalname.split('.').pop();
            // 使用时间戳作为图片名
            const filename = new Date().getTime() + '.' + ext;
            // 移动图片到指定目录并重命名
            fs.renameSync(
                './public/uploads/temp/' + file.filename,
                './public/uploads/' + filename
            );
            // 将图片地址存入数组
            const url = '/uploads/' + filename
            ret_urls.push(url);
            // 如果图片存在
            if (fs.existsSync('./public/uploads/' + filename)) {
                const image_id = genid.NextId()
                // 将地址存入数据库
                const sql = `insert into images (image_id, url, image_name) values ('${image_id}', '${url}', '${filename}')`;
                const result = await query(sql);
                if (result.affectedRows === 0) {
                    return res.json({
                        code: 500,
                        msg: '图片上传失败2'
                    });
                } else {
                    return res.json({
                        code: 200,
                        msg: '图片上传成功',
                        succeed: true,
                        data: ret_urls
                    });
                }
            } else {
                return res, json({
                    code: 500,
                    msg: '图片上传失败1'
                })
            }


        }
    } catch (err) {
        console.log(err);
        return res.json({
            code: 500,
            msg: '服务端错误'
        })
    }
}