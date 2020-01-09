// 引入fs模块
let fs = require('fs');
/**
 * del方法 用于删除非空目录
 * path 要删除的文件目录
 *
 *  思路：
 * 	-获取文件中的内容(得到数组)
 * 	-遍历数组 查看每一个文件的状态
 */
function del(path) {
    // 查看文件夹
    let arr = fs.readdirSync(path);

    // 为了避免同步语法出错 使用try catch
    try {
        // 遍历数组
        arr.forEach(function(item, index) {
            // 获取状态
            let stat = fs.statSync(path + '/' + item);
            // 判断是文件夹或者是文件
            if (stat.isDirectory) {
                // 说明是文件夹 递归处理
                del(path + '/' + item);
                console.log('删除了' + path + '/' + item + '文件夹');
            } else {
                // 说明是文件 直接删除
                fs.unlinkSync(path + '/' + item);
                console.log('删除了' + path + '/' + item + '文件');
            }
        });
    } catch (e) {
        throw new Error(e);
    }

    // 最后删除path
    fs.rmdirSync(path);
}

// 暴露接口
module.exports = del;
