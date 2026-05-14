import { Request, Response } from "express";
import {
  enrollService,
  myEnrollmentsService,
  unenrollService,
  courseStudentsService
} from "./enrollment.service";

export const enrollCourse = async (req: Request, res: Response) => {
  try {
     const userId = req.user?.userId;
    const courseId = Number(req.params.courseId);

    const data = await enrollService(userId, courseId);

    res.status(201).json({
      message: "Enrolled successfully",
      data
    });
  } catch (err) {
    res.status(500).json({
      message: "Already enrolled or failed"
    });
  }
};

export const myEnrollments = async (req: Request, res: Response) => {
  const userId = req.user?.userId;

  const data = await myEnrollmentsService(userId);

  res.json(data);
};

export const unenrollCourse = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.userId;
    const courseId = Number(req.params.courseId);

    await unenrollService(userId, courseId);

    res.json({
      message: "Unenrolled successfully"
    });
  } catch (err) {
    res.status(500).json({
      message: "Failed to unenroll"
    });
  }
};

export const courseStudents = async (req: Request, res: Response) => {
  const courseId = Number(req.params.courseId);

  const data = await courseStudentsService(courseId);

  res.json(data);
};