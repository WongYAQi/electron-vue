const express = require('express')
const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const WebpackDevMiddleware = require('webpack-dev-middleware')

const { spawn } = require('child_process') // 衍生子进程
const electron = require('electron')

const expressApp = express()
const config = require('./config/webpack.config')
const compiler = webpack(config)
const hotMiddleware = WebpackDevMiddleware(compiler, {
    log: false,
    heartbeat: 2500
})

const server = new WebpackDevServer(
    compiler,
    {
        publicPath: config.output.publicPath,
        quiet: true,
        before (app, ctx) { // webpack 钩子函数，
            app.use(hotMiddleware)
            // 在下面的钩子函数中，执行回调，打开electron
            ctx.middleware.waitUntilValid(() => {
                // 可以通过spawn 创建子进程，子进程具有detached 选项，可以独立于父进程
                let app = spawn(electron, {}, {
                    detached: true
                })
                // electron 其实是electron.exe ，所以要通过执行命令的方式，
                console.log('in waitUnitvalid', app)
            })
        }
    }
)

server.listen(3000, function () {
    console.log('Example app listening on port 3000')
})

