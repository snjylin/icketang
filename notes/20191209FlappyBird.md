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
&emsp;开启路径 beginPath()  
&emsp;关闭路径 closePath()  

&emsp;moveTo(x,y) 将画笔移动到指定位置  
&emsp;lineTo(x,y) 移动画笔绘制图形  

&emsp;arc(x,y,r,start,end,boolean) 绘制弧形  
&emsp;Math.PI = 3.14 = 180  

&emsp;fillStyle 属性设置填充颜色  
&emsp;strokeStyle 属性设置描边的颜色  
&emsp;fill() 填充  
&emsp;stroke() 描边  

&emsp;lineWidth 属性用于改变线宽  

&emsp;font 属性用于改变字体大小和字体  
&emsp;fillText(str,x,y)  填充文字  

绘制完整图形  
&emsp;fillRect(x,y,w,h)  填充矩形  
&emsp;strokeRect(x,y,w,h) 描边矩形  
绘制图形  
&emsp;// 创建图片对象  
&emsp;var img = new Image();  
&emsp;// 请求路径  
&emsp;img.src = url  
&emsp;// 图片加载完成（加载是异步的，需要在图片加载完成后再绘制图片）  
&emsp;img.onload = function() {  
&emsp;&emsp;ctx.drawImage(img,x,y)  
&emsp;&emsp;ctx.drawImage(img,x,y,w,h)  
&emsp;&emsp;ctx.drawImage(img,img_x,img_y,img_w,img_h,canvas_x,canvas_y,canvas_w,canvas_h)  
&emsp;}  

获取canvas像素信息  
&emsp;ctx.getImageData(x,y,w,h)  
&emsp;ctx.putImageData(imgData,x,y)  
融合  
&emsp;globalCompositeOperation属性  
&emsp;ctx.globalCompositeOperation  

# 游戏  
写游戏：面向对象的思想，分类管理  

游戏分析：  
使用面向对象的方式类书写游戏，提取类：  
&emsp;首先，是一个游戏类，来管理所有的类  
&emsp;&emsp;Game类  
&emsp;还有一些子类，  
&emsp;&emsp;鸟Bird类  
&emsp;&emsp;管子Pipe类  
&emsp;&emsp;背景Background类（地面和远处的山）  

图片加载完后去执行，图片加载完的方法，用img标签引入图片资源，或者创建一个img对象，new Image()，使用onload方法，当图片加载完成后执行  
