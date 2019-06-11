const express = require('express');
const router = express.Router();
const createError = require('http-errors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { User } = require('../models/user');
const { SECRET_KEY } = require('../config');

const loginUser = async (req, res, next) => {
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
};

const registerUser = async (req, res, next) => {
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
};

module.exports = { loginUser, registerUser };