import AuthController from './auth.controller'
import PortfoliosController from './portfolios.controller'

import UserService from "../services/user.service";
import PortfolioService from "../services/portfolio.service";

const authController = new AuthController(UserService);
const portfoliosController = new PortfoliosController(PortfolioService);

export {
    authController,
    portfoliosController
}