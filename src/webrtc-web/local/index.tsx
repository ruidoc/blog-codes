// react 版本的 demo
import React, { useEffect, useRef } from 'react'

const LocalPage = () => {
  const videoElA = useRef(null),
    videoElB = useRef(null)
  var peerA: RTCPeerConnection = null,
    peerB: RTCPeerConnection = null

  const onStart = async () => {
    try {
      let stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      })
      if (videoElA.current) {
        videoElA.current.srcObject = stream // 在 video 标签上播放媒体流
      }
      peerInit(stream) // 初始化连接
    } catch (error) {
      console.log('error：', error)
    }
  }

  const peerInit = (stream: MediaStream) => {
    // 1. 创建连接实例
    peerA = new RTCPeerConnection()
    peerB = new RTCPeerConnection()
    // 2. 添加视频流轨道
    stream.getTracks().forEach(track => {
      peerA.addTrack(track, stream)
    })
    // 添加 candidate
    peerA.onicecandidate = event => {
      if (event.candidate) {
        peerB.addIceCandidate(event.candidate)
      }
    }
    // 检测连接状态
    peerA.onconnectionstatechange = event => {
      if (peerA.connectionState === 'connected') {
        console.log('对等连接成功！')
      }
    }
    // 监听数据传来
    peerB.ontrack = async event => {
      const [remoteStream] = event.streams
      videoElB.current.srcObject = remoteStream
    }
    // 互换sdp认证
    transSDP()
  }

  const transSDP = async () => {
    // 1. 创建 offer
    let offer = await peerA.createOffer()
    await peerB.setRemoteDescription(offer)
    // 2. 创建 answer
    let answer = await peerB.createAnswer()
    await peerB.setLocalDescription(answer)
    // 3. 发送端设置 sdp
    await peerA.setLocalDescription(offer)
    await peerA.setRemoteDescription(answer)
  }

  useEffect(() => {}, [])

  return (
    <div className="local-stream-page">
      <video autoPlay controls muted ref={videoElA}></video>
      <video autoPlay controls muted ref={videoElB}></video>
      <button onClick={onStart}>播放</button>
    </div>
  )
}

export default LocalPage
