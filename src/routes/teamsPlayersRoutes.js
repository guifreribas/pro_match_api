import { Router } from "express";
import {
	createTeamPlayer,
	deleteTeamPlayer,
	getTeamPlayer,
	getTeamPlayers,
	updateTeamPlayer,
} from "../controllers/teamPlayerController.js";
import { authenticateToken } from "../middlewares/authenticateToken.js";

const router = Router();
const allRoles = ["ADMIN", "SUPER_ADMIN", "USER"];

router.get("/", getTeamPlayers);
router.get("/:id", getTeamPlayer);
router.post("/", authenticateToken(allRoles), createTeamPlayer);
router.put("/:id", authenticateToken(allRoles), updateTeamPlayer);
router.delete("/:id", authenticateToken(allRoles), deleteTeamPlayer);

export default router;
