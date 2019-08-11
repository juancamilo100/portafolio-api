import express from "express";
import { portfoliosController, fundsController } from "../controllers";
import { authorizeUser } from "../middleware/portfolioAuth.middleware";

const router = express.Router();

router.get("/", portfoliosController.getPortfolios);
router.get("/:id", authorizeUser, portfoliosController.getPortfolioById);
router.post("/", portfoliosController.createPortfolio);
router.patch("/:id", authorizeUser, portfoliosController.updatePorfolio);
router.delete("/:id", authorizeUser, portfoliosController.deletePortfolio);

router.get("/:id/funds/:fund", authorizeUser, fundsController.getFundDetails);

export default router;
