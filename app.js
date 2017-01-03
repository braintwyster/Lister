var express       = require('express'),
    path          = require('path'),
    favicon       = require('serve-favicon'),
    logger        = require('morgan'),
    cookieParser  = require('cookie-parser'),
    bodyParser    = require('body-parser'),
    flash         = require('connect-flash'),
    session       = require('express-session'),
    passport      = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    expressValidator = require('express-validator'),
    exphbs        = require('express-handlebars')


var index   = require('./routes/index');
var users   = require('./routes/users');
var listers = require('./routes/listers');
// var public  = require('./routes/public');

// app is built from express
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({defaultLayout:'layout'}))
app.set('view engine', 'handlebars');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('node-sass-middleware')({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: true,
  sourceMap: true
}));
app.use(express.static(path.join(__dirname, 'public')));

//Express Session
app.use(session({
  secret: 'theMooStick',
  saveUninitialized: true,
  resave: true
}))

//Passport init
app.use(passport.initialize())
app.use(passport.session())

//Express Validator
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;
 
    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

//connect flash
app.use(flash())

//Global Varaibles
app.use(function (req, res, next){
  res.locals.success_msg = req.flash('success_msg')
  res.locals.error_msg = req.flash('error_msg')
  res.locals.error = req.flash('error')
  res.locals.user = req.user || null
  next()
})

app.use('/', index);
app.use('/users', users);
app.use('/listers', listers);
// app.use('/public', public);
// app.use('/listers/:name', listers);

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
