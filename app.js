const createError = require('http-errors');
const express = require('express');
const cookieParser = require('cookie-parser');
const errorHandler = require('./src/middleware/errorHandler');
const notFoundHandler = require('./src/middleware/notFoundHandler');
const compression = require('compression');
const logger = require('morgan');
const initDatabaseStreams = require('./src/mongo/streams');
const apiRoutes = require('./src/api');
const { databaseInit } = require('./src/mongo/initDb');

const app = express();

databaseInit();
initDatabaseStreams();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(compression());

app.use('/api', apiRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;
