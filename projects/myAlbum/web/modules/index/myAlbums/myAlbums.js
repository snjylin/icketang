// 定义模块
define(function(require, exports, module) {
    // 引入tools
    let tools = require('../../tools/tools');
    // 引入format
    let format = tools.format;
    // 引入观察者对象
    let Observer = tools.Observer;
    // 获取元素
    let $myAlbums = $('#myAlbums');
    let tplMyAlbums = $('#tplMyAlbums').html();
    // 获取token
    let token = localStorage.getItem('token');
    // 发送请求
    $.ajax({
        url: '/user/getAlbumLists',
        type: 'get',
        dataType: 'json',
        data: {
            token
        },
        success(res) {
            if (!res.error) {
                // 定义变量存放格式化后的模版
                let html = '';
                // 格式化模版
                res.data && res.data.forEach(item => {
                    html += format(tplMyAlbums, item);
                })
                // 上树
                $myAlbums.append(html);
                return;
            }
            // 发布消息
            Observer.trigger('msg', res.data);
        }
    });
    // 监听消息
    Observer.on('addAlbum', data => {
        // 定义变量存放格式化后的模版
        let html = '';
        // 格式化模版
        console.log(data)
        data = {
            albumName: data
        };
        html += format(tplMyAlbums, data);
        // 上树
        $myAlbums.append(html);
    });
    // 监听消息
    Observer.on('delAlbum', data => {
        $myAlbums.find('[data-albumName="' + data + '"]').remove();
    });
});
