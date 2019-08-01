import AuthController from "./auth.controller";
import PortfoliosController from "./portfolios.controller";
import UsersController from "./users.controller";

import PortfolioService from "../services/portfolio.service";
import UserService from "../services/user.service";

const authController = new AuthController(UserService);
const usersController = new UsersController(UserService);
const portfoliosController = new PortfoliosController(PortfolioService);

export {
    authController,
    usersController,
    portfoliosController
};
