const route = require('express').Router()
const path = require('path')
route.get('/',(req,res)=>{
    if(!req.user){
        res.redirect('/login')
    }
    res.sendFile(path.join(__dirname,'..','chat.html'))
})


module.exports = route