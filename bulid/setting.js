const fs = require('fs')
const path = require('path')
const join = require('path').join
const HtmlWebpackPlugin = require('html-webpack-plugin')
/**
 * @param startPath  起始目录文件夹路径
 * @returns {Array}
 */
function findSync(startPath) {
  let result = []
  let paths = []
  function finder(path) {
      let files=fs.readdirSync(path);
      files.forEach((val,index) => {
          let fPath=join(path,val);
          let stats=fs.statSync(fPath);

          if(stats.isDirectory() && val!=='common') {
            finder(fPath)
          }
          if(stats.isFile()){
            paths.push(fPath)
            result.push(val.split(".")[0])
          }
      });

  }
  finder(startPath)
  console.log(paths)
  console.log(result)
  return {names: result, paths:paths};
}
let filesJs = findSync('./src/js')
let filesHtml = findSync('./src/html')
module.exports = {
  //构建webpack入口
  entryList: () => {
    const entryList = {};
    filesJs.names.map((v, i, arr) => {
     entryList[v] = path.resolve(filesJs.paths[i])
    });
    //entryList.common = ["./src/js/common/1.js","./src/js/common/2.js"]
    return entryList;
  },
  //使用html-webpack-plugin生成多个html页面.=>[home.html,about.html]
  htmlList: () => {
    const pageList = [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, `../src/index.html`),
        filename: `index.html`,
        chunks: ['index'],
        //chunks: v === 'index' ? ['common', v] : [v],
        //压缩配置
        minify: {
          //删除Html注释
          removeComments: true,
          //去除空格
          collapseWhitespace: true,
          //去除属性引号
          removeAttributeQuotes: true
        },
        chunksSortMode: 'dependency'
      })
    ];
    filesHtml.names.map((v, i, arr) => {
      if (v !== 'index') {
        pageList.push(
          new HtmlWebpackPlugin({
            template: path.resolve(filesHtml.paths[i]),
            filename: path.resolve(filesHtml.paths[i]).replace(/src/,'dist'),
            chunks: [v],
            //chunks: v === 'index' ? ['common', v] : [v],
            //压缩配置
            minify: {
              //删除Html注释
              removeComments: true,
              //去除空格
              collapseWhitespace: true,
              //去除属性引号
              removeAttributeQuotes: true
            },
            chunksSortMode: 'dependency'
          })
        );
      }
    });
    return pageList;
  }
};