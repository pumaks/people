'use strict';

const express = require('express');
const router = express.Router();

const authController = require('../controllers/authenticate');

router.get('/', authController.isAccess, (req, res) =>
  res.render('profile', { title: 'Profile', user: req.user })
);

module.exports = router;
