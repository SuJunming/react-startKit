> ## react 脚手架(半成品-持续维护)
**这是一个非常不错的脚手架,支持目前非常主流的一些特性**

> ## 技术栈
>
> `webpack4 + react + react-router-dom + react-redux + rematch + antd-moblie + less + typescript + axios + autoprefixer + 按需加载 + 报错处理 + loading + lazy + precommit + tslint`
>
> ## 安装

**Step 1.** 确保你的机器全局安装 `Node.js`, `yarn`

**Step 2.** 克隆这个库来启动你的项目

```
yarn
yarn start
```

**Step 3.** 本地地址 `http://localhost:8888`

### 本地开发模块

```
yarn start
```

## 建议

- [VSCode](https://code.visualstudio.com/)
- VSCode 扩展: [EditorConfig](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig), [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode), [TSLint](https://marketplace.visualstudio.com/items?itemName=eg2.tslint)
- Chrome 扩展工具: `Redux DevTools` & `React Developer Tools`

## 文档
## hack 处理

由于一些外部因素前端代码中需要用硬代码或者非常规处理方式时需要在相应代码中添加注释 `// APOLLOHACK`

以便于之后全局查找替换

> ## 特性

### 1. 采用 rematch 和自己的二次封装使每一个模块都是单独一个组件去维护. 完善的状态管理机制

```javascript
import { request, Api } from '../api'
export const demo = {
  state: {
    data: 0,
  },
  reducers: {
    getData(state, payload) {
      return { data: state.data + 1 }
    },
  },
  effects: dispatch => ({
    getByAsync: async params => {
      const data = request.post(Api.test)
      dispatch.demo.getData(data)
    },
  }),
}
```

### 2.加入了自动劫持代码报错抛出等界面.使其应用更健硕.开发人员一眼就知道哪里错了.同时用户体验度很高.

```javascript
import { connect } from 'react-redux'
import * as React from 'react'
const MyFallbackComponent = props => <pre>{props.error.message}</pre>
const connectRedux = (key: string, component: any) => {
  const mapState = (state: any) => ({
    data: state[key],
  })
  const mapDispatch = data => ({ ...data[key] })
  return connect(
    mapState,
    mapDispatch,
  )(component)
}
export const mConnect = (key: string, Component: any) => {
  class WithErrorHandler extends React.Component<any, any> {
    constructor(props) {
      super(props)
      this.state = {
        hasError: false,
        error: null,
        errorInfo: null,
      }
    }
    componentDidCatch(error, info) {
      this.setState({ hasError: true, error, errorInfo: info })
    }
    render() {
      if (this.state.hasError) {
        const { error, errorInfo } = this.state
        return <MyFallbackComponent {...this.props} error={error} errorInfo={errorInfo} />
      }
      return <Component {...this.props} />
    }
  }
  return connectRedux(key, WithErrorHandler)
}
```

### 3.利用了 webpakc 实现了 404.loading 动画.以及 React 的新特性 lazy 实现按需加载用到那个模块加载那个模块.提高速度

```javascript
import * as React from 'react'
import { Route, Switch } from 'react-router-dom'
const lazy = React.lazy
const Suspense = React.Suspense
const Status = ({ code, children }: any) => (
  <Route
    render={({ staticContext }: any) => {
      if (staticContext) {
        staticContext.status = code
      }
      return children
    }}
  />
)
const NotFound = (): any => (
  <Status code={404}>
    <div>
      <h1>抱歉，页面消失了</h1>
    </div>
  </Status>
)
export default class Router extends React.PureComponent {
  render() {
    return (
      <Suspense fallback="loading...">
        <Switch>
          <Route exact path="/" render={() => 'start'} />
          <Route path="/test" component={lazy(() => import('./Demo'))} />
          <Route component={NotFound} />
        </Switch>
      </Suspense>
    )
  }
}
```

### 4.采用 typescript 加强规范和类型.提升代码的质量.实现借助 vscode 保存后自动格式化代码.提升代码可读.后期可加入 lint 和 precommit. 实现提交前自动校验代码

```javascript
{
  "tslint.autoFixOnSave": true,
  "tslint.configFile": "../ts-react.json",
  "editor.formatOnSave": true,
  "prettier.semi": false,
  "prettier.trailingComma": "all",
  "prettier.singleQuote": true,
  "prettier.printWidth": 120
}

```

### 5.引入 antd-mobile 同时主题色修改为橙色主题色.减少更多的组件时间,同时适应于按需加载

```javascript
{
        test: /.less$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'less-loader',
            options: {
              modifyVars: {
                '@brand-primary': '#FF9000',
                '@color-text-base': '#FF9000',
                '@primary-button-fill': '#FF9000',
                '@primary-button-fill-tap': '#FF9000',
              },
              javascriptEnabled: true,
            },
          },
        ],
      },
```

### 6.加入代码分割以及按需加载文件分成多个小 js.同时压缩以及缓存.提升加载速度.

```javascript
Version: webpack 4.28.2
Time: 1733ms
Built at: 2018-12-27 16:42:44
       Asset        Size  Chunks             Chunk Names
./index.html  1000 bytes          [emitted]
        0.js     360 KiB       0  [emitted]
        1.js    15.1 KiB       1  [emitted]
        2.js    6.12 KiB       2  [emitted]
     main.js     630 KiB    main  [emitted]  main
   vendor.js     971 KiB  vendor  [emitted]  vendor
Entrypoint main = vendor.js main.js
[./node_modules/axios/lib/adapters/xhr.js] 6.03 KiB {main} [built]
[./node_modules/axios/lib/axios.js] 1.34 KiB {main} [built]
[./node_modules/axios/lib/cancel/Cancel.js] 385 bytes {main} [built]
[./node_modules/axios/lib/cancel/CancelToken.js] 1.21 KiB {main} [built]
[./node_modules/axios/lib/cancel/isCancel.js] 102 bytes {main} [built]
[./node_modules/axios/lib/core/Axios.js] 2.14 KiB {main} [built]
[./node_modules/axios/lib/core/InterceptorManager.js] 1.22 KiB {main} [built]
[./node_modules/axios/lib/core/dispatchRequest.js] 2.15 KiB {main} [built]
[./node_modules/axios/lib/defaults.js] 2.38 KiB {main} [built]
[./node_modules/axios/lib/helpers/bind.js] 256 bytes {main} [built]
[./node_modules/axios/lib/helpers/normalizeHeaderName.js] 357 bytes {main} [built]
[./node_modules/axios/lib/helpers/spread.js] 564 bytes {main} [built]
[./node_modules/axios/lib/utils.js] 7.36 KiB {main} [built]
[./src/models/demo.ts] 1.64 KiB {main} [built]
[./src/models/index.ts] 47 bytes {main} [built]
    + 310 hidden modules
Child html-webpack-plugin for "index.html":
     1 asset
    Entrypoint undefined = ./index.html
       4 modules
ℹ ｢wdm｣: Compiled successfully.
```

### 7.样式文件加入自动添加前缀功能设配各种机型.减少兼容性问题.

```javascript
use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: [
                require('autoprefixer')({
                  browsers: [
                    'iOS >= 7',
                    'Android >= 4.1',
                    'last 10 Chrome versions',
                    'last 10 Firefox versions',
                    'Safari >= 6',
                    'ie > 8',
                  ],
                }),
              ],
            },
          },
        ],
```

### 8.采用 es7 async await 异步方式处理. 更加的自由控制异步.利用同步方式控制更便捷

```javascript
effects: dispatch => ({
    getByAsync: async params => {
      const data = request.post(Api.test)
      dispatch.demo.getData(data)
    },
  }),
```
