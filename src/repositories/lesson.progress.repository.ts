import { Prisma, LessonProgress } from '@prisma/client'

export interface LessonsProgressRepository {
  create: (
    lessonProgress: Prisma.LessonProgressCreateInput,
  ) => Promise<LessonProgress>
  findByLessonIdAndStudentId: (
    lessonId: string,
    studentId: string,
  ) => Promise<LessonProgress | null>
  update: (
    lessonProgressId: string,
    studentId: string,
    lessonId: string,
    watched: boolean,
  ) => Promise<LessonProgress>
}
