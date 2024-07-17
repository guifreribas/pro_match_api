import { Router } from "express";
import {
    createUser,
    deleteUser,
    getUser,
    getUsers,
    updateUser,
} from "../controllers/userController.js";
import { authenticateToken } from "../middlewares/authenticateToken.js";

const router = Router();

router.get("/", authenticateToken(["ADMIN", "SUPER_ADMIN", "USER"]), getUsers);
router.get(
    "/:id",
    authenticateToken(["ADMIN", "SUPER_ADMIN", "USER"]),
    getUser
);
router.post("/", authenticateToken(["ADMIN", "SUPER_ADMIN"]), createUser);
router.put(
    "/:id",
    authenticateToken(["ADMIN", "SUPER_ADMIN", "USER"]),
    updateUser
);
router.delete("/:id", authenticateToken(["ADMIN", "SUPER_ADMIN"]), deleteUser);

export default router;
