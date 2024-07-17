import { Router } from "express";
import {
    createResource,
    deleteResource,
} from "../controllers/resourceController.js";
import parser from "../config/multerConfig.js";

const router = Router();
const allRoles = ["ADMIN", "SUPER_ADMIN", "USER"];

router.post(
    "/",
    authenticateToken(allRoles),
    parser.single("image"),
    createResource
);
router.delete(
    "/:id",
    authenticateToken(["ADMIN", "SUPER_ADMIN"]),
    deleteResource
);

export default router;
