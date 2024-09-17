import { Router } from "express";

import { authenticateToken } from "../middlewares/authenticateToken.js";
import { getOverview } from "#src/controllers/overviewController.js";

const router = Router();
const allRoles = ["ADMIN", "SUPER_ADMIN", "USER"];

router.get("/", authenticateToken(allRoles), getOverview);

export default router;
