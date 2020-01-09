// 定义模块
define(function(require, exports, module) {
    // 引入msg
    require('../../common/msg');
    // 引入工具类
    let tools = require('../../tools/tools');
    // 引入format函数
    let format = tools.format;
    // 引入观察者对象
    let Observer = tools.Observer;

    // 获取元素
    $albumInp = $('#albumInp');
    $albumBtn = $('#albumBtn');
    $listGroup = $('#listGroup');
    $tplListGroup = $('#tplListGroup').html();

    // 获取token
    let token = localStorage.getItem('token');

    // 给创建相册按钮添加点击事件
    $albumBtn.click(function() {
        let albumName = $albumInp.val();
        // 发送请求
        $.ajax({
            url: '/user/createAlbumList',
            type: 'get',
            dataType: 'json',
            data: { token, albumName },
            success(res) {
                if (!res.error) {
                    // 渲染视图
                    // 格式化模版
                    let html = format($tplListGroup, res);
                    // 上树
                    $listGroup.append(html);
                    $albumInp.val('');

                    // 发布消息
                    Observer.trigger('addAlbum', res.albumName);
                    return;
                }
                // 发布消息
                Observer.trigger('msg', res.data);
            }
        });
    });

    // 发送请求
    $.ajax({
        url: '/user/getUserAlbumsList',
        type: 'get',
        dataType: 'json',
        data: { token },
        success(res) {
            if (!res.error) {
                let html = '';
                res.data.forEach(function(item, index) {
                    // 处理数据
                    item.checked = (item.share === 'true') ? 'checked' : '';
                    // 渲染视图
                    // 格式化模版
                    html += format($tplListGroup, item);
                });
                // 上树
                $listGroup.append(html);
                return;
            }
        }
    });

    // 使用jquery中的委托模式
    $listGroup.on('click', '.ipt', function() {
        // 获取check的状态
        let state = this.checked + '';
        // 获取对应的相册名称
        let albumName = $(this).data('albumname');

        // 发送请求 更新用户相册分享状态
        $.ajax({
            url: '/user/updateAlbumShareState',
            type: 'get',
            dataType: 'json',
            data: {
                state,
				token,
				albumName
            },
            success(res) {
                // console.log(res);
            }
        });
    });

    // 删除对应的相册列表
    $listGroup.on('click', '.del', function() {
        // 获取对应的相册名称
        let albumName = $(this).data('albumname');
        // 备份对象
        $this = $(this);

        // 发送请求 更新用户相册分享状态
        $.ajax({
            url: '/user/deleteAlbumList',
            type: 'get',
            dataType: 'json',
            data: {
				token,
				albumName
            },
            success(res) {
                if (!res.error) {
                    $this.parent().parent().remove();

                    // 发布消息
                    Observer.trigger('delAlbum', albumName);
                    return;
                }
            }
        });
    });
});
