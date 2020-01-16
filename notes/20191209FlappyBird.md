# 复习
Canvas
HTML5中新增画图标签canvas
canvas仅仅用来提供画布，默认的宽高300*150，且画布的宽高只能在html属性中设置。
？？？？
在css文件中设置canvas的宽高会缩放（把canvas当作一个图片），通常在HTML标签中设置宽高

脚本中绘制图形：

1.拿到画板canvas
2.拿到画笔 通过canvas获取上下文对象
3.开始绘制

一般是路径的绘制
    开启路径 beginPath()
    关闭路径 closePath()

    moveTo(x,y) 将画笔移动到指定位置
    lineTo(x,y) 移动画笔绘制图形

    arc(x,y,r,start,end,boolean) 绘制弧形
    Math.PI = 3.14 = 180

    fillStyle 属性设置填充颜色
    strokeStyle 属性设置描边的颜色
    fill() 填充
    stroke() 描边

    lineWidth 属性用于改变线宽

    font 属性用于改变字体大小和字体
    fillText(str,x,y)  填充文字

绘制完整图形
    fillRect(x,y,w,h)  填充矩形
    strokeRect(x,y,w,h) 描边矩形
绘制图形
    // 创建图片对象
    var img = new Image();
    // 请求路径
    img.src = url
    // 图片加载完成（加载是异步的，需要在图片加载完成后再绘制图片）
    img.onload = function() {
        ctx.drawImage(img,x,y)
        ctx.drawImage(img,x,y,w,h)
        ctx.drawImage(img,img_x,img_y,img_w,img_h,canvas_x,canvas_y,canvas_w,canvas_h)
    }

获取canvas像素信息
    ctx.getImageData(x,y,w,h)
    ctx.putImageData(imgData,x,y)
融合
    globalCompositeOperation属性
    ctx.globalCompositeOperation

# 游戏
写游戏：面向对象的思想，分类管理

游戏分析：
使用面向对象的方式类书写游戏，提取类：
    首先，是一个游戏类，来管理所有的类
        Game类
    还有一些子类，
        鸟Bird类
        管子Pipe类
        背景Background类（地面和远处的山）

图片加载完后去执行，图片加载完的方法，用img标签引入图片资源，或者创建一个img对象，new Image()，使用onload方法，当图片加载完成后执行
