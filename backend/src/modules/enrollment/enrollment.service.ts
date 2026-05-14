import { prisma } from "../../config/db";

export const enrollService = (userId: number, courseId: number) =>
  prisma.enrollment.create({
    data: {
      userId,
      courseId
    }
  });

export const myEnrollmentsService = (userId: number) =>
  prisma.enrollment.findMany({
    where: { userId },
    include: {
      course: true
    },
    orderBy: {
      createdAt: "desc"
    }
  });

export const unenrollService = (userId: number, courseId: number) =>
  prisma.enrollment.delete({
    where: {
      userId_courseId: {
        userId,
        courseId
      }
    }
  });

export const courseStudentsService = (courseId: number) =>
  prisma.enrollment.findMany({
    where: { courseId },
    include: {
      user: {
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true
        }
      }
    }
  });