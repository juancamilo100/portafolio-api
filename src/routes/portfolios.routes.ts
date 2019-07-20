import express from "express";
import { portfoliosController as controller } from "../controllers";
import { authorizeUser } from "../middleware/portfolioAuth.middleware";

const router = express.Router();

router.get("/", controller.getPortfolios);
router.get("/:id", authorizeUser, controller.getPortfolioById);
router.post("/", controller.createPortfolio);
router.patch("/:id", authorizeUser, controller.updatePorfolio);
router.delete("/:id", authorizeUser, controller.deletePortfolio);

export default router;
