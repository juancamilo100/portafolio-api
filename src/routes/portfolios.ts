import express from "express";
import {
	createPortfolio,
	deletePortfolio,
	getPortfolioById,
	getPortfolios,
	updatePorfolio } from "../controllers/portfolios";
import { authorizeUser } from "../middleware/portfolioAuth";

const router = express.Router();

router.get("/", getPortfolios);
router.get("/:id", authorizeUser, getPortfolioById);
router.post("/", createPortfolio);
router.patch("/:id", authorizeUser, updatePorfolio);
router.delete("/:id", authorizeUser, deletePortfolio);

export default router;
