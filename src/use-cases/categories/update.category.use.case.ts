import { CategoriesRepository } from '@/repositories/categories.repository'
import { CategoryNotFoundError } from './err/category.not.found.error'
import { Category } from '@prisma/client'

interface UpdateCategoryProps {
  categoryId: string
  name?: string
  description?: string
  icon?: string
}

interface UpdateCategoryResponse {
  category: Category
}

export class UpdateCategoryUseCase {
  constructor(private readonly categoriesRepository: CategoriesRepository) {}

  async execute({
    categoryId,
    name,
    description,
    icon,
  }: UpdateCategoryProps): Promise<UpdateCategoryResponse> {
    const categoryNotFound =
      await this.categoriesRepository.findById(categoryId)

    if (!categoryNotFound) {
      throw new CategoryNotFoundError()
    }

    const category = await this.categoriesRepository.update(categoryId, {
      id: categoryId,
      name,
      description,
      icon,
    })

    return { category }
  }
}
