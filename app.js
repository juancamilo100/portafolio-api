const createError = require('http-errors');
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const { databaseInit } = require('./src/mongo/initDb');
const errorHandler = require('./src/middleware/errorHandler');

const usersRouter = require('./routes/users');
const portfoliosRouter = require('./src/controllers/portfolios');

const app = express();

databaseInit();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/users', usersRouter);
app.use('/portfolios', portfoliosRouter)

// catch 404 and forward to error handler
app.use((req, res, next) => {
	next(createError(404));
});

// error handler
app.use(errorHandler);

module.exports = app;
