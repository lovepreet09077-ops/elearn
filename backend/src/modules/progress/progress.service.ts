import { prisma } from "../../config/db";

/**
 * Mark lesson as completed (idempotent using upsert)
 */
export const markCompleteService = async (
  userId: number,
  lessonId: number
) => {
  return prisma.progress.upsert({
    where: {
      userId_lessonId: {
        userId,
        lessonId
      }
    },
    update: {
      completed: true,
      completedAt: new Date()
    },
    create: {
      userId,
      lessonId,
      completed: true,
      completedAt: new Date()
    }
  });
};

/**
 * Get progress for a student in a course
 */
export const getMyProgressService = async (
  userId: number,
  courseId: number
) => {
  return prisma.progress.findMany({
    where: {
      userId,
      lesson: {
        courseId
      }
    },
    include: {
      lesson: true
    }
  });
};

/**
 * Instructor: all students progress for a course
 */
export const getCourseProgressService = async (
  courseId: number
) => {
  return prisma.progress.findMany({
    where: {
      lesson: {
        courseId
      }
    },
    include: {
      user: {
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true
        }
      },
      lesson: true
    }
  });
};