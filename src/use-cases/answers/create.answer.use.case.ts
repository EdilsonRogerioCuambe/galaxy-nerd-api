import { AnswersRepository } from '@/repositories/answers.repository'
import { Answers } from '@prisma/client'

interface CreateAnswerUseCaseProps {
  content: string
  parentId?: string
  forumId?: string
  studentId?: string
  instructorId?: string
}

interface CreateAnswerUseCaseResponse {
  answer: Answers
}

export class CreateAnswerUseCase {
  constructor(private answersRepository: AnswersRepository) {}

  async execute({
    content,
    parentId,
    forumId,
    studentId,
    instructorId,
  }: CreateAnswerUseCaseProps): Promise<CreateAnswerUseCaseResponse> {
    const answer = await this.answersRepository.create({
      content,
      forum: {
        connect: { id: forumId },
      },
      parent: {
        connect: parentId ? { id: parentId } : undefined,
      },
      student: {
        connect: studentId ? { id: studentId } : undefined,
      },
      instructor: {
        connect: instructorId ? { id: instructorId } : undefined,
      },
    })

    return { answer }
  }
}
