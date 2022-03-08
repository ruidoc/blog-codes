// ws 模块客户端

const WebSocket = require('ws')
var ws = new WebSocket('ws://localhost:8080')

ws.on('open', () => {
  console.log('客户端已连接')
})

ws.on('message', data => {
  console.log('客户端收到消息: ' + data)
  ws.close()
})

ws.on('close', () => {
  console.log('连接关闭')
})
