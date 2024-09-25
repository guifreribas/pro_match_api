import { Router } from "express";
import {
	createStanding,
	deleteStanding,
	getStanding,
	getStandings,
	updateStanding,
} from "../controllers/standingsController.js";
import { authenticateToken } from "../middlewares/authenticateToken.js";

const router = Router();
const allRoles = ["ADMIN", "SUPER_ADMIN", "USER"];

router.get("/", getStandings);
router.get("/:id", authenticateToken(allRoles), getStanding);
router.post("/", authenticateToken(allRoles), createStanding);
router.put("/:id", authenticateToken(allRoles), updateStanding);
router.delete("/:id", authenticateToken(allRoles), deleteStanding);

export default router;
