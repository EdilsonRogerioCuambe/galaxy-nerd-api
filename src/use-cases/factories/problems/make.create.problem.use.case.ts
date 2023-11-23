import { PrismaProblemRepository } from '@/repositories/prisma-repositories/prisma.problem.respository'
import { CreateProblemUseCase } from '@/use-cases/problems/create.problem.use.case'

export const makeCreateProblemUseCase = (): CreateProblemUseCase => {
  const prismaProblemRepository = new PrismaProblemRepository()
  const createProblemUseCase = new CreateProblemUseCase(prismaProblemRepository)

  return createProblemUseCase
}
