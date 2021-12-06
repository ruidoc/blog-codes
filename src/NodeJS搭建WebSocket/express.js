var express = require('express')
var app = express()
var wsServer = require('express-ws')(app)
var webSocket = require('./websocket.js')

app.locals.wss = wsServer.getWss()

app.ws('/test-ws', (ws, req) => {
  ws.on('message', msg => {
    console.log(msg)
    ws.send('服务端回复：' + msg)
  })
})

app.use('/websocket', webSocket)

app.listen(3000, () => {
  console.log('正在监听 3000 端口...')
})
