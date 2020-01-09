// 定义MVC
let MVC = (function() {
    // 定义M层，负责数据的存储与获取
    let M = (function() {
        // 定义数据对象
        let data = {};
        // 返回接口对象
        return {
            add(name, value) {
                // 第一步将路径分割为数组
                var arr = name.split('.');
                // 备份数据
                var result = data;
                // 遍历
                for (var i = 0; i < arr.length - 1; i++) {
                    // 判断当前层级是否是引用类型，如果是指向下一层
                    if (typeof result[arr[i]] === 'object' && result[arr[i]] != null) {
                        // 引用类型指向下一层
                        result = result[arr[i]];
                    } else if (typeof result[arr[i]] === 'undefined') {
                        // 强制变为对象
                        result[arr[i]] = {};
                        // 改变指针
                        result = result[arr[i]];
                    } else {
                        throw new Error('不能在值类型上添加数据');
                    }
                }
                // 判断最后一层
                if (result[arr[i]] === undefined) {
                    result[arr[i]] = value;
                } else {
                    throw new Error('已经被占用了');
                }
            },
            get(name) {
                // 第一步切割路径
                let arr = name.split('.');
                // 备份对象
                let result = data;
                // 遍历
                for (var i = 0; i < arr.length - 1; i++) {
                    // 判断是否是对象
                    if (typeof result[arr[i]] === 'object' && result[arr[i]] != null) {
                        // 存在 指向下一层
                        result = result[arr[i]];
                    } else {
                        return null;
                    }
                }
                // 返回最后一项
                return result[arr[arr.length - 1]];
            }
        };
    })();
    // 定义V层 视图层
    let V = (function() {
        // 定义数据对象
        let data = {};
        // 返回接口对象
        return {
            /**
             * add 向数据中添加内容
             * @name 数据名称
             * @fn 执行的函数
             */
            add(name, fn) {
                data[name] = fn;
            },
            /**
             * render 用于执行add中的数据
             * @name 事件名称
             */
            render(name) {
                data[name](M);
            }
        }
    })();
    // 定义C层 控制器层
    let C = (function() {
        // 定义数据对象
        let data = {};
        // 返回接口对象
        return {
            add(name, fn) {
                data[name] = fn;
            },
            init() {
                // 遍历执行
                for (var i in data) {
                    data[i](M, V);
                }
            }
        };
    })();

    // 返回一个接口对象，提供一些方法可以操作
    return {
        addModule(name, data) {
            M.add(name, data);
        },
        addView(name, fn) {
            V.add(name, fn);
        },
        addCtrl(name, fn) {
            C.add(name, fn);
        },
        install() {
            C.init();
        }
    }
})();
