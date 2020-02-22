const express = require('express')
const router = express.Router()
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('express/data/coopwire.json')
const Dev = require('../lib/Dev')
const db = low(adapter)
const arrayProcess = new Array(3)

router.get('/coopwire', (req, res) => {
    let temp = db.read()
    res.send(temp)
})

router.ws('/coopwire/dev/:platform', function(ws, req){
  let index = req.params.platform.includes('auth')
      ? 0
      : req.params.platform.includes('platform')
          ? 1
          : req.params.platform.includes('enterprise')
              ? 2 : -1
  if (index < 0) return
  ws.on('message', msg => {
    let subprocess
    if (msg.startsWith('dev')) {
        subprocess = new Dev(msg, address)
        arrayProcess.splice(index, 1, subprocess)
        subprocess.run(ws)
    } else if (msg === 'restart') {
        if (!subprocess) return
        subprocess.restart()
    } else if (msg === 'stop') {
        if (!subprocess) return
        subprocess.stop()
    }
    process.stdout.write('1 is', subprocess)
  })
})

// 关闭端口
router.post('/coopwire/dev/:platform/close', function (req, res) {
  let index = req.params.platform.includes('auth')
    ? 0
    : req.params.platform.includes('platform')
        ? 1
        : req.params.platform.includes('enterprise')
            ? 2 : -1
  if (index < 0) {
    res.send('No subprocess')
    return
  }
  let subprocess = arrayProcess[index]
  if (!subprocess) {
    res.send('No subprocess in arrayProcess')
    return
  }
  subprocess.stop()
  res.send(subprocess)
})

router.post('/coopwire/lowdb/update', (req, res) => {
  let data = req.body
  Object.keys(data).forEach(key => {
    db.set(key, data[key])
      .write()
  })
  res.send(db.read())
})

module.exports = router
