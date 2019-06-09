const createError = require('http-errors');
const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../config');

const authenticateUser = async (req, res, next) => {
    const token = req.header('authorization');
    if(!token) {
        return next(createError(401, "Unauthorized"));
    }

    try {
        const decodedToken = jwt.verify(token, SECRET_KEY, {complete: true});
        req.userId = decodedToken.payload.userId;
        next();
    } catch (error) {
        return next(createError(500, "Failed to authenticate"));
    }
}

module.exports = { authenticateUser };