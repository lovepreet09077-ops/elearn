import { Router } from "express";
import {
  createCourse,
  getAllCourses,
  getMyCourses,
  getCourseById,
  updateCourse,
  deleteCourse
} from "./course.controller";

import { authMiddleware } from "../../middlewares/auth.middleware";
import { requireRole } from "../../middlewares/role.middleware";

const router = Router();

router.get("/", getAllCourses);
router.get("/my", authMiddleware, getMyCourses);
router.get("/:id", getCourseById);

router.post("/", authMiddleware,requireRole("INSTRUCTOR", "ADMIN"), createCourse);
router.put("/:id", authMiddleware,requireRole("INSTRUCTOR", "ADMIN"), updateCourse);
router.delete("/:id", authMiddleware,requireRole("INSTRUCTOR", "ADMIN"), deleteCourse);

export default router;