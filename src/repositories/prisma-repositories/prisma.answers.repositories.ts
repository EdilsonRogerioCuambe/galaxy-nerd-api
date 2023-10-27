import { Prisma, Answers } from '@prisma/client'
import { AnswersRepository } from '../answers.repository'
import { prisma } from '@/lib/prisma'

export class PrismaAnswersRepository implements AnswersRepository {
  async create(data: Prisma.AnswersUncheckedCreateInput) {
    const answer = await prisma.answers.create({
      data,
    })

    return answer as Answers
  }

  async findById(id: string) {
    const answer = await prisma.answers.findUnique({
      where: { id },
    })

    return answer
  }

  async findAll() {
    const findAllRecursive = async (parentId: string | null) => {
      const answers = await prisma.answers.findMany({
        where: { parentId },
        include: {
          children: true,
          instructor: true,
          student: true,
          parent: true,
        },
      })

      for (const answer of answers) {
        if (answer.children.length > 0) {
          const children = await findAllRecursive(answer.id)
          answer.children = children
        }
      }

      return answers
    }

    const answers = await findAllRecursive(null)

    return answers
  }

  async delete(id: string) {
    const asnwer = await prisma.answers.delete({
      where: { id },
    })

    return asnwer
  }

  async update(id: string, data: Prisma.AnswersUncheckedUpdateInput) {
    const answer = await prisma.answers.update({
      where: { id },
      data,
    })

    return answer
  }

  async findChildren(id: string) {
    const findChildrenRecursive = async (parentId: string) => {
      const answers = await prisma.answers.findMany({
        where: { parentId },
        include: { children: true },
      })

      for (const answer of answers) {
        if (answer.children.length > 0) {
          const children = await findChildrenRecursive(answer.id)
          answer.children = children
        }
      }

      return answers
    }

    const answers = await findChildrenRecursive(id)

    return answers
  }

  async findByForumId(forumId: string) {
    const findChildrenRecursive = async (
      parentId: string | null,
      forumId: string,
    ) => {
      const answers = await prisma.answers.findMany({
        where: { parentId, forumId },
        include: {
          children: true,
          parent: true,
          instructor: true,
          student: true,
        },
      })

      for (const answer of answers) {
        if (answer.children.length > 0) {
          const children = await findChildrenRecursive(answer.id, forumId)
          answer.children = children
        }
      }

      return answers
    }

    const answers = await findChildrenRecursive(null, forumId)

    return answers
  }

  async findParent(id: string) {
    const findParentRecursive = async (childId: string) => {
      const answer = await prisma.answers.findUnique({
        where: { id: childId },
        include: { parent: true },
      })

      if (answer?.parent) {
        const parent = await findParentRecursive(answer.parent.id)
        answer.parent = parent
      }

      return answer
    }

    const answer = await findParentRecursive(id)

    return answer
  }
}
