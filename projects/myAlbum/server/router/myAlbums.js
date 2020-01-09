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
let collname = 'pics';
// 引入formidable
let Formidable = require('formidable');
// 引入jsonwebtoken
let jwt = require('jsonwebtoken');
// 指定加密字符串
let secret = 'djflasjflasdjflas';

router.get('/user/getAlbumLists', (req, res) => {
    // 获取用户名
    let username = req.token.username;

    // 连接数据库
    let db = new Database(connectStr, dbname, collname);
    // 查找数据库
    db.findMany({ username }, (err, result) => {
        if (err) {
            res.send({
                error: 1,
                data: '查找数据库失败'
            })
            return;
        }
        if (result) {
            res.send({
                error: 0,
                data: result
            })
            return;
        }
        // 成功 返回数据
        res.send({
            error: 2,
            data: '没有找到用户相册'
        })
    });
});

router.post('/user/uploadUserAlbumPics', (req, res) => {
    // 实例化Formidable
    let fd = new Formidable();
    // 设置上传图片的路径
    fd.uploadDir = './uploads';
    // 定义空数组 用于存储上传的图片文件
    let arrFile = [];
    // 监听file事件
    fd.on('file', (key, value) => {
        arrFile.push(value);
    })

    // 解析req对象
    fd.parse(req, (err, data, files) => {
        // 获取相册名称
        let albumName = data.albumName;
        // 获取token
        let token = data.token;

        // 解密
        jwt.verify(token, secret, (err, result) => {
            if (err) {
                res.send({
                    error: 1,
                    data: '解密失败'
                })
                return;
            }

            // 获取用户名称
            let username = result.username;

            // 定义数组 用于保存相关的信息
            let saveArr = [];
            try {
                arrFile.forEach(item => {
                    // 获取原路径
                    let oldPath = item.path;
                    // 定义新路径
                    let newPath = '/user/' + username + '/' + albumName + '/' + item.name;
                    // 更换名称
                    fs.renameSync(oldPath, '.' + newPath);
                    // 存储数据
                    saveArr.push({
                        username,
                        pic_path: newPath,
                        pic_name: item.name,
                        albumName
                    })
                });
            } catch (e) {
                res.send({
                    error: 2,
                    data: '更换名称失败了'
                })
                return;
            }

            // 连接数据库
            let db = new Database(connectStr, dbname, 'imgs');
            // 插入多条数据
            db.insertMany(saveArr, (err, result) => {
                if (err) {
                    res.send({
                        error: 3,
                        data: '插入数据库数据失败'
                    })
                    return;
                }

                // 返回成功消息
                res.send({
                    error: 0,
                    data: '上传图片成功',
                    saveArr
                })
            })
        });

    })
});

router.get('/user/getUserAlbumPics', (req, res) => {
    // 获取用户名
    let username = req.token.username;
    // 获取相册名称
    let albumName = req.query.albumName;

    // 连接数据库
    let db = new Database(connectStr, dbname, 'imgs');
    // 查找数据库
    db.findMany({ username, albumName }, (err, result) => {
        if (err) {
            res.send({
                error: 1,
                data: '查找数据库失败'
            })
            return;
        }
        if (result) {
            res.send({
                error: 0,
                data: result
            })
            return;
        }
        // 成功 返回数据
        res.send({
            error: 2,
            data: '没有找到用户相册'
        })
    });
});


// 暴露端口
module.exports = router;
