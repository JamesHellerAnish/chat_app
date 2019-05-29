const route = require('express').Router()

route.get('/',(req,res)=>{
    if(!req.user){
        res.redirect('/login')
    }
    res.render('chat')
})


module.exports = route