import { Router } from "express";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { requireRole } from "../../middlewares/role.middleware";

import {
  enrollCourse,
  myEnrollments,
  unenrollCourse,
  courseStudents
} from "./enrollment.controller";

const router = Router();

router.post(
  "/:courseId",
  authMiddleware,
  requireRole("STUDENT"),
  enrollCourse
);

router.get(
  "/me",
  authMiddleware,
  requireRole("STUDENT"),
  myEnrollments
);

router.delete(
  "/:courseId",
  authMiddleware,
  requireRole("STUDENT"),
  unenrollCourse
);

router.get(
  "/course/:courseId",
  authMiddleware,
  requireRole("INSTRUCTOR", "ADMIN"),
  courseStudents
);

export default router;