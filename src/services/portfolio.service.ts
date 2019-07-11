import IDataService from '../interfaces/dataService.interface';
import { IPortfolio, Portfolio } from '../models/portfolio';
import { Types } from "mongoose";

class PortfolioService implements IDataService<IPortfolio> {
    public getAll() {
        return Portfolio.find().exec();
    }

    public get(id: string) {
        return Portfolio.findById(id).exec();
    }

    public create(entity: IPortfolio) {
        const newPortfolio = new Portfolio({
            _id: Types.ObjectId(),
			funds: entity.funds,
			name: entity.name,
			user: entity.user
		});

		return newPortfolio.save();
    }

    public update(entity: IPortfolio) {
        const { _id, ...updatedFields } = entity;

        return Portfolio.findOneAndUpdate(
			{ _id: _id },
			updatedFields,
			{ new: true }
		).exec();
    }

    public delete(id: string) {
        return Portfolio.findByIdAndRemove(id).exec();
    }
}

export default new PortfolioService();