'use strict';

const { body, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

const { addUser } = require('./user');

const regUser = [
  sanitizeBody('*')
    .trim()
    .escape(),

  body('email')
    .isEmail()
    .withMessage('Email not correct')
    .isLength({ min: 1 })
    .withMessage('Email must not be empty'),

  body('login')
    .isAlphanumeric()
    .withMessage('Login must be alphanumeric')
    .isLength({ min: 1 })
    .withMessage('Login must not be empty'),

  body('password')
    .isLength({ min: 1 })
    .withMessage('Password must not be empty'),

  body('confirmationPassword')
    .isLength({ min: 1 })
    .withMessage('Confirmation password must not be empty')
    .custom((val, { req }) => val === req.body.password)
    .withMessage('Password not same'),

  async(req, res) => {
    const validation = validationResult(req);
    if (!validation.isEmpty()) {
      const errors = {};
      for (const error of validation.array()) {
        Object.assign(errors, { [error.param]: error.msg });
      }

      res.render('registration-form', {
        title: 'Registration',
        user: req.body,
        errors
      });

    } else {
      try {
        await addUser(req.body, req.headers.host);
        res.redirect('/');
      } catch (err) {
        res.render('error', { message: err.message });
      }
    }
  }
];

module.exports = { regUser };
