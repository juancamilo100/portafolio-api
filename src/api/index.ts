import express from 'express';
import { authenticateUser } from '../middleware/auth';
import authRouter from '../routes/auth';
import usersRouter from '../routes/users';
import portfoliosRouter from '../routes/portfolios';

const router = express.Router();

router.use('/auth', authRouter);
router.use('/users', authenticateUser, usersRouter);
router.use('/portfolios', authenticateUser, portfoliosRouter);

export default router;