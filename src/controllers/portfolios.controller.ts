import { NextFunction, Request, RequestHandler, Response } from "express";
import createError from "http-errors";
import { IFund, Portfolio } from "../models/portfolio";
import PortfolioService from "../services/portfolio.service";
import { Types } from "mongoose";

// Need to add authorization to this route.  It should return all portfolios if it's an admin user
const getPortfolios: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
	try {
        // const portfolios = await Portfolio.find({user: req.userId!}).exec();
        const portfolios = await PortfolioService.getAll();
  res.send(portfolios);
	} catch (error) {
		next(createError(500));
	}
};

const getPortfolioById: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
	try {
		// const portfolio = await Portfolio.find({_id: req.params.id}).exec();
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

	let portafolioTotal = 0;
	req.body.funds.forEach((fund: IFund) => {
		portafolioTotal += Number.parseInt(fund.portfolioPercentage, 10);
	});

	if (portafolioTotal !== 100) {
		next(createError(400));
		return;
	}

	Types.ObjectId()

	try {
		// const newPortfolio = new Portfolio({
		// 	funds: req.body.funds,
		// 	name: req.body.name,
		// 	user: req.userId
		// });

		// const createdPortfolio = await newPortfolio.save();
		const createdPortfolio = await PortfolioService.create({
			_id: Types.ObjectId(),
			funds: req.body.funds,
			name: req.body.name,
			user: Types.ObjectId(req.userId)
		});
		res.send(createdPortfolio);
	} catch (error) {
		next(createError(500));
	}
};

const updatePorfolio: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const updatedPortfolio = await Portfolio.findOneAndUpdate(
			{ _id: req.params.id },
			req.body.updatedFields,
			{ new: true }
		).exec();

		res.send(updatedPortfolio);
	} catch (error) {
		next(createError(500));
	}
};

const deletePortfolio: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const deletedPortfolio = await Portfolio.findByIdAndRemove(req.params.id).exec();
		res.send(deletedPortfolio);
	} catch (error) {
		next(createError(500));
	}
};

export {
	getPortfolios,
	getPortfolioById,
	createPortfolio,
	updatePorfolio,
	deletePortfolio
};
