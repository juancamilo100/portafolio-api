const createError = require('http-errors');

const notFoundHandler = (req, res, next) => {
	next(createError(404));
};

module.exports = notFoundHandler;