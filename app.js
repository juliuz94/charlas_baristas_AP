require("dotenv").config();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
const flash = require("express-flash");
const session = require("express-session");

// MongoDB Mongoose SetUp
mongoose.connect(`mongodb+srv://amorPerfecto:Cafeperfecto2020@cluster0-v9m8j.gcp.mongodb.net/amor-perfecto`, {useNewUrlParser: true, useUnifiedTopology: true });

// Routes Import
var indexRouter = require('./routes/index');
var profileRouter = require('./routes/profile');
var adminRouter = require('./routes/admin');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(flash());
app.use(
  session({
    secret: 'el cafe perfecto',
    resave: false,
    saveUninitialized: false
  })
);



app.use('/', indexRouter);
app.use('/barista', profileRouter);
app.use('/admin', adminRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}
app.listen(port, () => {
  console.log("App server start successfully");
});

// module.exports = app;
