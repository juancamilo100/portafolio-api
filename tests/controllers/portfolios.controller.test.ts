import PortfoliosController from '../../src/controllers/portfolios.controller'
import portfolioService from '../../src/services/portfolio.service'
import { IPortfolio } from '../../src/models/portfolio';

describe("Users Controller", () => {  
    let portfolioController: PortfoliosController;
    let res: any;
    let nextFunction: any;

    const portfolios = [
        {
            _id: "1234",
            funds: [
                {
                    _id: "5d2fc59aae6b9816488dcf30",
                    ticker: "SCDH",
                    portfolioPercentage: "92"
                },
                {
                    _id: "5d2fc59aae6b9816488dcf31",
                    ticker: "STI",
                    portfolioPercentage: "8"
                }
            ],
            name: "SomePortfolio",
            user: "5cfafb0ccfe7761d47af53b3"
        },
        {
            _id: "7890",
            funds: [
                {
                    _id: "5d2fc59aae6b9816488dcf36",
                    ticker: "SCDH",
                    portfolioPercentage: "92"
                },
                {
                    _id: "5d2fc59aae6b9816488dcf35",
                    ticker: "STI",
                    portfolioPercentage: "8"
                }
            ],
            name: "AnotherPortfolio",
            user: "5cfafb0ccfe7761d47af53b3"
        }
    ];

    beforeAll(() => {
        portfolioController = new PortfoliosController(portfolioService);
        res = {
            send: jest.fn()
        };
        nextFunction = jest.fn();
    });

    beforeEach(() => {
        jest.resetAllMocks();
    });
    
    it("gets all portfolios for the current user", async () => { 
        portfolioService.getAllByFields = jest.fn().mockImplementation(() => {
            return Promise.resolve(portfolios);
        });

        const req: any = jest.fn();
        
        await portfolioController.getPortfolios(req, res, nextFunction);
        expect(res.send).toHaveBeenCalledWith(portfolios);
    });

    it("gets a portfolio by id", async () => { 
        portfolioService.get = jest.fn().mockImplementation(() => {
            return Promise.resolve(portfolios[0]);
        });

        const req: any = {
            params: {
                id: '1234',
            }
        }

        await portfolioController.getPortfolioById(req, res, nextFunction);
        expect(res.send).toHaveBeenCalledWith(portfolios[0]);
    });

    it("creates a new portfolio under the current user's id", async () => { 
        const currentUserId = '5cfafb0ccfe7761d47af53b3'
        const newPortfolio = {
            funds: [
                {
                    _id: "5d2fc59aae6b9816488dcf30",
                    ticker: "VTI",
                    portfolioPercentage: "90"
                },
                {
                    _id: "5d2fc59aae6b9816488dcf31",
                    ticker: "VXUS",
                    portfolioPercentage: "10"
                }
            ],
            name: "SomePortfolio",
        }
        
        const req: any = {
            body: newPortfolio,
            userId: currentUserId
        }

        const createdPortfolio = {
            funds: newPortfolio.funds,
            name: newPortfolio.name,
            user: currentUserId
        }
        
        portfolioService.create = jest.fn().mockImplementation((portfolio: IPortfolio) => {
            return Promise.resolve(portfolio);
        });

        await portfolioController.createPortfolio(req, res, nextFunction);
        expect(res.send).toHaveBeenCalledWith(createdPortfolio);
    });

    it("doesn't create a new portfolio with undefined funds field", async () => { 
        const currentUserId = '5cfafb0ccfe7761d47af53b3'
        const newPortfolio = {
            name: "SomePortfolio",
        }

        const req: any = {
            body: newPortfolio,
            userId: currentUserId
        }

        portfolioService.create = jest.fn().mockImplementation((portfolio: IPortfolio) => {
            return Promise.resolve(portfolio);
        });

        await portfolioController.createPortfolio(req, res, nextFunction);
        expect(nextFunction).toHaveBeenCalled();
        expect(res.send).toHaveBeenCalledTimes(0);
    });

    it("creates a portfolio with no funds", async () => { 
        const currentUserId = '5cfafb0ccfe7761d47af53b3'
        const newPortfolio = {
            name: "SomePortfolio",
            funds: []
        }

        const req: any = {
            body: newPortfolio,
            userId: currentUserId
        }

        const createdPortfolio = {
            funds: newPortfolio.funds,
            name: newPortfolio.name,
            user: currentUserId
        }

        portfolioService.create = jest.fn().mockImplementation((portfolio: IPortfolio) => {
            return Promise.resolve(portfolio);
        });

        await portfolioController.createPortfolio(req, res, nextFunction);
        expect(res.send).toHaveBeenCalledWith(createdPortfolio);
    });
});