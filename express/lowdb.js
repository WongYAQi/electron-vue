const express = require('express')
const router = express.Router()
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('express/data/coopwire.json')
const db = low(adapter)

/**
获取lowdb的存储数据 */
router.get('/lowdb/:dictName', (req, res) => {
    let result = db.get(req.params.dictName).value()
    res.send(result)
})

module.exports = router
