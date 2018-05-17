'use strict';

const router = require('express').Router();
const chatController = require('../controllers/Chat/chat');

router.get('/', (req, res) => res.render('chat', { title: 'Chat' }));

router.get('/:login', chatController.index);

router.ws('/:login', chatController.connect);

module.exports = router;
