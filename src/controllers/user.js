'use strict';

const crypto = require('crypto');

const emailController = require('./email');

const User = require('../models/user');

const passwordHash = password =>
  crypto
    .createHash('md5')
    .update(password)
    .digest('hex');

module.exports = {
  addUser({ email, login, password }, host, callback) {
    password = passwordHash(password);

    new User({ email, login, password }).save((err, user) => {
      if (err) {
        callback(err);
      } else {
        const link = `http://${host}/verify-email/${user._id}`;
        emailController.send(email, link);
        callback();
      }
    });
  },

  usersList(req, res, next) {
    User.find({}, 'login', { limit: 1 }).exec((err, users) => {
      if (err) return next(err);
      res.render('users', { title: 'Users', users });
    });
  },

  usersListAjax(req, res, next) {
    const skip = +req.body.skip || 0;
    const limit = +req.body.limit || 1;
    const userName = req.body.userName ?
      { login: new RegExp(`${req.body.userName}`, 'i') } :
      {};

    User.find(userName, 'login', { limit, skip }).exec((err, users) => {
      if (err) return next(err);
      let responce = '';

      for (const index in users) {
        responce += `<p class="user">${skip + +index}: ${
          users[index].login
        }</p>`;
      }

      res.json(responce);
    });

  },

  verifyUser(req, res) {
    const { token } = req.params;

    User.findById(token).exec((err, user) => {
      if (user.active) res.redirect('/user');
      else {
        user.active = true;
        user.save(err => console.log(err));
        res.redirect('/login');
      }
    });

  },

  checkPassword(hashedPassword, password) {
    return hashedPassword === passwordHash(password);
  }
};
