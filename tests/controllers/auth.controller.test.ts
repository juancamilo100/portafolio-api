import AuthController from '../../src/controllers/auth.controller'
import bcrypt from "bcryptjs";
import userService from '../../src/services/user.service'

describe("Auth Controller", () => {  
    let authController: AuthController;
    
    beforeAll(() => {
        authController = new AuthController(userService);
    }) 
    
    describe("Login", () => {
        it("logs in the user", async () => {
            userService.getByFields = jest.fn().mockImplementation((id: string) => {
                return {
                    password: bcrypt.hashSync("anotherCoolPassword")
                };
            });
            const nextFunction = (err?: any) => {};

            const req: any = {
                body: {
                    username: "lauritapear",
                    password: "anotherCoolPassword"
                }
            };
    
            let res: any = {
                send: jest.fn()
            };
            
            await authController.loginUser(req, res, nextFunction);
            expect(res.send).toHaveBeenCalled();
        });

        it("Throws error when user is not found", async () => {
            userService.getByFields = jest.fn().mockImplementation((id: string) => null);
            const nextFunction = jest.fn().mockImplementation((err: any) => {
                console.log("");
                console.log(err);
            })

            const req: any = {
                body: {
                    username: "lauritapear",
                    password: "anotherCoolPassword"
                }
            };
    
            const res: any = {
                send: jest.fn()
            };

            await authController.loginUser(req, res, nextFunction);
            expect(nextFunction).toHaveBeenCalledWith({ NotFoundError: "User not found" });
        });
    })
});