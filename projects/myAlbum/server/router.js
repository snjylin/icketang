// 引入express
let express = require('express');
// 实例化路由对象
let router = new express.Router();
// 引入jsonwebtoken模块
let jwt = require('jsonwebtoken');
// 指定加密字符串
let secret = 'djflasjflasdjflas';

// 截获所有get请求
router.get('*', (req, res, next) => {
    // 获取token
    let token = req.query.token;
    // 判断
    if (token) {
        jwt.verify(token, secret, (err, result) => {
            if (err) {
                res.send({
                    error: 1,
                    data: '解密token字符串失败'
                })
                return;
            }
            // 解密成功 设置token字段
            req.token = result;
            next();
        });
        return;
    }
    next();
});

// 截获所有用户操作get请求
router.get('/user/*', (req, res, next) => {
    if (!req.token) {
        res.send({
            error: 1,
            data: '获取用户信息失败'
        })
        return;
    }
    next();
});

// 引入路由
let regist = require('./router/regist');
let login = require('./router/login');
let nav = require('./router/nav');
let allUser = require('./router/allUser');
let myAlbums = require('./router/myAlbums');
let manageAlbum = require('./router/manageAlbum');
let setting = require('./router/setting');

// 配置路由
router.use(regist);
router.use(login);
router.use(nav);
router.use(allUser);
router.use(myAlbums);
router.use(manageAlbum);
router.use(setting);

// 暴露端口
module.exports = router;
