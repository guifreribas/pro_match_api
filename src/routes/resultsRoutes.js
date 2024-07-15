import { Router } from "express";
import {
    createResult,
    deleteResult,
    getResult,
    getResults,
    updateResult,
} from "../controllers/resultController.js";

const router = Router();

router.get("/", getResults);
router.post("/", createResult);
router.get("/:id", getResult);
router.put("/:id", updateResult);
router.delete("/:id", deleteResult);

export default router;
