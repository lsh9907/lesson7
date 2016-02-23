var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// add mongoose for mongodb interaction
var mongoose = require('mongoose');

var routes = require('./routes/index');
var users = require('./routes/users');

// add the article's route
var articles = require('./routes/articles');

var app = express();

// db connection
var db = mongoose.connection;

// show an error if connection fails
db.on('error', console.error.bind(console, 'DB Error: '));
db.once('open', function(callback) {
  console.log('Connected to mongodb');
});

//connect
mongoose.connect('mongodb://localhost/test');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
// map requests at /articles to use the routes/articles.js file
app.use('/articles', articles);


app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}


app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
