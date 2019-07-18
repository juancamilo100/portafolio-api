import { NextFunction, Request, RequestHandler, Response } from "express";
import createError from "http-errors";
import { IFund, IPortfolio } from "../models/portfolio";
import PortfolioService from "../services/portfolio.service";

// Need to add authorization to this route.  It should return all portfolios if it's an admin user
const getPortfolios: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
	try {
        const portfolios = await PortfolioService.getAllByFields({user: req.userId});
        res.send(portfolios);
	} catch (error) {
		next(createError(500));
	}
};

const getPortfolioById: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const portfolio = await PortfolioService.get(req.params.id);
		res.send(portfolio);
	} catch (error) {
		next(createError(500));
	}
};

const createPortfolio: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
	if (!req.body.funds) {
		next(createError(500));
		return;
	}

    if (!portfolioIsComplete(req.body.funds)) {
		next(createError(400));
		return;
	}

	try {
        const newPortfolio = {
			funds: req.body.funds,
			name: req.body.name,
			user: req.userId
        } as IPortfolio
        
		const createdPortfolio = await PortfolioService.create(newPortfolio);
		res.send(createdPortfolio);
	} catch (error) {
		next(createError(500));
	}
};

const updatePorfolio: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const portfolioToUpdate: IPortfolio = {
			_id: req.params.id,
			...req.body.updatedFields
        } 
        
        if(portfolioToUpdate.funds) {
            if (!portfolioIsComplete(portfolioToUpdate.funds)) {
                next(createError(400));
                return;
            }
        }
		
		const updatedPortfolio = await PortfolioService.update(portfolioToUpdate);
		res.send({ _id: updatedPortfolio!._id });
	} catch (error) {
		next(createError(500));
	}
};

const deletePortfolio: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const deletedPortfolio = await PortfolioService.delete(req.params.id);
		res.send(deletedPortfolio);
	} catch (error) {
		next(createError(500));
	}
};

const portfolioIsComplete = (funds: IFund[]) => {
    let portafolioTotal = 0;
	funds.forEach((fund: IFund) => {
		portafolioTotal += Number.parseInt(fund.portfolioPercentage, 10);
	});

	return portafolioTotal === 100
}

export {
	getPortfolios,
	getPortfolioById,
	createPortfolio,
	updatePorfolio,
	deletePortfolio
};
