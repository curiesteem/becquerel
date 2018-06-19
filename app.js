var express = require('express');
var path = require('path');
var session = require('express-session');

var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var bearerToken = require('express-bearer-token');

var index = require('./routes/index');
var posts = require('./routes/posts');
var users = require('./routes/users');
var auth = require('./routes/auth');
var accounts = require('./routes/accounts')
var mongoose = require('mongoose');



var config = require('./config')





var app = express();

app.use(session({
  secret: config.session.secret,
  saveUninitialized: true,
  resave: false
}));

app.use(bearerToken());

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

// Priority serve any static files.

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));

var dburl = 'mongodb://localhost:27017/curie'

if (config.db_user)
{
  dburl = 'mongodb://' + config.db_user + ':' + config.db_pwd + '@'  + config.db_url + '/' + config.db_name
}

console.log("connecting to db " + dburl); 
mongoose.set('debug', true);
mongoose.connect(dburl, {
  useMongoClient: true,
  /* other options */
});


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());


// app.use('/', index);
app.use('/posts', posts);
app.use('/users', users);
app.use('/authorize', auth);
app.use('/accounts', accounts);


// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   var err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });

// error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });


app.use(express.static(path.resolve(__dirname, './client/build')));

console.log("resolve test   = " + path.resolve(__dirname, 'client/build', 'index.html'));

// All remaining requests return the React app, so it can handle routing.
app.get('*', function(request, response) {
  response.sendFile(path.resolve(__dirname, './client/build', 'index.html'));
});

module.exports = app;
