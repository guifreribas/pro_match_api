import { Router } from "express";
import {
    createResource,
    deleteResource,
    getResource,
    getResources,
} from "../controllers/resourceController.js";
import parser from "../config/multerConfig.js";
import { authenticateToken } from "../middlewares/authenticateToken.js";

const router = Router();
const allRoles = ["ADMIN", "SUPER_ADMIN", "USER"];

router.get("/", authenticateToken(allRoles), getResources);
router.get("/:id", authenticateToken(allRoles), getResource);

router.post(
    "/",
    authenticateToken(allRoles),
    parser.single("file"),
    createResource
);
router.delete(
    "/:id",
    authenticateToken(["ADMIN", "SUPER_ADMIN"]),
    deleteResource
);

export default router;
