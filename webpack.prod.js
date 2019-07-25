const merge = require('webpack-merge')
const common = require('./webpack.common')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const UglifyJsWebpackPlugin = require('uglifyjs-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
module.exports = merge(common, {
  plugins: [
    // 自动清空dist目录
    new CleanWebpackPlugin(),
    new UglifyJsWebpackPlugin(),
    new CopyWebpackPlugin([
      { from: './src/static', to: 'static' }
    ])
  ],
  optimization: {
    minimizer: [
      // new UglifyJsWebpackPlugin({
      //   cache: true,
      //   sourcMap: true
      // }),
      new OptimizeCSSAssetsPlugin({})
    ],
  },
  // 方便追踪源代码错误
  devtool: 'source-map'
})