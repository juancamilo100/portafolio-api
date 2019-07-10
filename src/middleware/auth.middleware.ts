import { NextFunction, Request, RequestHandler, Response } from "express";
import createError from "http-errors";
import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../config";

interface IDecodedToken {
	userId: string;
}

const authenticateUser: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
	const token = req.header("authorization");
	if (!token) {
		return next(createError(401, "Unauthorized"));
	}

	try {
		const decodedToken = jwt.verify(token, SECRET_KEY) as IDecodedToken;
		req.userId = decodedToken.userId;
		next();
	} catch (error) {
		return next(createError(500, "Failed to authenticate"));
	}
};

export { authenticateUser };
