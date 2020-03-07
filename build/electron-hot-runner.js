const { spawn, exec } = require('child_process') // 衍生子进程
const fs = require('fs')
// 内部的npm命令和外部的webpack命令都需要加入 --color选项
const webpack = exec('npm run dev --color')
const electron = exec('npm run start')
const app = exec('node express/app.js', {
    cwd: './'
})
webpack.stdout.on('data', data => {
    console.log(data)
})
webpack.stderr.on('data', data => {
    console.log(data)
})
