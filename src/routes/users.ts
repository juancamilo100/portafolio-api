import express from "express";
import { getUserById, getUsers } from "../controllers/users";

const router = express.Router();

router.get("/", getUsers);
router.get("/:id", getUserById);

export default router;
