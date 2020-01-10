// 定义模块
define(function(require, exports, module) {
    // 加载nav模块
    require('../index/nav/nav');
    // 引入tools
    let tools = require('../tools/tools');
    // 引入format
    let format = tools.format;
    // 获取元素
    let $targetUserPicList = $('#targetUserPicList');
    let tplTargetUserPicList = $('#tplTargetUserPicList').html();
    // 获取query
    let query = location.search.slice(1);
    // 处理query
    let query_arr = query.split('=');
    // 处理query得到分享相册的用户名
    let username = query_arr[1];
    // 发送请求
    $.ajax({
        url: '/getUserShareAlbum',
        type: 'get',
        dataType: 'json',
        data: {
            username
        },
        success(res) {
            if (!res.error) {
                // 定义变量存放格式化后的模版
                let html = '';
                // 格式化模版
                res.data.forEach(item => {
                    html += format(tplTargetUserPicList, item);
                })
                // 上树
                $targetUserPicList.append(html);
                return;
            }

        }
    });
})
