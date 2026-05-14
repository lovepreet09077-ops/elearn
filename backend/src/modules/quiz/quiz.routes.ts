import { Router } from "express";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { requireRole } from "../../middlewares/role.middleware";

import {
  createQuiz,
  addQuestion,
  getQuizByCourse,
  getQuizById,
  submitQuiz,
  myResults,
  deleteQuiz
} from "./quiz.controller";

const router = Router();

router.post(
  "/",
  authMiddleware,
  requireRole("INSTRUCTOR", "ADMIN"),
  createQuiz
);

router.post(
  "/:quizId/questions",
  authMiddleware,
  requireRole("INSTRUCTOR", "ADMIN"),
  addQuestion
);

router.get("/course/:courseId", getQuizByCourse);
router.get("/:id", authMiddleware, getQuizById);

router.post(
  "/:id/submit",
  authMiddleware,
  requireRole("STUDENT"),
  submitQuiz
);

router.get(
  "/results/me",
  authMiddleware,
  myResults
);

router.delete(
  "/:id",
  authMiddleware,
  requireRole("INSTRUCTOR", "ADMIN"),
  deleteQuiz
);

export default router;