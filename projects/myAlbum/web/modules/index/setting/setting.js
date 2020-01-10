// 定义模块
define(function(require, exports, module) {
    // 引入msg
    require('../../common/msg');
    // 引入工具类
    let tools = require('../../tools/tools');
    // 引入策略对象
    let Strategy = tools.Strategy;
    // 引入观察者对象
    let Observer = tools.Observer;
    // 获取元素
    let $settings = $('[href="#settings"]');
    let $uploadInp = $('#uploadInp');
    let $uploadBtn = $('#uploadBtn');
    let $formSettings = $('#formSettings');

    // 获取token
    let token = localStorage.getItem('token');

    // 点击修改数据
    $formSettings.on('click', '[type=button]', (event) => {
        let e = window.event || event;
        // 获取元素
        let $dom = $(e.target).parents('.input-group');
        // 获取要修改的用户数据的类型
        let type = $dom.data('type');
        // 实例化FormData
        let fd = new FormData();
        // 添加token数据
        fd.append('token', token);
        // 添加type数据
        fd.append('type', type);
        let msg, data = '';

        // 判断要修改的用户数据的类型
        switch(type) {
            case 'gender':
                // 获取用户输入内容
                value = $dom.find('input:checked').val();
                break;
            case 'avatar':
                // 获取具体上传的文件
                file = $dom.find('input')[0].files[0];
                break;
            case 'age':
            case 'password':
            default:
                // 获取用户输入内容
                value = $dom.find('input').val();
                // 要修改的用户数据是否符合规则
                msg = (type === 'age') ? Strategy.use('age', value) : Strategy.use('password', value);
                // 判断 用户数据不符合规则时提示用户
                if (msg) {
                    // 输入信息错误时发布消息
                    Observer.trigger('msg', msg);
                    return;
                }
                break;
        }
        if (type === 'avatar') {
            // 添加数据
            fd.append('file', file);
        } else {
            // 添加数据
            fd.append('value', value);
        }

        // 遍历内部结构
		fd.forEach(function(value, key) {
            // console.log(key,value)
            data += '&'  + key + '=' + value;
		})

        // $settings.click(function() {
        // });
        if (type === 'avatar') {
            // 发送请求
            $.ajax({
                url: '/user/uploadUserHeader_pic',
                type: 'post',
                dataType: 'json',
                data: fd,
                // 是否由jQuery设置content-type字段
                contentType: false,
                // 是否由jQuery进行序列化
                processData: false,
                success(res) {
                    if (!res.error) {
                        // 发布消息
                        Observer.trigger('updateAvatar', res);
                        Observer.trigger('msg', res.data);
                    }
                }
            });
            return;
        }
        // 发送请求
        $.ajax({
            url: '/user/updateUserInfo',
            type: 'get',
            dataType: 'json',
            data: data.slice(1),
            // 是否由jQuery设置content-type字段
            contentType: false,
            // 是否由jQuery进行序列化
            processData: false,
            success(res) {
                // 发布消息
                Observer.trigger('msg', res.data);
            }
        });
    })
});
