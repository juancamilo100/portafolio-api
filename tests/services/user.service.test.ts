import userService from '../../src/services/user.service'
import { IUser } from '../../src/models/user'
import databaseManager from '../../src/mongo/databaseManager'
import { populateUsersInTestDb, cleanupDb } from '../utils/dbPopulation'
import { testUsers } from '../utils/testData'

describe("Users Service", () => {  
    const mongoDatabase = new databaseManager(
        "mongodb://localhost:27017/",
        "testdb"
    );

    beforeAll(async (done) => {
        await mongoDatabase.connect();
        await populateUsersInTestDb(testUsers);
        done();
    });

    beforeEach(() => {
        // user = new CommentModel(testData.normalComment);
        // return comment.save();
    });

    afterEach(() => {
        // return CommentModel.removeComments();
    });

    afterAll(async (done) => {
        await cleanupDb();
        await mongoDatabase.disconnect();
        done();
    });

    it("gets all users", async (done) => {
        const users = await userService.getAll();
        users.forEach((user: IUser, index: number) => {
            expect(user._id).toEqual(testUsers[index]._id);
            expect(user.username).toEqual(testUsers[index].username);
            expect(user.password).toEqual(testUsers[index].password);
            expect(user.email).toEqual(testUsers[index].email);
            expect(user.portfolios).toEqual(testUsers[index].portfolios);
        });
        done();
     });
});