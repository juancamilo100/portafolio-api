import { IPortfolio, Portfolio } from "../../../models/portfolio";
import { IUser, User } from "../../../models/user";
import { Types } from "mongoose";

interface IPortfolioStreamData {
	operationType: string;
	documentKey: { _id: string };
	fullDocument: IPortfolio;
}

const syncPortafolioToUser = async (data: IPortfolioStreamData) => {
	const user: IUser | null = await User.findById(data.fullDocument.user).exec();
	const newPortfolios: Array<IPortfolio["_id"]> = user!.portfolios.slice(0);

	switch (data.operationType) {
		case "insert":
			const portfolioId = Types.ObjectId(data.documentKey._id); 
			newPortfolios.push(portfolioId);
			user!.portfolios = newPortfolios;
			break;

		case "delete":
			user!.portfolios = newPortfolios.filter(
					(portfolioId: IPortfolio["_id"]) => portfolioId.toHexString() !== data.documentKey._id
				);
			break;

		default:
			break;
	}

	await user!.save();
};

const portfolioStreamsInit = () => {
	Portfolio.watch()
	.on("change", async (data) => {
		if (["insert", "delete"].indexOf(data.operationType) > -1) {
			syncPortafolioToUser(data);
		}
	});
};

export default portfolioStreamsInit;
