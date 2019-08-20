import FundDetailsService from '../../src/services/fund.service';
import portfolioService from '../../src/services/portfolio.service';
import { PortfolioAnalysisService } from '../../src/services/analysis.service';
import AnalysisController from '../../src/controllers/analysis.controller';
import { STOCKS_API_TOKEN, STOCKS_API_BASE_URL } from '../../config'

describe("Auth Controller", () => {  
    let analysisController: AnalysisController;
    let fundDetailsService: FundDetailsService;
    let analysisService: PortfolioAnalysisService;
    
    beforeAll(() => {
        fundDetailsService = new FundDetailsService(STOCKS_API_BASE_URL, STOCKS_API_TOKEN);
        analysisService = new PortfolioAnalysisService();
        analysisService.getFundsAnalysis = jest.fn().mockImplementation(() => {})

        analysisController = new AnalysisController(fundDetailsService, portfolioService, analysisService);
    });

    it("throws error if target investment is less than zero", async () => {
        const req: any = {
            params: {
                targetInvestment: -10
            }
        }

        const res: any = {
            send: jest.fn()
        };

        const nextFunction = jest.fn();

        await analysisController.getPortfolioAnalysis(req, res, nextFunction);
        expect(nextFunction).toHaveBeenCalled();
        expect(res.send).toHaveBeenCalledTimes(0);
    });

    it("throws error if target investment is less than zero", async () => { 
    
    });

});
