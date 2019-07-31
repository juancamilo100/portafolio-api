import portfolioService from '../../src/services/portfolio.service'
import { IPortfolio } from '../../src/models/portfolio'
import databaseManager from '../../src/mongo/databaseManager'
import { populatePortfoliosInTestDb, cleanupDb } from '../utils/dbPopulation'
import { testPortfolios } from '../utils/mockData'
import { TEST_DB_URL, TEST_DB_NAME } from '../config'
import { Types } from 'mongoose';

describe("Portfolio Service", () => {  
    const mongoDatabase = new databaseManager(
        TEST_DB_URL,
        TEST_DB_NAME
    );

    beforeAll(async (done) => {
        await mongoDatabase.connect();
        await populatePortfoliosInTestDb(testPortfolios);
        done();
    });

    beforeEach(() => {
    });

    afterEach(() => {
    });

    afterAll(async (done) => {
        await cleanupDb();
        await mongoDatabase.disconnect();
        done();
    });

    it("gets a portfolio by id", async (done) => { 
        let portfolio = await portfolioService.get(testPortfolios[0]._id.toHexString());
        expect(portfolio).toEqual(testPortfolios[0]);
        done();
    });

    it("gets a portfolio by one AND more fields", async (done) => {
        let portfolio = await portfolioService.getByFields({
            username: testPortfolios[0].name,
            funds: []
        });

        expect(portfolio).toEqual(null);

        portfolio = await portfolioService.getByFields({
            name: testPortfolios[0].name,
            funds: testPortfolios[0].funds
        });

        expect(portfolio).toEqual(testPortfolios[0]);
        done();
     });

     it("gets all portfolios", async (done) => {
        const portfolios = await portfolioService.getAll();
        portfolios.forEach((portfolio: IPortfolio, index: number) => {
            expect(portfolio).toEqual(testPortfolios[index]);
        });
        done();
    });

    it("gets a portfolio by one OR more fields", async (done) => { 
        let portfolio = await portfolioService.getByEitherFields(
            [
                { name: testPortfolios[0].name },
                { funds: [] }
            ]);

        expect(portfolio).toEqual(testPortfolios[0]);

        portfolio = await portfolioService.getByEitherFields(
            [
                { name: 'randomname' },
                { funds: testPortfolios[1].funds }
            ]);

        expect(portfolio).toEqual(testPortfolios[1]);
        done();
    });

    it("gets all portfolios by one AND more fields", async (done) => { 
        const portfolios = await portfolioService.getAllByFields({funds: testPortfolios[1].funds});
        expect(portfolios.length).toEqual(1);
        expect(portfolios[0].funds).toEqual(testPortfolios[1].funds);
        done();
    });

    it("creates a portfolio", async (done) => { 
        const portfolioToCreate = {
            name: "newPortfolio",
            funds: [
                {
                    _id: Types.ObjectId(),
                    ticker: "VTI",
                    portfolioPercentage: "80"
                },
                {
                    _id: Types.ObjectId(),
                    ticker: "VXUS",
                    portfolioPercentage: "20"
                }
            ],
            user: Types.ObjectId()
        } as unknown as IPortfolio

        const result = await portfolioService.create(portfolioToCreate);
        const portfolio = result.toObject();

        expect(portfolio.name).toEqual(portfolioToCreate.name);
        expect(portfolio.funds).toEqual(portfolioToCreate.funds);
        expect(portfolio.user).toEqual(portfolioToCreate.user);

        const portfolioFromDb = await portfolioService.get(portfolio._id);

        expect(portfolioFromDb.name).toEqual(portfolioToCreate.name);
        expect(portfolioFromDb.funds).toEqual(portfolioToCreate.funds);
        expect(portfolioFromDb.user).toEqual(portfolioToCreate.user);

        done();
    });

    it("updates a user", async (done) => { 
        const userToUpdate = {
            _id: testUsers[0]._id,
            username: 'newrandomusername',
            email: 'newrandomemail@email.com'
        } as unknown as IUser

        await userService.update(userToUpdate);
        const updatedUser = await userService.get(testUsers[0]._id.toHexString());

        expect(updatedUser.username).not.toEqual(testUsers[0].username);
        expect(updatedUser.email).not.toEqual(testUsers[0].email);

        expect(updatedUser.username).toEqual('newrandomusername');
        expect(updatedUser.email).toEqual('newrandomemail@email.com');

        expect(updatedUser.password).toEqual(testUsers[0].password);
        done();
    });
});