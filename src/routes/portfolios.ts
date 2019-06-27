import express from 'express';
import { authorizeUser } from '../middleware/portfolioAuth';
import { getPortfolios, getPortfolioById, createPortfolio, updatePorfolio, deletePortfolio } from '../controllers/portfolios';

const router = express.Router();

router.get('/', getPortfolios);
router.get('/:id', authorizeUser, getPortfolioById);
router.post('/', createPortfolio);
router.patch('/:id', authorizeUser, updatePorfolio);
router.delete('/:id', authorizeUser, deletePortfolio);

export default router;