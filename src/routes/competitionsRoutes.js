import { Router } from "express";
import {
    createCompetition,
    deleteCompetition,
    getCompetition,
    getCompetitions,
    updateCompetition,
} from "../controllers/competitionController.js";
import { authenticateToken } from "../middlewares/authenticateToken.js";

const router = Router();
const allRoles = ["ADMIN", "SUPER_ADMIN", "USER"];

router.get("/", authenticateToken(allRoles), getCompetitions);
router.get("/:id", authenticateToken(allRoles), getCompetition);
router.post("/", authenticateToken(allRoles), createCompetition);
router.put("/:id", authenticateToken(allRoles), updateCompetition);
router.delete("/:id", authenticateToken(allRoles), deleteCompetition);

export default router;
