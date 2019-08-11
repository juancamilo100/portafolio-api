import https, { AxiosResponse } from 'axios';

interface FundDetails {
    latestPrice: string,
    symbol: string,
    change: number,
    changePercent: number
}

export default class FundDetailsService {
    constructor(private stocksApiBaseUrl: string, private stocksApiToken: string) {}

    async getDetails(fund: string) {
        const url = `${this.stocksApiBaseUrl}/stock/${fund}/quote?token=${this.stocksApiToken}`;
        const response: AxiosResponse<FundDetails> = await https.get(url);    
        return {
            symbol: response.data.symbol,
            latestPrice: response.data.latestPrice,
            change: response.data.change,
            changePercent: response.data.changePercent
        };
    };
}