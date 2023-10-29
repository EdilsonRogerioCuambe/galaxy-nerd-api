import { Prisma, LessonProgress } from '@prisma/client'
import { LessonsProgressRepository } from '../lesson.progress.repository'
import { prisma } from '@/lib/prisma'

export class PrismaLessonProgressRepository
  implements LessonsProgressRepository
{
  async create(
    lessonProgress: Prisma.LessonProgressCreateInput,
  ): Promise<LessonProgress> {
    const createdLessonProgress = await prisma.lessonProgress.create({
      data: lessonProgress,
    })

    return createdLessonProgress
  }

  async findByLessonIdAndStudentId(
    lessonId: string,
    studentId: string,
  ): Promise<LessonProgress | null> {
    const lessonProgress = await prisma.lessonProgress.findFirst({
      where: {
        lessonId,
        studentId,
      },
    })

    return lessonProgress
  }

  async update(
    lessonProgressId: string,
    studentId: string,
    lessonId: string,
    watched: boolean,
  ): Promise<LessonProgress> {
    const updatedLessonProgress = await prisma.lessonProgress.update({
      where: {
        id: lessonProgressId,
      },
      data: {
        watched,
      },
    })

    return updatedLessonProgress
  }
}
