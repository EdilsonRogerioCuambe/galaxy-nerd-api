import { VotesRepository } from '../vote.answers.repository'
import { prisma } from '@/lib/prisma'

export class PrismaVoteAnswersRepository implements VotesRepository {
  async upvoteAnswer(id: string, studentId: string, instructorId: string) {
    let vote = await prisma.vote.findFirst({
      where: {
        answerId: id,
        studentId,
        instructorId,
      },
    })

    if (vote) {
      vote = await prisma.vote.update({
        where: { id: vote.id },
        data: { voteType: 'UPVOTE' },
      })
    } else {
      vote = await prisma.vote.create({
        data: {
          voteType: 'UPVOTE',
          answerId: id,
          studentId,
          instructorId,
        },
      })
    }

    return vote
  }

  async downvoteAnswer(id: string, studentId: string, instructorId: string) {
    let vote = await prisma.vote.findFirst({
      where: {
        answerId: id,
        studentId,
        instructorId,
      },
    })

    if (vote) {
      vote = await prisma.vote.update({
        where: { id: vote.id },
        data: { voteType: 'DOWNVOTE' },
      })
    } else {
      vote = await prisma.vote.create({
        data: {
          voteType: 'DOWNVOTE',
          answerId: id,
          studentId,
          instructorId,
        },
      })
    }

    return vote
  }
}
