'use strict';

const crypto = require('crypto');
const fs = require('fs');

const emailController = require('./email');

const User = require('../models/user');
const AdditionalInfo = require('../models/additionalInfo');

const passwordHash = password =>
  crypto
    .createHash('md5')
    .update(password)
    .digest('hex');

const addUser = async ({ email, login, password }, host) => {
  password = passwordHash(password);
  const user = await new User({ email, login, password }).save();
  new AdditionalInfo({ userId: user._id }).save();
  const link = `http://${host}/verify-email/${user._id}`;
  fs.mkdir(`./src/public/img/user-uploads/${user._id}`, err => {
    if (err) console.log(err);
  });
  emailController.send(email, link);
};

const usersList = async (req, res) => {
  const users = await User.find({}, 'login', { limit: 1 }).exec();
  res.render('users', { title: 'Users', users });
};

const usersListAjax = async (req, res) => {
  const skip = +req.body.skip || 0;
  const limit = +req.body.limit || 1;
  const userName = req.body.userName ?
    { login: new RegExp(`${req.body.userName}`, 'i') } :
    {};
  const users = await User.find(userName, 'login', { limit, skip }).exec();
  let responce = '';
  for (const index in users)
    responce += `<p class="user">${skip + +index}: ${users[index].login}</p>`;
  res.json(responce);
};

const verifyUser = async (req, res) => {
  const { token } = req.params;
  const user = await User.findById(token).exec();
  if (user.active) res.redirect('/user');
  else {
    user.active = true;
    user.save(err => console.log(err));
    res.redirect('/login');
  }
};

const checkPassword = (hashedPassword, password) =>
  hashedPassword === passwordHash(password);

module.exports = {
  addUser,
  usersList,
  usersListAjax,
  verifyUser,
  checkPassword
};
