# create-dylan-project  [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-green.svg)](https://github.com/51wangping/create-dylan-project/pulls)

<img alt="Logo" align="right" src="https://create-react-app.dev/img/logo.svg" width="20%" />

通过脚本创建 React 项目 无需任何配置

- [创建应用程序](#creating-an-app) – 如何创建一个新的程序.
- [用户指南](https://github.com/51wangping/create-dylan-project)) –如何开发通过Create React应用程序引导的应用程序

create-dylan-project 可以运行在 Windows、macOS、Linux上 .<br>
如果有些东西不起作用 <br>
如果你有问题，可以随时询问 [GitHub Issues](https://github.com/51wangping/create-dylan-project/issues).

## 快速上手

```sh
npx create-dylan-project init my-app
# 根据问题回答选择你的项目模板
cd my-app
npm start
```

如果你已经安装过 `create-dylan-project` 并且全局安装了 `npm install -g create-dylan-project`, 建议你先进行卸载 `npm uninstall -g create-react-app` or `yarn global remove create-react-app` 确保你使用 npx 安装最新版本

_([npx](https://medium.com/@maybekatz/introducing-npx-an-npm-package-runner-55f7d4bd282b) 附带npm 5.2+及更高版本，请参阅[旧版npm的说明](https://gist.github.com/gaearon/4064d3c23a77c74a3614c498a8bb1c5f))_

然后打开 [http://localhost:3000/](http://localhost:3000/) 查看你的应用程序.<br>
如果你项目部署生产环境时，可以使用
`npm run build`.

## 创建应用程序

**您需要在本地开发机器上安装Node 14.0.0或更高版本** 
我们建议使用最新的LTS版本。你可以用 [nvm](https://github.com/creationix/nvm#installation) (macOS/Linux) or [nvm-windows](https://github.com/coreybutler/nvm-windows#node-version-manager-nvm-for-windows) 在不同项目之间切换节点版本。

要创建新应用，您可以选择以下方法之一：

### npx

```sh
npx create-dylan-project init my-app
```

_([npx](https://medium.com/@maybekatz/introducing-npx-an-npm-package-runner-55f7d4bd282b) 是npm 5.2+及更高版本附带的软件包运行工具，请参阅 [instructions for older npm versions](https://gist.github.com/gaearon/4064d3c23a77c74a3614c498a8bb1c5f))_

### npm / yarn 

或者使用 npm / yarn  全局安装 create-dylan-project

```sh
#npm

npm install -g create-dylan-project

#yarn 

yarn add --global create-dylan-project

# 使用全局命令进行创建项目

create-dylan-project init my-app

```

它将在当前文件夹中创建一个名为“我的应用”的目录

```
my-app
├── README.md
├── node_modules
├── package.json
├── .gitignore
├── public
│   ├── favicon.ico
│   ├── index.html
│   └── manifest.json
└── src
    ├── App.css
    ├── App.js
    ├── App.test.js
    ├── index.css
    ├── index.js
    ├── logo.svg
    └── serviceWorker.js
    └── setupTests.js
```

No configuration or complicated folder structures, only the files you need to build your app.<br>

安装完成后，您可以打开项目文件夹:

```sh
cd my-app
```

在新创建的项目中，可以运行一些内置命令:

### `npm start` or `yarn start`

以开发模式运行应用程序<br>
打开 [http://localhost:3000](http://localhost:3000) to view it in the browser.

如何你更改代码项目将重新加载.<br>
你可以在控制台看到构建错误和eslint警告
