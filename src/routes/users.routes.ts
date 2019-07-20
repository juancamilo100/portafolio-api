import express from "express";
import { usersController as controller } from "../controllers";

const router = express.Router();

// Need to add authorization to this route.  It should only be available for admin users
router.get("/", controller.getUsers);
router.get("/:id", controller.getUserById);
router.delete("/:id", controller.deleteUser);

export default router;
