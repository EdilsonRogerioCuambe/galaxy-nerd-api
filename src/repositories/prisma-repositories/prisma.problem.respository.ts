import { Prisma } from '@prisma/client'
import { ProblemRepository } from '../problem.repository'
import { prisma } from '@/lib/prisma'

export class PrismaProblemRepository implements ProblemRepository {
  async create(data: Prisma.ProblemCreateInput) {
    const problem = await prisma.problem.create({
      data,
    })

    return problem
  }

  async findAll() {
    const problems = await prisma.problem.findMany({
      include: {
        lesson: true,
      },
    })

    return problems
  }

  async findById(id: string) {
    const problem = await prisma.problem.findUnique({
      where: { id },
      include: {
        lesson: true,
      },
    })

    return problem
  }

  async findProblemByLessonId(lessonId: string) {
    const problem = await prisma.problem.findFirst({
      where: { lessonId },
      include: {
        examples: true,
      },
    })

    if (!problem) {
      throw new Error('Problem not found')
    }

    return problem
  }

  async update(id: string, data: Prisma.ProblemUpdateInput) {
    const problem = await prisma.problem.update({
      where: { id },
      data,
    })

    return problem
  }

  async delete(id: string) {
    const problem = await prisma.problem.delete({
      where: { id },
    })

    return problem
  }
}
