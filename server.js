const express = require('express')
const http = require('http')
const app = express()
const server = http.Server(app)
const socketio = require('socket.io')
const {db,Chats} = require('./db')
const io = socketio(server)
app.use('/',express.static(__dirname + '/public'))
// app.use(express.json())
// app.use(express.urlencoded({extended:true}))
// app.use(session({
//     secret:'somesecretstring'
// }))
// db.sync().then(()=>{
//     server.listen(8161,()=>{
//         console.log('Server started at http://localhost:8161')
//     })
// }).catch(console.error)
io.on('connection',(socket)=>{
    socket.on('msg_send',(data)=>{
        io.emit('rcv_msg',{msg:data.msg})
    })
})
server.listen(8161,()=>{
    console.log('Server started at http://localhost:8161')
})