$(()=>{
    $('#send').click(()=>{
        $.get('/chat',(data)=>{
            $('#chat_list').append($('<li>' + data.username + ': ' + data.msg + '</li>'))//check syntax
        })
        $.post('/chat',{
            msg:$('#msg_box').val()
        })
        $('#msg_box').empty()
        $()
    })
})