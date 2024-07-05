import { Router } from "express";

const router = Router();

router.get("/", (req, res) => res.send("Users"));
router.get("/:id", (req, res) => res.send("Users"));
router.post("/", (req, res) => res.send("Users"));
router.put("/:id", (req, res) => res.send("Users"));
router.delete("/:id", (req, res) => res.send("Delete"));

export default router;
