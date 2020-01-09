define(function(require, exports, module){
    // 引入工具类
    let format = require('../../tools/tools.js').format;
    // 添加数据
    MVC.addModule('bg', ['bg1','bg2','bg3','bg4','bg5','bg6']);
    //  创建视图函数
    MVC.addView('bg', function(M) {
        // 1 获取元素
        let $dom = $('#bg');
        // 2 获取数据
        let data = M.get('bg');
        console.log(data);
        // 3 定义模板
        let tpl = [
            '<ul>',
                '<%li_tpl%>',
            '</ul>',
        ].join('');
        // 4 定义小模板
        let li_tpl = '<li><img src="<%src%>" alt=""></li>';
        // 5 定义变量 用于存储格式化后的模板
        let html = '';
        let li_html = '';
        // 6 格式化模板
        data.forEach(function(item) {
            li_html += format(li_tpl, {
                src: '/web/images/art/' + item + '.jpg'
            });
        });
        // 处理大模板
        html = format(tpl, {
            li_tpl: li_html
        });
        // 7 上树
        $dom.append(html);

        // 8 返回元素
        return $dom;
    });
    // 添加控制器
    MVC.addCtrl('bg', function(M, V) {
        // 执行视图函数
        V.render('bg');
        // 获取数据
        var length = M.get('bg').length;
        // 定义信号量
        let idx = 0;
        // 获取元素
        let lis = $('li');

        // 每隔一段时间背景变化
        setInterval(function() {

            // 当前图片淡出
            lis.eq(idx).fadeOut(500);
            // 改变信号量
            idx++;
            // 判断边界
            if (idx > length - 1) {
                idx = 0;
            }
            // 下一张图片淡入
            lis.eq(idx).fadeIn(500);
        }, 2000);
    });
});
