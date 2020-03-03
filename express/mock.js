const express = require('express')
const router = express.Router()
const _ = require('lodash')
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapterMock = new FileSync('express/data/mock.json')
const dbM = low(adapterMock)

dbM.defaults({ apis: [], count: 0 })
/**
获取所有接口列表 */
router.get('/mock/api', (req, res) => {
    let result = _.keys(dbM.getState())
    res.send(dbM.getState())
})

/**
clear all mock api
 */
router.get('/mock/clear', (req, res) => {
    let state = {}
    dbM.setState(state)
    res.send(dbM.getState())
})

router.post('/mock/save', (req, res) => {
    try{
        let { body } = req
        dbM.set(body.url, body).write()
        res.send(true)
    } catch(error) {
        res.send(error)
    }
})

// 启动Mock服务
// router.post('/mock/:port/start', (req, res) => {
//     db.set('mockport', req.params.port)
//         .write()
//     let result = mockapp.listen(req.params.port)
//     res.send(result)
// })

// 重置Mock接口列表（清空所有）
router.get('/mock/reset', (req, res) => {
    const newState = {}
    dbM.setState(newState)
    res.send(dbM.getState())
})

module.exports = router
