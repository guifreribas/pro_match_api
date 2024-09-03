import { Router } from "express";
import {
    createCompetitionTeam,
    deleteCompetitionTeam,
    getCompetitionTeam,
    getCompetitionTeams,
    updateCompetitionTeam,
} from "../controllers/competitionTeamController.js";
import { authenticateToken } from "../middlewares/authenticateToken.js";

const router = Router();
const allRoles = ["ADMIN", "SUPER_ADMIN", "USER"];

router.get("/", authenticateToken(allRoles), getCompetitionTeams);
router.get("/:id", authenticateToken(allRoles), getCompetitionTeam);
router.post("/", authenticateToken(allRoles), createCompetitionTeam);
router.put("/:id", authenticateToken(allRoles), updateCompetitionTeam);
router.delete("/:id", authenticateToken(allRoles), deleteCompetitionTeam);

export default router;
