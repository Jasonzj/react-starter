const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const config = require('./webpack.config')
const proxy = require('http-proxy-middleware')

const port = 3000
const host = 'localhost'

new WebpackDevServer(webpack(config), {
    publicPath: config.output.publicPath,
    hot: true,
    compress: true,
    historyApiFallback: true,
    watchOptions: {
        ignored: /node_modules/,
    },
    stats: {
        modules: false,
        chunks: false
    },
    setup(app) {
        app.use('/book/*', proxy({
            target: 'https://www.easy-mock.com/mock/593611b991470c0ac101d474',
            secure: false
        }))
    }
}).listen(port, host, (err, result) => {
    if (err) {
        return console.log(err);
    }
    console.log('Listening at http://localhost:3000/')
})