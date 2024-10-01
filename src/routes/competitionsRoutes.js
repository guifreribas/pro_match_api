import { Router } from "express";
import {
	createCompetition,
	createCompetitionFull,
	deleteCompetition,
	getCompetition,
	getCompetitions,
	initializeCompetition,
	updateCompetition,
} from "../controllers/competitionController.js";
import { authenticateToken } from "../middlewares/authenticateToken.js";

const router = Router();
const allRoles = ["ADMIN", "SUPER_ADMIN", "USER"];

router.get("/", getCompetitions);
router.get("/:id", authenticateToken(allRoles), getCompetition);
router.post("/full", authenticateToken(allRoles), createCompetitionFull);
router.post("/initialize", authenticateToken(allRoles), initializeCompetition);
router.post("/", authenticateToken(allRoles), createCompetition);
router.put("/:id", authenticateToken(allRoles), updateCompetition);
router.delete("/:id", authenticateToken(allRoles), deleteCompetition);

export default router;
