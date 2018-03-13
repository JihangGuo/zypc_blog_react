
/**
 * @file: 文件
 * @author: JihangGuo
 * @last Modified time: 2018-02-02 13:19:37
 * @email: guojihang@baidu.com
 */
const process = require('child_process');
let watchDev = process.spawn('webpack-dev-server', ['--config', './config/webpack.config.dev.js', '--inline']);
watchDev.stdout.on('data', (data) => {
    console.log('开发模式 : \n' + data);
});
watchDev.stderr.on('data', (data) => {
    console.log('开发模式 : \n' + data);
});
watchDev.on('close', (data) => {
    console.log('关闭开发模式 : \n');
});
