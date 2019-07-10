import { NextFunction, Request, RequestHandler, Response } from "express";
import createError from "http-errors";
import { User } from "../models/user";

const authorizeUser: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
	const user = await User.findById(req.userId).exec();

	const isAuthorized = user!.portfolios.find((portfolioId) => {
		return req.params.id === portfolioId;
	});

	if (!isAuthorized) { return next(createError(401, "Unauthorized")); }
	next();
};

export { authorizeUser };
