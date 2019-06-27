import mongoose, { Document } from 'mongoose';
import { schema } from './schema';
import { IPortfolio } from '../portfolio/'

interface IUser extends Document {
    username: string,
    email: string,
    password: string,
    portfolios: IPortfolio['_id'][]
}

const User = mongoose.model<IUser>('User', schema);

export { User, IUser };