import { Router } from "express";
import {
    createCategory,
    deleteCategory,
    getCategories,
    getCategory,
    updateCategory,
} from "../controllers/categoryController.js";

const router = Router();
const allRoles = ["ADMIN", "SUPER_ADMIN", "USER"];

router.get("/", authenticateToken(allRoles), getCategories);
router.get("/:id", authenticateToken(allRoles), getCategory);
router.post("/", authenticateToken(allRoles), createCategory);
router.put("/:id", authenticateToken(allRoles), updateCategory);
router.delete("/:id", authenticateToken(allRoles), deleteCategory);

export default router;
