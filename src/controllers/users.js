const express = require('express');
const router = express.Router();
const createError = require('http-errors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { authenticateUser } = require('../middleware/auth')
const { User } = require('../models/user');
const { SECRET_KEY } = require('../config');

// Need to add authorization to this route.  It should only be available for admin users
router.get('/', async (req, res, next) => {
    try {
        const allUsers = await User.find().select(['-password']).populate('portfolios');
        res.send(allUsers);
    } catch (error) {
        return next(createError(500, 'Something went wrong'));
    }
});

router.get('/:id', async (req, res, next) => {
    if(req.userId !== req.params.id) return next(createError(401, 'Not authorized'));

    try {
        const user = await User.findById(req.params.id, { password: 0 }).populate('portfolios');
        res.send(user);
    } catch (error) {
        return next(createError(500, 'Something went wrong'));
    }
});

module.exports = router;