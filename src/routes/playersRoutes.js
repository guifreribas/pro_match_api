import { Router } from "express";
import {
    createPlayer,
    deletePlayer,
    getPlayer,
    updatePlayer,
} from "../controllers/playerController.js";

const router = Router();

router.get("/", getPlayer);
router.get("/:id", getPlayer);
router.post("/", createPlayer);
router.put("/:id", updatePlayer);
router.delete("/:id", deletePlayer);

export default router;
