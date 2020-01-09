// 定义模块
define(function(require, exports, module) {
    // 引入工具类
    let tools = require('../tools/tools');
    // 引入观察者对象
    let Observer = tools.Observer;
    // 获取元素
    let $formGroup = $(".form-group");
    // 监听$formGroup消息
    Observer.on('tips', function(str, type, errCode) {
        switch (type) {
            // 用户名
            case 'u':
                $dom = $($formGroup[0]);
                break;
            // 密码
            case 'p':
                $dom = $($formGroup[1]);
                break;
            // 确认密码
            case 'r':
                $dom = $($formGroup[2]);
                break;
            default:
        }

        if (errCode === 0) {
            $dom.find('p').removeClass('text-danger').addClass('text-success').html('<span class="glyphicon glyphicon-ok"></span><span class="notice">' + str + '</span>');
        } else if (errCode === 1) {
            $dom.find('p').removeClass('text-success').addClass('text-danger').html('<span class="glyphicon glyphicon-remove"></span><span class="notice">' + str + '</span>');
        }
    });
});
