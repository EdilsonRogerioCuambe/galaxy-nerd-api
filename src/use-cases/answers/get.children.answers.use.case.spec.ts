import { InMemoryAnswersRepository } from '@/repositories/in-memory-repositories/in.memory.answers.repository'
import { GetChildrenAnswersUseCase } from './get.children.answers.use.case'
import { it, describe, expect, beforeEach } from 'vitest'

let sut: GetChildrenAnswersUseCase
let answersRepository: InMemoryAnswersRepository

describe('Get Children Answers Use Case', () => {
  beforeEach(() => {
    answersRepository = new InMemoryAnswersRepository()
    sut = new GetChildrenAnswersUseCase(answersRepository)
  })

  it('should be able to get children answers', async () => {
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

    const response = await sut.execute({ id: answer.id })

    expect(response.answers[0].id).toBe(childAnswer.id)
    expect(response.answers[0].content).toBe(childAnswer.content)
    expect(response.answers[0].parentId).toBe(childAnswer.parentId)
  })

  it('should be able to get children answers with children', async () => {
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

    const childAnswer2 = await answersRepository.create({
      content: 'third_content',
      parentId: childAnswer.id,
      studentId: 'third_student_id',
      forumId: 'first_forum_id',
    })

    const children3 = await answersRepository.create({
      content: 'fourth_content',
      parentId: childAnswer2.id,
      studentId: 'fourth_student_id',
      forumId: 'first_forum_id',
    })

    const response = await sut.execute({ id: answer.id })

    console.log(response)

    expect(response.answers[0].id).toBe(childAnswer.id)
    expect(response.answers[0].content).toBe(childAnswer.content)
    expect(response.answers[0].parentId).toBe(childAnswer.parentId)

    // expect(response.answers[0].answers[0].id).toBe(childAnswer2.id)
    // expect(response.answers[0].answers[0].content).toBe(childAnswer2.content)
    // expect(response.answers[0].answers[0].parentId).toBe(childAnswer2.parentId)

    // expect(response.answers[0].answers[0].answers[0].id).toBe(children3.id)
    // expect(response.answers[0].answers[0].answers[0].content).toBe(
    //   'fourth_content',
    // )
  })
})
