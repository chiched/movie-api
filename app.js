// var createError = require('http-errors');
var express = require('express');
var path = require('path');
// var favicon = require('serve-favicon'); //added

var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser'); //added
var logger = require('morgan');

var index = require('./routes/index'); //changed
// var usersRouter = require('./routes/users');

var app = express();

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use(logger('dev'));
app.use(bodyParser.json()); // changed
app.use(bodyParser.urlencoded({ extended: false }));// changed
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);
// app.use('/users', usersRouter);
app.use('/api/', index); //added

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  // next(createError(404));
  var err = new Error('Not Found'); //added
  err.status = 404; //added
  next(err); //added

});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;