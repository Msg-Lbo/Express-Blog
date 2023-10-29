const query = require('../db');
const GenId = require('../utils/genid');
const genid = new GenId({ WorkerId: 1 });
const fs = require('fs');

// 上传图片
exports.uploadImage = async (req, res) => {
    try {
        if (req.files.length === 0) {
            return res.json({
                code: 400,
                msg: '上传文件不能为空'
            });
        }
        let files = req.files;
        let ret_urls = [];
        for (let i = 0; i < files.length; i++) {
            // 获取图片后缀名
            const ext = files[i].originalname.split('.').pop();
            // 使用时间戳作为图片名
            const filename = new Date().getTime() + '.' + ext;
            // 移动图片到指定目录并重命名
            fs.renameSync(
                './public/uploads/temp/' + files[i].filename,
                './public/uploads/' + filename
            );
            // console.log(files[i].filename);
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

// 删除图片
exports.deleteImage = async (req, res) => {
    try {
        const { image_id } = req.body;
        const sql2 = `select image_name from images where image_id = '${image_id}'`;
        const [result2] = await query(sql2);
        const sql = `delete from images where image_id = '${image_id}'`;
        const [result] = await query(sql);
        if (result.affectedRows === 0) {
            return res.json({
                code: 500,
                msg: '图片删除失败1'
            });
        } else {
            // 获取图片名后删除public/uploads文件夹下的图片
            console.log('./public/uploads/' + result2[0].image_name);
            fs.unlinkSync('./public/uploads/' + result2[0].image_name)
            return res.json({
                code: 200,
                msg: '图片删除成功',
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

// 获取图片列表
exports.getImageList = async (req, res) => {
    const { page, pageSize } = req.query;
    try {
        const sql = `select * from images order by id desc limit ${(page - 1) * pageSize}, ${pageSize}`;
        const count = `select count(*) as total from images`;
        const [result] = await query(sql);
        const [total] = await query(count);
        // console.log(total);
        if (result.length === 0) {
            return res.json({
                code: 200,
                msg: '图片列表为空',
                succeed: true,
                data: {
                    list: [],
                    total: 0
                },
            });
        } else {
            return res.json({
                code: 200,
                msg: '图片列表获取成功',
                succeed: true,
                data: {
                    list: result,
                    // 向上取整
                    count: Math.ceil(total[0].total / pageSize)
                }
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