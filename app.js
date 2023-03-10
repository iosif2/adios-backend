var createError = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan');
const { sequelize } = require('./database/models/index');
const helmet = require('helmet');
const cors = require('cors');

var indexRouter = require('./routes/index');
var authRouter = require('./routes/auth');
var usersRouter = require('./routes/users');
var schedulesRouter = require('./routes/schedules');

var app = express();

sequelize
  .sync()
  .then(() => console.log('Connected to database'))
  .catch(err => console.error('Occurred error while connecting to database', err));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(helmet());
app.use(cors());


app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/users', usersRouter);
app.use('/schedules', schedulesRouter);


app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
