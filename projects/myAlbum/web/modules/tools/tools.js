// 定义模块
define(function(require, exports, module) {
    // 定义策略对象
    let Strategy = (function() {
        // 定义存储对象
        let obj = {
            username(str) {
                // 定义正则表达式
                let patt = /^[A-Za-z]{6,9}$/;
                // 验证
                return patt.test(str) ? '' : '请输入6-9位英文字母'
            },
            password(num) {
                // 定义正则表达式
                let patt = /^\d{6,12}$/;
                // 验证
                return patt.test(num) ? '' : '请输入6-12位阿拉伯数字'
            }
        };
        // 返回接口对象
        return {
			use(name, str) {
				return obj[name](str);
			}
		}
    })();
    // 定义观察者对象
    let Observer = (function() {
        // 定义存储对象
        let obj = {};
        // 返回接口对象
        return {
            on(name, fn) {
                if (obj[name] instanceof Array) {
                    obj[name].push(fn);
                } else {
                    obj[name] = [fn];
                }
            },
            trigger(name) {
				// 获取剩余参数
				let arg = Array.prototype.slice.call(arguments, 1);
				// 遍历
				for (let i = 0; i < obj[name].length; i++) {
					obj[name][i].apply(obj, arg);
				}
			}
        };
    })();
    // 定义format格式化函数
    let format = function(tpl, dic) {
        // 返回处理后的模版
        return tpl.replace(/<%\s*(\w+(\.\w+)*)s*%>/g, function(match, $1) {
            // 分割路径
            let arr = $1.split('.');
            // 备份对象
            let result = dic;
            // 遍历数组
            for (var i = 0; i < arr.length - 1; i++) {
                // 判断当前层级是否是引用类型
                if (typeof result[arr[i]] === 'object' && result[arr[i]] != null) {
                    // 读取下一层
                    result = result[arr[i]];
                } else {
                    result = null;
                }
            }
            // 返回最后一项
            return result[arr[i]];
        });
    };

    // 暴露接口
    module.exports.Strategy = Strategy;
    module.exports.Observer = Observer;
    module.exports.format = format;
});
