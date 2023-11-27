import { PrismaCategoriesRepository } from '@/repositories/prisma-repositories/prisma.categories.repository'
import { GetCategoryByIdUseCase } from '@/use-cases/categories/get.category.by.id.use.case'

export const makeGetCategoryByIdUseCase = (): GetCategoryByIdUseCase => {
  const categoriesRepository = new PrismaCategoriesRepository()
  const getCategoryByIdUseCase = new GetCategoryByIdUseCase(
    categoriesRepository,
  )

  return getCategoryByIdUseCase
}
