# wasm-vue

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

# WebAssembly 集成

> 需要先安装： `wasm-pack  rsw `

```
### 安装 wasm-pack
# macOS
curl https://rustwasm.github.io/wasm-pack/installer/init.sh -sSf | sh
# 其他安装方式
# https://rustwasm.github.io/wasm-pack/installer


# 安装 rsw 在 Rust 环境下安装到全局
cargo install rsw
```

## 1、新建包
```
cargo new --lib hello-wasm
```
## 2、Rust 的相关依赖
在 `Cargo.toml`中的`[dependencies]`下配置，配置完成以后 vscode 会自动拉取依赖包

## 3、将Rust包转换成wasm

```
cd hello-wasm
wasm-pack build --scope wasm-vue
```
1. 将你的 Rust 代码编译成 WebAssembly。
2. 在编译好的 WebAssembly 代码基础上运行 wasm-bindgen，生成一个 JavaScript 文件将 WebAssembly 文件包装成一个模块以便 npm 能够识别它。
3. 创建一个 pkg 文件夹并将 JavaScript 文件和生成的 WebAssembly 代码移到其中。
4. 读取你的 Cargo.toml 并生成相应的 package.json。
5. 复制你的 README.md (如果有的话) 到文件夹中。

## 4、配置`webpack`
```
const path = require('path');
const WasmPackPlugin = require("@wasm-tool/wasm-pack-plugin");
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
			new WasmPackPlugin({
				crateDirectory: path.resolve(__dirname, ".")
			})
		],
		experiments: {
			asyncWebAssembly: true
		}
	},
};

```