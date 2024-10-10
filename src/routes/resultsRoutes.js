import { Router } from "express";
import {
	createResult,
	deleteResult,
	getResult,
	getResults,
	updateResult,
} from "../controllers/resultController.js";
import { authenticateToken } from "../middlewares/authenticateToken.js";

const router = Router();
const allRoles = ["ADMIN", "SUPER_ADMIN", "USER"];

router.get("/", getResults);
router.get("/:id", getResult);
router.post("/", authenticateToken(allRoles), createResult);
router.put("/:id", authenticateToken(allRoles), updateResult);
router.delete("/:id", authenticateToken(allRoles), deleteResult);

export default router;
