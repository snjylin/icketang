// 定义模块
define(function(require, exports, module) {
    // 引入tools
    let tools = require('../../tools/tools');
    // 引入format
    let format = tools.format;
    // 获取元素
    let $userShareAlbum = $('#userShareAlbum');
    let tplUserShareAlbum = $('#tplUserShareAlbum').html();
    // 获取token
    let token = localStorage.getItem('token');
    // 发送请求
    $.ajax({
        url: '/getUserShareAlbum',
        type: 'get',
        dataType: 'json',
        data: {
            token
        },
        success(res) {
            res.data = [
                { "username" : "xiaohong", "albumName" : "aaa", "share" : "true" },
                { "username" : "xiaohong", "albumName" : "bbb", "share" : "true" },
                { "username" : "xiaohong", "albumName" : "adfs", "share" : "true" },
                { "username" : "xiaoxiao", "albumName" : "ddd", "share" : "true" },
                { "username" : "xiaoxiao", "albumName" : "dasf", "share" : "true" }
            ]
            console.log(res.data);

            if (!res.error) {
                // 定义变量存放格式化后的模版
                let html = '';
                // 格式化模版
                res.data.forEach(item => {
                    html += format(tplUserShareAlbum, item);
                })
                // 上树
                $userShareAlbum.append(html);
                return;
            }

        }
    });
});
