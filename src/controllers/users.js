const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const createError = require('http-errors');
const { User } = require('../models/user');

router.get('/', async (req, res, next) => {
    try {
        const allUsers = await User.find().populate('portfolios');
        res.send(allUsers);
    } catch (error) {
        next(createError(500));
    }
});

router.get('/:id', async (req, res, next) => {
    try {
        const user = await User.find({_id: req.params.id}).populate('portfolios');
        res.send(user);
    } catch (error) {
        next(createError(500));
    }
});

router.post('/', async (req, res, next) => {
    if(!req.body.firstname || !req.body.lastname) {
        next(createError(500));
        return;
    }

    try {
        const newUser = new User({
            _id: mongoose.Types.ObjectId(),
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            portfolios: []
        });

        const createdUser = await newUser.save();
        res.send(createdUser);
    } catch (error) {
        next(createError(500));
    }
});

module.exports = router;