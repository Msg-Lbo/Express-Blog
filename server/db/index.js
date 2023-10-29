const mysql = require('mysql2/promise');

// 创建数据库连接池
const pool = mysql.createPool({
    host: '127.0.0.1',
    user: 'blog',
    password: '141444',
    database: 'blog',
    // 连接池最大连接数
    connectionLimit: 10,
    // 是否等待连接池获得连接，为true时，如果没有连接，则不执行查询操作
    waitForConnections: true,
    // 查询操作队列最大限制
    queueLimit: 0
});

// 使用数据库连接池执行查询
const query = async (sql, params) => {
    // 获取数据库连接
    try {
        // 获取数据库连接
        const conn = await pool.getConnection();
        // 执行sql语句，并传入参数
        const result = await conn.query(sql, params);
        // 释放数据库连接
        conn.release();
        // 返回执行结果
        return result;
    } catch (err) {
        // 打印错误信息
        console.log(err);
        // 抛出错误
        throw err;
    }
};

module.exports = query