// 定义模块
define(function(require, exports, module) {
    // 引入观察者对象
    let Observer = require('../../tools/tools').Observer;
    // 获取元素
    let $nav = $('#nav');
    // 获取token
    let token = localStorage.getItem('token');
    if (!token) {
        // 用户未登录
        let data = '用户未登录';
        // 切换未登录状态
        $nav.append('<a href="/web/html/login.html">请登录</a>');
        // 切换到全部用户
        $('.tab-pane.active').removeClass('active');
        $('#home').addClass('active');
        return;
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
                    `
    					<a href="/web/html/cut.html"><img src=${res.data.header_path}></a>
    	                <span class="nickname">${res.data.username}</span>
    	                <a href="#" id="exit">退出</a>
                	`
                );
                $('.nav-tabs li').eq(0).siblings().show();
                return;
            }
        }
    });
    // 使用jquery中的委托模式
    $nav.on('click', '#exit', function() {
        // 清除token
        localStorage.removeItem('token');
        // 跳转页面
        location.href = '/web/html/index.html';
    });
    // 监听消息
    Observer.on('updateAvatar', function(res) {
        $nav.find('img').attr('src', res.header_path);
    });
});
