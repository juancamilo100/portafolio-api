const createError = require('http-errors');
const { User } = require('../models/user');

// Need to add authorization to this route.  It should only be available for admin users
const getUsers = async (req, res, next) => {
    try {
        const allUsers = await User.find().select(['-password']).populate('portfolios');
        res.send(allUsers);
    } catch (error) {
        return next(createError(500, 'Something went wrong'));
    }
};

const getUserById = async (req, res, next) => {
    if(req.userId !== req.params.id) return next(createError(401, 'Not authorized'));

    try {
        const user = await User.findById(req.params.id, { password: 0 }).populate('portfolios');
        res.send(user);
    } catch (error) {
        return next(createError(500, 'Something went wrong'));
    }
};

module.exports = { getUsers, getUserById };