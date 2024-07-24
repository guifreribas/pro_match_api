import { Router } from "express";
import {
    login,
    logout,
    register,
    forgotPassword,
    resetPassword,
    checkToken,
} from "../controllers/authController.js";

const router = Router();

router.post("/login", login);
router.post("/logout", logout);
router.post("/register", register);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
router.get("/check-auth", checkToken);

export default router;
