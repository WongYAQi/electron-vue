const { exec, spawn } = require('child_process')
const iconv = require('iconv-lite')
const run = spawn('npm.cmd',['run', 'dev:coopwire-auth'], {
    cwd: 'D:/CodeProgram/coopwire-frontend/web'
})
run.stdout.on('data', (data) => {
    console.log('in auth success', iconv.decode(Buffer.from(data), 'utf-8'))
})
run.stderr.on('data', (data) => {
    console.log('in atuh err', iconv.decode(Buffer.from(data), 'utf-8'))
})

