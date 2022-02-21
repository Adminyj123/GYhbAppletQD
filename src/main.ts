import { createSSRApp } from "vue";
import App from "./App.vue";
import store from "./store";
import Helper from './common/ts/helper'
// Vue3中导入模块， 只支持 ES6 模块
// import utils from "../../../common/util.js";
// Vue3中模块导出, 需手动改为 ES6 导出
// export default { X };


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


export function createApp() {
	const app = createSSRApp(App);
  
  //vue3中的全局属性
  // app.config.globalProperties.$http = ()=>{};
  
	app.config.globalProperties.$helper = Helper;
  
  // vue3中的插件使用（①先导入，②再调用app的use方法传入）
	app.use(store);
	return {
		app,
	};

	
	// 在vue3中是不会直接暴露vue对象给你使用了。所以不能想vue2那样直接在原型上挂载，那么该如何实现公共方法的挂载呢？
	// 下面以$axios方法为例，介绍vue3添加公共方法的三种方式。
	
	
	// 第一种：使用 app.config.globalProperties 添加,
	
	// import { createApp } from'vue'
	// import axios from'axios'
	// const app = createApp({ created() {console.log(this.$axios) }})
	// app.config.globalProperties.$axios = axios
	// app.mount('#root')
	// 在setup中访问:（setup中没有this）
	// import {getCurrentInstance} from'vue'
	// const { proxy } = getCurrentInstance();//获取公用方法proxy.$axios，或者use中方法const {$axios}=proxy.console.log($axios)
	
	
	
	// 第二种：使用 app.mixin 添加
	// import { createApp} from'vue'
	// import axios from'axios'
	// const app = createApp({ created() {console.log(this.$axios) }})
	// app.mixin({methods: {$axios: axios }})
	// app.mount('#root')
	
	
	// 第三种：采用 provide, inject 方法
	
	// 需要注意的是这种方法需要组建 inject 注入进组件才能使用。
	// import { createApp } from'vue'
	// import axios from'axios'
	// const app = createApp({inject: ['$axios'], created() {console.log(this.$axios) }})
	// app.provide('$axios', axios)
	// app.mount('#root')
  
}
