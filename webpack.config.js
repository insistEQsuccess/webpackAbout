const path= require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
// 提取css文件
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// 压缩css
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
// 压缩 js 配置了： optimization -> minimizer 后，原有的压缩js就被破坏了，需要重新配置
const TerserJSPlugin = require('terser-webpack-plugin');

module.exports = {
    entry: {
        main: './src/main.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
    },
    mode: 'production',
    devServer: {
        host: 'localhost',
        port: 8000,
        open: true
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
                    MiniCssExtractPlugin.loader, 'css-loader',
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
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'less-loader']
            },
            {
                test: /\.(png|jpg|jpeg|gif)$/i,
                use: [
                    {
                        loader: 'url-loader',
                    },
                ],
            }
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
    ]
}
