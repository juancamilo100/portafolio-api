import { NextFunction, Request, RequestHandler, Response } from "express";
import createError from "http-errors";
import { User } from "../models/user";

const authorizeUser: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
	const user = await User.findById(req.userId).populate("portfolios").exec();

	const isAuthorized = user!.portfolios.find((portfolio) => {
		return req.params.id === portfolio.id;
	});

	if (!isAuthorized) { return next(createError(401, "Unauthorized")); }
	next();
};

export { authorizeUser };
