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

router.get("/", getCompetitionTeams);
router.get("/:id", getCompetitionTeam);
router.post("/", authenticateToken(allRoles), createCompetitionTeam);
router.put("/:id", authenticateToken(allRoles), updateCompetitionTeam);
router.delete("/:id", authenticateToken(allRoles), deleteCompetitionTeam);

export default router;
