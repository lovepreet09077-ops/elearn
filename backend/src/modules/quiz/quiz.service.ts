import { prisma } from "../../config/db";

export const createQuizService = (data: any) =>
  prisma.quiz.create({ data });

export const addQuestionService = (data: any) =>
  prisma.question.create({ data });

export const getQuizByCourseService = (courseId: number) =>
  prisma.quiz.findUnique({
    where: { courseId },
    include: { questions: true }
  });

export const getQuizByIdService = (id: number) =>
  prisma.quiz.findUnique({
    where: { id },
    include: { questions: true }
  });

export const saveResultService = (data: any) =>
  prisma.quizResult.create({ data });

export const getMyResultsService = (userId: number) =>
  prisma.quizResult.findMany({
    where: { userId },
    include: {
      quiz: true
    },
    orderBy: {
      createdAt: "desc"
    }
  });

export const deleteQuizService = async (id: number) => {
  await prisma.question.deleteMany({
    where: { quizId: id }
  });

  await prisma.quizResult.deleteMany({
    where: { quizId: id }
  });

  return prisma.quiz.delete({
    where: { id }
  });
};