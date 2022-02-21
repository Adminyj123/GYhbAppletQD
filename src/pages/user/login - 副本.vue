<template>
	<view class="container">
		<view class="left-top-sign">LOGIN</view>
		<view class="welcome">欢迎回来！</view>
		<button class="confirm-btn" open-type="getUserInfo" @getuserinfo="wxLogin" :disabled="logining">微信授权登录</button>
	</view>
</template>
​
<script lang="ts">
	import {
		ref,
		computed,
		getCurrentInstance
	} from 'vue';
	import {
		useStore
	} from 'vuex';
	export default {
		setup(props, context) {
			const store = useStore();
			const {
				proxy
			} = getCurrentInstance();
			const userInfo = ref({})

			const logining = ref(false);
			function wxLogin(e) {
				logining.value = true;
				userInfo.value = e.detail.userInfo;
				uni.login({
					provider: "weixin",
					success: (login_res => {
						let code = login_res.code;
						uni.getUserInfo({
							success(info_res) {
								console.log(info_res)
								uni.request({
									url: 'http://localhost:8080/wxlogin',
									method: "POST",
									header: {
										'content-type': 'application/x-www-form-urlencoded'
									},
									data: {
										code: code,
										rawData: info_res.rawData
									},
									success(res) {
										if (res.data.status == 200) {
											proxy.$store.commit('user/login',userInfo);
											// uni.setStorageSync("userInfo",userInfo);
											// uni.setStorageSync("skey", res.data.data);
										} else {
											console.log('服务器异常')
										}
									},
									fail(error) {
										console.log(error)
									}
								})
								uni.hideLoading()
								uni.navigateBack()
							}
						})
					})
				})
			}

			return {
				wxLogin
			}
		}
	};
</script>
​
<style lang="less">
	.container {
		display: flex;
		overflow: hidden;
		background: #fff;
		flex-direction: column;
		justify-content: center;
	}
	.left-top-sign {
		font-size: 120upx;
		// color: $page-color-base;
		color: #F0AD4E;
		position: relative;
		left: 10upx;
		margin-top: 100upx;
	}
	
	.welcome {
		position: relative;
		left: 50upx;
		top: 190upx;
		font-size: 46upx;
		color: #555;
		text-shadow: 1px 0px 1px rgba(0, 0, 0, 0.3);
	}
	
	.confirm-btn {
		width: 630upx;
		height: 76upx;
		line-height: 76upx;
		border-radius: 50px;
		margin-top: 270upx;
		background: #4CD964;
		color: #fff;
		font-size: 30rpx;
		// font-size: $font-lg;

	}
	.confirm-btn:after {
		border-radius: 100px;
	}
</style>
​
