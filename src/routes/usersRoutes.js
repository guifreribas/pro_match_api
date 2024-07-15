import { Router } from "express";
import {
    createUser,
    getUser,
    getUsers,
} from "../controllers/userController.js";
import { authenticateToken } from "../middlewares/authenticateToken.js";

const router = Router();

router.get("/", authenticateToken(["ADMIN", "SUPER_ADMIN", "USER"]), getUsers);
router.get(
    "/:id",
    authenticateToken(["ADMIN", "SUPER_ADMIN", "USER"]),
    getUser
);
router.post("/", createUser);
router.put("/:id", (req, res) => res.send("Users"));
router.delete("/:id", (req, res) => res.send("Delete"));

export default router;
