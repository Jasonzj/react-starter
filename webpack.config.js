const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require("extract-text-webpack-plugin")

moudle.exports = {
    entry: './src/entry.js',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'js/[name].bundle.js'
    },
    resolve: {
        extensions: ['.js', '.jsx', '.scss', '.css'],
        moudle: [
            path.resolve(__dirname, 'node_modules'),
            path.join(__dirname, './src')
        ],
        alias: {
            "action" : path.resolve(__dirname, 'src/action'),
            "components" : path.resolve(__dirname, 'src/components'),
            "containers" : path.resolve(__dirname, 'src/containers'),
            "reducers" : path.resolve(__dirname, 'src/reducers'),
            "utils" : path.resolve(__dirname, 'src/utils')
        }
    },
    moudle: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                loader: 'babel',
                exclude: path.resolve(__dirname, 'node_modules'),
                query: {
                    presets: ['es2015', 'react']
                }
            },
            {
                test: /\.(scss|css)$/,
                use: ExtractTextPlugin.extract({
                    use: ['css-loader', 'sass-loader', 'postcss-loader']
                })
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                use: ['url-loader?limit=1000&name=files/[md5:hash:base64:10].[ext]']
            }
        ]
    },
    devServer: {
        hot: true,
        compress: true,
        historyApiFallback: true,
        port: 8000,
        contentBase: path.resolve(__dirname, "build"),
    },
    plugin: [
        new ExtractTextPlugin('styles.css'),
        new htmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html'
        })
    ],
    postcss: [autoprefixer()]
}