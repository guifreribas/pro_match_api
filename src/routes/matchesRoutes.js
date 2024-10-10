import { Router } from "express";
import {
	createMatch,
	deleteMatch,
	getMatch,
	getMatches,
	updateMatch,
} from "../controllers/matchController.js";
import { authenticateToken } from "../middlewares/authenticateToken.js";

const router = Router();
const allRoles = ["ADMIN", "SUPER_ADMIN", "USER"];

router.get("/", getMatches);
router.get("/:id", getMatch);
router.post("/", authenticateToken(allRoles), createMatch);
router.put("/:id", authenticateToken(allRoles), updateMatch);
router.delete("/:id", authenticateToken(allRoles), deleteMatch);

export default router;
