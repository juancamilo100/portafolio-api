import { NextFunction, Request, RequestHandler, Response } from "express";
import createError from "http-errors";
import { User } from "../models/user";

// Need to add authorization to this route.  It should only be available for admin users
const getUsers: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const allUsers = await User.find().select(["-password"]).populate("portfolios").exec();
		res.send(allUsers);
	} catch (error) {
		return next(createError(500, "Something went wrong"));
	}
};

const getUserById: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
	if (req.userId !== req.params.id) { return next(createError(401, "Not authorized")); }

	try {
		const user = await User.findById(req.params.id, { password: 0 }).populate("portfolios").exec();
		res.send(user);
	} catch (error) {
		return next(createError(500, "Something went wrong"));
	}
};

export { getUsers, getUserById };
