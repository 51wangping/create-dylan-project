<h1 center> webpack 5 + Typescript 版 react-mobile 项目 </h1>

## 介绍

 - 使用webpack 5 进行搭建
 - 使用react 17 
 - 使用更好的 Typescript

## 命令

 - dev: 启动webpack-dev-server 启动开发环境
 - build: 使用webpack 进行打包

## 布局

使用 postcss 插件 postcss-pxtorem 自动将 css / less 中单位px转换为rem

```
module.exports = {
    plugins: {
        autoprefixer: require('autoprefixer'),
        'postcss-pxtorem': {
            rootValue: 37.5,      // 设计稿宽度 375
            propList: ['*']
        }
    }
}
```
如果你不满意可以按着你的设计稿进行自定义

src/index.tsx 中引入 dylan-rem 对窗口进行监听，当窗口大小改变会自动进行计算html的fontSize 大小

```
import rem from 'dylan-rem';
// designWidth: 设计稿宽度
// rootValue: 基准值
// maxRatio: 最大比例

rem.init({
  designWidth: 375, 
  rootValue: 100, 
  maxRatio: 2  
});
```
## 接口环境变量

定义开发环境变量

``` bash
# /env/.env.dev

# DEV 环境变量配置

# 环境名
ENV=dev

# 接口域名
API_HOST=https://api.dev.com

# 站点域名
SITE_HOST=https://dev.com

```
定义生产环境

``` bash
# /env/.env.prod

# PROD 环境变量配置

# 环境名
ENV=prod

# 接口域名
API_HOST=https://api.prod.com

# 站点域名
SITE_HOST=https://prod.com
```

定义后可以直接在项目中进行使用

```js
  <div>{process.env.API_HOST}</div>
```

### 更多内容持续更新