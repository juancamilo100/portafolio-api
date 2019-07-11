import IDataService from '../interfaces/dataService.interface';
import { IUser, User } from '../models/user';
import { Types } from "mongoose";

class PortfolioService implements IDataService<IUser> {
    public getAll() {
        return User.find().select(["-password"]).exec();
    }

    public get(id: string) {
        return User.findById(id).exec();
    }

    public create(entity: IUser) {
        const newUser = new User({
            _id: Types.ObjectId(),
			email: entity.email,
            password: entity.password,
            portfolios: [],
            username: entity.username
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

export default new PortfolioService();