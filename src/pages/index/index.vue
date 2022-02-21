<template>
	<!-- vue2组件html模板中必须有一个根标签，vue3中可以没有 -->

	<image class="logo" src="/static/logo.png" />
	<view class="text-area">
		<text class="title"></text>
	</view>
	<view class="">
		<text>{{"哈哈!!~~~"}}</text>
	</view>
	<template class="flex justify-center  items-center">
		<view class="text">用户vuex中信息:{{userInfo}}</view>
	</template>
	
	

</template>

<script lang="ts">
	// 用来写ts代码
	import {
		ref,
		reactive,getCurrentInstance,onMounted
	} from 'vue';
	import {useStore} from 'vuex';

	export default {
		name: 'Index',
		components: {},
		setup(props, context) {

			// props是父组件中在props:["msg"]中传入的参数，在可以在子组件中的setup中通过第一个参数获取到所有父组件中传递的值   。props.msg  即可拿到父组件中传输的值
			//setup中的第二个参数为context ，这个参数是一个对象，可以通过解构将当中的三个对象都解构出来{ attrs, slots, emit }，这里面暴露的三个都是组件的参数，都是非响应式的。
			// attrs：它是绑定到组件中的 非 props 数据，并且是非 响应式的。
			// emit： 与vue2中的this.$emit()方法使用一样 context.emit(“funName”,"arguments");可用组件间调用方法传值
			// slots： 是组件的插槽，同样也不是 响应式的


			//setup执行的生命周期是，在beforeCreate之前执⾏的（执⾏⼀次），此组件对象还没有创建,即this还没有数据，当中的data\computed\methods\props都是访问不到的。此时如果想要使用组件，就只能使用getCurrentInstance()函数来返回当前组件的实例对象
			const {proxy} = getCurrentInstance();
			
			//获取vuex中的数据,记得获取到的数据需要return才能使用
			const store = useStore();
			const userInfo = store.state.user.userInfo
			
			
			// 利⽤provide/inject实现跨层组件的信息通信（祖孙间跨国父级组件直接通信 ）	
			// provide("key","value");//在setup中通过键值对的形式跨组件传值，需要在vue中引入
			// inject("key");//在孙级组件中通过inject("键名")的方式获取到provide中传入的值。

			const title = ref('国盈环保') //返回的是⼀个响应式且可变的ref对象
			const obj = reactive({
				name: '小滴',
				courses: ['javas', 'ssm', 'springboot'],
				gender: '男'
			});


			//界面渲染完成的生命周期
			onMounted(() => {
				obj.name = '大当家'
				console.log('obj===>', obj)
				console.log('jiazaiwancheng===>', title.value) //通过 title.value⽅法返回的这个ref对象中的值
				console.log('获取getCurrentInstance（）， this=======>',proxy)
				console.log('this===>', this)
				// console.log('global.isLogin',global.isLogin)
				// proxy.$helper.toast("tishichenggong")
			})
			// setup的返回值:
			// ⼀般都返回⼀个对象：为模版提供数据，也就是模版中可以直接使⽤此对象中的所欲属性⽅法
			// 返回对象中属性会与data函数返回对象的属性合并为组件对象的属性
			// 返回对象中的⽅法会与methods中的⽅法合并成功组件对象的⽅法
			return {
				obj,
				title, //在模版中使⽤,直接使⽤title即可，
				userInfo
			}
		}

	}
</script>

<style lang="">

</style>
