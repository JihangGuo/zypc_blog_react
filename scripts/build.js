
/**
 * @file: 文件
 * @author: JihangGuo
 * @last Modified time: 2018-02-02 13:19:37
 * @email: guojihang@baidu.com
 */
const process = require('child_process');
let watchProd = process.spawn('webpack', ['--config', './config/webpack.config.prod.js', '--watch']);
watchProd.stdout.on('data', (data) => {
    console.log('打包监听 : \n' + data);
});
watchProd.on('close', (data) => {
    console.log('关闭打包模式 : \n');
});
