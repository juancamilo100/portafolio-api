import https, { AxiosResponse } from 'axios';
import { IFund } from '../models/portfolio';

interface FundDetails {
    latestPrice: string,
    symbol: string,
    change: number,
    changePercent: number
}

export default class FundDetailsService {
    constructor(private stocksApiBaseUrl: string, private stocksApiToken: string) {}

    async getFundDetails(fund: IFund) {
        const url = `${this.stocksApiBaseUrl}/stock/${fund.symbol}/quote?token=${this.stocksApiToken}`;
        const response: AxiosResponse<FundDetails> = await https.get(url);    
        
        return {
            symbol: response.data.symbol,
            latestPrice: response.data.latestPrice,
            change: response.data.change,
            changePercent: response.data.changePercent
        };
    };

    async getFundsDetails(funds: IFund[]) {
        const allDetails = funds.map(async (fund) => {
            return await this.getFundDetails(fund);
        });

        const fundsDetails = await Promise.all(allDetails);
        return fundsDetails;
    }
}