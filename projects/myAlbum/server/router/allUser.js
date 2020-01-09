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

router.get('/getUserShareAlbum', (req, res) => {
    res.send({
        error: 0,
        data: ''
    });
});

router.get('/getTargetUserPicList', (req, res) => {
    res.send({
        error: 0,
        data: ''
    });
});

// 暴露端口
module.exports = router;
