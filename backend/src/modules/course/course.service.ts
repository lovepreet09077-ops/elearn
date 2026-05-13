import { prisma } from "../../config/db";

export const createCourseService = async (
  title: string,
  description: string,
  instructorId: number
) => {
  return prisma.course.create({
    data: {
      title,
      description,
      instructorId
    }
  });
};

export const getAllCoursesService = async () => {
  return prisma.course.findMany({
    where: {
      isPublished: true
    },
    include: {
      instructor: {
        select: {
          id: true,
          firstName: true,
          lastName: true
        }
      }
    },
    orderBy: {
      createdAt: "desc"
    }
  });
};

export const getMyCoursesService = async (userId: number) => {
  return prisma.course.findMany({
    where: {
      instructorId: userId
    },
    orderBy: {
      createdAt: "desc"
    }
  });
};

export const getCourseByIdService = async (id: number) => {
  return prisma.course.findUnique({
    where: { id },
    include: {
      lessons: true,
      instructor: {
        select: {
          firstName: true,
          lastName: true
        }
      }
    }
  });
};

export const updateCourseService = async (
  id: number,
  title: string,
  description: string
) => {
  return prisma.course.update({
    where: { id },
    data: {
      title,
      description
    }
  });
};

export const deleteCourseService = async (id: number) => {
  return prisma.course.delete({
    where: { id }
  });
};