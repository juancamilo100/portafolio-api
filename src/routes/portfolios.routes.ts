import express from "express";
import { portfoliosController, analysisController } from "../controllers";
import { authorizeUser } from "../middleware/portfolioAuth.middleware";

const router = express.Router();

router.get("/", portfoliosController.getPortfolios);
router.get("/:id", authorizeUser, portfoliosController.getPortfolioById);
router.post("/", portfoliosController.createPortfolio);
router.patch("/:id", authorizeUser, portfoliosController.updatePorfolio);
router.delete("/:id", authorizeUser, portfoliosController.deletePortfolio);

router.get("/:id/analysis/:targetInvestment", authorizeUser, analysisController.getPortfolioAnalysis);

export default router;
