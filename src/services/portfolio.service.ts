import { Types } from "mongoose";
import IDataService from "../interfaces/dataService.interface";
import { IPortfolio, Portfolio } from "../models/portfolio";

class PortfolioService implements IDataService<IPortfolio> {
    public getAll() {
        return Portfolio.find().lean().exec();
    }

    public getAllByFields(fields: object) {
        return  Portfolio.find(fields).lean().exec();
    }

    public get(id: string) {
        return Portfolio.findById(id).lean().exec();
    }

    public getByFields(fields: object) {
        return Portfolio.findOne(fields).lean().exec();
    }

    public getByEitherFields(fields: object) {
        return Portfolio.findOne({
            $or: fields
        }).lean().exec();
    }

    public create(entity: IPortfolio) {
        const newPortfolio = new Portfolio({
            _id: Types.ObjectId().toHexString(),
			funds: entity.funds,
			name: entity.name,
			user: entity.user
		});

		return newPortfolio.save();
    }

    public async update(entity: IPortfolio) {
        const { _id, ...updatedFields } = entity;

        return Portfolio.findOneAndUpdate(
			{ _id },
			updatedFields
        ).lean().exec();
    }

    public delete(id: string) {
        return Portfolio.findByIdAndRemove(id).exec();
    }
}

export default new PortfolioService();
