// 引入express
let express = require('express');
// 实例化路由对象
let router = new express.Router();
// 引入db
let Database = require('../../db/db');
// 引入fs模块
let fs = require('fs');
// 定义连接字符串
let connectStr = 'mongodb://localhost:27017/';
// 定义数据库
let dbname = 'albums';
// 定义集合
let collname = 'user';

// 处理checkName接口
router.get('/checkName', (req, res) => {
    // 获取用户名
    let username = req.query.username;
    // 获取密码
    let password = req.query.password;

    // 连接数据库 查找用户信息
    let db = new Database(connectStr, dbname, collname);
    // 设置要查找的用户信息
    let userInfoObj = {
        username
    };
    db.findOne(userInfoObj, (err, result) => {
        if (err) {
            res.send({
                error: 1,
                data: '连接数据库失败'
            });
            return;
        }

        if (result && username == result.username) {
            // 查找到
            res.send({
                error: 2,
                data: '用户名已存在'
            });
            return;
        }

        res.send({
            error: 0,
            data: '恭喜您，用户名可以使用'
        });
    });
});

// 处理regist接口
router.post('/regist', function(req, res) {
    // 获取用户名
    let username = req.body.username;
    // 获取密码
    let password = req.body.password;

    // 创建用户专属文件夹
    fs.mkdir('./user/' + username, err => {
        if (err) {
            res.send({
                error: 1,
                data: '创建用户专属文件夹失败'
            });
            return;
        }
        // 成功之后继续创建用户头像专用文件夹
        fs.mkdir('./user/' + username + '/header_pic', err => {
            if (err) {
                res.send({
                    error: 2,
                    data: '创建用户头像专用文件夹失败'
                });
                return;
            }

            // 成功之后读取默认头像并追加到用户头像文件夹中
            fs.readFile('./web/images/default.png', (err, data) => {
                if (err) {
                    res.send({
                        error: 3,
                        data: '读取默认头像失败'
                    });
                    return;
                }
                // 读取成功 追加到用户头像文件夹中
                fs.appendFile('./user/' + username + '/header_pic/default.png', data, err => {
                    if (err) {
                        res.send({
                            error: 4,
                            data: '添加用户头像失败'
                        });
                        return;
                    }

                    // 成功之后连接数据库 将用户信息储存起来
                    let db = new Database(connectStr, dbname, collname);
                    // 定义用户的头像信息
                    let header_path = '/user/' + username + '/header_pic/default.png';
                    // 定义用户信息
                    let userInfoObj = {
                        username,
                        password,
                        header_path
                    };
                    // 写入数据库
                    db.insertOne(userInfoObj, (err, result) => {
                        if (err) {
                            res.send({
                                error: 5,
                                data: '连接数据库失败'
                            });
                            return;
                        }

                        // 成功返回信息
                        res.send({
                            error: 0,
                            data: '注册成功'
                        });
                    });
                });
            });
        });
    });
});

// 暴露端口
module.exports = router;
