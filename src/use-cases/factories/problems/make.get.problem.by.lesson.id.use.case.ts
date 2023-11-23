import { PrismaProblemRepository } from '@/repositories/prisma-repositories/prisma.problem.respository'
import { GetProblemByLessonIdUseCase } from '@/use-cases/problems/get.problem.by.lesson.id.use.case'

export const makeGetProblemByLessonIdUseCase =
  (): GetProblemByLessonIdUseCase => {
    const prismaProblemRepository = new PrismaProblemRepository()
    const getProblemByLessonIdUseCase = new GetProblemByLessonIdUseCase(
      prismaProblemRepository,
    )

    return getProblemByLessonIdUseCase
  }
