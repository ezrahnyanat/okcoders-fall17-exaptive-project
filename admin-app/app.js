var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var config = require('./config.js')();
const port = config.port;

// Open MongoDB Connection
var mongoose = require('mongoose');
mongoose.connect(config.mongodb);

var db = mongoose.connection;

db.on('error', function(msg){
	console.log('Mongoose connection error %s', msg);
});

db.once('open', function(){
	console.log('Mongoose connection established');
});

// Declare your routes here.
var index = require('./routes/index');
var users = require('./routes/users');
var static = require('./routes/static');
var xcomponents = require('./routes/xcomponents');
var xaps = require('./routes/xaps');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
app.get('/static/:static_id', static.get);
app.get('/static', static.read);
app.post('/static', static.create);
app.put('/static/:static_id', static.edit);
app.delete('/static/:static_id', static.delete);
app.use('/xcomponents', xcomponents);
app.get('/xcomponents/fetch', xcomponents.fetch);
app.get('/xcomponents', xcomponents.read);
app.put('/xcomponents/:xcomponent_id/:is_active', xcomponents.edit);
app.use('/xaps', xaps);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
