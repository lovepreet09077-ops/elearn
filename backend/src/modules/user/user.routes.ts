import { Router } from "express";
import { addUser, listUsers } from "./user.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";
const router = Router();

router.get("/",authMiddleware, listUsers);
router.post("/", addUser);

export default router;