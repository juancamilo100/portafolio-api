import express from "express";
import { authenticateUser } from "../middleware/auth.middleware";
import authRouter from "../routes/auth.routes";
import portfoliosRouter from "../routes/portfolios.routes";
import usersRouter from "../routes/users.routes";

const router = express.Router();

router.use("/auth", authRouter);
router.use("/users", authenticateUser, usersRouter);
router.use("/portfolios", authenticateUser, portfoliosRouter);

export default router;
