import { Document, model, Types } from "mongoose";
import { IUser } from "../user";
import { schema } from "./schema";

interface IFund {
	ticker: string;
	portfolioPercentage: string;
}

interface IPortfolio extends Document {
    _id: Types.ObjectId
	name: string;
	funds: IFund[];
	user: IUser["_id"];
}

const Portfolio = model<IPortfolio>("Portfolio", schema);

export { Portfolio, IPortfolio, IFund };
