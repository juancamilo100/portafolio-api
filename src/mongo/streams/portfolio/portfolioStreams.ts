import { IPortfolio, Portfolio } from "../../../models/portfolio";
import { IUser, User } from "../../../models/user";
import UserService from '../../../services/user.service'
import { Types } from "mongoose";

const operations = {
    INSERT: 'insert',
    DELETE: 'delete'
}

const targetOperations = Object.values(operations);

interface IPortfolioStreamData {
	operationType: string;
	documentKey: { _id: Types.ObjectId };
	fullDocument: IPortfolio;
}

const syncPortafolioToUser = async (data: IPortfolioStreamData) => {
    let user: IUser | undefined | null;
    let udpatedPortfolios: Array<IPortfolio["_id"]>

    switch (data.operationType) {
        case operations.INSERT:
            user = await UserService.get(data.fullDocument.user);

            udpatedPortfolios = user!.portfolios.slice(0);
            udpatedPortfolios.push(data.documentKey._id.toString());
            
            user!.portfolios = udpatedPortfolios;
			break;

		case operations.DELETE:
            const users = await UserService.getAll();

            user = users.find((user: IUser) => {
                return user.portfolios.includes(data.documentKey._id.toHexString());
            });

            udpatedPortfolios = user!.portfolios.slice(0);
            const portfolioIndexToDelete = udpatedPortfolios.indexOf(data.documentKey._id.toHexString());

            udpatedPortfolios.splice(portfolioIndexToDelete, 1);
			user!.portfolios = udpatedPortfolios;   
			break;

		default:
			break;
    }
    await user!.save();
};

const portfolioStreamsInit = () => {
	Portfolio.watch()
	.on("change", async (data) => {
		if (targetOperations.indexOf(data.operationType) > -1) {
			syncPortafolioToUser(data);
		}
	});
};

export default portfolioStreamsInit;
