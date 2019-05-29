const express = require('express')
const session = require('express-session')
const http = require('http')
const app = express()
const server = http.Server(app)
const socketio = require('socket.io')
const path = require('path')
const {db} = require(path.join(__dirname,'db'))
const io = socketio(server)
const passport = require('./passport')
// db.sync().catch(console.error)

app.set('view engine','hbs')
app.use('/',express.static(__dirname + '/public'))

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(session({
    secret:'somesecretstring',
    resave: false,
    saveUninitialized: true
}))
app.use(passport.initialize())
app.use(passport.session())

app.use('/login',(require('./routes/login')))
app.use('/chat',(require('./routes/chat')))
app.use('/signup',(require('./routes/signup')))
io.on('connection',(socket)=>{
    socket.on('msg_send',(data)=>{
        io.emit('rcv_msg',{msg:data.msg})
    })
})
db.sync().then(()=>{
    server.listen(8161,()=>{
        console.log('Server started at http://localhost:8161')
    })
}).catch(console.error)