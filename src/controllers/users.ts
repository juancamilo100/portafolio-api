import {
    NextFunction,
    Request,
    RequestHandler,
    Response } from "express";
import createError from "http-errors";
import { User } from "../models/user";

const getUsers: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const users = req.query.portfolios === "show" ?
			await User.find().select(["-password"]).populate("portfolios").exec() :
			await User.find().select(["-password"]).exec();

        res.send(users);
	} catch (error) {
		return next(createError(500, "Something went wrong"));
	}
};

const getUserById: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
	if (req.userId !== req.params.id) { return next(createError(401, "Not authorized")); }

	try {
		const user = await User.findById(req.userId, { password: 0 }).populate("portfolios").exec();
		res.send(user);
	} catch (error) {
		return next(createError(500, "Something went wrong"));
	}
};

//TODO: Add authorization to this endpoint.  Only admin user should be able to perform this action
const deleteUser: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const deletedUser = await User.findOneAndDelete({ _id: req.params.id }).exec();
		res.send(deletedUser);
	} catch (error) {
		return next(createError(500, "Something went wrong"));
	}
};

export {
    deleteUser,
    getUsers,
    getUserById,
};
