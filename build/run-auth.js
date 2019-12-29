const { spawn } = require('child_process')
const iconv = require('iconv-lite')
const fs =require('fs')
const logStream = fs.createWriteStream('./a.txt', { flags: 'a' })

const run = spawn('npm.cmd',['run', 'dev:coopwire-auth', '--color'], {
    cwd: 'D:/CodeProgram/coopwire-frontend/web'
}
run.stdout.pipe(logStream)
run.stdout.on('data', (data) => {
    console.log(iconv.decode(Buffer.from(data), 'utf-8'))
})
run.stderr.on('data', (data) => {
    console.log(iconv.decode(Buffer.from(data), 'utf-8'))
})
