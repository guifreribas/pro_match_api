import { Router } from "express";
import {
    getCard,
    getCards,
    createCard,
    updateCard,
    deleteCard,
} from "../controllers/cardController.js";
import { authenticateToken } from "../middlewares/authenticateToken.js";

const router = Router();
const allRoles = ["ADMIN", "SUPER_ADMIN", "USER"];

router.get("/", authenticateToken(allRoles), getCards);
router.get("/:id", authenticateToken(allRoles), getCard);
router.post("/", authenticateToken(allRoles), createCard);
router.put("/:id", authenticateToken(allRoles), updateCard);
router.delete("/:id", authenticateToken(allRoles), deleteCard);

export default router;
