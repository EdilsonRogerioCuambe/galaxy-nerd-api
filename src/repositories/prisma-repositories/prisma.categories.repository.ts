import { Prisma } from '@prisma/client'
import { CategoriesRepository } from '../categories.repository'
import { prisma } from '@/lib/prisma'

export class PrismaCategoriesRepository implements CategoriesRepository {
  async create(data: Prisma.CategoryCreateInput) {
    const category = await prisma.category.create({ data })

    return category
  }

  async findAll() {
    const categories = await prisma.category.findMany()

    return categories
  }

  async findById(id: string) {
    const category = await prisma.category.findUnique({ where: { id } })

    return category
  }

  async findByName(name: string) {
    const category = await prisma.category.findUnique({
      where: {
        name,
      },
    })

    return category
  }

  async update(id: string, data: Prisma.CategoryUpdateInput) {
    const category = await prisma.category.update({
      where: { id },
      data,
    })

    return category
  }

  async delete(id: string): Promise<void> {
    await prisma.category.delete({ where: { id } })
  }
}
