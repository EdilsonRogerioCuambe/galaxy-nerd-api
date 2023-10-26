import { InMemoryAnswersRepository } from '@/repositories/in-memory-repositories/in.memory.answers.repository'
import { GetAllAnswersUseCase } from './get.all.answers.use.case'
import { it, describe, expect, beforeEach } from 'vitest'

let sut: GetAllAnswersUseCase
let answersRepository: InMemoryAnswersRepository

describe('Get All Answers Use Case', () => {
  beforeEach(() => {
    answersRepository = new InMemoryAnswersRepository()
    sut = new GetAllAnswersUseCase(answersRepository)
  })

  it('should be able to get all answers', async () => {
    const answer = await answersRepository.create({
      content: 'first_content',
      parentId: null,
      studentId: 'first_student_id',
      forumId: 'first_forum_id',
    })

    const childAnswer = await answersRepository.create({
      content: 'second_content',
      parentId: answer.id,
      studentId: 'second_student_id',
      forumId: 'first_forum_id',
    })

    const response = await sut.execute()

    expect(response.answers[0].id).toBe(answer.id)
    expect(response.answers[0].content).toBe(answer.content)
    expect(response.answers[0].parentId).toBe(answer.parentId)
    expect(response.answers[1].id).toBe(childAnswer.id)
    expect(response.answers[1].content).toBe(childAnswer.content)
    expect(response.answers[1].parentId).toBe(childAnswer.parentId)
  })
})
