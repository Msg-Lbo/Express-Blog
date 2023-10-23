const query = require('../db');

// 保存文章
exports.saveArticle = async (req, res) => {
    const { id, title, description, content, category_id, create_time, update_time } = req.body;
    if (!title || !description || !content || !category_id || !create_time) {
        return res.json({
            code: 400,
            msg: '参数不完整'
        });
    }
    // 判断文章是否存在
    if (id) {
        // 更新文章
        try {
            const newUpdate_time = update_time ? update_time : Date.now();
            const sql = 'update articles set title=?, description=?, content=?, category_id=?, update_time=? where id=?';
            const [result] = await query(sql, [title, description, content, category_id, newUpdate_time, id]);
            if (result.affectedRows) {
                return res.json({
                    code: 200,
                    msg: '更新成功',
                    succeed: true
                });
            }
            return res.json({
                code: 400,
                msg: '更新失败'
            });
        } catch (err) {
            console.log(err);
            return res.json({
                code: 500,
                msg: '更新失败'
            });
        }
    } else {
        // 保存文章
        try {
            const sql = 'insert into articles (title, description, content, category_id, create_time) values (?, ?, ?, ?, ?)';
            const [result] = await query(sql, [title, description, content, category_id, create_time]);
            if (result.affectedRows) {
                return res.json({
                    code: 200,
                    msg: '保存成功',
                    succeed: true
                });
            }
            return res.json({
                code: 400,
                msg: '保存失败'
            });
        } catch (err) {
            console.log(err);
            return res.json({
                code: 500,
                msg: '保存失败'
            });
        }
    }
}

// 按创建时间排序分页获取文章列表
exports.getArticleList = async (req, res) => {
    const { page, pageSize } = req.query;
    if (!page || !pageSize) {
        return res.json({
            code: 400,
            msg: '参数不完整'
        });
    }
    try {
        // 分类id转为对应的分类名,文章评论数
        const sql = `select articles.id, articles.category_id, title, description, articles.content, categories.category_name as category_name,
        articles.create_time, articles.update_time, count(comments.id) as comment_count from articles
        left join categories on articles.category_id=categories.id
        left join comments on articles.id=comments.article_id
        group by articles.id
        order by articles.create_time desc
        limit ?, ?`;
        const [result] = await query(sql, [(page - 1) * parseInt(pageSize), parseInt(pageSize)]);
        const sql1 = 'select count(*) as total from articles';
        const [result1] = await query(sql1);
        return res.json({
            code: 200,
            msg: '获取成功',
            succeed: true,
            data: {
                list: result,
                // 页数, 向上取整
                total: Math.ceil(result1[0].total / pageSize)
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

// 按id获取文章
exports.getArticleById = async (req, res) => {
    const { id } = req.query;
    if (!id) {
        return res.json({
            code: 400,
            msg: '参数不完整'
        });
    }
    try {
        // 分类id转为对应的分类名
        const sql = `select articles.id, title, description, content, categories.category_name as category_name,
        create_time, update_time from articles
        left join categories on articles.category_id=categories.id
        where articles.id=?`;
        const [result] = await query(sql, [id]);
        return res.json({
            code: 200,
            msg: '获取成功',
            data: result[0]
        });
    } catch (err) {
        console.log(err);
        return res.json({
            code: 500,
            msg: '获取失败'
        });
    }
}

// 按id删除文章
exports.deleteArticleById = async (req, res) => {
    const { id } = req.body;
    if (!id) {
        return res.json({
            code: 400,
            msg: '参数不完整'
        });
    }
    try {
        const sql = 'delete from articles where id=?';
        const [result] = await query(sql, [id]);
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

// 标题关键词模糊查询
exports.searchArticle = async (req, res) => {
    const { keyword } = req.query;
    if (!keyword) {
        return res.json({
            code: 400,
            msg: '参数不完整'
        });
    }
    try {
        // 分类id转为对应的分类名
        const sql = `select articles.id, title, description, content, categories.category_name as category_name,
        create_time, update_time from articles
        left join categories on articles.category_id=categories.id
        where title like '%${keyword}%'`;
        const [result] = await query(sql);
        return res.json({
            code: 200,
            msg: '获取成功',
            data: result[0]
        });
    } catch (err) {
        console.log(err);
        return res.json({
            code: 500,
            msg: '获取失败'
        });
    }
}

// 获取文章详情
exports.getArticleDetail = async (req, res) => {
    const { id } = req.query;
    if (!id) {
        return res.json({
            code: 400,
            msg: '参数不完整'
        });
    }
    try {
        // 分类id转为对应的分类名,该文章的上一篇和下一篇的id
        const sql = `select articles.id, title, description, content, categories.category_name as category_name,
        create_time, update_time,
        (select id from articles where id<${id} order by id desc limit 1) as pre_id,
        (select id from articles where id>${id} order by id asc limit 1) as next_id
        from articles
        left join categories on articles.category_id=categories.id
        where articles.id=?`;
        const [result] = await query(sql, [id]);
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
            msg: '获取失败'
        });
    }
}