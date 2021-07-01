const path= require('path');
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
// 提取css文件
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// 压缩css
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
// 压缩 js 配置了： optimization -> minimizer 后，原有的压缩js就被破坏了，需要重新配置
const TerserJSPlugin = require('terser-webpack-plugin');
// 不需要打包的文件，直接拷贝到目标文件夹里
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
    entry: {
        main: './src/main.js',
        index: './src/index.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[chunkhash:8].js',
    },
    mode: 'production',
    devtool: 'eval-cheap-module-source-map',
    devServer: {
        host: 'localhost',
        port: 8000
    },
    optimization: {
        minimizer: [
            new TerserJSPlugin({}),
            new OptimizeCSSAssetsPlugin({})
        ]
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                // use: ['style-loader', 'css-loader', 'postcss-loader']
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: '../'
                        }
                    },
                    'css-loader',
                    // css属性加前缀
                    /*
                        1. 建一个 postcss.config.js
                        2. 在 package.json 加上
                            "browserslist": [
                                "last 2 versions",
                                "> 1%"
                              ]
                     */
                    'postcss-loader'
                ]
            },
            {
                test: /\.less$/,
                // use: ['style-loader', 'css-loader', 'postcss-loader', 'less-loader']
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: '../'
                        }
                    }, 'css-loader', 'postcss-loader', 'less-loader']
            },
            {test: /\.(svg|ttf)/i, use: ['url-loader']},
            {
                test: /\.(png|jpg|jpeg|gif)$/i,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10,
                            name: './images/[name].[hash:8].[ext]'
                        }
                    },
                ],
            },
            {
                /*
                babel-loader 会使用 babel-core 的 API并按照 preset-env 的转换规则，把js转换为 es5等
                */
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env','@babel/preset-react'],
                        plugins: [
                            '@babel/plugin-transform-runtime',
                        ]
                    }
                }
            },
            // {
            //     test: require.resolve("jquery"),
            //     loader: "expose-loader",
            //     options: "$",
            // },
            // {
            //     test: /\.html$/i,
            //     loader: 'html-loader',
            //     options:{
            //         esModule:false,
            //     }
            // }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './public/index.html')
        }),
        new MiniCssExtractPlugin({
            filename: './css/[name].css'
        }),
        new webpack.BannerPlugin({
            banner: '我是一段注释'
        }),
        new CopyPlugin({
            patterns: [
                { from: "static", to: "static" }
            ],
        }),
        // 第三方库的引入方式，给每个模块注入 $ 对象
        // new webpack.ProvidePlugin({
        //     $:'jquery'
        // })
    ]
}
