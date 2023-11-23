import { ProblemRepository } from '@/repositories/problem.repository'
import { Problem } from '@prisma/client'

interface CreateProblemExampleProps {
  inputText: string
  outputText: string
  explanation: string
}

interface CreateProblemUseCaseProps {
  title: string
  problemStatement: string
  constraints: string
  starterFunctionName: string
  examples: CreateProblemExampleProps[]
  starterCode: string
  handlerFunction: string
  order: string
  lessonId: string
}

interface CreateProblemUseCaseResponse {
  problem: Problem
}

export class CreateProblemUseCase {
  constructor(private problemRepository: ProblemRepository) {}

  async execute({
    title,
    problemStatement,
    examples,
    constraints,
    starterFunctionName,
    starterCode,
    handlerFunction,
    order,
    lessonId,
  }: CreateProblemUseCaseProps): Promise<CreateProblemUseCaseResponse> {
    const problem = await this.problemRepository.create({
      title,
      problemStatement,
      examples: {
        create: examples,
      },
      constraints,
      starterCode,
      handlerFunction,
      order,
      starterFunctionName,
      lesson: lessonId ? { connect: { id: lessonId } } : undefined,
    })

    return {
      problem,
    }
  }
}
