import { User } from '../../src/models/user'


const populateUsersInTestDb = async (testUsers: Array<object>) => {
    await User.collection.insertMany(testUsers);
}

const cleanupDb = async () => {
    await User.remove({}).exec();
}

export { populateUsersInTestDb, cleanupDb }
