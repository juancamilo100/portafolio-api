const express = require('express');
const router = express.Router();
const createError = require('http-errors');
const { Portfolio } = require('../models/portfolio');

router.get('/', async (req, res, next) => {
    const props = Object.keys(Portfolio.schema.paths);
    try {
        const allPortfolios = await Portfolio.find();
        res.send(allPortfolios);
    } catch (error) {
        next(createError(500));
    }
});

router.get('/:id', async (req, res, next) => {
    try {
        const portfolio = await Portfolio.find({_id: req.params.id});
        res.send(portfolio);
    } catch (error) {
        next(createError(500));
    }
});

router.post('/', async (req, res, next) => {
    if(!req.body.funds) {
        next(createError(500));
        return;
    }

    let portafolioTotal = 0;
    req.body.funds.forEach(fund => {
        portafolioTotal += Number.parseInt(fund.portfolioPercentage); 
    });

    if(portafolioTotal != 100) {
        next(createError(500));
        return;
    }

    try {
        const newPortfolio = new Portfolio({
            name: req.body.name,
            funds: req.body.funds,
            user: req.body.user
        });

        const createdPortfolio = await newPortfolio.save();
        res.send(createdPortfolio);
    } catch (error) {
        next(createError(500));
    }
});

router.patch('/:id', async (req, res, next) => {
    try {
        const updatedPortfolio = await Portfolio.findOneAndUpdate(
            { _id: req.params.id }, 
            req.body.updatedFields,
            { new: true }
        );

        res.send(updatedPortfolio);
    } catch (error) {
        next(createError(500));
    }
});

module.exports = router;

