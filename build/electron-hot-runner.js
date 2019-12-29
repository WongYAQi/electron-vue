const { spawn, exec } = require('child_process') // 衍生子进程
const fs = require('fs')
const webpack = exec('npm run dev --color')
const electron = exec('npm run start')
const app = exec('node express/app.js', {
    cwd: './'
})
var logStream = fs.createWriteStream('d:/CodeProgram/electron-vue-topic/a.txt');

// 测试文件写入
//logStream.write("My first row\n");
//logStream.write("My second row\n");

process.stdout.write = process.stderr.write = logStream.write.bind(logStream);
console.log('test1');
console.error('test2 error');

webpack.stdout.on('data', data => {
    console.log(data)
})
webpack.stderr.on('data', data => {
    console.log(data)
})