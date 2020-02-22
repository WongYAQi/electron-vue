const express = require('express')
const router = express.Router()
const fs = require('fs')

// 获取路径内文件夹与文件信息
router.post('/path/show', (req, res) => {
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

module.exports = router
