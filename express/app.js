const app = require('express')()
const expressWs = require('express-ws')(app)
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const fs = require('fs')
const cors = require('cors')
const adapter = new FileSync('express/data/coopwire.json')
const Dev = require('../lib/Dev')
const db = low(adapter)
const arrayProcess = new Array(3)
const adapterMock = new FileSync('express/data/mock.json')
const dbM = low(adapterMock)
const mockapp = require('./mockapp.js')
const _ = require('lodash')
const address = db.get('address').value()
const bodyParser = require('body-parser')

console.log(db.get('address').value())
app.use(cors())
app.use(bodyParser.json())

app.get('/coopwire', (req, res) => {
    let temp = db.read()
    res.send(temp)
})

app.ws('/coopwire/dev/:platform', function(ws, req){
  ws.on('message', msg => {
      let index = req.params.platform.includes('auth')
          ? 0
          : req.params.platform.includes('platform')
              ? 1
              : req.params.platform.includes('enterprise')
                  ? 2 : -1
      if (index < 0) return
      let subprocess = arrayProcess[index] 
      if (msg.startsWith('dev')) {
          subprocess = new Dev(msg, address)
          subprocess.run(ws)
      } else if (msg === 'restart') {
          if (!subprocess) return
          subprocess.restart()
      } else if (msg === 'stop') {
          if (!subprocess) return
          subprocess.stop()
      }
  })
})
/**
获取lowdb的存储数据 */
app.get('/lowdb/:dictName', (req, res) => {
    let result = db.get(req.params.dictName).value()
    res.send(result)
})

app.post('/coopwire/lowdb/update', (req, res) => {
  let data = req.body
  Object.keys(data).forEach(key => {
    db.set(key, data[key])
      .write()
  })
  res.send(db.read())
})

/**
获取所有接口列表 */
app.get('/mock/api', (req, res) => {
    let result = _.keys(dbM.getState())
    res.send(dbM.getState())
})

// 启动Mock服务
app.post('/mock/:port/start', (req, res) => {
    db.set('mockport', req.params.port)
        .write()
    let result = mockapp.listen(req.params.port)
    res.send(result)
})

// 重置Mock接口列表（清空所有）
app.get('/mock/reset', (req, res) => {
    const newState = {}
    dbM.setState(newState)
    res.send(dbM.getState())
})

// 获取路径内文件夹与文件信息
app.post('/path/show', (req, res) => {
    let cPath = req.body.path
    fs.readdir(cPath, { withFileTypes: true }, (err, results) => {
      if (!results) {
        res.send([])
      } else {
        let r = results.map(item => {
            return {
                name: item.name,
                type: item.isFile() ? "file"
                  : item.isDirectory()
                    ? "directory" : ""
            }
        }).sort((p, n) => {
          if (n.type === p.type) return p.name[0].charCodeAt() - n.name[0].charCodeAt()
          else {
            return n.type === 'directory' ? 1 : -1
          }
        })
        res.send(r)
      }
    })
})

app.listen('3001')
