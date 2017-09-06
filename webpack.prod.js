const pkg = require('./package.json')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const webpack = require('webpack')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const autoprefixer = require('autoprefixer')

module.exports = {
    entry: {
        app: './src/entry.js',
        vendor: Object.keys(pkg.dependencies)
    },
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'js/[name]-[chunkhash:8].js',
        chunkFilename: 'js/[name]-[chunkhash:8].js'
    },
    resolve: {
        extensions: ['.js', '.jsx', '.scss'],
        modules: [
            path.resolve(__dirname, 'node_modules'),
            path.join(__dirname, './src')
        ],
        alias: {
            action: path.resolve(__dirname, 'src/action'),
            components: path.resolve(__dirname, 'src/components'),
            containers: path.resolve(__dirname, 'src/containers'),
            reducers: path.resolve(__dirname, 'src/reducers'),
            utils: path.resolve(__dirname, 'src/utils'),
            public: path.resolve(__dirname, './public'),
            mock: path.resolve(__dirname, './mock')
        }
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                loader: 'babel-loader',
                exclude: path.resolve(__dirname, 'node_modules')
            },
            {
                test: /\.scss$/,
                exclude: path.resolve(__dirname, 'node_modules'),
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        'css-loader',
                        {
                            loader: 'postcss-loader',
                            options: {
                                plugins: (loader) => [
                                    autoprefixer({ browsers: ['last 5 versions'] })
                                ]
                            }
                        },
                        'sass-loader'
                    ]
                })
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                exclude: path.resolve(__dirname, 'node_modules'),
                use: ['url-loader?limit=1000&name=files/[md5:hash:base64:10].[ext]']
            }
        ]
    },
    plugins: [
        // 插入头
        new webpack.BannerPlugin('Copyright by jason925645402@gamil.com'),

        // css分割
        new ExtractTextPlugin('css/style-[chunkhash:8].css'),

        // html模板
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html',
            inject: true,
            minify: {
                removeComments: true,       // 去注释
                collapseWhitespace: true,   // 压缩空格
                removeAttributeQuotes: true // 去除属性引用
            },
            // 必须通过上面的 CommonsChunkPlugin 的依赖关系自动添加 js，css 等
            chunksSortMode: 'dependency'
        }),

        // 代码分割(抽取公共模块)
        new webpack.optimize.CommonsChunkPlugin({
            names: ['vendor'],
            filename: 'js/[name]-[chunkhash:8].js'
        }),

        // react开启生产环境压缩
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        }),

        // 设置环境全局变量
        new webpack.DefinePlugin({
            __DEV__: JSON.stringify(JSON.parse((process.env.NODE_ENV == 'dev') || 'false'))
        }),

        // 抽取 manifest
        new webpack.LoaderOptionsPlugin({
            minimize: true
        }),

        // 代码压缩
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),

        // gzip压缩
        new CompressionWebpackPlugin({
            asset: '[path].gz[query]',
            algorithm: 'gzip',
            test: new RegExp(
                '\\.(js|css)$'
            ),
            threshold: 10240,
            minRatio: 0.8
        }),

        // 改善chunk传输
        new webpack.optimize.AggressiveMergingPlugin({
            minSizeReduce: 1.5,
            moveToParents: true
        }),

        // 排序输出
        new webpack.optimize.OccurrenceOrderPlugin()
    ]
}