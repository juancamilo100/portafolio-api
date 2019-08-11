import AuthController from "./auth.controller";
import PortfoliosController from "./portfolios.controller";
import UsersController from "./users.controller";
import FundsController from './funds.controller'
import { STOCKS_API_BASE_URL, STOCKS_API_TOKEN } from "../../config";

import PortfolioService from "../services/portfolio.service";
import UserService from "../services/user.service";
import FundDetailsService from '../services/fund.service';

const fundsService = new FundDetailsService(STOCKS_API_BASE_URL, STOCKS_API_TOKEN);

const authController = new AuthController(UserService);
const usersController = new UsersController(UserService);
const portfoliosController = new PortfoliosController(PortfolioService);
const fundsController = new FundsController(fundsService);

export {
    authController,
    usersController,
    portfoliosController,
    fundsController
};
