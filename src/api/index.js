const express = require('express');
const router = express.Router();
const { authenticateUser } = require('../middleware/auth');

const authRouter = require('../routes/auth');
const usersRouter = require('../routes/users');
const portfoliosRouter = require('../routes/portfolios');

router.use('/auth', authRouter);
router.use('/users', authenticateUser, usersRouter);
router.use('/portfolios', authenticateUser, portfoliosRouter);

module.exports = router;