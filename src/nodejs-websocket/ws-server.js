// ws 模块服务端

const { WebSocketServer } = require('ws')

const wss = new WebSocketServer({
  port: 8080,
})

wss.on('connection', (ws, req) => {
  // console.log('客户端已连接：', ws)
  ws.on('message', data => {
    console.log('收到客户端发送的消息：', data)
  })
  // 获取已连接的客户端
  console.log('已连接的客户端：', wss.clients.size)
  // 向当前客户端发送消息
  ws.send('我是服务端')
})

// 连接验证
wss.on('upgrade', (request, socket) => {
  console.log('请求前')
})
