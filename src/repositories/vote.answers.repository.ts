import { Vote } from '@prisma/client'

export interface VotesRepository {
  upvoteAnswer(
    id: string,
    studentId?: string,
    instructorId?: string,
  ): Promise<Vote>
  downvoteAnswer(
    id: string,
    studentId?: string,
    instructorId?: string,
  ): Promise<Vote>
}
