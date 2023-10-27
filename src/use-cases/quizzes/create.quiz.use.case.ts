import { QuizRepository } from '@/repositories/quiz.repository'
import { Quiz } from '@prisma/client'

interface QuizOption {
  option: string
  isCorrect: boolean
}

interface CreateQuizUseCaseProps {
  title: string
  description: string
  lessonId: string
  answer: string
  points: number
  quizOptions: QuizOption[]
}

interface CreateQuizUseCaseResponse {
  quiz: Quiz
}

export class CreateQuizUseCase {
  constructor(private quizRepository: QuizRepository) {}

  async execute({
    title,
    description,
    lessonId,
    answer,
    points,
    quizOptions,
  }: CreateQuizUseCaseProps): Promise<CreateQuizUseCaseResponse> {
    const quiz = await this.quizRepository.create({
      title,
      description,
      lesson: {
        connect: {
          id: lessonId,
        },
      },
      answer,
      points,
      quizOptions: {
        create: quizOptions,
      },
    })

    return { quiz }
  }
}
