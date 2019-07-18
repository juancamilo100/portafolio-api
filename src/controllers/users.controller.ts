import {
    NextFunction,
    Request,
    RequestHandler,
    Response } from "express";
import createError from "http-errors";
import UserService from "../services/user.service";
import { IUser } from "../models/user";

const getUsers: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
	try {
        let users = await UserService.getAll();
        
        const response = users.map((user: IUser) => {
            return hidePassword(user);
        })
		
        res.send(response);
	} catch (error) {
		return next(createError(500, "Something went wrong"));
	}
};

const getUserById: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
	if (req.userId !== req.params.id) { return next(createError(401, "Not authorized")); }

	try {
		const user = await UserService.get(req.params.id);
		res.send(hidePassword(user!));
	} catch (error) {
		return next(createError(500, "Something went wrong"));
	}
};

//TODO: Add authorization to this endpoint.  Only admin user should be able to perform this action
const deleteUser: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const user = await UserService.delete(req.params.id);
		res.send(hidePassword(user!));
	} catch (error) {
		return next(createError(500, "Something went wrong"));
	}
};

const hidePassword = (user: IUser) => {
	return (user as object).deepClone().deleteProperty('password');
}

export {
    deleteUser,
    getUsers,
    getUserById,
};
