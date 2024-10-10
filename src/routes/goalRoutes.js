import { Router } from "express";

import {
	createGoal,
	deleteGoal,
	getGoals,
	getGoal,
	updateGoal,
	getGoalScorers,
} from "../controllers/goalController.js";
import { authenticateToken } from "../middlewares/authenticateToken.js";

const router = Router();
const allRoles = ["ADMIN", "SUPER_ADMIN", "USER"];

router.get("/", getGoals);
router.get("/scorers", getGoalScorers);
router.get("/:id", getGoal);
router.post("/", authenticateToken(allRoles), createGoal);
router.put("/:id", authenticateToken(allRoles), updateGoal);
router.delete("/:id", authenticateToken(allRoles), deleteGoal);

export default router;
