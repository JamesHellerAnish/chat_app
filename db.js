const sq = require('sequelize')

const db = new sq({
    dialect:'sqlite',
    storage:__dirname+'/chats.db'
})

const Users = db.define('users',{
    username:{
        type:sq.STRING(30),
        allowNull:false
    },
    password:{
        type:sq.STRING(30),
        allowNull:false
    }
})

const Chats = db.define('chat', {
    msg:sq.TEXT,
})

Users.hasMany(Chats);
Chats.belongsTo(Users);

module.exports = {db,Chats,Users}