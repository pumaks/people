'use strict';

const router = require('express').Router();
const dialogController = require('../controllers/Chat/dialog');

router.get('/', (req, res) => res.render('chat', { title: 'Chat' }));

router.get('/:login', dialogController.index);

router.ws('/:login', dialogController.connect);

module.exports = router;
