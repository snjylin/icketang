// 定义模块
define(function(require, exports, module) {
    // 引入工具类
    let tools = require('../tools/tools');
    // 引入观察者对象
    let Observer = tools.Observer;
    // 获取元素
    let $modal = $('#myModal');
    let $modal_header = $(".modal-header");
    let $modal_body = $(".modal-body p");
    let $btn_default = $(".btn-default");
    let $btn_primary = $(".btn-primary");
    // 监听msg消息
    Observer.on('msg', function(str) {
        $modal.modal('show');
        $modal_header.hide();
        $modal_body.html(str);
        $btn_primary.hide();
        $btn_primary.hide();
    });
});
