import { Router } from "express";
import {
    login,
    logout,
    register,
    forgotPassword,
    resetPassword,
} from "../controllers/authController.js";

const router = Router();

router.post("/login", login);
router.post("/logout", logout);
router.post("/register", register);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

export default router;
