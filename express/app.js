const app = require('express')()
const expressWs = require('express-ws')(app)
const cors = require('cors')
const bodyParser = require('body-parser')

const coopwire = require('./coopwire.js')
const mock = require('./mock.js')
const lowdb = require('./lowdb.js')
const other = require('./other.js')

app.use(cors())
app.use(bodyParser.json())

app.use('/', coopwire)
app.use('/', mock)
app.use('/', lowdb)
app.use('/', other)

app.listen('3001')
