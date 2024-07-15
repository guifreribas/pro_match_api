import { Router } from "express";
import {
    createTeamPlayer,
    deleteTeamPlayer,
    getTeamPlayer,
    getTeamPlayers,
    updateTeamPlayer,
} from "../controllers/teamPlayerController.js";

const router = Router();

router.get("/", getTeamPlayers);
router.get("/:id", getTeamPlayer);
router.post("/", createTeamPlayer);
router.put("/:id", updateTeamPlayer);
router.delete("/:id", deleteTeamPlayer);

export default router;
