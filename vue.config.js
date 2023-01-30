const path = require('path');
// const WasmPackPlugin = require("@wasm-tool/wasm-pack-plugin");
function resolve (dir) {
	return path.join(__dirname, dir);
}

module.exports = {
	transpileDependencies: true,
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
