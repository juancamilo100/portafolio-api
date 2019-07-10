import { Document, model, Types } from "mongoose";
import { IPortfolio } from "../portfolio/";
import { schema } from "./schema";

interface IUser extends Document {
	_id: Types.ObjectId
	username: string;
	email: string;
	password: string;
	portfolios: Array<IPortfolio["_id"]>;
}

const User = model<IUser>("User", schema);

export { User, IUser };
