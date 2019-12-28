const path = require('path');

module.exports = {
  entry: './src/main.js',//入口文件
  output: {
    filename: 'bundle.js',//出口文件名
    path: path.resolve(__dirname, 'dist')//出口路径
  },
  mode:'development',
};
