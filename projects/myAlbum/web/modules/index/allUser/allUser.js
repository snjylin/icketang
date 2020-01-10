// 定义模块
define(function(require, exports, module) {
    // 引入tools
    let tools = require('../../tools/tools');
    // 引入format
    let format = tools.format;
    // 获取元素
    let $home = $('[href="#home"]');
    let $messages = $('[href="#messages"]');
    let $userShareAlbum = $('#userShareAlbum');
    let tplUserShareAlbum = $('#tplUserShareAlbum').html();
    // 获取token
    let token = localStorage.getItem('token');

    // 判断
    if(!token) {
        // 用户未登录展示全部用户
        $(function(){
            $home.trigger('click');
        });
    } else {
        // 用户登录展示管理相册
        $(function(){
            $messages.trigger('click');
        });
    }

    $home.click(function() {
        // 发送请求
        $.ajax({
            url: '/requestAllUserList',
            type: 'get',
            dataType: 'json',
            data: {
                token
            },
            success(res) {
                if (!res.error) {
                    $userShareAlbum.html('');
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
});
