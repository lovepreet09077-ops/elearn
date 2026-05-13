import { Request, Response } from "express";
import {
  createLessonService,
  getLessonsByCourseService,
  getLessonByIdService,
  updateLessonService,
  deleteLessonService
} from "./lesson.service";

export const createLesson = async (req: Request, res: Response) => {
  try {
    const { title, content, videoUrl, courseId, orderNumber } = req.body;

    const lesson = await createLessonService({
      title,
      content,
      videoUrl,
      courseId: Number(courseId),
      orderNumber: Number(orderNumber)
    });

    res.status(201).json(lesson);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to create lesson" });
  }
};

export const getLessonsByCourse = async (req: Request, res: Response) => {
  try {
    const courseId = Number(req.params.courseId);

    const lessons = await getLessonsByCourseService(courseId);

    res.json(lessons);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch lessons" });
  }
};

export const getLessonById = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    const lesson = await getLessonByIdService(id);

    res.json(lesson);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch lesson" });
  }
};

export const updateLesson = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    const lesson = await updateLessonService(id, req.body);

    res.json(lesson);
  } catch (err) {
    res.status(500).json({ message: "Failed to update lesson" });
  }
};

export const deleteLesson = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    await deleteLessonService(id);

    res.json({ message: "Lesson deleted",id:id });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete lesson" });
  }
};