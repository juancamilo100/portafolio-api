import AuthController from "./auth.controller";
import PortfoliosController from "./portfolios.controller";
import UsersController from "./users.controller";
import AnalysisController from './analysis.controller'
import { STOCKS_API_BASE_URL, STOCKS_API_TOKEN } from "../../config";

import portfolioService from "../services/portfolio.service";
import userService from "../services/user.service";
import FundDetailsService from '../services/fund.service';

const fundsService = new FundDetailsService(STOCKS_API_BASE_URL, STOCKS_API_TOKEN);

const authController = new AuthController(userService);
const usersController = new UsersController(userService);
const portfoliosController = new PortfoliosController(portfolioService);
const analysisController = new AnalysisController(fundsService, portfolioService);

export {
    authController,
    usersController,
    portfoliosController,
    analysisController
};
