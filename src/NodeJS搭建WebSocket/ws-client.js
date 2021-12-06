const WebSocket = require('ws')
var ws = new WebSocket('ws://localhost:8080')

// console.log(ws.readyState)

ws.onopen = () => {
  console.log('888')
}

ws.on('message', data => {
  console.log('客户端收到消息: ' + data)
  ws.close()
})
ws.on('close', () => {
  console.log('连接关闭')
})
