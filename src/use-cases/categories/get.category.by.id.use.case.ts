import { CategoriesRepository } from '@/repositories/categories.repository'
import { CategoryNotFoundError } from '@/use-cases/categories/err/category.not.found.error'
import { Category } from '@prisma/client'

interface GetCategoryByIdUseCaseRequest {
  id: string
}

interface GetCategoryByIdUseCaseResponse {
  category: Category
}

export class GetCategoryByIdUseCase {
  constructor(private categoriesRepository: CategoriesRepository) {}

  async execute({
    id,
  }: GetCategoryByIdUseCaseRequest): Promise<GetCategoryByIdUseCaseResponse> {
    const category = await this.categoriesRepository.findById(id)

    if (!category) {
      throw new CategoryNotFoundError()
    }

    return { category }
  }
}
