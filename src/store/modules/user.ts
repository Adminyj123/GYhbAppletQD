export default {
	//数据存放在state中，在vue文件中获取数据使用：$store.state.模块名.属性名
	namespaced:true,//namespaced 就是命名空间的意思，后续的要操作该模块中的所有数据，都需要加上命名空间:'模块名/方法'
	state: {
		token:null,
		expires:0,
		hasLogin: false,
		userInfo: {
			wallet: {},
			id:'123123'
		},
		location: {
			latitude: "24.833155",
			longitude: "102.857014",
		},
		systemInfo:null,
		service: null
	},
	//geters相当于是计算属性，用来计算上面state中的数据的。
	getters: {
		//通过在getter中将当前显示的单词对象返回
		// noUploadWordList: state =>{
		// 	return state.uploadWordList.length > 0 ?  state.uploadWordList.filter( item => item.remeberState!==0 && item.upload === false) :[]
		// }
	},
	//mutation 里面只允许写同步代码，不允许写异步代码！！！
	// 使用commit方法进行同步操作vuex中的数据：this.$store.commit('mutations中定义的方法名',新值) ；如果使用模块的话，方法名需要添加上模块名，比如this.$store.commit('user/updateToken',新值)这种形式
	mutations: {
		updateToken: function(state, paylod:string){
			state.token = token;
		},
		updateExpires: function(state, paylod){
			state.expires = paylod;
		},
		login(state, payload) {
			state.hasLogin = true;
			state.userInfo = payload;
			uni.setStorage({
				key: 'userInfo',  
				data: payload  
			}) 
			console.log("缓存用户登陆状态:",state.userInfo);
		},
		logout(state) {
			state.hasLogin = false;
			state.userInfo = {};
			state.token = null;
			uni.removeStorage({  
				key: 'userInfo'  
			})
		},
		updateUser: function(state, paylod) {
			state.userInfo = paylod;
		},
		updateLocation: function(state, payload){
			state.location = payload;
		},
		updateSystemInfo: function(state, payload) {
			state.systemInfo = payload;
		},
		updateService: function(state, payload){
			state.service = payload;
		},

	},
	//这里面是调用上面mutations里面的方法。actions里面一般放的是异步的方法 ，使用dispatch：含有异步操作：this.$store.dispatch(‘action方法名’,值)
	actions: {
	    // refreshToken({commit}, token) {
	    //     return new Promise((resolve, reject) => {
	    //         helper._post(this, 'login', {}, (async resp => {
					// uni.hideToast()
	    //             await commit('login', resp.data)
	    //             resolve(resp)
	    //         }), error => {
	    //             commit('logout')
	    //             reject(error)
	    //         }, {
	    //             'GrantType': 'RefreshToken',
	    //             'RefreshToken': token
	    //         })
	    //     })
	    // },
		// // 增加地址
		// createPathAction({commit},item){
		// 	if (item.isdefault) {
		// 		commit('removeDefault');
		// 	}
		// 	commit('createPath',item)
		// }
	},

}