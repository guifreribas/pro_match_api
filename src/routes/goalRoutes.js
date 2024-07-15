import { Router } from "express";

import {
    createGoal,
    deleteGoal,
    getGoals,
    getGoal,
    updateGoal,
} from "../controllers/goalController.js";

const router = Router();

router.get("/", getGoals);
router.get("/:id", getGoal);
router.post("/", createGoal);
router.put("/:id", updateGoal);
router.delete("/:id", deleteGoal);

export default router;
