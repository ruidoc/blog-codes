var express = require('express')
var router = express.Router()

router.ws('/test-ws', (ws, req) => {
  ws.on('message', msg => {
    console.log(msg)
    ws.send('服务端回复：' + msg)
  })
})

module.exports = router
