// 定义模块
define(function(require, exports, module) {
    // 引入msg
    require('../common/msg');
    // 引入观察者对象
    let Observer = require('../tools/tools').Observer;
    // 获取元素
    $form_regist = $('#form_regist');
    $btn = $('#btn');

    // 点击时验证用户名及密码
    $btn.click(function() {
        // 表单序列化
        let data = $form_regist.serialize();
        // 发送请求
        $.ajax({
            url: '/login',
            type: 'get',
            dataType: 'json',
            data,
            success(res) {
                if (!res.error) {
                    // 用户登录信息存储到本地
                    localStorage.setItem('token', res.data);
                    // 跳转页面
                    location.href = '/web/html/index.html';
                    return;
                }
                // 发布消息
                Observer.trigger('msg', res.data);
            }
        });
    });
});
