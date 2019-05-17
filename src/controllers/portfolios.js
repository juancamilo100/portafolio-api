const express = require('express');
const router = express.Router();
const createError = require('http-errors');
const { Portfolio } = require('../models/portfolio');

router.get('/', async (req, res, next) => {
    try {
        const allPortfolios = await Portfolio.find();
        res.send(allPortfolios);
    } catch (error) {
        next(createError(500));
    }
    // res.send("Dummy bro!");
    
});

router.post('/', async (req, res, next) => {
    // console.log(req.body.porfolio);
    try {
        const newPortfolio = new Portfolio(req.body.porfolio);
        const createdPortfolio = await newPortfolio.save();
        res.send(createdPortfolio);
    } catch (error) {
        next(createError(500));
    }
});

module.exports = router;

