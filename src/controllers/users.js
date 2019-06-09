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

router.get('/:id', authenticateUser, async (req, res, next) => {
    if(req.userId !== req.params.id) return next(createError(401, 'Not authorized'));

    try {
        const user = await User.findById(req.params.id, { password: 0 }).populate('portfolios');
        res.send(user);
    } catch (error) {
        return next(createError(500, 'Something went wrong'));
    }
});

router.post('/login', async (req, res, next) => {
    if(!req.body.username || !req.body.password) {
        return next(createError(400, 'Incomplete request'));
    }

    try {
        const user = await User.findOne({ username: req.body.username }).lean();
        if(!user) return next(createError(404, 'User not found'));

        const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
        if(!passwordIsValid) return next(createError(401, 'Unauthorized'));

        const token = jwt.sign({ userId: user._id }, SECRET_KEY, { expiresIn: 3600 })
        res.send({ auth: true, token});
    } catch (error) {
        return next(createError(500, 'Something went wrong'));
    }
});

router.post('/register', async (req, res, next) => {
    if(!req.body.username || !req.body.password) {
        return next(createError(500, 'Incomplete request'));
    }

    try {
        const byUsername = await User.findOne({ email: req.body.email }).lean();
        const byEmail = await User.findOne({ username: req.body.username }).lean();

        if(byUsername || byEmail) {
            return next(createError(409, 'User already exists'));
        }
    } catch (error) {
        return next(createError(500, 'Something went wrong'));
    }

    const hashedPassword = bcrypt.hashSync(req.body.password);
    
    try {
        const newUser = await User.create({
                                username: req.body.username,
                                password: hashedPassword,
                                email: req.body.email,
                                portfolios: []
                            });

        const token = jwt.sign({id: newUser._id}, SECRET_KEY, { expiresIn: 3600 })
        res.send({ auth: true, token});
    } catch (error) {
        return next(createError(500, error));
    }
})

module.exports = router;