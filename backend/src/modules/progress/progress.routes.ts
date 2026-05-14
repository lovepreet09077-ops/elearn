import { Router } from "express";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { requireRole } from "../../middlewares/role.middleware";

import {
  markComplete,
  getMyProgress,
  getCourseProgress
} from "./progress.controller";

const router = Router();

/**
 * Student: mark lesson complete
 */
router.post(
  "/:lessonId",
  authMiddleware,
  requireRole("STUDENT"),
  markComplete
);

/**
 * Student: my progress in a course
 */
router.get(
  "/me/:courseId",
  authMiddleware,
  requireRole("STUDENT"),
  getMyProgress
);

/**
 * Instructor/Admin: course-wide progress analytics
 */
router.get(
  "/course/:courseId",
  authMiddleware,
  requireRole("INSTRUCTOR", "ADMIN"),
  getCourseProgress
);

export default router;