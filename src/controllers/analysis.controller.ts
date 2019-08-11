import { NextFunction, Request, RequestHandler, Response } from "express";
import createError from "http-errors";
import IDataService from "../interfaces/dataService.interface";
import FundDetailsService from '../services/fund.service'
import { IFund, IPortfolio } from "../models/portfolio";

interface PortfolioAnalysisResult {
    fundsAllocation: FundAnalysisResult[];
    moneyAvailable: number;
}

interface FundAnalysisResult {
    fund: string,
    sharesToBuy: number,
    moneyInvested: number
}

interface AnalysisData {
    funds: IFund[], 
    latestPrices: number[], 
    targetInvestment: number
}

export default class AnalysisController {
    constructor(
        private fundDetailService: FundDetailsService, 
        private portfolioService: IDataService<IPortfolio>) {}

    public getFundDetails: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const portfolio: IPortfolio | null = await this.portfolioService.get(req.params.id);
            const promises = portfolio!.funds.map(async (fund) => {
                return await this.fundDetailService.getDetails(fund.ticker);
            });

            const fundsDetails = await Promise.all(promises);
            const prices = fundsDetails.map((detail) => {
                return parseFloat(detail.latestPrice);
            })

            const analysisData: AnalysisData = {
                funds: portfolio!.funds,
                latestPrices: prices,
                targetInvestment: parseInt(req.params.targetInvestment)
            }
            
            const fundsAnalysis = this.getFundsAnalysis(analysisData);
            const recommendedInvestmentAmount = this.getRecommendedInvestmentAmount(analysisData);
            
            res.send({
                ...fundsAnalysis,
                recommendedInvestmentAmount
            });
        } catch (error) {
            next(createError(500));
        }
    }

    getSharesToBuy(
        targetInvestment: number, 
        portfolioPercentage: number, 
        fundPrice: number) {
            const amountFromInvestment = (targetInvestment * portfolioPercentage) / 100;
            const shares = (amountFromInvestment / fundPrice);
            
            return Math.floor(shares);
    }

    getFundsAnalysis(analysisData: AnalysisData) {
        let totalMoneyInvested: number = 0;
        let moneyLeftover: number = 0;

        const analysis = analysisData.funds.map((currentFund, index) => {
            const fund = currentFund.ticker;
            const price = analysisData.latestPrices[index];
            const sharesToBuy = 
                this.getSharesToBuy(analysisData.targetInvestment, parseInt(currentFund.portfolioPercentage), price);
            
            const moneyInvested = parseFloat((sharesToBuy * price).toFixed(2));
            totalMoneyInvested += moneyInvested;
            
            return {
                fund,
                price,
                sharesToBuy,
                moneyInvested
            }
        });

        totalMoneyInvested = parseFloat(totalMoneyInvested.toFixed(2));
        moneyLeftover = analysisData.targetInvestment - totalMoneyInvested;

        return {
            analysis,
            totalMoneyInvested,
            moneyLeftover
        }
    }

    getRecommendedInvestmentAmount(analysisData: AnalysisData, tolerance: number = 500) {
        const stepSize: number = 20;
        const investmentVariances = [];
        const lowerLimit: number = analysisData.targetInvestment;
        const upperLimit: number = analysisData.targetInvestment + tolerance;

        for (let investmentAmount = lowerLimit; investmentAmount <= upperLimit; investmentAmount += stepSize) {
            analysisData = {
                ...analysisData,
                targetInvestment: investmentAmount
            }
            
            const fundsAnalysis = this.getFundsAnalysis(analysisData);

            investmentVariances.push({
                moneyLeftOver: fundsAnalysis.moneyLeftover,
                investmentAmount
            });
        }

        investmentVariances.sort((a, b) => (a.moneyLeftOver > b.moneyLeftOver) ? 1 : -1);
        return investmentVariances[0].investmentAmount;
    }
}