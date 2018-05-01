'use strict';

const express = require('express');
const router = express.Router();

const registrationController = require('../controllers/registration');
const userController = require('../controllers/user');
const authController = require('../controllers/authenticate');

/* GET home page. */
router.get('/', (req, res) => {
  res.render('index', { title: req.ip });
});

router.get('/users', userController.usersList);
router.post('/users/load', userController.usersListAjax);

router.get('/registration', (req, res) => {
  res.render('registration-form', { title: 'Registration', errors: {} });
});

router.post('/registration', registrationController.regUser);

router.get('/login', (req, res) => {
  res.render('login', { title: 'Login' });
});
router.post('/login', authController.login);

router.get('/logout', authController.logout);

router.get('/verify-email/:token', userController.verifyUser);

module.exports = router;
