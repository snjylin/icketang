// 引入express
let express = require('express');
// 实例化路由对象
let router = new express.Router();
// 引入db
let Database = require('../../db/db');
// 引入del方法
let del = require('../../db/del');
// 引入fs模块
let fs = require('fs');
// 定义连接字符串
let connectStr = 'mongodb://localhost:27017/';
// 定义数据库
let dbname = 'albums';
// 定义集合
let collname = 'pics';

// 处理createAlbumList接口
router.get('/user/createAlbumList', (req, res) => {
    // 获取用户名
    let username = req.token.username;
    // 获取相册名
    let albumName = req.query.albumName;

    // 在用户专属文件夹下创建相册
    fs.mkdir('./user/' + username + '/' + albumName, err => {
        if (err) {
            res.send({
                error: 1,
                data: '创建相册失败'
            })
            return;
        }
        // 连接数据库
        let db = new Database(connectStr, dbname, collname);
        // 定义用户信息对象
        let userInfoObj = {
            username,
            albumName,
            share: false
        }
        // 添加数据库
        db.insertOne(userInfoObj, (err, result) => {
            if (err) {
                res.send({
                    error: 3,
                    data: '插入数据库失败'
                })
                return;
            }
            // 成功 返回数据
            res.send({
                error: 0,
                data: '创建相册成功',
                albumName
            })
        });
    });
});

// 处理getUserAlbumsList接口
router.get('/user/getUserAlbumsList', (req, res) => {
    // 获取用户名
    let username = req.token.username;
    // 获取相册名
    let albumName = req.query.albumName;

    // 连接数据库
    let db = new Database(connectStr, dbname, collname);
    // 查找数据
    db.findMany({ username }, (err, result) => {
        if (err) {
            res.send({
                error: 1,
                data: '插入数据库失败'
            })
            return;
        }

        // 查找到用户相册
        if (result) {
            res.send({
                error: 0,
                data: result
            })
            return;
        }
    });
})

// 处理updateAlbumShareState接口
router.get('/user/updateAlbumShareState', (req, res) => {
    // 获取用户名
    let username = req.token.username;
    // 获取相册名
    let albumName = req.query.albumName;
    // 获取分享状态
    let state = req.query.state;

    // 连接数据库
    let db = new Database(connectStr, dbname, collname);
    // 定义query对象
    let query = {
        username,
        albumName
    }
    // 定义updated对象
    let updated = {
        $set: {
            share: state
        }
    }
    // 修改数据
    db.updateOne(query, updated, (err, result) => {
        if (err) {
            res.send({
                error: 1,
                data: '修改数据失败'
            })
            return;
        }

        // 修改数据成功
        res.send({
            error: 0,
            data: '修改状态成功'
        })
    });
})

// 处理deleteAlbumList接口
router.get('/user/deleteAlbumList', (req, res) => {
    // 获取用户名
    let username = req.token.username;
    // 获取相册名
    let albumName = req.query.albumName;

    // 连接数据库
    let db = new Database(connectStr, dbname, collname);
    // 定义query对象
    let query = {
        username,
        albumName
    }
    // 删除数据
    db.deleteOne(query, err => {
        if (err) {
            res.send({
                error: 1,
                data: '删除数据失败'
            })
            return;
        }

        // 为了防止代码出现错误要将语句放入到try catch语句中
        try {
            del('./user/' + username + '/' + albumName);
        } catch (e) {
            res.send({
        		error: 2,
        		data: '删除文件夹失败'
        	})
        	return;
        }

        // 返回数据
        res.send({
            error: 0,
            data: '删除相册成功'
        })
    });
})

// 暴露端口
module.exports = router;
