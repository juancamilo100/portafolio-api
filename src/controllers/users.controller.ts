import {
    NextFunction,
    Request,
    RequestHandler,
    Response } from "express";
import createError from "http-errors";
import { IUser } from "../models/user";
import IDataService from '../interfaces/dataService.interface';

class UsersController {
    constructor(private userService: IDataService<IUser>) {}

    public getUsers: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
        try {
            let users = await this.userService.getAll();
            
            const response = users.map((user: IUser) => {
                return this.hidePassword(user);
            })
            
            res.send(response);
        } catch (error) {
            return next(createError(500, "Something went wrong"));
        }
    }

    //TODO: Add authorization to this endpoint.  Only admin user should be able to get any user by id
    public getUserById: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
        if (req.userId !== req.params.id) { return next(createError(401, "Not authorized")); }
    
        try {
            const user = await this.userService.get(req.params.id);
            res.send(this.hidePassword(user!));
        } catch (error) {
            return next(createError(500, "Something went wrong"));
        }
    }

    //TODO: Add authorization to this endpoint.  Only admin user should be able to perform this action
    public deleteUser: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const user = await this.userService.delete(req.params.id);
            res.send(this.hidePassword(user!));
        } catch (error) {
            return next(createError(500, "Something went wrong"));
        }
    }

    private hidePassword = (user: IUser) => {
        const userWithoutPassword = JSON.parse(JSON.stringify(user));
        delete userWithoutPassword.password
        return userWithoutPassword;
    }
}

export default UsersController