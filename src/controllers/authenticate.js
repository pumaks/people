'use strict';

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');

const { checkPassword } = require('../controllers/user');

passport.use(
  new LocalStrategy(
    {
      usernameField: 'login',
      passwordField: 'password'
    },
    (login, password, done) => {
      User.findOne({ login }, (err, user) => {
        if (err) return done(err);
        if (!user || !user.active || !checkPassword(user.password, password)) {
          return done(null, false, { login, password });
        }
        return done(null, user);
      });
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  console.log('ID', id);
  User.findById(id, (err, user) => {
    err ? done(err) : done(null, user);
  });
});

const login = (req, res, next) => {
  passport.authenticate('local', (err, user, enteredData) => {
    if (err) return next(err);
    if (user)
      return req.logIn(user, err => {
        if (err) return next(err);
        res.redirect('/profile');
      });
    res.render('login', {
      title: 'Login',
      user: enteredData,
      err: 'incorrect data'
    });
  })(req, res, next);
};

const logout = (req, res) => {
  req.logout();
  res.redirect('/login');
};

const isAuth = (req, res, next) => {
  if (req.isAuthenticated()) res.locals.isAuth = true;
  else res.locals.isAuth = false;
  next();
};

const isAccess = (req, res, next) => {
  if (req.isAuthenticated()) {
    res.locals.isAuth = true;
    next();
  } else res.redirect('/login');
};

module.exports = {
  login, logout, isAuth, isAccess
};
