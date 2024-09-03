import { Router } from "express";
import {
    createCompetitionType,
    deleteCompetitionType,
    getCompetitionType,
    getCompetitionTypes,
    updateCompetitionType,
} from "../controllers/competitionTypeController.js";
import { authenticateToken } from "../middlewares/authenticateToken.js";

const router = Router();
const allRoles = ["ADMIN", "SUPER_ADMIN", "USER"];

router.get("/", authenticateToken(allRoles), getCompetitionTypes);
router.get("/:id", authenticateToken(allRoles), getCompetitionType);
router.post("/", authenticateToken(allRoles), createCompetitionType);
router.put("/:id", authenticateToken(allRoles), updateCompetitionType);
router.delete("/:id", authenticateToken(allRoles), deleteCompetitionType);

export default router;
