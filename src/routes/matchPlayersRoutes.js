import { Router } from "express";
import {
	createMatchPlayer,
	deleteMatchPlayer,
	getMatchPlayer,
	getMatchPlayers,
	updateMatchPlayer,
} from "../controllers/matchPlayerController.js";
import { authenticateToken } from "../middlewares/authenticateToken.js";

const router = Router();
const allRoles = ["ADMIN", "SUPER_ADMIN", "USER"];

router.get("/", authenticateToken(allRoles), getMatchPlayers);
router.get("/:id", authenticateToken(allRoles), getMatchPlayer);
router.post("/", authenticateToken(allRoles), createMatchPlayer);
router.put("/:id", authenticateToken(allRoles), updateMatchPlayer);
router.delete("/:id", authenticateToken(allRoles), deleteMatchPlayer);

export default router;
