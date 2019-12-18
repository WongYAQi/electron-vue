const app = require('express')()
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapterMock = new FileSync('express/data/mock.json')
const dbM = low(adapterMock)
const _ = require('lodash')

/** 
Mock中间件
1. 根据路由查找当前Mock数据库中是否有存储
    1.1 如果没有，则存储，并返回Reject。然后用户需要根据应用来设置Mock数据
    1.2 如果有，则直接返回Mock数据
*/
function mockStorage (req, res, next) {
    let oUrl = req.originalUrl
    let hasData = _.has(dbM, oUrl)
    if (!hasData) {
        dbM.defaults({ [oUrl]: {} })
            .write()
    } else {
    }
    next()
}

app.use(mockStorage)
app.get('*', (req, res) => {
    res.send(true)
})
module.exports = app