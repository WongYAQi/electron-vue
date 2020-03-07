const spawn = require('child_process').spawn
const netstat = require('node-netstat')
const ports = ['8080', '8081', '8082']
let func = () => {
  netstat({}, item => {
    if (ports.includes(item.local.port)) {
      spawn('taskkill', ['-PID', item.pid, '-F'])
    }
  })
}
module.exports = func
