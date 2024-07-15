import { Router } from "express";
import {
    createOrganization,
    deleteOrganization,
    getOrganization,
    getOrganizations,
    updateOrganization,
} from "../controllers/organizationController.js";

const router = Router();

router.get("/", getOrganizations);
router.get("/:id", getOrganization);
router.post("/", createOrganization);
router.put("/:id", updateOrganization);
router.delete("/:id", deleteOrganization);

export default router;
