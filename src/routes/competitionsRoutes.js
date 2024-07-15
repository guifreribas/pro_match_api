import { Router } from "express";
import {
    createCompetition,
    deleteCompetition,
    getCompetition,
    getCompetitions,
    updateCompetition,
} from "../controllers/competitionController.js";

const router = Router();

router.get("/", getCompetitions);
router.get("/:id", getCompetition);
router.post("/", createCompetition);
router.put("/:id", updateCompetition);
router.delete("/:id", deleteCompetition);

export default router;
