import { Router } from "express";
import {
    createMatch,
    deleteMatch,
    getMatch,
    getMatches,
    updateMatch,
} from "../controllers/matchController.js";

const router = Router();

router.get("/", getMatches);
router.get("/:id", getMatch);
router.post("/", createMatch);
router.put("/:id", updateMatch);
router.delete("/:id", deleteMatch);

export default router;
