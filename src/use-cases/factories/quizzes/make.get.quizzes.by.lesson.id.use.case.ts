import { PrismaQuizRepositories } from '@/repositories/prisma-repositories/prisma.quiz.repositories'
import { GetQuizzesByLessonIdUseCase } from '@/use-cases/quizzes/get.quizzes.by.lesson.id.use.case'

export const makeGetQuizzesByLessonIdUseCase =
  (): GetQuizzesByLessonIdUseCase => {
    const quizRepository = new PrismaQuizRepositories()

    return new GetQuizzesByLessonIdUseCase(quizRepository)
  }
