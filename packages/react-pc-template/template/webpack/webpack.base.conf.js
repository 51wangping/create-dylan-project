const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 模板
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); // css 代码打包分离
const isDev = process.env.NODE_ENV === 'development';
const WebpackBar = require('webpackbar'); // 显示打包进度条用的
const DotenvWebpack = require('dotenv-webpack');


const resolvePath = (relativePath) => path.resolve(__dirname, relativePath); // 根据相对路径获取绝对路径

const envConfigPath = {
    dev: path.resolve(__dirname, '../env/.env.dev'), // 开发环境配置
    prod: path.resolve(__dirname, '../env/.env.prod'), // 正式环境配置
};
const baseConfig = {
    entry: resolvePath('../src/index.tsx'),
    devtool: 'inline-source-map',
    output: {
        path: resolvePath('../dist'),
        filename: '[name].bundle.js',
    },
    module: {
        rules: [
        {
            test: /\.css$/,
            use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
        },
        {
            test: /\.less$/,
            use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'less-loader'],
        },
        {
            test: /\.(ts|tsx)$/,
            exclude: /node_modules/,
            use: [
            
              'babel-loader',
              {
                loader: 'ts-loader',
              },
            ],
        }, 
        {
            test: /\.svg$/,
            type: 'asset/resource'
        }
      ],
    },
    resolve: {
      extensions: [ '.tsx', '.ts', '.js' ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'react app',
            template: resolvePath('../public/index.html'),
            filename: 'index.html',
        }),
        new MiniCssExtractPlugin({
            filename: `[name].[hash:8].css`
        }),
        new WebpackBar({
          name: isDev ? '正在启动' : '正在打包',
          color: '#fa8c16'
        }),
        new DotenvWebpack({
            path: envConfigPath[process.env.CURRENT_ENV],
        }),
    ],
}

module.exports = {
    resolvePath: resolvePath,
    baseConfig: baseConfig,
}