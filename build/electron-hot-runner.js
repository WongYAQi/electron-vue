const { spawn, exec } = require('child_process') // 衍生子进程


const child = exec('npm run dev --color')
const child2 = exec('npm run start')
const child4 = exec('node express/app.js', {
    cwd: './'
})
child4.stdout.on('data', (data) => {
    console.log('child4 is ', data)
})
child4.stderr.on('data', (data) => {
    console.log('child4 is', data)
})
