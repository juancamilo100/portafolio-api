import { IFund } from "../models/portfolio";

export interface FundAnalysisResult {
    fund: string,
    sharesToBuy: number,
    moneyInvested: number
}

export interface AnalysisData {
    funds: IFund[], 
    latestPrices: number[], 
    targetInvestment: number
}

export default class PortfolioAnalysisService {
    getFundsAnalysis(analysisData: AnalysisData) {
        let totalMoneyInvested: number = 0;
        let moneyLeftover: number = 0;

        const analysis = analysisData.funds.map((currentFund, index) => {
            const fund = currentFund.symbol;
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
        moneyLeftover = parseFloat(moneyLeftover.toFixed(2));

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

    private getSharesToBuy(targetInvestment: number, portfolioPercentage: number, fundPrice: number) {
        const amountFromInvestment = (targetInvestment * portfolioPercentage) / 100;
        const shares = (amountFromInvestment / fundPrice);
        
        return Math.floor(shares);
    }
}