var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const redis=require("./config/redis")
var api = require('./routes/api');
var createFAQ = require('./routes/createFAQ');
let mongodb=require('./config/mongodb');
var app = express();


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


redis.CreateConnection();
mongodb.connect();

// app.use((req, res, next) => {
//   req.redis = client;
//   console.log(redis)
//   next();
// });

app.use('/api/', api);
app.use('/api/faqs/', createFAQ);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(401));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send('Unauthorized');
});

module.exports = app;
