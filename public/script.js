const socket = io()


socket.on('connect',()=>{
    console.log('Socket created '+ socket.id)
})

$(()=>{
    $('#send').click(()=>{
        socket.emit('msg_send',{
            msg:$('#msg_box').val()
        })
    })
    socket.on('rcv_msg',(data)=>{
        $('#chat').append($(`<li>`+data.msg+`</li>`))
    })
})