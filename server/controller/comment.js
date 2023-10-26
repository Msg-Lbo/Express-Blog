const query = require('../db');


// 发送评论
exports.sendComment = async (req, res) => {
    const { article_id, content, create_time, parent_id, nickname, email, code } = req.body;
    try {
        // 验证码小写
        lowerCaseCode = code.toLowerCase();
        console.log(req.session.captcha, lowerCaseCode);
        // 判断验证码是否正确
        if (req.session.captcha !== lowerCaseCode) {
            return res.json({
                code: 400,
                msg: '验证码错误'
            });
        }
        const sql = 'insert into comments(article_id, content, create_time, parent_id, nickname, email) values(?, ?, ?, ?, ?, ?)';
        const [result] = await query(sql, [article_id, content, create_time, parent_id, nickname, email]);
        if (result.affectedRows === 1) {
            return res.json({
                code: 200,
                msg: '评论成功',
                succeed: true
            });
        }
    } catch (err) {
        console.log(err);
        return res.json({
            code: 500,
            msg: '服务端错误'
        });
    }
}
// 获取评论列表
exports.getCommentList = async (req, res) => {
    const { article_id } = req.query;
    try {
        const sql = 'select * from comments where article_id = ?';
        const [result] = await query(sql, [article_id]);
        const map = {};
        result.forEach(item => {
            // 把每一条数据的id作为map的key，把每一条数据作为value
            map[item.id] = item;
        });
        const tree = [];
        // 遍历result，找到每一条数据的parent_id，如果有parent_id，就把它放到对应的parent_id的children属性中
        result.forEach(item => {
            // 找到每一条数据的parent_id所对应在map中的value
            const parent = map[item.parent_id];
            if (parent) {
                // 如果有parent_id，就把它放到对应的parent_id的children属性中
                (parent.children || (parent.children = [])).push(item);
            } else {
                // 如果没有parent_id，就把它放到tree数组中
                tree.push(item);
            }
        });
        // console.log(tree);
        return res.json({
            code: 200,
            msg: '获取评论列表成功',
            succeed: true,
            data: tree
        });
    } catch (err) {
        console.log(err);
        return res.json({
            code: 500,
            msg: '服务端错误'
        });
    }
}

// 分页获取所有评论
exports.getAllComment = async (req, res) => {
    const { page, pageSize } = req.query;
    try {
        // 获取article_id对应的文章名
        const sql = `select comments.id, comments.article_id, comments.content, comments.create_time, 
        comments.parent_id, comments.nickname, comments.email, articles.title 
        as article_title from comments 
        left join articles on comments.article_id = articles.id 
        order by comments.id desc limit ?, ?`
        const [result] = await query(sql, [(page - 1) * parseInt(pageSize), parseInt(pageSize)]);
        const sql2 = 'select count(*) as total from comments';
        const [result2] = await query(sql2);
        return res.json({
            code: 200,
            msg: '获取评论列表成功',
            succeed: true,
            data: result,
            // 向上取整
            total: Math.ceil(result2[0].total / parseInt(pageSize))
        });
    } catch (err) {
        console.log(err);
        return res.json({
            code: 500,
            msg: '服务端错误'
        });
    }
}

// 删除评论
exports.deleteCommentById = async (req, res) => {
    const { id } = req.body;
    try {
        // 删除评论,并且删除comments表中parent_id为该评论id的数据
        const sql = `delete from comments where id=? or parent_id=?`;
        const [result] = await query(sql, [id, id]);
        if (result.affectedRows !== 0) {
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
            msg: '服务端错误'
        });
    }
}