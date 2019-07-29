import { Types } from "mongoose";

const testUsers = [
    {
        _id: Types.ObjectId(),
        username: 'testuser1',
        email: 'testuser1@email.com',
        password: 'somepassword1',
        portfolios: [
            Types.ObjectId(),
            Types.ObjectId()
        ]
    },
    {
        _id: Types.ObjectId(),
        username: 'testuser2',
        email: 'testuser2@email.com',
        password: 'somepassword2',
        portfolios: [
            Types.ObjectId(),
            Types.ObjectId(),
            Types.ObjectId()
        ]
    }
]

export { testUsers }