'use strict';

(function() {
  const chatId = $('#dialog').data('chatId');
  const ws = new WebSocket(`ws://${window.location.host}/chat/${chatId}`);

  const getFormData = $form => {
    const formData = { type: 'msg' };
    $form.children().each((i, elem) => (formData[elem.name] = elem.value));
    return formData;
  };

  $('.send-msg').click(function(e) {
    const fd = getFormData($('form'));
    ws.send(JSON.stringify(fd));
  });

  $('input[name=msgText]').keypress(e => {
    const cid = $('input[name=companionId]').val();
    ws.send(JSON.stringify({ type: 'writing', companionId: cid }));
  });

  ws.onmessage = e => {
    const msg = JSON.parse(e.data);
    if (msg.type === 'writing') {
      $('.messages').append('<span class="wr">writing...</span>');
      setTimeout(() => $('.wr').remove(), 1000);
    } else {
      $('.messages').append(
        `<div class='msg'>
        <div class='text'>${msg.text}</div>
        <div class='from'>${msg.from}</div>
        <div class='time'>${msg.createdAt}</div>
    </div>`
      );
    }
  };

})();
