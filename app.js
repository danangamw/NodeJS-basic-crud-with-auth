const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const db = require('./config/db');
const exphbs = require('express-handlebars');
const flash = require('connect-flash');
const passport = require('passport');
const session = require('express-session');
const mysqlstore = require('express-mysql-session');
const mysqlOption = require('./config/mysqlOption');
const methodOverride = require('method-override');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();

db.authenticate()
  .then(() => console.log(`Connected to MySQL`))
  .catch((err) => console.error(`Error: ${err}`));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine(
  'hbs',
  exphbs.engine({
    extname: '.hbs',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    defaultLayout: 'main',
    helpers: require('./lib/hbs'),
  })
);
app.set('view engine', 'hbs');

// middleware & parser setup
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  methodOverride((req, res) => {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
      // look in urlencoded POST bodies and delete it
      let method = req.body._method;
      delete req.body._method;
      return method;
    }
  })
);
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(
  session({
    secret: 'crud_links_session',
    resave: false,
    saveUninitialized: false,
    store: mysqlstore(mysqlOption),
  })
);
app.use(flash());

// passport
require('./config/passport');
app.use(passport.initialize());
app.use(passport.session());

// Global Variable
app.use((req, res, next) => {
  app.locals.success = req.flash('success');
  app.locals.message = req.flash('message');
  app.locals.user = req.user;
  next();
});

// routes
app.use(indexRouter);
app.use(usersRouter);
app.use('/links', require('./routes/links'));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = 'Error!';
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  if (err.status === 404) {
    res.status(404);
    return res.render('404', { title: 'Page not found' });
  } else {
    res.status(500);
    res.render('error', { title: 'Woopss..' });
  }
});

module.exports = app;
