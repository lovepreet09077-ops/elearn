import { Request, Response } from "express";
import {
  createQuizService,
  addQuestionService,
  getQuizByCourseService,
  getQuizByIdService,
  saveResultService,
  getMyResultsService,
  deleteQuizService
} from "./quiz.service";

export const createQuiz = async (req: Request, res: Response) => {
  try {
    const { title, courseId } = req.body;

    const quiz = await createQuizService({
      title,
      courseId: Number(courseId)
    });

    res.status(201).json(quiz);
  } catch (err) {
    res.status(500).json({ message: "Failed to create quiz" });
  }
};

export const addQuestion = async (req: Request, res: Response) => {
  try {
    const quizId = Number(req.params.quizId);

    const question = await addQuestionService({
      ...req.body,
      quizId
    });

    res.status(201).json(question);
  } catch (err) {
    res.status(500).json({ message: "Failed to add question" });
  }
};

export const getQuizByCourse = async (req: Request, res: Response) => {
  const courseId = Number(req.params.courseId);

  const quiz = await getQuizByCourseService(courseId);

  if (!quiz) return res.status(404).json({ message: "Quiz not found" });

  const safeQuestions = quiz.questions.map((q) => ({
    id: q.id,
    question: q.question,
    optionA: q.optionA,
    optionB: q.optionB,
    optionC: q.optionC,
    optionD: q.optionD
  }));

  res.json({
    id: quiz.id,
    title: quiz.title,
    questions: safeQuestions
  });
};

export const getQuizById = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  const quiz = await getQuizByIdService(id);

  res.json(quiz);
};

export const submitQuiz = async (req: Request, res: Response) => {
  try {
    const quizId = Number(req.params.id);
    const userId = req.user?.userId;
    const { answers } = req.body;

    const quiz = await getQuizByIdService(quizId);

    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }

    let score = 0;

    quiz.questions.forEach((q) => {
      const found = answers.find(
        (a: any) => a.questionId === q.id
      );

      if (found && found.answer === q.correct) {
        score++;
      }
    });

    const total = quiz.questions.length;

    await saveResultService({
      userId,
      quizId,
      score,
      total
    });

    res.json({
      message: "Quiz submitted",
      score,
      total,
      percentage: Math.round((score / total) * 100)
    });
  } catch (err) {
    res.status(500).json({ message: "Submit failed" });
  }
};

export const myResults = async (req: Request, res: Response) => {
  const userId = req.user?.userId;

  const results = await getMyResultsService(userId);

  res.json(results);
};

export const deleteQuiz = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  await deleteQuizService(id);

  res.json({ message: "Quiz deleted" });
};