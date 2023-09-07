import { Category, Prisma } from '@prisma/client'

export interface CategoriesRepository {
  create(data: Prisma.CategoryCreateInput): Promise<Category>
  findAll(): Promise<Category[]>
  findById(id: string): Promise<Category | null>
  findByName(name: string): Promise<Category | null>
  update(id: string, data: Prisma.CategoryUpdateInput): Promise<Category>
  delete(id: string): Promise<void>
}
