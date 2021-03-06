import { Types } from "mongoose";
import IDataService from "../interfaces/dataService.interface";
import { IUser, User } from "../models/user";

class UserService implements IDataService<IUser> {
    public get(id: string) {
        return User.findById(id).lean().exec();
    }

    public getByFields(fields: object) {
        return User.findOne(fields).lean().exec();
    }

    public getByEitherFields(fields: object[]) {
        return User.findOne({
            $or: fields
        }).lean().exec();
    }

    public getAll() {
        return User.find().lean().exec();
    }

    public getAllByFields(fields: object) {
        return  User.find(fields).exec();
    }

    public create(entity: IUser) {
        const newUser = new User({
            _id: Types.ObjectId().toHexString(),
            username: entity.username,
            password: entity.password,
			email: entity.email,
            portfolios: []
		});

	    return newUser.save();
    }

    public update(entity: IUser) {
        const { _id, ...updatedFields } = entity;

        return User.findOneAndUpdate(
			{ _id },
			updatedFields,
			{ new: true }
		).exec();
    }

    public delete(id: string) {
        return User.findByIdAndRemove(id).exec();
    }
}

export default new UserService();
