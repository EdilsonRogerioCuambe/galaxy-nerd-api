import { Category, Prisma } from '@prisma/client'
import { CategoriesRepository } from '../categories.repository'

export class InMemoryCategoriesRepository implements CategoriesRepository {
  private categories: Category[] = []

  async create(data: Prisma.CategoryCreateInput) {
    const category = {
      id: 'any_id',
      name: data.name,
      description: data.description || null,
      icon: data.icon || null,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    this.categories.push(category)

    return category
  }

  async findAll() {
    const categories = this.categories

    return categories
  }

  async findById(id: string) {
    const category = this.categories.find((category) => category.id === id)

    if (!category) {
      return null
    }

    return category
  }

  async findByName(name: string): Promise<Category | null> {
    const category = this.categories.find((category) => category.name === name)

    if (!category) {
      return null
    }

    return category
  }

  async update(id: string, data: Prisma.CategoryUpdateInput) {
    const category = this.categories.findIndex((category) => category.id === id)

    this.categories[category] = {
      ...this.categories[category],
      id: this.categories[category].id,
      name: data.name as string,
      description: data.description as string | null,
      icon: data.icon as string | null,
      createdAt: this.categories[category].createdAt,
      updatedAt: new Date(),
    }

    return this.categories[category]
  }

  async delete(id: string): Promise<void> {
    const category = this.categories.findIndex((category) => category.id === id)

    this.categories.splice(category, 1)
  }
}
