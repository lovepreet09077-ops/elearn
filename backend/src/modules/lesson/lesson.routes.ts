import { Router } from "express";
import {
  createLesson,
  getLessonsByCourse,
  getLessonById,
  updateLesson,
  deleteLesson
} from "./lesson.controller";

import { authMiddleware } from "../../middlewares/auth.middleware";
import { requireRole } from "../../middlewares/role.middleware";
const router = Router();

router.post("/", authMiddleware,requireRole("INSTRUCTOR", "ADMIN"), createLesson);
router.get("/course/:courseId", getLessonsByCourse);
router.get("/:id", getLessonById);
router.put("/:id", authMiddleware,requireRole("INSTRUCTOR", "ADMIN"), updateLesson);
router.delete("/:id", authMiddleware,requireRole("INSTRUCTOR", "ADMIN"), deleteLesson);

export default router;