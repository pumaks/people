'use strict';

(function() {
  const ws = new WebSocket(`ws://${window.location.host}/`);

  ws.onmessage = e => {
    const data = JSON.parse(e.data);
    $('body').append(`
    <a href='/chat/${data.login}'>Message from ${data.login}</a>
  `);
  };

})();
