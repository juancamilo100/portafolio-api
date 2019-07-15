import IDataService from '../interfaces/dataService.interface';
import { IUser, User } from '../models/user';
import { Types } from "mongoose";

class UserService implements IDataService<IUser> {
    public getAll() {
        return User.find().exec();
    }

    public get(id: string) {
        return User.findById(id).exec();
    }

    public getByField(field: object) {
        return User.findOne(field).exec();
    }
    
    public getByEitherFields(fields: Array<object>) {
        return User.findOne({
            $or: fields
        }).lean().exec();
    }

    public create(entity: IUser) {
        const newUser = new User({
            _id: Types.ObjectId(),
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
			{ _id: _id },
			updatedFields,
			{ new: true }
		).exec();
    }

    public delete(id: string) {
        return User.findByIdAndRemove(id).exec();
    }
}

export default new UserService();