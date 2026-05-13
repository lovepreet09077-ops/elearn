import { Request, Response } from "express";
import {
  createCourseService,
  getAllCoursesService,
  getMyCoursesService,
  getCourseByIdService,
  updateCourseService,
  deleteCourseService
} from "./course.service";

export const createCourse = async (req: Request, res: Response) => {
  try {
    const { title, description } = req.body;
    const userId = req.user?.userId;

    const course = await createCourseService(
      title,
      description,
      userId
    );

    res.status(201).json(course);
  } catch (error) {
    res.status(500).json({ message: "Failed to create course" });
  }
};

export const getAllCourses = async (_req: Request, res: Response) => {
  try {
    const courses = await getAllCoursesService();
    res.json(courses);
  } catch {
    res.status(500).json({ message: "Failed to fetch courses" });
  }
};

export const getMyCourses = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.userId;

    const courses = await getMyCoursesService(userId);

    res.json(courses);
  } catch {
    res.status(500).json({ message: "Failed to fetch my courses" });
  }
};

export const getCourseById = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    const course = await getCourseByIdService(id);

    res.json(course);
  } catch {
    res.status(500).json({ message: "Failed to fetch course" });
  }
};

export const updateCourse = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const { title, description } = req.body;

    const course = await updateCourseService(
      id,
      title,
      description
    );

    res.json(course);
  } catch {
    res.status(500).json({ message: "Failed to update course" });
  }
};

export const deleteCourse = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    await deleteCourseService(id);

    res.json({ message: "Course deleted" });
  } catch {
    res.status(500).json({ message: "Failed to delete course" });
  }
};