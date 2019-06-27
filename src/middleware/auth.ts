import createError from 'http-errors';
import jwt from 'jsonwebtoken';
import { SECRET_KEY } from '../config';
import { Request, Response, NextFunction, RequestHandler } from 'express'

const authenticateUser: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('authorization');
    if(!token) {
        return next(createError(401, "Unauthorized"));
    }

    try {
        const decodedToken = jwt.verify(token, SECRET_KEY, { complete: true });
        req.userId = decodedToken.payload.userId;
        next();
    } catch (error) {
        return next(createError(500, "Failed to authenticate"));
    }
}

export { authenticateUser };