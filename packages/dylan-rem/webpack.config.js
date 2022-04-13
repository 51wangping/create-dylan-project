const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: './lib/index.js',
  output: {
    path: path.join(__dirname, './dist'),
    filename: 'index.js',
    library: 'REM',
    globalObject: `(typeof self !== 'undefined' ? self : this)`,
    libraryExport: 'default',
    libraryTarget: 'umd',
  },
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.js/,
        loader: 'babel-loader',
        options: {},
      },
    ],
  },
  plugins: [new CleanWebpackPlugin()],
};
