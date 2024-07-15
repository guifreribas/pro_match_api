import { Router } from "express";
import {
    getCard,
    getCards,
    createCard,
    updateCard,
    deleteCard,
} from "../controllers/cardController.js";

const router = Router();

router.get("/", getCards);
router.get("/:id", getCard);
router.post("/", createCard);
router.put("/:id", updateCard);
router.delete("/:id", deleteCard);

export default router;
