import UsersController from '../../src/controllers/users.controller'
import userService from '../../src/services/user.service'
import bcrypt from "bcryptjs";

describe("Users Controller", () => {  
    let usersController: UsersController;
    let res: any;
    let nextFunction: any;

    const users = [
        {
            _id: '12345',
            username: "someuser",
            password: bcrypt.hashSync("somepassword"),
            email: "someemail"
        },
        {
            _id: '46788',
            username: "anotheruser",
            password: bcrypt.hashSync("anotherpassword"),
            email: "anotheremail"
        }
    ];

    const usersWithoutPassword = [
        {
            _id: '12345',
            username: "someuser",
            email: "someemail"
        },
        {
            _id: '46788',
            username: "anotheruser",
            email: "anotheremail"
        }
    ]
    
    beforeAll(() => {
        usersController = new UsersController(userService);
        res = {
            send: jest.fn()
        };
        nextFunction = jest.fn();
    });

    beforeEach(() => {
        jest.resetAllMocks();
    });
    
    describe("Get User", () => {
        it("gets all users and hides their passwords", async () => { 
            userService.getAll = jest.fn().mockImplementation(() => {
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

        it("gets user by id ", async () => {  
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
});