import { NextFunction, Request, RequestHandler, Response } from "express";
import createError from "http-errors";
import IDataService from "../interfaces/dataService.interface";
import FundDetailsService from '../services/fund.service'
import { IPortfolio } from "../models/portfolio";
import { FundAnalysis, AnalysisData, PortfolioAnalysisService } from "../services/analysis.service";

interface PortfolioAnalysisResult {
    analysis: FundAnalysis
    recommendedInvestmentAmount: number;
}

export default class AnalysisController {
    constructor(
        private fundDetailService: FundDetailsService, 
        private portfolioService: IDataService<IPortfolio>,
        private analysisService: PortfolioAnalysisService) {}

    public getPortfolioAnalysis: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const portfolio: IPortfolio | null = await this.portfolioService.get(req.params.id);
            const fundsDetails = await this.fundDetailService.getFundsDetails(portfolio!.funds);

            const prices = fundsDetails.map((detail) => {
                return parseFloat(detail.latestPrice);
            })

            const analysisData: AnalysisData = {
                funds: portfolio!.funds,
                latestPrices: prices,
                targetInvestment: parseInt(req.params.targetInvestment)
            }
            
            const analysis = this.analysisService.getFundsAnalysis(analysisData);
            const recommendedInvestmentAmount = this.analysisService.getRecommendedInvestmentAmount(analysisData);

            const analysisResult: PortfolioAnalysisResult = {
                analysis,
                recommendedInvestmentAmount
            }
            
            res.send(analysisResult);
        } catch (error) {
            next(createError(500));
        }
    }
}