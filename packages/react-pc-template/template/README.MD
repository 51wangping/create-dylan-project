<h1 center> webpack 5 + Typescript 版 react 项目 </h1>

## 介绍

 - 使用webpack 5 进行搭建
 - 使用react 17 
 - 使用更好的 Typescript

## 命令

 - dev: 启动webpack-dev-server 启动开发环境
 - build: 使用webpack 进行打包

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