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
// 引入formidable
let Formidable = require('formidable');
// 引入jsonwebtoken
let jwt = require('jsonwebtoken');
// 指定加密字符串
let secret = 'djflasjflasdjflas';
// 引入gm
let gm = require('gm');

// 处理updateUserInfo接口
router.get('/user/updateUserInfo', (req, res) => {
    // 获取用户名称
    let username = req.token.username;
    // 获取value
    let value = req.query.value;
    // 获取修改的类型
    let type = req.query.type;
    // 连接数据库
    let db = new Database(connectStr, dbname, collname);
    // 定义一个空对象 用于自适应要修改的数据
    let obj = {};
    obj[type] = value;

    let typeName = (type === 'password') ? '密码' : ((type === 'age') ? '年龄' : ((type === 'gender') ? '性别' : '头像'));

    // 定义query
    let query = {
        username
    }
    // 定义updated
    let updated = {
        $set: obj
    }
    // 修改数据
    db.updateOne(query, updated, (err, result) => {
        if (err) {
            // 返回错误信息
            res.send({
                error: 1,
                data: '修改用户数据失败了'
            })
            return;
        }
        // 返回成功之后的信息
        res.send({
            error: 0,
            data: '修改' + typeName + '成功了'
        })
    })
});

// 处理uploadUserHeader_pic接口
router.post('/user/uploadUserHeader_pic', (req, res) => {
    // 借助Formidable
    let form = new Formidable();
    // 设置临时上传路径
    form.uploadDir = './uploads';

    // 解析req对象
    form.parse(req, (err, data, files) => {
        // 捕获错误信息
        if (err) {
            res.send({
                error: 1,
                data: '解析req对象失败了'
            })
            return;
        }
        // 获取token
        let token = data.token;
        // 解密token字符串
        jwt.verify(token, secret, (err, msg) => {
            // 捕获错误信息
            if (err) {
                res.send({
                    error: 2,
                    data: '解密失败了'
                })
                return;
            }

            // 获取用户名
            let username = msg.username;
            // 定义原路径
            let oldPath = files.file.path;
            // 定义新路径
            let newPath = '/user/' + username + '/header_pic/' + files.file.name;

            // 修改文件名称
            fs.rename(oldPath, '.' + newPath, err => {
                if (err) {
                    res.send({
                        error: 3,
                        data: '修改文件名称失败了'
                    })
                    return;
                }
                // 连接数据库
                let db = new Database(connectStr, dbname, collname);
                // 定义query对象
                let query = { username };
                // 定义updated
                let updated = {
                    $set: {
                       header_path: newPath
                    }
                }
                // 修改数据
                db.updateOne(query, updated, (err, result) => {
                    // 捕获错误信息
                    if (err) {
                        res.send({
                            error: 3,
                            data: '修改数据失败了'
                        })
                        return;
                    }

                    // 重新设置用户的头像路径
                    msg.header_path = newPath;
                    // 重新设置token字符串
                    let newToken = jwt.sign(msg, secret);

                    // 返回成功时候的信息
                    res.send({
                        error: 0,
                        data: '修改头像成功',
                        newToken,
                        header_path: newPath
                    })

                })
            })
        })
    })
})

// 处理cut_img接口
router.get('/user/cut_img', (req, res) => {
    // 获取图片的路径
    let img_path = req.token.header_path;
    // 获取裁剪的宽高、位置
    let w = req.query.w;
    let h = req.query.h;
    let x = req.query.x;
    let y = req.query.y;
console.log(img_path)
    // 裁剪
    gm('.' + img_path).crop(w, h, x, y).write('.' + img_path, err => {
        if (err) {
            res.send({
                error: 1,
                data: '裁剪失败'
            })
            return;
        }

        // 成功时候返回信息
        res.send({
            error: 0,
            data: '裁剪成功',
            new_path: img_path
        })
    })
});

// 暴露端口
module.exports = router;
