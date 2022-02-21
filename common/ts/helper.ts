
import { getApiUrl, getHost, ACTIONS} from "./api";

const app = {
	
	/**
	 * 保存本地缓存	setPrefs
	 * @param key 键
	 * @param value 值
	 * @param _then 回调
	 */
	setStorage(key, value, _then = null) {
	    uni.setStorage({
	        key: key,
	        data: value,
	        success: () => {
	            _then && _then(true)
	        },
	        fail: () => {
	            _then && _then(false)
	        }
	    })
	},
	/**
	 * 获取本地缓存 getPrefs
	 * @param key 键
	 * @returns {null} 返回值
	 */
	getStorage(key) {
	    let result = null
	    try {
	        result = uni.getStorageSync(key)
	    } catch (e) {
	        console.log(`get error => ${e}`)
	    }
	    return result
	},
	/**
	 * 移除本地缓存 removePrefs
	 * @param key 键
	 * @param _then 回调
	 */
	removeStorage(key, _then = null) {
	    uni.removeStorage({
	        key: key,
	        success: res => {
	            _then && _then(res)
	        }
	    })
	},




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
