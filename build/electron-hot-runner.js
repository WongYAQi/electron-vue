const { spawn, exec } = require('child_process') // 衍生子进程


const child = exec('npm run dev --color')
const child2 = exec('npm run start')

child.stdout.on('data', (data) => {
    console.log('stdout: ' + data);
    child2.stdout.on('data', data => {
        console.log('stdout2 is', data)
    })
});
child.stderr.on('data', (data) => {
    console.log('stderr: ' + data);
});
child.on('close', (code) => {
    console.log('closing code: ' + code);
});
