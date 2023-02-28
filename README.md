# wasm-vue
> vue + Rust WebAssembly 实践

## Project setup
```
yarn install
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

## ~~3、将Rust包转换成wasm -- 这一不要了，因为集成了 rsw~~

```
cd hello-wasm
wasm-pack build --scope wasm-vue
```
1. 将你的 Rust 代码编译成 WebAssembly。
2. 在编译好的 WebAssembly 代码基础上运行 wasm-bindgen，生成一个 JavaScript 文件将 WebAssembly 文件包装成一个模块以便 npm 能够识别它。
3. 创建一个 pkg 文件夹并将 JavaScript 文件和生成的 WebAssembly 代码移到其中。
4. 读取你的 Cargo.toml 并生成相应的 package.json。
5. 复制你的 README.md (如果有的话) 到文件夹中。

## 3、配置`rsw`
根目录下 新建 `rsw.toml`文件
```
name = "rsw"
version = "0.1.0"

#! time interval for file changes to trigger wasm-pack build, default `50` milliseconds
interval = 50

#! link
#! npm link @see https://docs.npmjs.com/cli/v8/commands/npm-link
#! yarn link @see https://classic.yarnpkg.com/en/docs/cli/link
#! pnpm link @see https://pnpm.io/cli/link
#! The link command will only be executed if `[[crates]] link = true`
#! cli: `npm` | `yarn` | `pnpm`, default is `npm`
cli = "npm"

#! ---------------------------

#! rsw new <name>
[new]
#! @see https://rustwasm.github.io/docs/wasm-pack/commands/new.html
#! using: `wasm-pack` | `rsw` | `user`, default is `wasm-pack`
#! 1. wasm-pack: `rsw new <name> --template <template> --mode <normal|noinstall|force>`
#! 2. rsw: `rsw new <name>`, built-in templates
#! 3. user: `rsw new <name>`, if `dir` is not configured, use `wasm-pack new <name>` to initialize the project
using = "wasm-pack"
#! this field needs to be configured when `using = "user"`
#! `using = "wasm-pack"` or `using = "rsw"`, this field will be ignored
#! copy all files in this directory
dir = "my-template"

#! ################# NPM Package #################

#! When there is only `name`, other fields will use the default configuration
#! -------- package: rsw-hello --------
[[crates]]
#! npm package name
name = "hello-wasm"
#! run `npm link`: `true` | `false`, default is `false`
link = false

#! =======================================================

#! -------- package: @rsw/hello --------
#! run `npm link`: `true` | `false`, default is `false`

```

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
## 5、启动项目
```
yarn serve
```

# 疑问：❓
webpack 的依赖包，如果配置上这个，会在rust 代码热部署时产生异常，会导致 hello-wasm/pkg/package.json 中的 files 和 modules 与项目启动时的不一致，不知道怎么解决
// "@wasm-tool/wasm-pack-plugin": "1.0.1",