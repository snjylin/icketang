## 项目分析
主页
登录页
注册页

## 创建目录结构
创建web文件夹用于存放前端代码
/web

目录结构
    web
        css
            bootstrap.min.js
        html
            index.html
            login.html
            regist.html
        images
        js
            bootstrap.min.js
            jquery.js
            sea.js
            seajs-css.js
            seajs-preload.js
        modules            
            common
                tips.js
            index
                allUser
                    allUser.js
                managerAlbum
                    managerAlbum.js
                myAlbums
                    myAlbums.js
                setting
                    setting.js
                nav
                    nav.js
            login
                login.js
            regist
                regist.js
            tools
                tools.js
    db
        db.js
    server
        del.js
        router.js
    app.js
    user


## 初始化
npm init
安装用到的模块
npm install express body-parser jsonwebtoken mongodb

搭建服务器 —— 创建/app.js文件
配置路由 —— 创建/server/router.js文件
封装数据库 —— 创建/db/db.js文件


在web目录下创建html文件夹存放html文件
    html
        index.html
        login.html
        regist.html

主页布局
    header
    nav
    content
        nav tabs

选择开发栈
使用bootstrap布局
引入相关css及js文件
V3.bootcss.com/css/

使用seajs进行模块化开发
引入sea.js，seajs-css.js，jquery.js

在web目录下创建css文件夹存放css文件
在web目录下创建js文件夹存放js文件
css
    bootstrap.min.js
js
    bootstrap.min.js
    jquery.js
    sea.js
    seajs-css.js
    seajs-preload.js


在modules文件夹下创建index文件夹存放主页相关文件
在index文件夹下创建主入口文件main.js


在主页中引入main.js

在index文件夹下创建主页模块目录文件
index
    allUser
        allUser.js
    managerAlbum
        managerAlbum.js
    myAlbums
        myAlbums.js
    setting
        setting.js
    nav
        nav.js

## 登录注册模块
布局
在modules文件夹下创建login文件夹存放登录页相关文件
在modules文件夹下创建regist文件夹存放注册页相关文件
    login
        login.js
    regist
        regist.js


在modules文件夹下创建tools文件夹存放封装tools工具类
    tools
        tools.js
定义模块
封装策略对象
封装观察者对象
    on方法
    trigger方法
暴露接口

## nav模块

## 管理相册
### 管理相册布局
### 操作相册
#### 创建相册逻辑
#### 渲染用户相册列表
#### 修改相册状态（相册是否共享）
#### 删除对应的相册

删除对应的相册列表
点击删除的时候把当前对应的列表整个移除，移除的时候要把数据库中对应的数据也删除
    获取相册名称（通过添加自定义属性）
    发送get请求
        携带数据data
            token
            相册名称
    服务器端处理get请求
        获取用户名
        获取相册名称
        连接数据库
        定义删除的数据条件obj
            用户名
            相册名
        删除数据
            删除非空目录
            （同步方法注意防止出错使用try catch语句）

## 我的相册
我的相册模块和管理相册模块通信（使用观察者模式）
当创建相册时，我的相册中对应创建相应相册
当删除相册时，我的相册中对应删除相应相册
点击进入新创建的相册可以查看相册中内容，跳转到新页面userAlbum.html    
创建新页面userAlbum.html    
在modules文件夹中创建userAlbum模块

新页面userAlbum.html url需要带上query数据，当前是用户的哪一个相册

布局

上传图片
前端
    定义模块
        加载nav模块
        获取元素
        点击的时候上传图片
            实例化FormData
            获取具体上传的文件
            遍历数组
                添加暑假见
            获取token
            获取query数据
            处理query数据
            追加token数据
            追加query数据
            // 使用fd实例化对象中的forEach方法查看内部结构
            发送post请求（uploadUserPic_list接口）
                contentType: false;  // 是否由jquery设置content-type字段：否
                ProcessData: false;  // 是否由jquery进行序列化：否
                    遍历数组渲染视图
        获取token（需要获取用户名，用户名包含在token中）
        获取相册名称（在url的?之后的部分，可以使用location.search.slice(1)获取）
        处理query数据（拼接data字符串）
        发送get请求，请求所有的图片（requestUserPic_list接口）
            get请求需要携带token和相册名称数据
                遍历数组渲染视图
    暴露接口
后端
    服务器端处理post请求（uploadUserPic_list接口，需要使用formidable模块，多文件上传）
        实例化formidable对象
        设置上传图片的临时路径
        定义空数组 用于存储上传的图片文件
        监听file事件
        解析req对象
            获取相册名称
            获取token
            解密
                获取用户名
                定义数组，用于保存相关的信息
                获取原路径
                获取新路径
                更换名称
                存储数据
                连接数据库
                插入多条数据
    服务器端处理get请求（requestUserPic_list接口）
        获取前端提交的数据
        获取相册名称
        获取用户名称
        连接数据库
        查找多条数据
            返回成功时候信息

## 全部用户相册模块
布局

在main.js文件中引入allUser模块

定义allUser模块
    发送get请求
        遍历数组渲染视图

后端
    处理get请求
        连接数据库
        查找多条数据
            返回成功时候的数据

## 修改信息模块
修改不同的用户信息使用同一个接口，但是不知道修改哪一个，添加一个自定义属性（如：type类型属性）到后台，后台获取之后自适应一下（同过定义一个对象来自适应要修改的数据）
value   要修改为的内容
type    要修改的数据自定义类型

let obj = {};
obj[type] = value;
