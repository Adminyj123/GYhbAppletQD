<template>
	<!-- vue2组件html模板中必须有一个根标签，vue3中可以没有 -->
 
    <image class="logo" src="/static/logo.png" />
    <view class="text-area">
      <text class="title">{{ title }}</text>
    </view>
	<view class="">
		<text>{{"哈哈哈"}}</text>
	</view>
	<template>
		<view class="text">我是一段文本</view>
	</template>

</template>

<script setup lang="ts">
import { onShow } from "@dcloudio/uni-app";
// 用来写ts代码
import { ref,onMounted } from 'vue'
const title = ref('国盈环保')
const result = global.isLogin();
onMounted(()=>{
	console.log('gahahahahaahahahahonMounted~~~~')
	
})
onShow(()=>{
	console.log('gahahahahaahahahahonShow~~~~')
	// if(!result){
	// 	uni.showModal({
	// 		title:"提醒",
	// 		content:"请先登录",
	// 		success:function(){
	// 			uni.navigateTo({
	// 				url:"/pages/user/login"
	// 			})
	// 		}
	// 	})
	// }
})

</script>

<style lang="">

</style>