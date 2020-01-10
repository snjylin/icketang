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

// 处理requestAllUserList接口
router.get('/requestAllUserList', (req, res) => {
    // 连接数据库
    let db = new Database(connectStr, dbname, collname);
    // 查找多条数据
    db.findMany({}, (err, result) => {
        if (err) {
            res.send({
                error: 1,
                data: '查找用户数据失败'
            })
            return;
        }

        // 使用map方法返回新数组
        let newArr = result.map(item => {
            return {
                username: item.username,
                header_path: item.header_path
            }
        });

        // 返回成功消息
        res.send({
            error: 0,
            data: newArr
        })
    })
});

// 处理getUserShareAlbum接口
router.get('/getUserShareAlbum', (req, res) => {
    // 获取用户名
    let username = req.query.username;

    // 连接数据库
    let db = new Database(connectStr, dbname, 'pics');
    // 查找多条数据
    db.findMany({ username, share: 'true' }, (err, result) => {
        if (err) {
            res.send({
                error: 1,
                data: '查找用户数据失败'
            })
            return;
        }

        // 使用map方法返回新数组
        let newArr = result.map(item => {
            return {
                username: item.username,
                albumName: item.albumName
            }
        });

        // 返回成功消息
        res.send({
            error: 0,
            data: newArr
        })
    })
});

// 处理getTargetUserPicList接口
router.get('/getTargetUserPicList', (req, res) => {
    // 获取用户名
    let username = req.query.username;
    // 获取分享的相册的名
    let albumName = req.query.albumName;

    // 连接数据库
    let db = new Database(connectStr, dbname, 'imgs');
    // 查找多条数据
    db.findMany({ username, albumName }, (err, result) => {
        if (err) {
            res.send({
                error: 1,
                data: '查找用户数据失败'
            })
            return;
        }

        // 返回成功消息
        res.send({
            error: 0,
            data: result
        })
    })
});

// 暴露端口
module.exports = router;
