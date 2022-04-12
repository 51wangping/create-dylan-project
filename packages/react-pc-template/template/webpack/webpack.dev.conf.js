const {
    merge
} = require('webpack-merge');
const {
    baseConfig
} = require('./webpack.base.conf');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin'); // 错误提示



module.exports = merge(baseConfig, {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        host: '127.0.0.1',
        port: 8000,
        hot: true,
        open: true,
    },
    plugins: [
        new FriendlyErrorsWebpackPlugin()
    ]
})