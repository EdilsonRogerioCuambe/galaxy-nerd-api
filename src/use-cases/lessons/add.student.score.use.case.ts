import { ScoreRepository } from '@/repositories/scores.resporitory'
import { StudentQuizScore } from '@prisma/client'

interface AddStudentScoreUseCaseProps {
  studentId: string
  quizId: string
  score: number
}

interface AddStudentScoreUseCaseResponse {
  score: StudentQuizScore
}

export class AddStudentScoreUseCase {
  constructor(private scoreRepository: ScoreRepository) {}

  async execute({
    studentId,
    quizId,
    score,
  }: AddStudentScoreUseCaseProps): Promise<AddStudentScoreUseCaseResponse> {
    const newScore = await this.scoreRepository.addScore({
      student: { connect: { id: studentId } },
      quiz: { connect: { id: quizId } },
      score,
    })

    return { score: newScore }
  }
}
