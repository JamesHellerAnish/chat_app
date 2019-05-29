const passport = require('passport')
const ls = require('passport-local').Strategy
const path = require('path')
const {Users} = require(path.join(__dirname,'db'))

passport.serializeUser((user,done)=>{
    done(null,user.username)
})

passport.deserializeUser((username,done)=>{
    Users.findOne({
        username:username
    }).then((user)=>{
        if(!user){
            return done(new Error('No such user'))
        }
        return done(null,user)
    }).catch((err)=>{
        done(err)
    })
})

passport.use(new ls((username,password,done)=>{
    Users.findOne({
        where:{
            username:username
        }
    }).then((user)=>{
        if(!user){
            return done(null,false,{message:'no such user'})
        }
        if(user.password!=password){
            return done(null,false,{message:'Wrong password'})
        }
        return done(null, user)
    }).catch(console.error)
}))

module.exports = passport