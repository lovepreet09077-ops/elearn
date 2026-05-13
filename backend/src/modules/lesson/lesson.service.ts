import { prisma } from "../../config/db";

export const createLessonService = async (data: any) => {
  return prisma.lesson.create({
    data
  });
};

export const getLessonsByCourseService = async (courseId: number) => {
  return prisma.lesson.findMany({
    where: { courseId },
    orderBy: { orderNumber: "asc" }
  });
};

export const getLessonByIdService = async (id: number) => {
  return prisma.lesson.findUnique({
    where: { id }
  });
};

export const updateLessonService = async (id: number, data: any) => {
  return prisma.lesson.update({
    where: { id },
    data
  });
};

export const deleteLessonService = async (id: number) => {
  return prisma.lesson.delete({
    where: { id }
  });
};