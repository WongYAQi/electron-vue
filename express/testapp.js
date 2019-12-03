const app = require('express')()
const fs = require('fs')
const url = 'http://192.168.0.26/'

app.all('*', function (req, res) {
  const data = new Uint8Array(Buffer.from('Node.js中文网'))
  fs.writeFile('log.txt', data, error => {
    if (error) throw error
  })
})

app.listen(3002)