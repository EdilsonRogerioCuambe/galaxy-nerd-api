import { Prisma } from '@prisma/client'
import { QuizRepository } from '../quiz.repository'
import { prisma } from '@/lib/prisma'

export class PrismaQuizRepositories implements QuizRepository {
  async findQuizzesByLessonId(lessonId: string) {
    const quizzes = await prisma.quiz.findMany({
      where: {
        lessonId,
      },
      include: {
        quizOptions: true,
      },
    })

    return quizzes
  }

  async create(quiz: Prisma.QuizCreateInput) {
    const newQuiz = await prisma.quiz.create({
      data: quiz,
    })

    return newQuiz
  }

  async findMany() {
    const quizzes = await prisma.quiz.findMany({
      include: {
        lesson: true,
      },
    })

    return quizzes
  }

  async findById(id: string) {
    const quiz = await prisma.quiz.findUnique({
      where: { id },
      include: {
        lesson: true,
      },
    })

    return quiz
  }

  async updateById(id: string, quiz: Prisma.QuizUpdateInput) {
    const updatedQuiz = await prisma.quiz.update({
      where: { id },
      data: quiz,
    })

    return updatedQuiz
  }

  async deleteById(id: string) {
    const deletedQuiz = await prisma.quiz.delete({
      where: { id },
    })

    return deletedQuiz
  }
}
