import { Request, Response } from "express";
import {
  markCompleteService,
  getMyProgressService,
  getCourseProgressService
} from "./progress.service";

/**
 * POST /progress/:lessonId
 */
export const markComplete = async (req: Request, res: Response) => {
  try {
   const userId = req.user?.userId;
    const lessonId = Number(req.params.lessonId);

    const data = await markCompleteService(userId, lessonId);

    res.status(201).json({
      message: "Lesson marked complete",
      data
    });
  } catch (err) {
    res.status(500).json({
      message: "Failed to mark lesson complete"
    });
  }
};

/**
 * GET /progress/me/:courseId
 */
export const getMyProgress = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.userId;
    const courseId = Number(req.params.courseId);

    const data = await getMyProgressService(userId, courseId);

    const completed = data.filter((p) => p.completed).length;

    res.json({
      courseId,
      completedLessons: completed,
      total: data.length,
      percentage: data.length
        ? Math.round((completed / data.length) * 100)
        : 0,
      details: data
    });
  } catch (err) {
    res.status(500).json({
      message: "Failed to fetch progress"
    });
  }
};

/**
 * GET /progress/course/:courseId
 */
export const getCourseProgress = async (req: Request, res: Response) => {
  try {
    const courseId = Number(req.params.courseId);

    const data = await getCourseProgressService(courseId);

    res.json({
      courseId,
      totalRecords: data.length,
      data
    });
  } catch (err) {
    res.status(500).json({
      message: "Failed to fetch course progress"
    });
  }
};