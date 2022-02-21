<template>
	<view class="login">
		
		<view class="user-info-box b-radius-5 bg-white d-flex flex-col a-center">
			<!-- <view class="avatar b-radius-circle overflow-hidden mt-100">
				<open-data class="" type="userAvatarUrl" lang="zh_CN"></open-data>
			</view> -->
			<text v-if="token" class="font-size-16 color-333 mt-20">{{userInfo.nickname}}</text>
			<view class="login-btn  " v-else>
				<button @tap="proxy.$helper.toPage('/pages/user/login')">登 录</button>
			</view>
		
			<view class="w-100 d-flex flex-row a-center" v-if="token">
				<view class="flex-1 flex-col flex-center">
					<text class="font-size-20 color-red">{{ 100 }}</text>
					<text class="font-size-12 color-666 mt-10">能量</text>
				</view>
				<view class="d-line"></view>
				<view class="flex-1 flex-col flex-center">
					<text class="font-size-20 color-red">{{99999}}</text>
					<text class="font-size-12 color-666 mt-10">积分</text>
				</view>
			</view>
		</view>
		
		<view class="mt-20 comm-content-box" v-if="token">
			<view class="menu-item color-333 ml-20 flex-row j-sb a-center" @tap="proxy.$helper.toPage('/pages/user/address')">
				<text>地址管理</text>
				<text class="iconfont icon-arrow-right font-size-12 color-999"></text>
			</view>
		</view>
		<view class="mt-20 comm-content-box" v-else @tap="toLogin">
			<view class="menu-item color-333 ml-20 flex-row j-sb a-center ">
				<text>地址管理</text>
				<text class="iconfont icon-arrow-right font-size-12 color-999"></text>
			</view>
		</view>
		
		<view class="comm-content-box mt-20">
			<view class="menu-item color-333 ml-20 flex-row j-sb a-center" @tap="proxy.$helper.toPage('/pages/user/about')">
				<text>关于我们</text>
				<text class="iconfont icon-arrow-right font-size-12 color-9"></text>
			</view>
			<view class="menu-item color-333 ml-20 flex-row j-sb a-center" @tap="proxy.$helper.toPage('/pages/user/index')">
				<text>联系客服</text>
				<text class="iconfont icon-arrow-right font-size-12 color-999"></text>
			</view>
		</view>
	</view>
</template>

<script lang="ts">
import {
	computed,
	getCurrentInstance,
	onMounted
} from 'vue';
import {
	useStore
} from 'vuex';
export default {
	name: "UserIndex",
	setup() {
		const store = useStore();
		const { proxy } = getCurrentInstance();

		const token = computed(() => store.state.user.token)
		const userInfo = computed(() => store.state.user.userInfo)
		const getAccountInfo = function() {
			console.log('获取用户信息~')
		    // proxy.$helper._get(proxy, 'userInfo', {}, resp => {
		    //     proxy.$store.commit('updateUserInfo', resp.data)
		    // })
		}
		function toLogin() {
			proxy.$helper.confirm('身份验证失败，请前往登录', res => {
			    proxy.$helper.toPage('/pages/user/login')
			})
		}
		onMounted(() => { 
			wx.checkSession({
			  success () {
				//调用成功说明当前 session_key 未过期，调用失败说明 session_key 已过期
			    //session_key 未过期，并且在本生命周期一直有效
				console.log('登录未过期~')
			  },
			  fail () {
				  //登录态过期后开发者可以再调用 wx.login 获取新的用户登录态。
			    // session_key 已经失效，需要重新执行登录流程
			    // wx.login() //重新登录
				console.log('登录已经过期~')
				proxy.$helper.toast('登录过期，请重新登录')
			  }
			})
			getAccountInfo()
		})
		return {
			token,
			userInfo,
			toLogin,
			proxy
		}
	}
};
</script>

<style lang="scss" scoped>
.background {
	position: absolute;
	top: 0;
	left: 0;
	z-index: -1;
}

.user-info-box {
	height: 260rpx;
	z-index: 99;
	width: 710rpx;
	margin-left: 20rpx;
	margin-top: 80rpx;
	position: relative;

}

.avatar {
	position: absolute;
	border: 1px solid #f0f3f6;
	top: 80rpx;
	width: 150rpx;
	height: 150rpx;
}

.login-btn {
	width: 240rpx;
	margin-top: 100rpx;
}
.comm-content-box{
	width: 710rpx;
	margin-left: 20rpx;
	border-radius: 10rpx;
}

.menu-item {
	border-bottom: 1px solid grey;
	padding: 26rpx 20rpx;

}

.menu-item :last-child {
	border-bottom: none;
}

.menu-item :active{
	opacity: 0.9;
}
.d-line{
	width: 1px;
	background-color: grey;
	height: 50rpx;
}
</style>
