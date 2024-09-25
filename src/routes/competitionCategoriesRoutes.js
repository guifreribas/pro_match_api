import { Router } from "express";
import {
	createCompetitionCategory,
	deleteCompetitionCategory,
	getCompetitionCategories,
	getCompetitionCategory,
	updateCompetitionCategory,
} from "../controllers/competitionCategoryController.js";
import { authenticateToken } from "../middlewares/authenticateToken.js";

const router = Router();
const allRoles = ["ADMIN", "SUPER_ADMIN", "USER"];

router.get("/", getCompetitionCategories);
router.get("/:id", authenticateToken(allRoles), getCompetitionCategory);
router.post("/", authenticateToken(allRoles), createCompetitionCategory);
router.put("/:id", authenticateToken(allRoles), updateCompetitionCategory);
router.delete("/:id", authenticateToken(allRoles), deleteCompetitionCategory);

export default router;
