import { PrismaCategoriesRepository } from '@/repositories/prisma-repositories/prisma.categories.repository'
import { GetAllCategoriesUseCase } from '@/use-cases/categories/get.categories.use.case'

export const makeGetCategoriesUseCase = () => {
  const categoriesRepository = new PrismaCategoriesRepository()
  const getCategoriesUseCase = new GetAllCategoriesUseCase(categoriesRepository)

  return getCategoriesUseCase
}
