import { Prisma } from '@prisma/client'
import { ForunsRepository } from '../forum.repository'
import { prisma } from '@/lib/prisma'

export class PrismaForunsRepository implements ForunsRepository {
  async create(data: Prisma.ForumUncheckedCreateInput) {
    const forum = await prisma.forum.create({
      data,
    })

    return forum
  }

  async findById(id: string) {
    const forum = await prisma.forum.findUnique({
      where: { id },
    })

    return forum
  }

  async findAll() {
    const forums = await prisma.forum.findMany({
      include: {
        answers: true,
      },
    })

    return forums
  }

  async delete(id: string): Promise<void> {
    await prisma.forum.delete({
      where: { id },
    })
  }

  async update(id: string, data: Prisma.ForumUncheckedUpdateInput) {
    const forum = await prisma.forum.update({
      where: { id },
      data,
    })

    return forum
  }

  async findBySlug(slug: string) {
    const getNestedAnswers = async (
      parentId: string | null,
      forumId: string,
    ) => {
      const answers = await prisma.answers.findMany({
        where: { parentId, forumId },
        include: {
          children: true,
          instructor: true,
          student: true,
          parent: true,
        },
      })

      for (const answer of answers) {
        if (answer.children.length > 0) {
          const children = await getNestedAnswers(answer.id, forumId)
          answer.children = children
        }
      }

      return answers
    }

    const forum = await prisma.forum.findUnique({
      where: { slug },
      include: {
        answers: {
          include: {
            children: true,
            instructor: true,
            student: true,
            parent: true,
          },
        },
      },
    })

    if (forum) {
      forum.answers = await getNestedAnswers(null, forum.id)
    }

    return forum
  }

  async findAllForumsByLessonId(lessonId: string) {
    const forums = await prisma.forum.findMany({
      where: { lessonId },
      include: {
        answers: true,
        student: true,
      },
    })

    return forums
  }

  async findByTitle(title: string) {
    const forum = await prisma.forum.findUnique({
      where: { title },
    })

    return forum
  }
}
