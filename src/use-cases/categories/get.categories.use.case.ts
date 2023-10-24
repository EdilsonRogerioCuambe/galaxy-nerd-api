import { CategoriesRepository } from '@/repositories/categories.repository'
import { Category } from '@prisma/client'

interface GetAllCategoriesUseCaseResponse {
  categories: Category[]
}

export class GetAllCategoriesUseCase {
  constructor(private categoriesRepository: CategoriesRepository) {}

  async execute(): Promise<GetAllCategoriesUseCaseResponse> {
    const categories = await this.categoriesRepository.findAll()

    return { categories }
  }
}
