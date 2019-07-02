import bcrypt from "bcryptjs";
import { NextFunction, Request, RequestHandler, Response } from "express";
import createError from "http-errors";
import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../config";
import { User } from "../models/user";

const loginUser: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
	if (!req.body.username || !req.body.password) {
		return next(createError(400, "Incomplete request"));
	}

	try {
		const user = await User.findOne({ username: req.body.username }).lean().exec();
		if (!user) { return next(createError(404, "User not found")); }

		const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
		if (!passwordIsValid) { return next(createError(401, "Unauthorized")); }

		const token = jwt.sign({ userId: user._id }, SECRET_KEY, { expiresIn: 3600 });
		res.send({ auth: true, token});
	} catch (error) {
		return next(createError(500, "Something went wrong"));
	}
};

const registerUser: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
	if (!req.body.username || !req.body.password) {
		return next(createError(500, "Incomplete request"));
	}

	try {
		const byUsername = await User.findOne({ email: req.body.email }).lean().exec();
		const byEmail = await User.findOne({ username: req.body.username }).lean().exec();

		if (byUsername || byEmail) {
			return next(createError(409, "User already exists"));
		}
	} catch (error) {
		return next(createError(500, "Something went wrong"));
	}

	const hashedPassword = bcrypt.hashSync(req.body.password);

	try {
		const newUser = await User.create({
								email: req.body.email,
								password: hashedPassword,
								portfolios: [],
								username: req.body.username
							});

		const token = jwt.sign({id: newUser._id}, SECRET_KEY, { expiresIn: 3600 });
		res.send({ auth: true, token});
	} catch (error) {
		return next(createError(500, error));
	}
};

export { loginUser, registerUser };
