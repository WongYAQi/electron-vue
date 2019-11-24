const { spawn } = require('child_process')
const iconv = require('iconv-lite')
const run = spawn('npm.cmd',['run', 'dev:coopwire-auth', '--color'], {
    cwd: 'D:/CodeProgram/coopwire-frontend/web'
})

run.stdout.on('data', (data) => {
    console.log(iconv.decode(Buffer.from(data), 'utf-8'))
})
run.stderr.on('data', (data) => {
    console.log(iconv.decode(Buffer.from(data), 'utf-8'))
})
