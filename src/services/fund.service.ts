import https, { AxiosResponse } from 'axios';

interface FundDetails {
    latestPrice: string,
    symbol: string,
    change: number,
    changePercent: number
}

export default class FundDetailsService {
    constructor(private stocksApiBaseUrl: string, private stocksApiToken: string) {}

    async getPrice(fund: string) {
        const url = `${this.stocksApiBaseUrl}/stock/${fund}/quote?token=${this.stocksApiToken}`;
        const response: AxiosResponse<FundDetails> = await https.get(url);    
        return {
            latestPrice: response.data.latestPrice
        };
    };
}