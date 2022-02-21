<script setup lang="ts">
import { onLaunch, onShow, onHide } from "@dcloudio/uni-app";
import {getCurrentInstance } from 'vue';
import { useStore } from 'vuex';
const { proxy } = getCurrentInstance();

//使用global对象什么的全局属性，仅微信小程序中可以全局使用
global.isLogin = function(){
	try{
		var suid = uni.getStorageSync('suid')
		var srand = uni.getStorageSync('srand')
	}catch(e){
		//TODO
	}
	if(suid == '' || srand == ''){
		return false;
	}else{
		return [suid,srand];
	}
	
}



onLaunch(() => {
	console.log("App Launch");
	uni.getSystemInfo({
	    success: (ret) => {
	        proxy.$store.commit('user/updateSystemInfo', ret);
	    }
	});
	//从本地缓存中获取expires、userInfo、token  进行对比，先比较登录是否过期
	const expires = proxy.$helper.getStorage('expires');
	proxy.$store.commit('user/updateExpires', expires);
	if (expires > (new Date()).getTime()) {  //时间戳比较
	    const userInfo = proxy.$helper.getStorage('userInfo');
	    if (userInfo) {
	        proxy.$store.commit('user/updateUserInfo', userInfo);
	    }
	    proxy.$store.commit('user/updateToken', proxy.$helper.getStorage('token'));
	} else {
		//已过期
	    proxy.$helper.removeStorage('userInfo');
	    proxy.$helper.removeStorage('expires');
	    proxy.$helper.removeStorage('token');
	}
	//获取定位坐标
	const location = proxy.$helper.getStorage('location');
	if (location) {
	    proxy.$store.commit('user/updateLocation', location);
	}
  
});
onShow(() => {
  console.log("App Show");
});
onHide(() => {
  console.log("App Hide");
});

</script>
<!-- App.vue -->
<style lang="scss">

	/* 图标库（本地图标库） */
	@import '@/static/iconfont/iconfont.css';//后期将用到阿里巴巴图标下载后导入（前期可能顶部导航栏在page.json中会需要用到）
	/* 引入阿里巴巴图标库(后期打包时下载到本地后由上面这个图标库替代) */
	// @import url('https://at.alicdn.com/t/font_3193378_1fyd8wbii0e.css');//阿里巴巴在线图标库
	/* 布局库 */
	@import '@/common/css/fdn-main.css';//逐渐完善形成自己风格的公共样式库
	
	/* 引入该项目公共样式文件（放在样式文件的最下面，权限最高） */
	@import '@/common/css/common.css';//这个放于最下面，相对于上面几个权限更高，专门针对当前项目，覆盖上面文件同名样式，用于当前项目下的样式
	/*以下样式可以写到common文件中,但是写进去要放于最外层,将image及其他的css样式包裹在page里面,同时更改文件为scss文件(引入这里也要改)*/
	page {
		height: 100%;
		font-size: 28rpx; //在html中声明字体大小主要是用来后面使用1rem=这里的font-size的14px大小。
		line-height: 1.8;
		background-color: #ffffff;//页面整体背景色，若项目特色可不加，但是大多数地方都得设置背景色
		color: #333333;//页面整体字体颜色，视项目情况也可不加，
	}
	image{ width: 100%; }
</style>