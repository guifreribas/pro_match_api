import { Router } from "express";
import {
	createTeam,
	deleteTeam,
	getTeam,
	getTeams,
	updateTeam,
} from "../controllers/teamController.js";
import { authenticateToken } from "../middlewares/authenticateToken.js";

const router = Router();
const allRoles = ["ADMIN", "SUPER_ADMIN", "USER"];

router.get("/", getTeams);
router.get("/:id", getTeam);
router.post("/", authenticateToken(allRoles), createTeam);
router.put("/:id", authenticateToken(allRoles), updateTeam);
router.delete("/:id", authenticateToken(allRoles), deleteTeam);

export default router;
