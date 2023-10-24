import { it, describe, expect, beforeEach } from 'vitest'
import { InMemoryCategoriesRepository } from '@/repositories/in-memory-repositories/in.memory.categories.repository'
import { CategoryAlreadyExistsError } from './err/cateogory.already.exists.error'
import { RegisterCategoryUseCase } from './register.category.use.case'

let sut: RegisterCategoryUseCase
let categoriesRepository: InMemoryCategoriesRepository

describe('Register Category Use Case', () => {
  beforeEach(() => {
    categoriesRepository = new InMemoryCategoriesRepository()
    sut = new RegisterCategoryUseCase(categoriesRepository)
  })

  it('should be able to register a new category', async () => {
    const category = await sut.execute({
      name: 'any_name',
      description: 'any_description',
      icon: 'any_icon',
    })

    expect(category.category).toHaveProperty('id')
  })

  it('should not be able to register a new category with an existing name', async () => {
    await categoriesRepository.create({
      name: 'any_name',
      description: 'any_description',
      icon: 'any_icon',
      administratorId: 'any_administrator_id',
      courseId: 'any_course_id',
      studentId: 'any_student_id',
      createdAt: new Date(),
      updatedAt: new Date(),
      id: 'any_id',
    })

    await expect(
      sut.execute({
        name: 'any_name',
        description: 'any_description',
        icon: 'any_icon',
      }),
    ).rejects.toBeInstanceOf(CategoryAlreadyExistsError)
  })
})
