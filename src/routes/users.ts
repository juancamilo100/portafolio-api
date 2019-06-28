import express from "express";
import { getUserById, getUsers } from "../controllers/users";

const router = express.Router();

// Need to add authorization to this route.  It should only be available for admin users
router.get("/", getUsers);
router.get("/:id", getUserById);

export default router;
