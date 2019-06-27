import { User, IUser } from '../../../models/user';
import { Portfolio, IPortfolio } from '../../../models/portfolio';

interface IPortfolioStreamData {
    operationType: string,
    documentKey: { _id: string }
    fullDocument: IPortfolio,
}

const syncPortafolioToUser = async (data: IPortfolioStreamData, operation: string) => {
    try {
        const user: IUser | null = await User.findById(data.fullDocument.user);
        const newPortfolios: IPortfolio['_id'][] = user!.portfolios.slice(0);

        switch (operation) {
            case "insert":
                newPortfolios.push(data.documentKey._id);
                user!.portfolios = newPortfolios;
                break;
            
            case "delete":
                user!.portfolios = newPortfolios.filter(
                        (portfolioId: IPortfolio['_id']) => !(portfolioId === data.documentKey._id)
                    );
                break;                
        
            default:
                break;
        }

        await user!.save();
    } catch (error) {
        throw error;
    }
}

const portfolioStreamsInit = () => {
    Portfolio.watch()
    .on('change', async (data) => { 
        if (['insert', 'delete'].indexOf(data.operationType) > -1) {
            syncPortafolioToUser(data, data.operationType);
        }
    });
}

export default portfolioStreamsInit;