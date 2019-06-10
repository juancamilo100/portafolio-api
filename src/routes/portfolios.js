const express = require('express');
const router = express.Router();
const { authorizeUser } = require('../middleware/portfolioAuth');
const { 
    getPortfolios,
    getPortfolioById,
    createPortfolio,
    updatePorfolio,
    deletePortfolio
} = require('../controllers/portfolios');

router.get('/', getPortfolios);
router.get('/:id', authorizeUser, getPortfolioById);
router.post('/', createPortfolio);
router.patch('/:id', authorizeUser, updatePorfolio);
router.delete('/:id', authorizeUser, deletePortfolio);

module.exports = router;