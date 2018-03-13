
/**
 * @file: 文件
 * @author: JihangGuo
 * @last Modified time: 2018-02-02 13:28:35
 * @email: guojihang@baidu.com
 */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    devtool: 'cheap-module-eval-source-map',
    // 打包入口文件
    entry: ['webpack-dev-server/client?http://localhost:8080/', __dirname + '/../src/index.js', __dirname + '/../node_modules/antd/dist/antd.css'],
    // 打包出口文件
    output: {
        path: __dirname + '/../src/',
        filename: 'bundle.js'
    },
    // loader 进行非js文件的转换打包
    // loader进行非js文件的转换打包
    module: {
        // loaders加载器使用外部配置的.babelrc进行配置
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
    // 外置插件
    plugins: [
        new webpack.HotModuleReplacementPlugin(),// 热模块替换插件
        new HtmlWebpackPlugin({
            filename: __dirname + '/../src/index.html',
            template: __dirname + '/../static/template.html',
            inject: 'body',
            hash: true,
            minify: {
                removeComments: true,
                collapseWhitespace: false
            }
        })
    ],
    // webpack-dev-server配置
    devServer: {
        contentBase: __dirname + '/../src/', // 只能精确到根文件夹 默认文件为index.html
        historyApiFallback: true,// 在开发单页应用时非常有用，它依赖于HTML5 history API，如果设置为true，所有的跳转将指向index.html
        inline: true,// 设置为true，当源文件改变时会自动刷新页面
        port: 8080,// 设置默认监听端口，如果省略，默认为"8080"
        open:true
    }
}
