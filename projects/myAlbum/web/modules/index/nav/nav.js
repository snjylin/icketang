// 定义模块
define(function(require, exports, module) {
    // 获取元素
    let $nav = $('#nav');
    // 获取token
    let token = localStorage.getItem('token');
    if (!token) {
        // 用户未登录
        let data = '用户未登录'
    }
    // 发送请求
    $.ajax({
        url: '/getUserInfo',
        type: 'get',
        dataType: 'json',
		data: { token },
        success(res) {
            if (!res.error) {
                $nav.append(
                    '<img src="/user/' + res.data.username + '/header_pic/default.png">\
                    <span class="nickname">' + res.data.username + '</span>\
                    <a href="javascript:;" id="exit">退出</a>'
                );
                $('.nav-tabs li').eq(0).siblings().show();
                return;
            }
            $nav.append('<a href="/web/html/login.html">请登录</a>');
        }
    });
    // 使用jquery中的委托模式
    $nav.on('click', '#exit', function() {
        // 清除token
        localStorage.removeItem('token');
        // 跳转页面
        location.href = '/web/html/index.html';
    });
});
