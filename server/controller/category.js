const query = require('../db');


// 创建分类
exports.createCategory = async (req, res) => {
    const { name } = req.body;
    if (!name) {
        return res.json({
            code: 400,
            msg: '参数不完整'
        });
    }
    try {
        const sql = `insert into categories (category_name) values ('${name}')`;
        const [result] = await query(sql);
        if (result.affectedRows) {
            return res.json({
                code: 200,
                msg: '创建成功',
                succeed: true
            });
        }
        return res.json({
            code: 400,
            msg: '创建失败'
        });
    } catch (err) {
        console.log(err);
        return res.json({
            code: 500,
            msg: '创建失败'
        });
    }
}
// 获取所有分类
exports.getAllCategory = async (req, res) => {
    try {
        const sql = 'select * from categories';
        const [result] = await query(sql);
        return res.json({
            code: 200,
            msg: '获取成功',
            data: result
        });
    } catch (err) {
        console.log(err);
        return res.json({
            code: 500,
            msg: '获取失败'
        });
    }
}
// 按id删除分类
exports.deleteCategoryById = async (req, res) => {
    const { id } = req.body;
    if (!id) {
        return res.json({
            code: 400,
            msg: '参数不完整'
        });
    }
    try {
        // 删除分类前，将该分类下的所有文章的分类id设置为0
        const sql1 = `update articles set category_id=0 where category_id=${id}`;
        await query(sql1);
        const sql = `delete from categories where id=${id}`;
        const [result] = await query(sql);
        if (result.affectedRows) {
            return res.json({
                code: 200,
                msg: '删除成功',
                succeed: true
            });
        }
        return res.json({
            code: 400,
            msg: '删除失败'
        });
    } catch (err) {
        console.log(err);
        return res.json({
            code: 500,
            msg: '删除失败'
        });
    }
}
// 按id修改分类
exports.updateCategoryById = async (req, res) => {
    const { id, name } = req.body;
    if (!id || !name) {
        return res.json({
            code: 400,
            msg: '参数不完整'
        });
    }
    try {
        const sql = `update categories set category_name='${name}' where id=${id}`;
        const [result] = await query(sql);
        if (result.affectedRows) {
            return res.json({
                code: 200,
                msg: '修改成功',
                succeed: true
            });
        }
        return res.json({
            code: 400,
            msg: '修改失败'
        });
    } catch (err) {
        console.log(err);
        return res.json({
            code: 500,
            msg: '修改失败'
        });
    }
}
// 按id分页获取分类下的所有文章, 按时间降序
exports.getArticleByCategoryId = async (req, res) => {
    const { id, page, pageSize } = req.query;
    if (!id || !page || !pageSize) {
        return res.json({
            code: 400,
            msg: '参数不完整'
        });
    }
    try {
        // 分页获取分类下的所有文章,将分类id转为对应的分类名
        const sql = `select articles.id, title, description, content, 
        categories.category_name as category_name, create_time, update_time from articles 
        left join categories on articles.category_id=categories.id 
        where category_id=${id} 
        order by create_time 
        desc limit ${(page - 1) * pageSize}, ${pageSize}`;
        const [result] = await query(sql);
        // 获取分类下的所有文章的总数
        const sql1 = `select count(*) as total from articles where category_id=${id}`;
        const [result1] = await query(sql1);
        return res.json({
            code: 200,
            msg: '获取成功',
            data: {
                list: result,
                // 总页数,向上取整
                totalPage: Math.ceil(result1[0].total / pageSize)
            }
        });
    } catch (err) {
        console.log(err);
        return res.json({
            code: 500,
            msg: '获取失败'
        });
    }
}
