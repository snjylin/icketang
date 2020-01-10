// 引入express
let express = require('express');
// 实例化路由对象
let router = new express.Router();
// 引入db
let Database = require('../../db/db');
// 引入fs模块
let fs = require('fs');
// 引入jsonwebtoken模块
let jwt = require('jsonwebtoken');
// 指定加密字符串
let secret = 'djflasjflasdjflas';
// 定义连接字符串
let connectStr = 'mongodb://localhost:27017/';
// 定义数据库
let dbname = 'albums';
// 定义集合
let collname = 'user';

// 处理getUserInfo请求
router.get('/getUserInfo', (req, res) => {
    // 获取用户名称
    let username = req.token.username;

    // 连接数据库
    let db = new Database(connectStr, dbname, collname);
    // 查找数据
    db.findOne({ username }, (err, result) => {
        if (err) {
            // 返回错误信息
            res.send({
                error: 1,
                data: '查找用户数据失败了'
            })
            return;
        }
        // 返回成功之后的信息
        res.send({
            error: 0,
            data: {
                username: result.username,
                header_pic: result.header_pic,
                header_path: result.header_path
            }
        })
    })
});

// 暴露端口
module.exports = router;
