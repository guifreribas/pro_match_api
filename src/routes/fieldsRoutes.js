import { Router } from "express";
import {
    createField,
    deleteField,
    getField,
    getFields,
    updateField,
} from "../controllers/fieldController.js";
import { authenticateToken } from "../middlewares/authenticateToken.js";

const router = Router();
const allRoles = ["ADMIN", "SUPER_ADMIN", "USER"];

router.get("/", authenticateToken(allRoles), getFields);
router.get("/:id", authenticateToken(allRoles), getField);
router.post("/", authenticateToken(allRoles), createField);
router.put("/:id", authenticateToken(allRoles), updateField);
router.delete("/:id", authenticateToken(allRoles), deleteField);

export default router;
