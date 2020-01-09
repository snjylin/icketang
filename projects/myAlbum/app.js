// 引入express模块
let express = require('express');
// 引入body-parser
let bodyParser = require('body-parser');
// 创建应用程序
let app = express();
// 静态化目录
app.use('/web', express.static('./web'));
// 静态化目录
app.use('/user', express.static('./user'));
// 配置body-parser
app.use(bodyParser.urlencoded({ extended: false }));

// 引入路由
let router = require('./server/router');
// 设置路由
app.use(router);
// 监听端口号
app.listen(3000);
