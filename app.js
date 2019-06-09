const createError = require('http-errors');
const express = require('express');
const cookieParser = require('cookie-parser');
const errorHandler = require('./src/middleware/errorHandler');
const compression = require('compression');
const logger = require('morgan');
const initDatabaseStreams = require('./src/mongo/streams');
const { databaseInit } = require('./src/mongo/initDb');
const { authenticateUser } = require('./src/middleware/auth');

const authRouter = require('./src/controllers/auth');
const usersRouter = require('./src/controllers/users');
const portfoliosRouter = require('./src/controllers/portfolios');

const app = express();

databaseInit();
initDatabaseStreams();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(compression());

app.use('/users', authenticateUser, usersRouter);
app.use('/auth', authRouter);
app.use('/portfolios', authenticateUser, portfoliosRouter)

// catch 404 and forward to error handler
app.use((req, res, next) => {
	next(createError(404));
});

// error handler
app.use(errorHandler);

module.exports = app;
