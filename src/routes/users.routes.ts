import express from "express";
import {
    deleteUser,
    getUsers,
    getUserById } from "../controllers/users.controller";

const router = express.Router();

// Need to add authorization to this route.  It should only be available for admin users
router.get("/", getUsers);
router.get("/:id", getUserById);
router.delete("/:id", deleteUser);

export default router;
