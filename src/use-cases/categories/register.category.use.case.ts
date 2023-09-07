import { CategoriesRepository } from '@/repositories/categories.repository'
import { Category } from '@prisma/client'
import { CategoryAlreadyExistsError } from './err/cateogory.already.exists.error'

interface RegisterCategoryUseCaseProps {
  name: string
  description?: string
  icon?: string
}

interface RegisterCategoryUseCaseResponse {
  category: Category
}

export class RegisterCategoryUseCase {
  constructor(private categoriesRepository: CategoriesRepository) {}

  async execute({
    name,
    description,
    icon,
  }: RegisterCategoryUseCaseProps): Promise<RegisterCategoryUseCaseResponse> {
    const categoryAlreadyExists =
      await this.categoriesRepository.findByName(name)

    if (categoryAlreadyExists) {
      throw new CategoryAlreadyExistsError()
    }

    const category = await this.categoriesRepository.create({
      name,
      description,
      icon,
    })

    return { category }
  }
}
