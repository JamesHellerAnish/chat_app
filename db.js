const sq = require('sequelize')

const db = new sq({
    dialect:'sqlite',
    storage:__dirname+'./chats.db'
})

const Chats = db.define('chat', {
    username:{
        type:sq.STRING(30),
        allowNull:false
    },
    msg:sq.TEXT,
})
module.exports = {db,Chats}