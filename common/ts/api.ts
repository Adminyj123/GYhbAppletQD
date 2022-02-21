const BASE_URL:string = 'http://106.55.35.151:8081/api/v1/';
// const BASE_URL = 'http://127.0.0.1:8081/api/v1/';

const API:string = '';
export const ACTIONS:unknown = {
	
	// "login.token":"blade-auth/oauth/token",//获取鉴权
	"login":"pri/user/login",//账号登录
	"register":"pri/user/register",//账号注册【loginDTO】

	
};

export function getApiUrl(key:unknown = null) { 
    return key ? BASE_URL + API + ACTIONS[key] : '';
}

export function getHost(uri:string) {
    return BASE_URL + uri;
}
