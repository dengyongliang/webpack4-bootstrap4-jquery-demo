const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

//引入setting.js 入口配置方法,与html生成配置
const { entryList, htmlList } = require('./bulid/setting.js');

module.exports = {
  entry: entryList(),
  output: {
    // js生成到dist/js，[name]表示保留原js文件名
    filename: 'js/[name].js',
    // 输出路径为dist
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new MiniCssExtractPlugin({
        filename: 'css/[name].css'
    }),
    // 设置html模板生成路径
    ...htmlList()
  ],
  module: {
    rules: [
      // {
      //   test: /\.html$/,
      //   use: [
      //     {
      //       loader: "html-loader",
      //       options: { minimize: true }
      //     }
      //   ]
      // },
      {
        test: /\.(html)$/,
        use: {
          loader: 'html-loader',
          options: {
            attrs: ['img:src', 'img:data-src', 'audio:src'],
            minimize: true
          }
        }
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: [
              '@babel/plugin-transform-runtime',
              '@babel/plugin-transform-modules-commonjs'
            ]
          }
        }
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../'
            }
          },
          'css-loader'
        ]
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          {
            loader: "url-loader",
            options: {
              // publicPath: '../images',
              outputPath: "images", //图片存储的地址
              limit: 0
            }
          }
        ]
      }
    ]
  }
}