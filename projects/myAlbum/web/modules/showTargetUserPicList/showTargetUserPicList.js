// 定义模块
define(function(require, exports, module) {
    console.log('showTargetUserPicList');
    // 加载nav模块
    require('../index/nav/nav');
    // 引入tools
    let tools = require('../tools/tools');
    // 引入format
    let format = tools.format;
    // 获取元素
    let $targetUserImgs = $('#targetUserImgs');
    let tplTargetUserImgs = $('#tplTargetUserImgs').html();
    // 获取token
    let token = localStorage.getItem('token');
    // 获取相册名
    let albumName = location.search.split('?')[1];

    // 发送请求
    $.ajax({
        url: '/getTargetUserPicList',
        type: 'get',
        dataType: 'json',
        data: {
            token
        },
        success(res) {
            res.data = [
                { "username" : "xiaohong", "albumName" : "aaa", "share" : "true", "img_path": "/user/xiaohong/header_pic/default.png" },
                { "username" : "xiaohong", "albumName" : "bbb", "share" : "true", "img_path": "/user/xiaohong/header_pic/default.png" },
                { "username" : "xiaohong", "albumName" : "adfs", "share" : "true", "img_path": "/user/xiaohong/header_pic/default.png" },
                { "username" : "xiaoxiao", "albumName" : "ddd", "share" : "true", "img_path": "/user/xiaohong/header_pic/default.png" },
                { "username" : "xiaoxiao", "albumName" : "dasf", "share" : "true", "img_path": "/user/xiaohong/header_pic/default.png" }
            ]
            console.log(res.data);

            if (!res.error) {
                // 定义变量存放格式化后的模版
                let html = '';
                // 格式化模版
                res.data.forEach(item => {
                    html += format(tplTargetUserImgs, item);
                })
                // 上树
                $targetUserImgs.append(html);
                return;
            }

        }
    });
})
