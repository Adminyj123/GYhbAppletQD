//vue3中使用vuex与 vue2中的方法是有区别的！！！
import { createStore } from "vuex"


import user from "./modules/user.ts"
import carts from "./modules/carts.ts"


export default createStore({
	// 如果将store分成一个个的模块的话，则需要用到modules。
	//然后在每一个module中写state, getters, mutations, actions等。
	// 在 app.vue 中通过computed属性获取到login下的state.  这里要注意，在没有modules 的情况下，组件中通过  this.$store.state.属性名  可以获取到，但是有modules 之后，state 被限制到login 的命名空间（模块）下，所以属性名前面必须加模块名（命名空间），组件中通过 this.$store.state.模块名.属性名，在这里是 this.$store.state.login.userName
	
	modules:{	
		user, //等价于user:user
		carts
	},
	//数据存放在state中   ,使用：this.$store.state.carts.currentWordList
	// state: {
	// 	token: null,
	// 	expires:null,//好像暂时没用到，只有token
	// 	user: {
	// 		id:1427143297014349826,
	// 		// userId: null,
	// 		// userMobile: null,
	// 		// userAvatar: null,
	// 	},
	// 	currentWordList:[],
	// 	currentWordIndex:0,
	// 	lastWord:[], //存放上一个或上几个单词，暂时先没考虑好怎么用
	// 	// currentWord:{}
	// 	// systemInfo: null,
	// 	// expire: 0
	// },
	// //geters相当于是计算属性，用来计算上面state中的数据的。
	// getters: {
	// 	//通过在getter中将当前显示的单词对象返回   ， 使用:this.$store.getters['carts/currentWord']
	//     currentWord: (state) => { 
	//         return state.currentWordList.length > 0 ? state.currentWordList[state.currentWordIndex] : {}
	//     }
	// },
	// //mutation 里面只允许写同步代码，不允许写异步代码   ,使用commit：同步操作：  this.$store.commit(‘mutations方法名’,值)
	// mutations: {
	// 	updateToken: function(state, token){
	// 		state.token = token;
	// 	},
	// 	updateExpire: function(state, expires){
	// 		state.expires = expires;
	// 	},
	// 	updateUser: function(state, user) {
	// 		state.user = user;
	// 	},
	// 	logout: function(state){
	// 		state.token = null;
	// 	},
	// 	updateCurrentWordList: function (state, newData) {   //修改当前单词列表
	// 	    state.currentWordList = newData;
	// 	},
	// 	updateCurrentWordIndex: function (state, newData) {   //修改当前班级对应的列表
	// 	    state.currentWordIndex = newData;
	// 	},
	// },
	// //这里面是调用上面mutations里面的方法。actions里面一般放的是异步的方法  ， 使用dispatch：含有异步操作：this.$store.dispatch(‘action方法名’,值)
	// actions: {
	//     // refreshToken({commit}, token) {
	//     //     return new Promise((resolve, reject) => {
	//     //         helper._post(this, 'login', {}, (async resp => {
	// 				// uni.hideToast()
	//     //             await commit('login', resp.data)
	//     //             resolve(resp)
	//     //         }), error => {
	//     //             commit('logout')
	//     //             reject(error)
	//     //         }, {
	//     //             'GrantType': 'RefreshToken',
	//     //             'RefreshToken': token
	//     //         })
	//     //     })
	//     // },
	// },

})