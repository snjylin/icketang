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

// 处理login接口
router.get('/login', (req, res) => {
    // 获取用户名
    let username = req.query.username;
    // 获取用户密码
    let password = req.query.password;
    // 连接数据库
    let db = new Database(connectStr, dbname, collname);
    // 查找用户密码是否存在
    db.findOne({ username, password }, (err, result) => {
        if (err) {
            res.send({
                error: 1,
                data: '查找数据库失败'
            });
            return;
        }
        // 判断result
        if (result) {
            // 定义用户信息对象
            let userInfoObj = {
                username: result.username,
                header_path: result.header_path
            };

            // 生成token字符串
            let token = jwt.sign(userInfoObj, secret);

            // 返回数据
            res.send({
                error: 0,
                data: token
            });
            return;
        }
        // 没有找到该用户
        res.send({
            error: 2,
            data: '请检查用户名或密码'
        });
    });
});

// 暴露端口
module.exports = router;
