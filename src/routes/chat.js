'use strict';

const router = require('express').Router();

router.get('/', (req, res) => res.render('chat', { title: 'Chat' }));

router.ws('/', (ws, req) => {
  ws.onopen = () => console.log('opened');
  ws.send('hello');
  ws.onmessage = (d) => console.log(d.data);
});

module.exports = router;
