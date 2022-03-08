// 在 express 框架中集成 websocket

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

app.listen(9700, () => {
  console.log('正在监听 9700 端口...')
})
