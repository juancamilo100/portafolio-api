import { NextFunction, Request, RequestHandler, Response } from "express";
import createError from "http-errors";
import { User } from "../models/user";
import PortfolioService from '../services/portfolio.service'

const authorizeUser: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
	// const user = await User.findById(req.userId).exec();

	// const isAuthorized = user!.portfolios.find((portfolioId) => {
	// 	return req.params.id === portfolioId.toString();
    // });
    
    try {
        const isAuthorized = await PortfolioService.getByFields({_id: req.params.id, user: req.userId});
        if (!isAuthorized) { return next(createError(401, "Unauthorized")); }
    } catch (error) {
        return next(createError(500));
    }

	next();
};

export { authorizeUser };
