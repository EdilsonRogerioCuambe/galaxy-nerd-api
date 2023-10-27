import { QuizRepository } from '@/repositories/quiz.repository'
import { Quiz } from '@prisma/client'

interface GetQuizzesByLessonIdUseCaseProps {
  lessonId: string
}

interface GetQuizzesByLessonIdUseCaseResponse {
  quizzes: Quiz[]
}

export class GetQuizzesByLessonIdUseCase {
  constructor(private quizRepository: QuizRepository) {}

  async execute({
    lessonId,
  }: GetQuizzesByLessonIdUseCaseProps): Promise<GetQuizzesByLessonIdUseCaseResponse> {
    const quizzes = await this.quizRepository.findQuizzesByLessonId(lessonId)

    return { quizzes }
  }
}
