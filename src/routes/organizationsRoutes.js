import { Router } from "express";
import {
	createOrganization,
	deleteOrganization,
	getOrganization,
	getOrganizations,
	updateOrganization,
} from "../controllers/organizationController.js";
import { authenticateToken } from "../middlewares/authenticateToken.js";

const router = Router();
const allRoles = ["ADMIN", "SUPER_ADMIN", "USER"];

router.get("/", getOrganizations);
router.get("/:id", getOrganization);
router.post("/", authenticateToken(allRoles), createOrganization);
router.put("/:id", authenticateToken(allRoles), updateOrganization);
router.delete("/:id", authenticateToken(allRoles), deleteOrganization);

export default router;
