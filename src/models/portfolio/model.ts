import mongoose, { Document } from 'mongoose';
import { schema } from './schema';
import { IUser } from '../user'

interface IFund {
    ticker: string,
    portfolioPercentage: string
}

interface IPortfolio extends Document{
    name: string,
    funds: IFund[],
    user: IUser['_id']
}

const Portfolio = mongoose.model<IPortfolio>('Portfolio', schema);

export { Portfolio, IPortfolio };