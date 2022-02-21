import { defineConfig } from "vite";
import uni from "@dcloudio/vite-plugin-uni";
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
	resolve: {
		alias: {
		  // 如果 __dirname 找不到 需要 yarn add @types/node --save-dev
		  '@': path.resolve(__dirname, 'src')  // 别名
		}
	},
	plugins: [uni()],
	// css: {
	//     // css预处理器
	//     preprocessorOptions: {
	//       scss: {
	//         // 引入 var.scss 这样就可以在全局中使用 var.scss中预定义的变量了
	//         // 给导入的路径最后加上 ; 
	//         additionalData: '@import "./src/assets/scss/var.scss";'
	//       }
	//     }
	//   }
});
