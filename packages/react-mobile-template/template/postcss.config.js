module.exports = {
    plugins: {
        autoprefixer: require('autoprefixer'),
        'postcss-pxtorem': {
            rootValue: 37.5,      // 设计稿宽度 375ce
            propList: ['*'],
            unitPrecision: 3,
            exclude: /node_modules/,
            selectorBlackList: ['van-circle__layer'],
            minPixelValue: 2


        }
    }
}