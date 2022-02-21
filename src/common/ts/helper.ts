"use strict";
import { getApiUrl, getHost, ACTIONS} from "./api";

const app = {
	
	/**
	 * 保存本地缓存	setPrefs
	 * @param {string} key 键
	 * @param {object} value 值
	 * @param {function|null} callback 回调
	 */
	setStorage(key, value, callback = null) {
	    uni.setStorage({
	        key: key,
	        data: value,
	        success: () => {
	            callback && callback(true)
	        },
	        fail: () => {
	            callback && callback(false)
	        }
	    })
	},
	/**
	 * 获取本地缓存 getPrefs
	 * @param {string} key 键
	 * @returns {object|null} 返回值
	 */
	getStorage(key) {
	    let result = null
	    try {
	        result = uni.getStorageSync(key)
	    } catch (e) {
	        console.log(`get error => ${e}`)
	    }
	    return result;
	},
	/**
	 * 移除本地缓存 removePrefs
	 * @param {string} key 键
	 * @param {function|null} callback 回调
	 */
	removeStorage(key, callback = null) {
	    uni.removeStorage({
	        key: key,
	        success: res => {
	            callback && callback(res)
	        }
	    })
	},
	/**
	 * http get 请求
	 * @param {string} action 接口配置名称
	 * @param {object} params 参数
	 * @param {function|null} callback 成功回调
	 * @param {function|null} catchError 异常回调
	 * @loading {bollean} 是否显示loading
	 * @returns {Promise} 请求对象
	 * @private
	 */
	_get: function(_this, action, params, callback = null, catchError = null, loading = true) {
		loading && this.loading();
		let pathValues = '';
		if (params.pathValues) {
			pathValues = '/' + params.pathValues.join('/');
			delete params.pathValues;
		}
		return uni.request({
			url: getApiUrl(action) + pathValues,
			header: {
				'token': `${_this.$store.state.token}`
			},
			method: "GET",
			data: params,
			success: response => {
				if (response && response.data.code === 0) {
					callback && callback(response.data);
				} else if (response && response.data.code === 401) {
					this.toast(response.data.msg)
					this.toLogin(response.data.msg);
				}else {
					// console.log(response);
					this.toast(response.data.msg)
				}
			},
			fail: error => {
				console.log(`request error => ${JSON.stringify(error)}`);
				catchError && catchError(error);
			},
			complete: () => {
				loading && this.hideLoading();
				uni.stopPullDownRefresh();
			}
		});
	},
	/**
	 * http post 请求
	 * @param {string} action 接口配置名称
	 * @param {object} params 参数
	 * @param {function|null} callback 成功回调
	 * @param {function|null} catchError 异常回调
	 * @returns {Promise} 请求对象
	 * @loading {bollean} 是否显示loading
	 * @private
	 */
	_post: function(_this, action, params, callback = null, catchError = null, loading = true, toBack = false) {
		loading && this.loading();
		let pathValues = '';
		if (params.pathValues) {
			pathValues = '/' + params.pathValues.join('/');
			delete params.pathValues;
		}
		return uni.request({
			url: getApiUrl(action) + pathValues,
			header: {
				'token': `${_this.$store.state.token}`
			},
			method: "POST",
			data: params,
			success: response => {
				if (response && response.data.code === 0) {
					callback && callback(response.data);
				} else if (response && response.data.code === 401) {
					this.toast(response.data.msg)
					// this.toPage('/pages/user/login/login');
					this.toLogin(response.data.msg);
				} else {
					// console.log(response);
					this.toast(response.data.msg);
					uni.showModal({
						title: '温馨提示',
						showCancel: false,
						content: response.data.msg,
						success: () => {
							toBack && uni.navigateBack({ delta: 1 })
						}
					})
				}
			},
			fail: error => {
				console.log(error);
				catchError && catchError(error);
			},
			complete: () => {
				this.hideLoading();
				uni.stopPullDownRefresh();
			}
		});
	},
	_put: function(_this, action, params, callback = null, catchError = null, loading = true) {
		loading && this.loading();
		let pathValues = '';
		if (params.pathValues) {
			pathValues = '/' + params.pathValues.join('/');
			delete params.pathValues;
		}
		return uni.request({
			url: getApiUrl(action) + pathValues,
			header: {
				'token': `${_this.$store.state.token}`
			},
			method: "PUT",
			data: params,
			success: response => {
				if (response && response.data.code === 0) {
					callback && callback(response.data);
				} else if (response && response.data.code === 401) {
					this.toast(response.data.msg)
					// this.toPage('/pages/user/login/login');
					this.toLogin(response.data.msg);
				} else {
					// console.log(response);
					this.toast(response.data.msg)
				}
			},
			fail: error => {
				console.log(error);
				catchError && catchError(error);
			},
			complete: () => {
				this.hideLoading();
				uni.stopPullDownRefresh();
			}
		});
	},
	_delete: function(_this, action, params, callback = null, catchError = null, loading = true) {
		loading && this.loading();
		let urljoin = '';
		if (params.urljoin) {
			urljoin = '/' + params.urljoin.join('/');
			delete params.urljoin;
		}
		return uni.request({
			url: getApiUrl(action) + urljoin,
			header: {
				'token': `${_this.$store.state.token}`
			},
			method: "DELETE",
			data: params,
			success: response => {
				if (response && response.data.code === 0) {
					callback && callback(response.data);
				} else if (response && response.data.code === 401) {
					this.toast(response.data.msg)
					// this.toPage('/pages/user/login/login');
					this.toLogin(response.data.msg);
				} else {
					// console.log(response);
					this.toast(response.data.msg)
				}
			},
			fail: error => {
				console.log(error);
				catchError && catchError(error);
			},
			complete: () => {
				this.hideLoading();
				uni.stopPullDownRefresh();
			}
		});
	},
	/**
	 * 文件上传
	 * @param {string} action 接口配置名称
	 * @param {string} filePath 文件地址
	 * @param {object} params 上传参数
	 * @param {function|null} callback 成功回调
	 * @param {function|null} catchError 异常回调
	 * @returns {Promise} 上传对象
	 * @private
	 */
	_upload: function(_this, action, filePath, params = {}, callback = null, catchError = null) {
		this.loading('文件上传中...');
		return uni.uploadFile({
			url: getApiUrl(action),
			header: {
				'token': `${_this.$store.state.token}`
			},
			filePath: filePath,
			name: 'file',
			formData: params,
			success: (response) => {
				response = JSON.parse(response.data);
				if (response && response.code === 0) {
					callback && callback(response.data);
				} else if (response && response.code === 401) {
					this.toast(response.msg)
					this.toLogin(response.msg);
				} else {
					// console.log(response);
					this.toast(response.msg)
				}
			},
			fail: (error) => {
				console.log(`request error => ${JSON.stringify(error)}`);
				catchError && catchError(error);
			},
			complete: () => {
				this.hideLoading();
			}
		});
	},
	/**
	 * 批量文件上传
	 * @param {string} action 接口配置名称
	 * @param {array} files 文件地址集合
	 * @param {object} params 上传参数
	 * @param {function|null} callback 成功回调
	 * @param {function|null} catchError 异常回调
	 * @returns {Promise} 上传对象
	 * @private
	 */
	_batchUpload: function(_this, action, files, params = {}, callback = null, catchError = null) {
		this.loading('文件上传中...');
		return uni.uploadFile({
			url: getApiUrl(action),
			header: {
				'token': _this.$store.state.token
			},
			files: files,
			formData: params,
			success: (response) => {
				const data = JSON.parse(response.data);
				if (response && (data.code === 0)) {
					callback && callback(data);
				} else if (response && data.code === 401) {
					// this.toast(data.message)
					// this.toPage('/pages/user/login/login');
					this.toLogin(response.message);
				} else {
					console.log(data);
					this.toast(data.message)
				}
			},
			fail: (error) => {
				console.log(`request error => ${JSON.stringify(error)}`);
				catchError && catchError(error);
				this.hideLoading();
			},
			complete: () => {
				this.hideLoading();
			}
		});
	},
	/**
	 * 文件下载
	 * @param {string} url 文件访问地址
	 * @param {function|null}callback 成功回调
	 * @param {function|null}catchError 异常回调
	 * @returns {Promise} 下载对象
	 */
	download: function(_this, url, callback = null, catchError = null, error = true) {
		return uni.downloadFile({
			url: url,
			header: {
				"Authorization": `Bearer ${_this.$store.state.access_token}`
			},
			success: (response) => {
				console.log(`request response => ${JSON.stringify(response)}`);
				callback && callback(response);
			},
			fail: (error) => {
				console.log(`request error => ${error}`);
				error && this.toast('下载失败，请重试');
				catchError && catchError(error);
			},
			complete: () => {
				console.log('download complete');
			}
		});
	},
	/**
	 * 消息提示
	 * @param {string} message 消息内容
	 * @param {number} duration 时长
	 * @param {object} styles 样式[仅对APP生效]
	 */
	toast: function(message, duration = 2000, styles = {
		duration: 'short',
		align: 'center',
		verticalAlign: 'bottom'
	}) {
		// #ifdef APP-PLUS
		plus.nativeUI.toast(message, styles);
		// #endif
		// #ifdef H5 || MP-WEIXIN
		uni.showToast({
			title: message,
			duration: duration,
			mask: false,
			icon: "none"
		});
		// #endif
	},
	/**
	 * 询问弹窗
	 * @param {string} message 提示内容
	 * @param {function|null} callback 按钮回调 0:成功,1:取消
	 * @param {string} title 提示标题
	 * @param {string} verticalAlign 对齐方式
	 */
	confirm: function(message, callback = null, buttons = ["确定", "取消"], title = '提示', showCancel = true, verticalAlign =
		'center') {
		uni.showModal({
			title: title,
			content: message,
			confirmText: buttons[0],
			cancelText: buttons[1],
			showCancel: showCancel,
			success: res => {
				res.confirm && callback && callback(res.confirm);
			}
		});
	},
	/**
	 * 底部弹出菜单
	 * @param {array} buttons 按钮列表
	 * @param {function|null}callback 按钮回调
	 * @param {string} title 标题
	 * @param {boolean} showCancel 是否显示取消按钮
	 */
	actionSheet: function(buttons, callback, title = null, showCancel = true) {
		// #ifdef APP-PLUS
		const config = {
			title: title,
			cancel: "取消",
			buttons: buttons
		};
	
		!title && (delete config.title);
		!showCancel && (delete config.cancel);
		plus.nativeUI.actionSheet(config, e => {
			callback && callback(e.index);
		});
	
		// #endif
	
		// #ifdef H5 || MP-WEIXIN
		const items = [];
		for (let item of buttons) {
			items.push(item.title);
		}
		uni.showActionSheet({
			itemList: items,
			title: title ? title : '',
			showCancel: showCancel,
			success: res => {
				callback && callback(res.tapIndex + 1);
			}
		});
		// #endif
	},
	/**
	 * 确认弹窗
	 * @param {string} message 提示消息内容
	 * @param {function|null} callback 回调
	 * @param {string} title 标题
	 */
	alert: function(message, callback, title = '提示') {
		// #ifdef APP-PLUS
		plus.nativeUI.alert(message, () => {
			callback && callback()
		}, title, "确定");
		// #endif
		// #ifdef H5 || MP-WEIXIN
		uni.showModal({
			title: title,
			content: message,
			showCancel: false,
			success: res => {
				callback && callback(res.confirm ? 0 : 1);
			}
		});
		// #endif
	
	},
	/**
	 * 打开页面
	 * @param {string} url 页面地址
	 * @param {boolean} checkLogin 是否校验登录
	 * @param {string} animation 动画
	 */
	toPage: function(url, checkLogin = false, animation = 'slide-in-right') {
		// 如果需要检测是否登录并且未登录则跳转到登录页
		if (checkLogin && !this.getStorage('userInfo')) {
			// url = '/pages/user/login/login';
			this.toLogin(null);
			return;
		}
		uni.navigateTo({
			animationType: animation,
			url: url
		})
	},
	/**
	 * 返回页面
	 * @param {int} delta  
	 */
	toBack: function(delta = 1) {
		uni.navigateBack({
			delta: delta
		})
	},
	/**
	 * 选择图片
	 * @param {number} imageLength 当前已选择图片数量
	 * @param {string} sourceType 图片来源
	 * @param {function|null} callback 成功回调
	 */
	images: function(imageLength = 0, callback = null) {
		uni.chooseImage({
			count: 9 - imageLength, //默认9
			success: (res) => {
				callback && callback(res)
			},
			fail: (error) => {
				console.log(`fail => ${JSON.stringify(error)}`);
			},
		});
	},
	/**
	 * 选择视频
	 * @param {string} sourceType 视频来源
	 * @param {function|null} callback 成功回调
	 * @param {number} maxDuration 视频时长筛选
	 * @param {number} maxCount 最大选择数量
	 * @param {string} camera 调用摄像头位置
	 */
	videos: function(maxCount = 1, callback = null, maxDuration = 60, camera = 'back') {
		const _this = this;
		uni.chooseVideo({
			maxDuration: maxDuration,
			count: maxCount,
			camera: camera,
			success: (res) => {
				callback && callback(res)
			},
			fail: (error) => {
				_this.toast("选择失败，请重试");
			}
		})
	},
	/**
	 * 显示loading
	 * @param {string} text 提示内容
	 * @param {boolean} mask 是否显示遮罩层
	 */
	loading: function(text = '拼命加载中...', mask = true) {
		// uni.showLoading({
		// 	title: text,
		// 	mask: true
		// });
	},
	/**
	 * 关闭loading
	 */
	hideLoading: function() {
		uni.hideLoading();
	},
	/**
	 * 手机号检测
	 * @param {string} mobile 手机号
	 * @returns {boolean} true为是否则反之
	 */
	isMobile: function(mobile = '') {
		return (/^1[3456789]\d{9}$/.test(mobile));
	},
	/**
	 * 图片预览
	 * @param {object} image 图片信息集合
	 * @param {array|null} actions 可选按钮
	 * @param {function|null} callback 回调
	 */
	previewImages: function(image, actions = null, callback = null) {
		const _this = this;
		let longPress = null;
		if (actions) {
			longPress = {
				itemList: actions,
				success: function(data) {
					callback && callback(data);
				}
			};
		}
		uni.previewImage({
			current: image.index >= 0 ? image.index : 0,
			indicator: 'number',
			urls: image.urls,
			longPressActions: longPress,
			fail: () => {
				_this.toast('预览失败，请重试');
			}
	
		})
	},
	/**
	 * 保存图片或视频到相册
	 * @param {string} url 访问地址
	 * @param {function|null} callback 成功回调
	 */
	saveToAlbum: function(url, callback = null) {
		const _this = this;
		_this.download(url, res => {
			uni.saveImageToPhotosAlbum({
				filePath: res.tempFilePath,
				success: function() {
					_this.toast('已保存到手机相册中');
					callback && callback();
				},
				fail: function() {
					_this.toast('保存失败，请重试');
				}
			});
		});
	},
	/**
	 * 身份证号检测
	 * @param {string} idNumber 身份证号
	 * @returns {boolean} true为是否则反之
	 */
	isIdNumber: function(idNumber) {
		return /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/
			.test(idNumber);
	},
	/**
	 * 登录
	 * @param {Object} message
	 */
	toLogin: function(message) {
		this.confirm(message ? message : '该功能需要登录后使用，是否前往登录？', confirm => {
			if (confirm) {
				this.toPage('/pages/user/login');
			}
		}, ['去登录', '再看看']);
	}




}


//自定义插件并导出
// const Helper = Vue => {
//     Vue.helper = app;
//     Object.defineProperties(Vue.prototype, {
//         $helper: {
//             get: function () {
//                 return app;
//             }
//         },
//     });
// };

// Vue.use(Helper);

export default app;
