// 定义模块
define(function(require, exports, module) {
    // 加载nav模块
    require('../index/nav/nav');
    // 引入tools
    let tools = require('../tools/tools');
    // 引入format
    let format = tools.format;
    // 获取元素
    let $targetUserImgs = $('#targetUserImgs');
    let tplTargetUserImgs = $('#tplTargetUserImgs').html();
    // 获取query
    let query = location.search.slice(1);
    // 处理query
    let query_arr = query.split('&');
    // 处理query得到分享相册的用户名
    let username = query_arr[0].split('=')[1];
    // 处理query得到分享的相册的名
    let albumName = query_arr[1].split('=')[1];

    function getTargetUserPicList(resolve, reject) {
        // 发送请求
        $.ajax({
            url: '/getTargetUserPicList',
            type: 'get',
            dataType: 'json',
            data: {
                username,
                albumName
            },
            success(res) {
                resolve(res);
            },
            error(err) {
                reject(err);
            }
        });
    }

    new Promise((resolve, reject) => {
        getTargetUserPicList(resolve, reject);
    }).then(res => {
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
    }, err => {
    })
})
