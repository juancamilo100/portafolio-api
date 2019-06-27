import { User } from '../models/user';
import createError from 'http-errors';

const authorizeUser = async (req, res, next) => {
    const user = await User.findById(req.userId).populate('portfolios');

    const isAuthorized = user.portfolios.find((portfolio) => {
        return req.params.id === portfolio.id;
    });

    if(!isAuthorized) return next(createError(401, 'Unauthorized'));
    next();
}

export { authorizeUser };