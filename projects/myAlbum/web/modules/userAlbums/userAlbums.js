// 定义模块
define(function(require, exports, module) {
    // 引入tools
    let tools = require('../tools/tools');
    // 引入format
    let format = tools.format;
    // 引入观察者对象
    let Observer = tools.Observer;
    // 加载nav模块
    require('../index/nav/nav');
    // 获取元素
    let $uploadInp = $('#uploadInp');
    let $uploadBtn = $('#uploadBtn');
    let $userAlbumPics = $('#userAlbumPics');
    let tplUserAlbumPics = $('#tplUserAlbumPics').html();

    // 获取token
    let token = localStorage.getItem('token');
    // 获取query
    let query = location.search.slice(1);
    // 处理query
    let query_arr = query.split('=');

    // 点击上传图片
    $uploadBtn.click(function() {
        // 实例化FormData
        let fd = new FormData();
        // 获取具体上传的文件
        let arr = Array.prototype.slice.call($uploadInp[0].files);

        // 遍历数组
        arr.forEach(item => {
            // 添加数据
            fd.append('file', item);
        })


        // 追加token数据
        fd.append('token', token);
        // 追加query数据
        fd.append(query_arr[0], query_arr[1]);

        // 发送请求
        $.ajax({
            url: '/user/uploadUserAlbumPics',
            type: 'post',
            dataType: 'json',
            data: fd,
            // 是否由jQuery设置content-type字段
            contentType: false,
            // 是否由jQuery进行序列化
            processData: false,
            success(res) {
                if (!res.error) {
                    // 定义变量
                    let html = '';
                    // 处理模版
                    res.saveArr && res.saveArr.forEach(item => {
                        html += format(tplUserAlbumPics, item);
                    })
                    // 上树
                    $userAlbumPics.append(html);                    
                    return;
                }
                // 发布消息
                Observer.trigger('msg', res.data);
            }
        });
    });

    // 发送请求
    $.ajax({
        url: '/user/getUserAlbumPics',
        type: 'get',
        dataType: 'json',
        data: {
            token,
            albumName: query_arr[1]
        },
        success(res) {
            if (!res.error) {
                // 定义变量
                let html = '';
                // 处理模版
                res.data && res.data.forEach(item => {
                    html += format(tplUserAlbumPics, item);
                })
                // 上树
                $userAlbumPics.append(html);
                return;
            }
            // 发布消息
            Observer.trigger('msg', res.data);
        }
    });
})
