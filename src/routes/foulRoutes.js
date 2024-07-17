import { Router } from "express";
import {
    createFoul,
    deleteFoul,
    getFouls,
    getFoul,
    updateFoul,
} from "../controllers/foulController.js";
import { authenticateToken } from "../middlewares/authenticateToken.js";

const router = Router();
const allRoles = ["ADMIN", "SUPER_ADMIN", "USER"];

router.get("/", authenticateToken(allRoles), getFouls);
router.get("/:id", authenticateToken(allRoles), getFoul);
router.post("/", authenticateToken(allRoles), createFoul);
router.put("/:id", authenticateToken(allRoles), updateFoul);
router.delete("/:id", authenticateToken(allRoles), deleteFoul);

export default router;
