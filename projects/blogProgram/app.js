// 引入express
let express = require('express');
// 引入body-parser
let bodyParser = require('body-parser');
// 创建应用程序
let app = express();
// 静态化目录
app.use('/web/', express.static('./web/'));
// 配置body_parser
app.use(body_parser.urlencoded({ extended: false }));

// 引入router
var router = require('./server/router.js');
// 配置router
app.use(router);

// 监听端口号
app.listen(3000);
