import IDataService from '../interfaces/dataService.interface';
import { IUser, User } from '../models/user';
import { Types } from "mongoose";

class UserService implements IDataService<IUser> {
    public get(id: string) {
        console.log("SHOULD NOT BE HEREEE!!");
        
        return User.findById(id).exec();
    }

    public getByFields(fields: object) {
        return User.findOne(fields).exec();
    }
    
    public getByEitherFields(fields: Array<object>) {
        return User.findOne({
            $or: fields
        }).lean().exec();
    }

    public getAll() {
        return User.find().exec();
    }

    public getAllByFields(fields: object) {
       return  User.find(fields).exec();
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