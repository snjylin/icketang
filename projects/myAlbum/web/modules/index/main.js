// 定义入口
define(function(require, exports, module) {
    // 加载nav模块
    require('./nav/nav');
    // 加载allUser模块
    require('./allUser/allUser');
    // 加载managerAlbum模块
    require('./managerAlbum/managerAlbum');
    // 加载myAlbums模块
    require('./myAlbums/myAlbums');
    // 加载setting模块
    require('./setting/setting');
});
