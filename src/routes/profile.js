'use strict';

const express = require('express');
const router = express.Router();

const upload = require('../controllers/profile');

router.get('/', (req, res) =>
  res.render('profile', { title: 'Profile', user: req.user })
);

router.post('/loadAvatar', upload.single('avatar'), (req, res) => {
  if (!req.file) res.send({ success: false });
  else res.send({ success: true });
});

module.exports = router;
