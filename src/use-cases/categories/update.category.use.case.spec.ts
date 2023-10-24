import { it, describe, expect, beforeEach } from 'vitest'
import { InMemoryCategoriesRepository } from '@/repositories/in-memory-repositories/in.memory.categories.repository'
import { CategoryNotFoundError } from './err/category.not.found.error'
import { UpdateCategoryUseCase } from './update.category.use.case'

let sut: UpdateCategoryUseCase
let categoriesRepository: InMemoryCategoriesRepository

describe('Update Category Use Case', () => {
  beforeEach(() => {
    categoriesRepository = new InMemoryCategoriesRepository()
    sut = new UpdateCategoryUseCase(categoriesRepository)
  })

  it('should be able to update a category', async () => {
    const category = await categoriesRepository.create({
      name: 'any_name',
      description: 'any_description',
      icon: 'any_icon',
      administratorId: 'any_administrator_id',
      courseId: 'any_course_id',
      createdAt: new Date(),
      id: 'any_id',
      studentId: 'any_student_id',
      updatedAt: new Date(),
    })

    const updatedCategory = await sut.execute({
      categoryId: category.id,
      name: 'new_name',
      description: 'new_description',
      icon: 'new_icon',
    })

    expect(updatedCategory.category.name).toBe('new_name')
    expect(updatedCategory.category.description).toBe('new_description')
    expect(updatedCategory.category.icon).toBe('new_icon')
  })

  it('should not be able to update a category with a non-existing id', async () => {
    await expect(
      sut.execute({
        categoryId: 'non_existing_id',
        name: 'new_name',
        description: 'new_description',
        icon: 'new_icon',
      }),
    ).rejects.toBeInstanceOf(CategoryNotFoundError)
  })
})
