'use strict';

(function() {
  const ws = new WebSocket(`ws://${window.location.host}/`);

  const showNotification = ({ login }) => {
    $('body').append(`
    <a href='/chat/${login}'>Message from ${login}</a>
  `);
  };

  const parseMsg = e => {
    const data = JSON.parse(e.data);
    switch (data.type) {
      case 'notification':
        showNotification(data);
        break;
    }
  };

  ws.onmessage = parseMsg;

})();
