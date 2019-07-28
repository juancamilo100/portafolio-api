import PortfoliosController from '../../src/controllers/portfolios.controller'
import portfolioService from '../../src/services/portfolio.service'

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
            user: "123fb0c1234d47af89765"
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
    
    it("gets all users and hides their passwords", async () => { 
        portfolioService.getAll = jest.fn().mockImplementation(() => {
            return Promise.resolve(users);
        });

        const req: any = {
            body: {
                username: "someuser",
                password: "somepassword"
            }
        };
        
        await usersController.getUsers(req, res, nextFunction);
        expect(res.send).toHaveBeenCalledWith(usersWithoutPassword);
    });

    it("gets user by id and hides password", async () => {  
        const req: any = {
            userId: '1234',
            params: {
                id: '1234'
            }
        };

        userService.get = jest.fn().mockImplementation((id: string) => {
            return Promise.resolve(users[0]);
        });

        await usersController.getUserById(req, res, nextFunction);
        expect(res.send).toHaveBeenCalledWith(usersWithoutPassword[0]);
    });

    it("doesn't allow non admin users to fetch other user's data", async () => { 
        const req: any = {
            userId: '7890',
            params: {
                id: '1234'
            }
        };

        await usersController.getUserById(req, res, nextFunction);

        expect(nextFunction).toHaveBeenCalled();
        expect(res.send).toHaveBeenCalledTimes(0);
    });
});