const path = require('path');
// const WasmPackPlugin = require("@wasm-tool/wasm-pack-plugin");
function resolve (dir) {
	return path.join(__dirname, dir);
}

module.exports = {
	transpileDependencies: true,
	devServer: {
		/* client: {
			errors: false,
			warnings: false
		} */
		port: 9000,
		client: {
			overlay: false // 不在页面上展示 错误提示浮层
			// 或者下面这样详细的配置
			/* overlay: {
				errors: true,
				warnings: false,
			} */
		}
	},
	configureWebpack: {
		resolve: {
			alias: {
				'@': resolve('src'),
				'#': resolve('/')
			}
		},
		plugins: [
			/* new WasmPackPlugin({
				crateDirectory: path.resolve(__dirname, "./hello-wasm/pkg")
			}) */
		],
		experiments: {
			asyncWebAssembly: true
		}
	},
};
