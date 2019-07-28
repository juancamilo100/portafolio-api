import { NextFunction, Request, RequestHandler, Response } from "express";
import createError from "http-errors";
import { IFund, IPortfolio } from "../models/portfolio";
import IDataService from '../interfaces/dataService.interface';

class PortfoliosController {
    constructor(private portfolioService: IDataService<IPortfolio>) {}

    // Need to add authorization to this route.  It should return all portfolios if it's an admin user
    public getPortfolios: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const portfolios = await this.portfolioService.getAllByFields({user: req.userId});
            res.send(portfolios);
        } catch (error) {
            next(createError(500));
        }
    }   
    
    public getPortfolioById: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const portfolio = await this.portfolioService.get(req.params.id);
            res.send(portfolio);
        } catch (error) {
            next(createError(500));
        }
    }

    public createPortfolio: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
        if (!req.body.funds) {
            next(createError(400, "Incomplete request"));
            return;
        }
    
        if (!this.portfolioIsComplete(req.body.funds)) {
            next(createError(400));
            return;
        }
    
        try {
            const newPortfolio = {
                funds: req.body.funds,
                name: req.body.name,
                user: req.userId
            } as IPortfolio
            
            const createdPortfolio = await this.portfolioService.create(newPortfolio);
            res.send(createdPortfolio);
        } catch (error) {
            next(createError(500));
        }
    }

    public updatePorfolio: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const portfolioToUpdate: IPortfolio = {
                _id: req.params.id,
                ...req.body.updatedFields
            } 
            
            if(portfolioToUpdate.funds) {
                if (!this.portfolioIsComplete(portfolioToUpdate.funds)) {
                    next(createError(400));
                    return;
                }
            }
            
            const updatedPortfolio = await this.portfolioService.update(portfolioToUpdate);
            res.send({ _id: updatedPortfolio!._id });
        } catch (error) {
            next(createError(500));
        }
    }

    public deletePortfolio: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const deletedPortfolio = await this.portfolioService.delete(req.params.id);
            res.send(deletedPortfolio);
        } catch (error) {
            next(createError(500));
        }
    }

    private portfolioIsComplete = (funds: IFund[]) => {
        if(funds.length > 0) {
            let portafolioTotal = 0;

            funds.forEach((fund: IFund) => {
                portafolioTotal += Number.parseInt(fund.portfolioPercentage, 10);
            });

            return portafolioTotal === 100
        }
        else {
            return true;
        }
    }
}

export default PortfoliosController
