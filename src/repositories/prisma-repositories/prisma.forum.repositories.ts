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
    const forums = await prisma.forum.findMany()

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
    const forum = await prisma.forum.findUnique({
      where: { slug },
    })

    return forum
  }

  async findByTitle(title: string) {
    const forum = await prisma.forum.findUnique({
      where: { title },
    })

    return forum
  }
}
