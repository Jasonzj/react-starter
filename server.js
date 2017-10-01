const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const base = require('./webpack.dev')
const proxy = require('http-proxy-middleware')

const DEFAULT_PORT = base.DEFAULT_PORT      // 端口
const DEFAULT_HOST = base.DEFAULT_HOST      // host
const config = base.config                  // config

new WebpackDevServer(webpack(config), {
    publicPath: config.output.publicPath,
    hot: true,                     // 启用 webpack 的模块热替换特性
    compress: true,                // 一切服务都启用gzip 压缩
    historyApiFallback: true,      // 当使用 HTML5 History API 时，任意的 404 响应都可能需要被替代为 index.html
    watchOptions: {                // 监听选项
        ignored: /node_modules/,   // 排除监听 node_modules
    },
    stats: {                       // 控制包显示的内容
        modules: false,            // 增加内置的模块信息
        chunks: false              // 增加包信息
    },
    setup(app) {                   // 访问Express App 对象，添加自定义中间件
        // 代理服务器
        app.use('/api', proxy({
            target: 'http://www.jasonzj.me:4000',                                 // 目标host
            // secure: false,                                                     // 如果你想验证SSL证书
            changeOrigin: true,
            prependPath: false
        }))
    }
}).listen(
    DEFAULT_PORT,
    DEFAULT_HOST,
    (err, result) => {
        if (err) return console.log(err)
        console.log(`开始监听: ${DEFAULT_PORT}端口, 地址:http://localhost:${DEFAULT_PORT}/`)
    }
)