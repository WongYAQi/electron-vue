const app = require('express')()
const expressWs = require('express-ws')(app)
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('express/data/coopwire.json')
const Dev = require('../lib/Dev')
const db = low(adapter)
const arrayProcess = new Array(3)
app.get('/coopwire', (req, res) => {
    let temp = db.read()
    res.send(temp)
})

app.ws('/coopwire/dev/:platform', function(ws, req){
    console.log(req.params)
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
            subprocess = new Dev(msg, db.get('address').value())
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
app.post('/coopwire', (req, res) => {
    db.set('address', 123)
        .write()
    res.send(db.read())
})

app.listen('3001')
