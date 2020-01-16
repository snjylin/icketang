# 复习
## 兼容移动端代码
```
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<!-- device-width是屏幕物理宽度，和视口宽度不同 -->
<script>
    // 声明一个变量，来接收获取到到视口宽度
    var vm = window.innerWidth;

    // 将获取到的当前视口宽度呈现到页面上
    document.write("当前视口宽度为：" + vm + "px");
</script>
```

## 媒介查询  media属性
响应式布局可以在不同的视口下，呈现不同的效果
实现的原理通过媒介查询完成
媒介查询的使用，有如下几种：
    可以直接在引入样式时，限定视口大小；
    或者直接在样式中，书写不同视口下的样式
注意：留活口，设置全局属性在没有媒介查询限定时可以呈现这种效果，也可以将媒介共同的属性提取出来，简化代码。写在媒体查询代码最前面

1. style标签的media属性 （嵌入式）
```
<!-- 将共同的部分提取出来先写（留活口） -->
<!-- 注意：全局属性最好默认一种全局样式（而非只是将共同部分提取出来），避免某种视口下没有限定样式乱掉的情况 -->
/* 一般只限定最大或最小，不需要同时限定，灵活性更高 */
<style></style>
<!-- 限定视口宽度大于1200px -->
<style media="screen and (min-width: 1200px)"></style>
<!-- 限定视口范围960px～1199px之间 -->
<style media="screen and (min-width: 960px) and (max-width: 1199px)"></style>
<!-- 限定视口宽度小于960px -->
<style media="screen and (max-width: 960px)"></style>
```
2. 链接式
```
<link rel="stylesheet" href="">
<link rel="stylesheet" href="" media="screen and (max-width: 1180px)">
<link rel="stylesheet" href="" media="screen and (max-width: 768px)">

/* 样式文件 */
/* 媒介查询 */
@media screen and (min-width: 1200px) {
    xxxxxx
}
```
文本级的属性都可以被继承
    font-
    text-
    line-height
盒子的属性不可以被继承

# Bootstrap
Bootstrap 是最受欢迎的 HTML、CSS 和 JS 框架，用于开发响应式布局、移动设备优先的 WEB 项目。
[Bootstrap 官方文档](https://www.bootcss.com/)
[Bootstrap 教程](https://www.runoob.com/bootstrap/bootstrap-tutorial.html)
[cdnjs](https://cdnjs.com/)
[Bootstrap3 全局 CSS 样式](https://v3.bootcss.com/css/#grid)
[Bootstrap demo](https://www.runoob.com/try/demo_source/bootstrap3-makewebsite.htm)
