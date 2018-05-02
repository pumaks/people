'use strict';

const ws = new WebSocket(`ws://${window.location.host}/chat/`);

ws.onopen = () => {
  console.log('opened');
  $('input[type=submit]').removeAttr('style');
  $('input[type=submit]').click(function() {
    const msg = $('.msg').val();
    ws.send(JSON.stringify(msg));
    $('.chat').append(`<p>${msg}</p>`);
  });
}


ws.onmessage = event => $('.chat').append(`<p>${event.data}</p>`);
