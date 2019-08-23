import { IFund } from "../models/portfolio";

interface FundAllocation {
    fund: string,
    price: number,
    sharesToBuy: number,
    moneyInvested: number
}

export interface FundAnalysis {
    allocation: FundAllocation[]
    totalMoneyInvested: number,
    moneyLeftover: number
}

export interface AnalysisData {
    funds: IFund[], 
    latestPrices: number[], 
    targetInvestment: number
}

export class PortfolioAnalysisService {
    getFundsAnalysis(analysisData: AnalysisData): FundAnalysis {
        let totalMoneyInvested: number = 0;
        let moneyLeftover: number = 0;

        const allocation: FundAllocation[] = analysisData.funds.map((currentFund, index) => {
            const fund = currentFund.symbol;
            const price = analysisData.latestPrices[index];

            let sharesToBuy: number = 0;
            try {
                sharesToBuy = 
                    this.getSharesToBuy(analysisData.targetInvestment, parseInt(currentFund.portfolioPercentage), price);
            } catch (error) {
                throw new Error(error);
            }
            
            const moneyInvested = parseFloat((sharesToBuy * price).toFixed(2));
            totalMoneyInvested += moneyInvested;

            const result: FundAllocation = {
                fund,
                price,
                sharesToBuy,
                moneyInvested
            }
            
            return result
        });

        totalMoneyInvested = parseFloat(totalMoneyInvested.toFixed(2));
        moneyLeftover = analysisData.targetInvestment - totalMoneyInvested;
        moneyLeftover = parseFloat(moneyLeftover.toFixed(2));

        const fundAnalysisResult: FundAnalysis = {
            allocation,
            totalMoneyInvested,
            moneyLeftover
        }

        return fundAnalysisResult;
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

    private getSharesToBuy(targetInvestment: number, portfolioPercentage: number, fundPrice: number): number {
        if(fundPrice === 0) throw new Error("Division by zero");

        const amountFromInvestment = (targetInvestment * portfolioPercentage) / 100;
        const shares = (amountFromInvestment / fundPrice);
        
        return Math.floor(shares);
    }
}