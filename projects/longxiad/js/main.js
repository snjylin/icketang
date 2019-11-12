// 获取大背景元素
var $bgPics = $('.bg-pic').children();
// 获取时间轴元素
var $timelines = $('.timeline').children();
var cutIndex = 0;
var timer = null;

// 实现自动轮播效果
timer = setInterval(function() {
    slide($timelines,$bgPics,1);
}, 3000);


/**
 * [autoSlide 实现轮播效果]
 * @param  {[array]} arr1 [控制按钮导航数组]
 * @param  {[array]} arr2 [被控制的元素数组]
 * @param  {[type]} dir  [轮播方向，向前‘-1’或向后‘1’]
 * @return {[type]}      [description]
 */
function slide(arr1,arr2,dir) {
    // 当前索引大背景元素淡出
    arr2.eq(cutIndex).fadeOut(500, function() {
        switch (dir) {
            // 向前
            case -1:
                // 索引自减及判断边界
                if (--cutIndex < 0) {
                    cutIndex = arr1.length - 1;
                }
                break;
            // 向后
            case 1:
                // 索引自增及判断边界
                if (++cutIndex >= arr1.length) {
                    cutIndex = 0;
                }
                break;
        }
        // console.log(cutIndex);

        // 索引自增后的索引大背景元素淡入
        arr2.eq(cutIndex).fadeIn(500);

        // 时间轴切换到索引自增后的索引对应的时间轴
        arr1.eq(cutIndex).addClass('on').siblings().removeClass('on');
    });
}
