import { Router } from "express";
import {
    createSport,
    deleteSport,
    getSport,
    getSports,
    updateSport,
} from "../controllers/sportController.js";

const router = Router();

router.get("/", getSports);
router.get("/:id", getSport);
router.post("/", createSport);
router.put("/:id", updateSport);
router.delete("/:id", deleteSport);

export default router;
