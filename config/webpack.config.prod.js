
/**
 * @file: 文件
 * @author: JihangGuo
 * @last Modified time: 2018-02-02 14:05:30
 * @email: guojihang@baidu.com
 */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
module.exports = {
    devtool: 'cheap-module-source-map',
    //打包入口文件
    entry: [__dirname + '/../src/index.js',  __dirname + '/../node_modules/antd/dist/antd.css'],
    //打包出口文件
    output: {
        path: __dirname + '/../build/js/',
        filename: 'bundle.min.js',
    },
    //loader 进行非js文件的转换打包
    module: {
        //loaders加载器 使用外部配置的 .babelrc进行配置
        loaders: [
            {
                test: /\.css$/,
                loaders: ['style-loader', 'css-loader']
            },
            {
                test: /\.less$/,
                loaders: ['style-loader', 'css-loader', 'less-loader']
            },
            {
                test: /\.(png|jpg)$/,
                loader: 'url-loader?limit=40000&outputPath=./img/'
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            }
        ]
    },
    //外置插件
    plugins: [
        new HtmlWebpackPlugin({
            title:'react-app',
            filename: '../index.html',
            template:__dirname + '/../static/template.html',
            inject: 'body',
            hash: true,
            minify: {
                removeComments: true,    //移除HTML中的注释
                collapseWhitespace: false    //删除空白符与换行符
            }
        }),
        new UglifyJsPlugin
    ]
}
