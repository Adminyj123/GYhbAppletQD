<template>
	<view class="login">
		<view class="flex-row flex-center">
		    <view class="avatar b-radius-circle">
		        <open-data class="" type="userAvatarUrl" lang="zh_CN"></open-data>
		    </view>
		</view>
		<view class="d-line"></view>
		<view class="ml-20 mt-30 flex-col">
		    <text class="color-666 font-size-16">申请获取以下权限</text>
		    <text class="font-size-14 mt-10 color-333">获得你的公开信息（昵称、头像等）</text>
		</view>
		<view class="btn-box ml-20 mr-20">
			<block v-if="!hasUserInfo">
				<!-- <button open-type="getUserInfo" @getuserinfo="getUserInfo" withCredentials="true" style="padding: 0;background-color: #4CD964;">授 权 登 录</button> -->
				<button v-if="canIUseGetUserProfile" hover-class="none" @tap="getUserProfile">授 权 登 录</button>
				<button v-else hover-class="none" open-type="getUserInfo" @getuserinfo="bindGetUserInfo">授 权 登 录</button>
			</block>
		    <view class="mt-30"></view>
		    <button style="background-color: #999999;" @tap="proxy.$helper.toBack()">暂 不 登 录</button>
		</view>
		<view class="agreements w-100 flex-row flex-center">
		    <label class="flex-row a-center ml-20"  @tap="agreement = !agreement">
		        <radio style="transform: scale(0.6);" color="#007aff" :checked="agreement"/>
		        请阅读并同意
		        <text class="color-333" @tap.stop="proxy.$helper.toPage('/pages/other/article/detail?id=1358700108628439042')">《国盈环保用户服务协议》</text>
		    </label>
			{{agreement}}
		</view>
	</view>
</template>
​
<script lang="ts" >
import {
	ref,reactive,
	computed,
	getCurrentInstance
} from 'vue';
import {
	useStore
} from 'vuex';
import { onShow } from "@dcloudio/uni-app";
export default {
	setup(props, context) {
		console.log('setupsetupsetupsetupsetupsetup~~~')
		const store = useStore();
		const { proxy } = getCurrentInstance();
		const userInfo = ref({})

		const agreement = ref(false);
		const formData = reactive({
                "iv": "",
                "encryptedData": "",
                "wxCode": "",
                "inviteCode": ""  //邀请用户的ID码
            });
			
		const hasUserInfo = ref(false);
		const canIUseGetUserProfile = ref(false);	
			
		const getUserProfile = function() {
		    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认
		    // 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
		    console.log('getUserProfileeeee:')
			if (!agreement.value){
				return proxy.$helper.toast('请阅读并同意《国盈环保用户服务协议》')
			}
			
			wx.getUserProfile({
				desc: '用于获取用户头像、昵称等信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
				success: (gup) => {
					//TODO 后续进行  POST 登录信息操作
					//业务逻辑
					console.log('getUserProfileeeee:successsuccess',gup)
					formData.iv = gup.iv
					formData.encryptedData = gup.encryptedData
					//cloudID: undefined
					// gup.rawData:"{"nickName":"费","gender":0,"language":"zh_CN","city":"","province":"","country":"","avatarUrl":"https://thirdwx.qlogo.cn/mmopen/vi_32/lQIzNexHDBjImS85LEvg7dsvCqyiboYZjonJwZ6ibJBZ9rGaoJlibcDZxW2tjO58l7iab5Ca6HFklNjcUX2upTQZHQ/132"}"
					//gup.signature:"e5c6117840615a111bc2fef9365d7da0f4b410dc"
					//gup.userInfo:{
					// 	avatarUrl: "https://thirdwx.qlogo.cn/mmopen/vi_32/lQIzNexHDBjImS85LEvg7dsvCqyiboYZjonJwZ6ibJBZ9rGaoJlibcDZxW2tjO58l7iab5Ca6HFklNjcUX2upTQZHQ/132"
					// 	city: ""
					// 	country: ""
					// 	gender: 0
					// 	language: "zh_CN"
					// 	nickName: "费"
					// 	province: ""
					// }
				},
				fail:(err) =>{
					proxy.$helper.toast("授权失败，请稍后再试！")
				}
		    })
		  }
			
		const bindGetUserInfo = function(gui){
			console.log('gui:',gui)
			console.log('gui.code', gui.code)
			console.log('$helperthen_1',proxy)
			// gui.encryptedData: "F9vYzcxgt7TUq9yXUB1XXWc9TqsJQ7y1wppNnu76RbPqnWte4cjs3eaaFq7SYGXYTp5y8RLIiVGs++r1gnhlN6u3st7JBzCDQP9Wf4YQRGpSzkgf61amsqfOYs9b2bYDuFwgnZFOYrLVYidNVB0ptzFwZHZT7ZryKyZGRUtYtzhcL3S3OSsH/0mgZXaYtsqT6DVo9XSPYsky92RQZ713N5sEFg1CebY+/Uwm6EZlpK2aUMHyAH+y2aUbOQj2ehD3AJq9iXlSMW/PRL5Ch2pMsXvYLQuyxQI8A/vWxdcg0P71q3t0LUnw/Rrmd+0/7e064iyEtxFMCPT7POApRj8rEwKsml82mi5zb+r+lb5EJIDFLW+SQNA3ojPecBWaj9dDzgjAvKxsZcNgyZZY2Fo+IXRgxg2bXctVHT9xaikuX1PxCUjnUrrha3yitEZsScUp479MaIUl7wDo0+vSF1q7gA=="
			// gui.iv: "CKrSlrXX8cRjQcGemCchBA=="
			// gui.rawData: "{"nickName":"费","gender":0,"language":"zh_CN","city":"","province":"","country":"","avatarUrl":"https://thirdwx.qlogo.cn/mmopen/vi_32/lQIzNexHDBjImS85LEvg7dsvCqyiboYZjonJwZ6ibJBZ9rGaoJlibcDZxW2tjO58l7iab5Ca6HFklNjcUX2upTQZHQ/132"}"
			// gui.signature: "acf1edc6d2faa18d6403f4d60a0f16597873a61c"
			// userInfo:{avatarUrl: "https://thirdwx.qlogo.cn/mmopen/vi_32/lQIzNexHDBjImS85LEvg7dsvCqyiboYZjonJwZ6ibJBZ9rGaoJlibcDZxW2tjO58l7iab5Ca6HFklNjcUX2upTQZHQ/132"
			// city: ""
			// country: ""
			// gender: 0
			// language: "zh_CN"
			// nickName: "费"
			// province: ""}

			console.log('agreement',!agreement.value)
			if (!agreement.value){
				return proxy.$helper.toast('请阅读并同意《国盈环保用户服务协议》')
			}
			
			if (!(gui.detail.iv && gui.detail.encryptedData)){
				console.log('你取消了授权')
				return  proxy.$helper.toast("授权失败，请稍后再试！")
			} 
			if (!gui.detail.userInfo) return
			formData.iv = gui.detail.iv
			formData.encryptedData = gui.detail.encryptedData
			
			//然后才开始发起POST请求调用login方法与服务器交互，服务器与腾讯服务器交互获取用户信息，再将信息交互给前端
			
			proxy.$helper.loading()
			wx.login({
			    provider: "weixin",
			    success: (wres) => {
					console.log('gui2:',wres)
					console.log('gui.code2', wres.code)
					
					
					//这个code是 wx.login参数中才有的，
			        formData.wxCode = wres.code
					//有推荐人的ID就填写。
			        formData.inviteCode = proxy.$helper.getStorage("inviteCode")
					console.log('此时成功formData',formData)
		// 	        proxy.$helper._post(proxy, 'wxlogin', formData, mpResp => {
		
		// 	            proxy.$helper.setStorage('token',mpResp.data.token)
						
		// 					proxy.$helper._post(proxy, 'login', {
		// 						'grant_type': 'password',
		// 						'username': mpResp.data.id,
		// 						'password': this.$md5(mpResp.data.id),
		// 						'scope': 'all',
		// 						'tenantId': this.$store.state.tenantId,
		// 						'headers': {
		// 							'Content-Type': 'application/x-www-form-urlencoded',
		// 						}
		// 					}, null, resp => {
		// 						if (resp.statusCode !== 200)
		// 							return proxy.$helper.toast('登录失败，请重试！')
				
		// 						proxy.$helper.toast('登录成功')
		// 						proxy.$store.commit('updateToken', resp.data.access_token)
		// 						proxy.$helper.setStorage('token', resp.data.access_token)
		// 						proxy.$helper.removeStorage("inviteCode")
		// 						setTimeout(() => {
		// 							let pages = getCurrentPages()
		// 							let beforePage = pages[pages.length - 2]
		// 							beforePage.onLoad()
		// 							proxy.$helper.toBack()
		// 						}, 700)
		// 					})
		// 	        })
			    },
			    complete: () => {
			        proxy.$helper.hideLoading()
			    }
			})
		
			
		}

		const setCanUseGetUserProfile = function(){
			canIUseGetUserProfile.value = true
		}

		onShow(()=>{
			console.log('onShowthis~~~~',this)
			console.log('onShowproxy~~~~',proxy)
			//判断是否存在getUserProfile方法,然后针对不同版本做兼容登录处理
			if (uni.getUserProfile) {
				proxy.setCanUseGetUserProfile()
			}
			console.log('canUseGetUserProfile~~~~',proxy.canUseGetUserProfile)
		
		})

		return {
			agreement,
			proxy,
			bindGetUserInfo,
			hasUserInfo,
			canIUseGetUserProfile,
			getUserProfile,
			setCanUseGetUserProfile
		}
	},
	
};
</script>
​
<style lang="less">
.login {
    min-height: 100vh;
    background-color: #ffffff;
    padding: 0 60rpx;
}
.avatar {
    margin-top: 150rpx;
    width: 180rpx;
    height: 180rpx;
    overflow: hidden;
}
.d-line {
    height: 1px;
    background-color: #DDDDDD;
    margin: 150rpx 20rpx 0 20rpx;
}

.btn-box {
    margin-top: 120rpx;
}


.agreements {
    position: fixed;
    left: 0;
    bottom: 30rpx;
}
</style>
​
