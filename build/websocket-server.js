/**
 * Express 服务，用于发送websocket等
 */
const { exec,spawn, fork } = require('child_process')
const app = require('express')()
const server = require('http').Server(app)
const WebSocket = require('ws')
const iconv = require('iconv-lite')
const WebSocketServer = WebSocket.Server

const wss = new WebSocketServer({
    port: 3000
})

wss.on('connection', (ws) => {
    ws.on('message', (message) => {
        if (message === 'npm run') {
            // const run = fork('./run-auth.js', {
            //     silent: true
            // })
            const run = spawn('npm.cmd',['run', 'dev:coopwire-auth', '--color'], {
                cwd: 'D:/CodeProgram/coopwire-frontend/web'
            })
            run.stdout.setEncoding('utf8')
            run.stderr.setEncoding('utf8')
            run.stdout.on('data', (data) => {
                ws.send(data)
            })
            run.stderr.on('data', (data) => {
                ws.send(data)
            })


        } else {
            const run = spawn('npm.cmd',['run', 'dev:coopwire-platform', '--color'], {
                cwd: 'D:/CodeProgram/coopwire-frontend/web'
            })
            run.stdout.setEncoding('utf8')
            run.stderr.setEncoding('utf8')
            run.stdout.on('data', (data) => {
                ws.send(data)
            })
            run.stderr.on('data', (data) => {
                ws.send(data)
            })
        }
    })

    ws.send('asdasd')
})