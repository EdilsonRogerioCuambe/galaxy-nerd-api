import { it, describe, expect, beforeEach } from 'vitest'
import { InMemoryCategoriesRepository } from '@/repositories/in-memory-repositories/in.memory.categories.repository'
import { GetAllCategoriesUseCase } from './get.categories.use.case'

let sut: GetAllCategoriesUseCase
let categoriesRepository: InMemoryCategoriesRepository

describe('Get All Categories Use Case', () => {
  beforeEach(() => {
    categoriesRepository = new InMemoryCategoriesRepository()
    sut = new GetAllCategoriesUseCase(categoriesRepository)
  })

  it('should be able to get all categories', async () => {
    const category = await categoriesRepository.create({
      name: 'any_name',
      description: 'any_description',
      icon: 'any_icon',
    })

    const { categories } = await sut.execute()

    expect(categories).toEqual([category])
  })
})
