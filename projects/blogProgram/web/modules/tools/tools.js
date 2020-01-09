define(function(require, exports, module) {
    /**
     * 格式化模板
     * @param  {[type]} tpl [description]
     * @param  {[type]} dic [description]
     * @return {[type]}     [description]
     */
    function format(tpl, dic) {
        return tpl.replace(/<%\s*(\w+(\.\w+)*)\s*%>/g, function(match, $1) {
            // 分割字符串
            let arr = $1.split('.');
            // 备份对象
            let result = dic;
            // 遍历
            for (var i = 0; i < arr.length - 1; i++) {
                result = result[arr[i]];
            }
            // 返回最后一项
            return result[arr[i]];
        });
    }

    /**
     * 获取数组中的最小项
     * @param  {[type]} arr [description]
     * @return {[type]}     返回最小项索引
     */
    function getMin(arr) {
        // 定义最小项的索引
        let minIdx = 0;
        // 定义最小项
        let minItem = arr[0];
        // 遍历数组
        for (var i = 0; i < arr.length; i++) {
            // 判断
            if (minItem > arr[i]) {
                // 改变最小项的索引
                minIdx = i;
                // 改变最小项的值
                minItem = arr[i];
            }
        }
        // 返回最小项的索引
        return minIdx;
    }

    // 暴露接口
    module.exports.format = format;
    module.exports.getMin = getMin;
});
