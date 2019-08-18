import { NextFunction, Request, RequestHandler, Response } from "express";
import createError from "http-errors";
import IDataService from "../interfaces/dataService.interface";
import FundDetailsService from '../services/fund.service'
import { IPortfolio } from "../models/portfolio";
import { FundAnalysisResult, AnalysisData, PortfolioAnalysisService } from "../services/analysis.service";

interface PortfolioAnalysisResult {
    fundsAllocation: FundAnalysisResult[];
    totalMoneyInvested: number;
    moneyLeftover: number;
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
            
            const fundsAnalysis = this.analysisService.getFundsAnalysis(analysisData);
            const recommendedInvestmentAmount = this.analysisService.getRecommendedInvestmentAmount(analysisData);

            const analysisResult: PortfolioAnalysisResult = {
                fundsAllocation: fundsAnalysis.analysis,
                totalMoneyInvested: fundsAnalysis.totalMoneyInvested,
                moneyLeftover: fundsAnalysis.moneyLeftover,
                recommendedInvestmentAmount: recommendedInvestmentAmount
            }
            
            res.send(analysisResult);
        } catch (error) {
            next(createError(500));
        }
    }

    // getSharesToBuy(
    //     targetInvestment: number, 
    //     portfolioPercentage: number, 
    //     fundPrice: number) {
    //         const amountFromInvestment = (targetInvestment * portfolioPercentage) / 100;
    //         const shares = (amountFromInvestment / fundPrice);
            
    //         return Math.floor(shares);
    // }

    // getFundsAnalysis(analysisData: AnalysisData) {
    //     let totalMoneyInvested: number = 0;
    //     let moneyLeftover: number = 0;

    //     const analysis = analysisData.funds.map((currentFund, index) => {
    //         const fund = currentFund.symbol;
    //         const price = analysisData.latestPrices[index];
    //         const sharesToBuy = 
    //             this.getSharesToBuy(analysisData.targetInvestment, parseInt(currentFund.portfolioPercentage), price);
            
    //         const moneyInvested = parseFloat((sharesToBuy * price).toFixed(2));
    //         totalMoneyInvested += moneyInvested;
            
    //         return {
    //             fund,
    //             price,
    //             sharesToBuy,
    //             moneyInvested
    //         }
    //     });

    //     totalMoneyInvested = parseFloat(totalMoneyInvested.toFixed(2));
    //     moneyLeftover = analysisData.targetInvestment - totalMoneyInvested;
    //     moneyLeftover = parseFloat(moneyLeftover.toFixed(2));

    //     return {
    //         analysis,
    //         totalMoneyInvested,
    //         moneyLeftover
    //     }
    // }

    // getRecommendedInvestmentAmount(analysisData: AnalysisData, tolerance: number = 500) {
    //     const stepSize: number = 20;
    //     const investmentVariances = [];
    //     const lowerLimit: number = analysisData.targetInvestment;
    //     const upperLimit: number = analysisData.targetInvestment + tolerance;

    //     for (let investmentAmount = lowerLimit; investmentAmount <= upperLimit; investmentAmount += stepSize) {
    //         analysisData = {
    //             ...analysisData,
    //             targetInvestment: investmentAmount
    //         }
            
    //         const fundsAnalysis = this.getFundsAnalysis(analysisData);

    //         investmentVariances.push({
    //             moneyLeftOver: fundsAnalysis.moneyLeftover,
    //             investmentAmount
    //         });
    //     }

    //     investmentVariances.sort((a, b) => (a.moneyLeftOver > b.moneyLeftOver) ? 1 : -1);
    //     return investmentVariances[0].investmentAmount;
    // }
}