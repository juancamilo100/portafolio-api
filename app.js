const createError = require('http-errors');
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');

const usersRouter = require('./routes/users');
const portfoliosRouter = require('./src/controllers/portfolios');

const app = express();

mongoose.connect('mongodb://localhost:27017/', {
	useNewUrlParser: true,
	dbName: "portafolio",
    connectTimeoutMS: 5000
});

mongoose.connection.on('connected', function () {  
  console.log('Connection successful to MongoDB');
}); 

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/users', usersRouter);
app.use('/portfolios', portfoliosRouter)

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
});

module.exports = app;
