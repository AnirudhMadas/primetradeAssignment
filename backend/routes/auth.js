import express from "express";
import { register, login, getAllUsers, getProfile } from "../controllers/auth.js";
import authMiddleware from "../middleware/auth.js";
import adminOnly from "../middleware/role.js";



const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/users", authMiddleware, adminOnly, getAllUsers);
router.get("/me", authMiddleware, getProfile);


export default router;
