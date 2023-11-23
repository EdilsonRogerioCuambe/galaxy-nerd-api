import { ProblemRepository } from '@/repositories/problem.repository'
import { Problem } from '@prisma/client'

interface GetProblemByLessonIdUseCaseProps {
  lessonId: string
}

interface GetProblemByLessonIdUseCaseResponse {
  problem: Problem
}

export class GetProblemByLessonIdUseCase {
  constructor(private problemRepository: ProblemRepository) {}

  async execute({
    lessonId,
  }: GetProblemByLessonIdUseCaseProps): Promise<GetProblemByLessonIdUseCaseResponse> {
    const problem = await this.problemRepository.findProblemByLessonId(lessonId)

    return {
      problem,
    }
  }
}
