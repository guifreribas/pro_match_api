import { Router } from "express";
import {
    createFoul,
    deleteFoul,
    getFouls,
    getFoul,
    updateFoul,
} from "../controllers/foulController.js";

const router = Router();

router.get("/", getFouls);
router.get("/:id", getFoul);
router.post("/", createFoul);
router.put("/:id", updateFoul);
router.delete("/:id", deleteFoul);

export default router;
