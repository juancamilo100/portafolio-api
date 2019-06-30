import mongoose, { Document } from "mongoose";
import { IPortfolio } from "../portfolio/";
import { schema } from "./schema";

interface IUser extends Document {
	username: string;
	email: string;
	password: string;
	portfolios: Array<IPortfolio["_id"]>;
}

const User = mongoose.model<IUser>("User", schema);

export { User, IUser };
