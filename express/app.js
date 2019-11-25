const app = require('express')()
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('express/data/coopwire.json')
const db = low(adapter)
app.get('/coopwire', (req, res) => {
    let temp = db.read()
    res.send(temp)
})

app.post('/coopwire', (req, res) => {
    db.set('address', 123)
        .write()
    res.send(db.read())
})

app.listen('3001')