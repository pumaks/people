'use strict';

(function() {
  const $dialogPage = $('#dialog-page');
  const chatId = $('input[name=chatId]').val();
  const ws = new WebSocket(`ws://${window.location.host}/chat/${chatId}`);

  const getFormData = $form => {
    const formData = { type: 'msg' };
    $form.children().each((i, elem) => (formData[elem.name] = elem.value));
    return formData;
  };

  const companionTyping = () => {
    $dialogPage
      .find('.messages')
      .append('<span class="typing">typing...</span>');
    setTimeout(() => $dialogPage.find('.typing').remove(), 1000);
  };

  const appendMsg = ({ text, from, createdAt }) => {
    $dialogPage.find('.messages').append(
      `<div class='msg'>
        <div class='text'>${text}</div>
        <div class='from'>${from}</div>
        <div class='time'>${createdAt}</div>
      </div>`
    );
  };

  const parseMsg = e => {
    const data = JSON.parse(e.data);
    switch (data.type) {
      case 'typing':
        companionTyping(data);
        break;
      case 'msg':
        appendMsg(data);
        break;
    }
  };

  ws.onmessage = parseMsg;

  $dialogPage.on('click', '.send-msg', sendMsgWS);
  $dialogPage.on('keypress', 'input[name=msgText]', sendTypeSignalWS);

  function sendMsgWS() {
    const fd = getFormData($('form'));
    ws.send(JSON.stringify(fd));
  }

  function sendTypeSignalWS() {
    const companionId = $('input[name=companionId]').val();
    ws.send(JSON.stringify({ type: 'typing', companionId }));
  }

})();
