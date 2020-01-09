// 定义模块
define(function(require, exports, module) {
    // 引入msg
    require('../common/msg');
    // 引入tips
    require('../common/tips');
    // 引入工具类
    let tools = require('../tools/tools');
    // 引入策略对象
    let Strategy = tools.Strategy;
    // 引入观察者对象
    let Observer = tools.Observer;

    // 获取元素
    $username = $('#username');
    $Password = $('#Password');
    $rePassword = $('#rePassword');
    $btn = $('#btn');
    $form_regist = $('#form_regist');

    // 定义锁 分别用于判断用户名和密码是否正确
    let u_lock = true;
    let p_lock = true;

    // 失去焦点时判断是否符合条件
    $username.blur(function() {
        // 获取用户输入的用户名
        let val = $username.val();
        // 使用策略对象
        let msg = Strategy.use('username', val);
        // 判断
        if (msg) {
            // 输入信息错误时发布消息
            Observer.trigger('tips', msg, 'u', 1);
            // 上锁
            u_lock = false;
            return;
        }

        // 检查数据库中是否已存在用户名
        $.ajax({
            url: '/checkName',
            type: 'get',
            dataType: 'json',
            data: { username: val },
            success(res) {
                if (!res.error) {
                    // 发布消息
                    Observer.trigger('tips', res.data, 'u', 0);
                    // 开锁
                    u_lock = true;
                } else if (res.error == 2) {
                    // 发布消息
                    Observer.trigger('tips', res.data, 'u', 1);
                }
            }
        });
    });
    // 失去焦点时判断是否符合条件
    $Password.blur(function() {
        // 获取用户输入的密码
        let val = $Password.val();
        // 使用策略对象
        let msg = Strategy.use('password', val);

        // 判断
        if (!msg) {
            Observer.trigger('tips', '恭喜您，密码可以使用', 'p', 0);
            // 开锁
            p_lock = true;
            return;
        }

        // 输入信息错误时发布消息
        Observer.trigger('tips', msg, 'p', 1);
        // 上锁
        p_lock = false;
    });
    // 失去焦点时判断是否符合条件
    $rePassword.blur(function() {
        // 获取用户输入的密码
        let pwd1 = $Password.val();
        // 获取用户输入的确认密码
        let pwd2 = $rePassword.val();
        // 判断
        if (pwd2 === pwd1) {
            Observer.trigger('tips', '恭喜您，输入的确认密码正确', 'r', 0);
            // 开锁
            p_lock = true;
            return;
        }

        // 两次输入的密码不一致发布消息
        Observer.trigger('tips', '两次输入的密码不一致', 'r', 1);
        // 上锁
        p_lock = false;
    });
    // 点击提交
    $btn.click(function() {
        // 获取用户输入的用户名
        let val = $username.val();
        // 获取用户输入的密码
        let pwd1 = $Password.val();
        // 获取用户输入的确认密码
        let pwd2 = $rePassword.val();

        // 判断用户输入信息是否符合条件
        if (!(val && pwd1 && pwd2 && u_lock && p_lock)) {
            // 发布消息
            Observer.trigger('msg', '请检查用户名或密码');
            return;
        }

        // 只能提交一次
        $(this).attr('disabled', true);
        // 表单序列化
        let data = $form_regist.serialize();
        // 发送请求到后台
        $.ajax({
            url: '/regist',
            type: 'post',
            dataType: 'json',
            data,
            success(res) {
                if (!res.error) {
                    // 发布消息
                    Observer.trigger('msg', res.data);
                    // 跳转到登录页面
                    setTimeout(() => {
                        location.href = '/web/html/login.html'
                    },1500);
                }
            },
            error(err) {
                throw new Error(err);
            }
        });
    });
});
