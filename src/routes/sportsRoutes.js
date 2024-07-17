import { Router } from "express";
import {
    createSport,
    deleteSport,
    getSport,
    getSports,
    updateSport,
} from "../controllers/sportController.js";
import { authenticateToken } from "../middlewares/authenticateToken.js";

const router = Router();
const allRoles = ["ADMIN", "SUPER_ADMIN", "USER"];

router.get("/", authenticateToken(allRoles), getSports);
router.get("/:id", authenticateToken(allRoles), getSport);
router.post("/", authenticateToken(allRoles), createSport);
router.put("/:id", authenticateToken(allRoles), updateSport);
router.delete("/:id", authenticateToken(allRoles), deleteSport);

export default router;
