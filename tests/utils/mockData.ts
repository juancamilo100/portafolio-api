import { Types } from mongoose;

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

const testPortfolios = [
    {
        _id: Types.ObjectId(),
        name: "Portfolio1",
        funds: [
            {
                _id: Types.ObjectId(),
                ticker: "VTI",
                portfolioPercentage: 80
            },
            {
                _id: Types.ObjectId(),
                ticker: "VXUS",
                portfolioPercentage: 20
            }
        ],
        user: Types.ObjectId(),
    },
    {
        _id: Types.ObjectId(),
        name: "Portfolio2",
        funds: [
            {
                _id: Types.ObjectId(),
                ticker: "SCHD",
                portfolioPercentage: 70
            },
            {
                _id: Types.ObjectId(),
                ticker: "SCHX",
                portfolioPercentage: 30
            }
        ],
        user: Types.ObjectId(),
    }
];

export { testUsers, testPortfolios }