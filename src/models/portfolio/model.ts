import mongoose, { Document, Schema } from "mongoose";
import { IUser } from "../user";
import { schema } from "./schema";

interface IFund {
	ticker: string;
	portfolioPercentage: string;
}

interface IPortfolio extends Document {
    _id: Schema.Types.ObjectId
	name: string;
	funds: IFund[];
	user: IUser["_id"];
}

const Portfolio = mongoose.model<IPortfolio>("Portfolio", schema);

export { Portfolio, IPortfolio, IFund };
