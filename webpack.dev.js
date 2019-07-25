const merge = require('webpack-merge')
const common = require('./webpack.common')
module.exports = merge(common, {
  devServer: {
    contentBase: './src',
    port: 8080,
    hot: true
  }
})