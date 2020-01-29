const { spawn } = require('child_process')
const fs = require('fs')

class Dev{
  constructor(command, cwd){
    this._process = null
    this.command = command
    this.cwd = cwd
  }
  run (ws) {
    console.log('命令', this.command, this.cwd)
    if (this._process) {
      Dev.stopProcess(this._process)
      this._process = null
    }
    this._process = spawn('npm.cmd', ['run', this.command, '--color'], {
      cwd: this.cwd
    })
    var logStream = fs.createWriteStream('d:/CodeProgram/electron-vue-topic/a.txt')
    process.stdout.write = process.stderr.write = logStream.write.bind(logStream)
    // node 产生的子进程，触发的报错信息都是通过二进制传递的，需要设置Encoding才能读取
    this._process.stdout.setEncoding('utf8')
    this._process.stderr.setEncoding('utf8')
    this._process.stdout.on('data', (data) => {
      console.log(data)
      ws.send(data.trim().replace('\n', ''))
    })
    this._process.stderr.on('data', (data) => {
      console.log(data)
      ws.send(data)
    })
    this._process.on('error', err => {
      console.log('命令报错', err)
    })
    this._process.on('close', (code, signal) => {
      console.log(`进程终止 ${code} ,${signal}`)
    })
  }
  restart () {
    this.stop()
    this.run()
  }
  stop () {
    this._process.kill()
  }
}
Dev.prototype.stopProcess = function (subprocess) {
  subprocess.kill('SIGKILL')
}
module.exports = Dev