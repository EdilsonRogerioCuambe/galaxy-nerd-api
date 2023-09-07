import { PrismaCategoriesRepository } from '@/repositories/prisma-repositories/prisma.categories.repository'
import { RegisterCategoryUseCase } from '@/use-cases/categories/register.category.use.case'

export function makeRegisterCategoryUseCase() {
  const categoriesRepository = new PrismaCategoriesRepository()
  const registerCategoryUseCase = new RegisterCategoryUseCase(
    categoriesRepository,
  )

  return registerCategoryUseCase
}
