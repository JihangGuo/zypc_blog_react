

/**
 * @file: 项目初始化文件
 * @author: JihangGuo
 * @last Modified time: 2018-02-02 11:28:46
 * @email: guojihang@baidu.com
 */
const process = require('child_process');

// npm源设置
const npmRegistry = 'https://registry.npm.taobao.org';
// 安装的运行依赖模块
const devModules = [
  'babel',
  'babel-core',
  'babel-loader',
  'babel-preset-latest',
  'babel-preset-react',
  'babel-preset-stage-0',
  'css-loader',
  'file-loader',
  'html-webpack-plugin',
  'style-loader','url-loader',
  'webpack',
  'less-loader',
  'less',
  'webpack-dev-server'
];

// 安装的开发依赖模块
const prodModules = [
  'react',
  'react-dom',
  'react-router-dom',
  'axios',
  "antd",
  "moment"
];

// 由于spawn命令参数传递的特殊性 故在数组[0][-1]加入额外参数
let commontProd = prodModules.map((item) => {
  return item;
});
let commontDev = devModules.map((item) => {
  return item;
});
commontProd.push('--save');
commontProd.unshift('i');
commontDev.push('--save-dev');
commontDev.unshift('i');

// 运行线程任务
process.execSync(`npm config set registry ${npmRegistry}`);
console.log("设置npm源为淘宝源成功");

let runShellTwo = process.spawn('npm',commontProd);
runShellTwo.stdout.on('data', (data) => {
  console.log("正在下载依赖模块 : \n" + data);
});
runShellTwo.on('close', (data) => {
  console.log("依赖模块安装成功\n");
});

let runShellThree = process.spawn('npm',commontDev);
runShellThree.stdout.on('data', (data) => {
  console.log("正在下载开发依赖模块 : \n" + data);
});
runShellThree.on('close', (data) => {
  console.log("开发依赖模块安装成功\n项目初始化完成");
});
