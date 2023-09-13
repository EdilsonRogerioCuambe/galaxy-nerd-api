import { PrismaCategoriesRepository } from '@/repositories/prisma-repositories/prisma.categories.repository'
import { UpdateCategoryUseCase } from '@/use-cases/categories/update.category.use.case'

export function makeUpdateCategoryUseCase(): UpdateCategoryUseCase {
  const categoriesRepository = new PrismaCategoriesRepository()
  const updateCategoryUseCase = new UpdateCategoryUseCase(categoriesRepository)

  return updateCategoryUseCase
}
