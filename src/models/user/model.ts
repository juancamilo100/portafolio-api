import { Document, model } from "mongoose";
import { IPortfolio } from "../portfolio/";
import { schema } from "./schema";

interface IUser extends Document {
	_id: string
	username: string;
	email: string;
	password: string;
    portfolios: Array<IPortfolio["_id"]>;
}

const User = model<IUser>("User", schema);

export { User, IUser };
