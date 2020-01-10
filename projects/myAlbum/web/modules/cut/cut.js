// 定义模块
define(function(require, exports, module) {
    // 加载nav模块
    require('../index/nav/nav');
    // 引入观察者对象
    let Observer = require('../tools/tools').Observer;

    // 获取元素
	let box = $('#box')[0];
	let area = $('#area')[0];
	let dot = $('#dot')[0];
	let btn = $('#btn')[0];
	let img = $('#img')[0];

	// 发送请求 请求图片
	$.ajax({
		url: '/getUserInfo',
		type: 'get',
		dataType: 'json',
		data: {
			token: localStorage.getItem('token')
		},
		success(res) {
			if (!res.error) {
				img.src = res.data.header_path;
				// 改变area的背景图片
				area.style.backgroundImage = 'url('+ res.data.header_path+')';
			}
		}
	})

	// 为dot添加鼠标事件
	dot.onmousedown = function(e) {
		// 阻止冒泡
		e.stopPropagation();
		// 获取鼠标位置
		let x = e.clientX;
		let y = e.clientY;
		// 获取area的宽高
		let a_width = area.clientWidth;
		let a_height = area.clientHeight;

		// 为document添加鼠标移动事件
		document.onmousemove = function(e) {
			// 获取鼠标移动之后的位置
			let m_x = e.clientX;
			let m_y = e.clientY;

			// 定义变量简化书写
			let resultX = m_x - x + a_width;
			let resultY = m_y - y + a_height;

			// 边界限制
			if (resultX < 0) {
				resultX = 0;
			} else if (resultX > box.clientWidth - area.offsetLeft) {
				resultX = box.clientWidth - area.offsetLeft;
			}

			if (resultY < 0) {
				resultY = 0;
			} else if (resultY > box.clientHeight - area.offsetTop) {
				resultY = box.clientHeight - area.offsetTop;
			}

			// 改变area的宽高
			area.style.width = resultX + 'px';
			area.style.height = resultY + 'px';
		}
	}

	// 为area添加鼠标事件
	area.onmousedown = function(e) {
		// 获取鼠标位置
		let x = e.clientX;
		let y = e.clientY;
		// 获取area的定位值
		let a_left = area.offsetLeft;
		let a_top = area.offsetTop;

		// 为document添加鼠标移动事件
		document.onmousemove = function(e) {
			// 获取鼠标移动之后的位置
			let m_x = e.clientX;
			let m_y = e.clientY;

			// 定义变量简化书写
			let resultX = m_x - x + a_left;
			let resultY = m_y - y + a_top;

			// 边界限制
			if (resultX < 0) {
				resultX = 0;
			} else if (resultX > box.clientWidth - area.clientWidth) {
				resultX = box.clientWidth - area.clientWidth;
			}

			if (resultY < 0) {
				resultY = 0;
			} else if (resultY > box.clientHeight - area.clientHeight) {
				resultY = box.clientHeight - area.clientHeight;
			}

			// 改变area的定位值
			area.style.left = resultX + 'px';
			area.style.top = resultY + 'px';
			// 改变area的背景图片定位
			area.style.backgroundPosition = -resultX + 'px ' + -resultY + 'px';
		}
	}

	// 鼠标抬起的时候取消move事件
	document.onmouseup = function() {
		document.onmousemove = null;
	}

	// 点击btn按钮发送请求
	btn.onclick = function() {
		// 分别获取要裁剪的宽高、位置、图片
		let w = area.clientWidth;
		let h = area.clientHeight;
		let x = area.offsetLeft;
		let y = area.offsetTop;
		// 获取token
		let token = localStorage.getItem('token');
		$.ajax({
			url: '/user/cut_img',
			type: 'get',
			dataType: 'json',
			data: { w, h, x, y, token },
			success(res) {
				if (!res.error) {
					// 创建图片元素
					let img = new Image();
					// 设置路径
					// 由于新截取的图片的路径与原本的图片的路径都是一致的
					// 所以可能导致缓存问题
					// 我们只要在图片路径中加上一个时间戳即可
					// 定义新路径
					let newPath = res.new_path + '?' + Math.random();
					// 设置新路径
					img.src = newPath;

					// 同时告诉nav模块更新头像
					Observer.trigger('updateAvatar', res);
				}
			}
		})
	}
})
