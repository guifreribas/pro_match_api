import { Router } from "express";
import {
	createPlayer,
	deletePlayer,
	getPlayer,
	getPlayers,
	updatePlayer,
} from "../controllers/playerController.js";
import { authenticateToken } from "../middlewares/authenticateToken.js";

const router = Router();
const allRoles = ["ADMIN", "SUPER_ADMIN", "USER"];

router.get("/", getPlayers);
router.get("/:id", getPlayer);
router.post("/", authenticateToken(allRoles), createPlayer);
router.post("/", authenticateToken(allRoles), createPlayer);
router.put("/:id", authenticateToken(allRoles), updatePlayer);
router.delete("/:id", authenticateToken(allRoles), deletePlayer);

export default router;
