'use strict'

var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var vue = require('vue-loader');
var isProduction = function () {
    return process.env.NODE_ENV === 'production';
};

// webpack插件
var plugins = [
    // 提公用js到common.js文件中
    new webpack.optimize.CommonsChunkPlugin('common.js'),
    // 将样式统一发布到style.css中
    new ExtractTextPlugin('style.css', {
        allChunks: true,
        disable: false
    })
    // 使用 ProvidePlugin 加载使用率高的依赖库
    // new webpack.ProvidePlugin({
    //   $: 'jQuery',
    //   Vivus: 'Vivus',
    //   'window.jQuery': 'jQuery'
    // })
];

var entry = ['./app/app.js'];
var cdnPrefix = '';
var buildPath = './dist';
var publishPath = cdnPrefix + buildPath;

// 生产环境js压缩和图片cdn
if (isProduction()) {
    cdnPrefix = '';
    publishPath = cdnPrefix;
    plugins.push(new webpack.optimize.UglifyJsPlugin());
}
// 编译输出路径
module.exports = {
    debug: true,
    entry: entry,
    output: {
        path: path.resolve(__dirname, buildPath),
        publicPath: '/dist/',
        filename: 'build.js',
        chunkFilename: '[id].build.js?[chunkhash]'
    },
    resolveLoader: {
        root: path.join(__dirname, 'node_modules')
    },
    // output: {
    //     path: __dirname + buildPath,
    //     filename: 'build.js',
    //     publicPath: publishPath,
    //     chunkFilename: '[id].build.js?[chunkhash]'
    // },
    module: {
        loaders: [{
            test: /\.vue$/,
            loader: 'vue'
        }, {
            test: /\.styl$/,
            loader: 'style-loader!css-loader!stylus-loader'
        }, {
            test: /\.css$/,
            loader: ExtractTextPlugin.extract(
                'style-loader', 'css-loader?sourceMap!cssnext-loader')
        }, {
            test: /\.js$/,
            exclude: /node_modules|vue\/dist/,
            loader: 'babel'
        }, {
            test: /\.(jpg|png|gif)$/,
            loader: 'file-loader?name=images/[hash].[ext]'
        }, {
        //     test: /\.(jpe?g|png|gif|svg)$/i,
        //     loader: 'file'
        // }, {
            test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            loader: 'url-loader?limit=10000&minetype=application/font-woff'
        }, {
            test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            loader: 'file-loader'
        }, {
            test: /\.json$/,
            loader: 'json'
        }, {
            test: /\.(html|tpl)$/,
            loader: 'html-loader'
        }]
    },
    vue: {
        css: ExtractTextPlugin.extract('css'),
        stylus: ExtractTextPlugin.extract('css!stylus-loader')
    },
    babel: {
        presets: ['es2015', 'stage-0'],
        plugins: ['transform-runtime']
    },
    resolve: {
        // require时省略的扩展名，如：require('module') 不需要module.js
        extension: ['', '.js'],
        // 别名
        alias: {
            filter: path.join(__dirname, 'src/filters')
        }
    },
    plugins: plugins,
    devtool: '#source-map'
};
