'use strict';

const chatId = $('#dialog').data('chatId');

const ws = new WebSocket(`ws://${window.location.host}/chat/${chatId}`);

// $('.send-msg').click(function() {
//   const text = $('input[name=msgText]').val();
//   const from = 
//   const data = { chatId, text,  };
//   ws.send(JSON.stringify(data));
// });

ws.onmessage = (e) => {
  const msg = e.data;
  $('.messages').append(
    `<div class='msg'>
        <div class='text'>${msg.text}</div>
        <div class='from'>${msg.from}</div>
        <div class='time'>${msg.time}</div>
    </div>`
  );
}
