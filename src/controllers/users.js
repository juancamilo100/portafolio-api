const express = require('express');
const router = express.Router();
const createError = require('http-errors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { User } = require('../models/user');
const { SECRET_KEY } = require('../config');

router.get('/', async (req, res, next) => {
    try {
        const allUsers = await User.find().populate('portfolios');
        res.send(allUsers);
    } catch (error) {
        return next(createError(500));
    }
});

router.get('/:id', async (req, res, next) => {
    try {
        const user = await User.find({_id: req.params.id}).populate('portfolios');
        res.send(user);
    } catch (error) {
        return next(createError(500), 'Something went wrong');
    }
});

router.post('/signin', async (req, res, next) => {
    if(!req.body.username || !req.body.password) {
        return next(createError(400), 'Incomplete request');
    }

    try {
        const user = await User.find({ username: req.body.username });
        if(!user) return next(createError(404), 'User not found');

        const passwordIsValid = bcrypt.compareSync(req.body.password, user[0].password);
        if(!passwordIsValid) return next(createError(401), 'Wrong password');

        const token = jwt.sign({id: user._id}, SECRET_KEY, { expiresIn: 3600 })
        res.send({ auth: true, token});
    } catch (error) {
        return next(createError(500), 'Incomplete request');
    }
});

router.post('/register', async (req, res, next) => {
    if(!req.body.username || !req.body.password) {
        return next(createError(500), 'Incomplete request');
    }

    try {
        const byUsername = await User.find({ email: req.body.email });
        const byEmail = await User.find({ username: req.body.username });

        if( byUsername.length || byEmail.length) {
            return next(createError(409, 'User already exists'));
        }
    } catch (error) {
        return next(createError(500), 'Something went wrong');
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