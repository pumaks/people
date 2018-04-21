'use strict';

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const passport = require('passport');
const session = require('express-session');
const mongoStore = require('connect-mongo')(session);

const routesPath = './src/routes/';

const indexRouter = require(`${routesPath}index`);
const userRouter = require(`${routesPath}user`);
const profileRouter = require(`${routesPath}profile`);

const authController = require('./src/controllers/authenticate');

const app = express();

const mongoose = require('mongoose');
const mongoDb = 'mongodb://root:root18@ds241869.mlab.com:41869/people';

mongoose.connect(mongoDb);
mongoose.Promise = global.Promise;

const db = mongoose.connection;

db.on('err', () => console.error('MongoDb connection error'));

// view engine setup
app.set('views', path.join(__dirname, 'src/views'));
app.set('view engine', 'pug');

app.use(
  session({
    secret: 'arbuzuz',
    store: new mongoStore({ mongooseConnection: mongoose.connection }),
    resave: true,
    saveUninitialized: true
  })
);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, './src/public')));
app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist/'));

app.use(authController.isAuth);

app.use('/', indexRouter);
app.use('/user', userRouter);
app.use('/profile', authController.isAccess, profileRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
