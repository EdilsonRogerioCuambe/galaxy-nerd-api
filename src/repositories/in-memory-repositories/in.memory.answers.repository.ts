import { Answers, Prisma } from '@prisma/client'
import { AnswersRepository } from '@/repositories/answers.repository'
import { randomUUID } from 'crypto'

interface AnswersWithChildren extends Answers {
  answers: AnswersWithChildren[]
}

export class InMemoryAnswersRepository implements AnswersRepository {
  private answers: Answers[] = []

  async create(data: Prisma.AnswersUncheckedCreateInput) {
    const answer = {
      id: randomUUID(),
      parentId: data.parentId !== undefined ? data.parentId : null,
      forumId: data.forumId !== undefined ? data.forumId : null,
      upvotes: 0,
      downvotes: 0,
      studentId: data.studentId !== undefined ? data.studentId : null,
      content: data.content,
      instructorId: data.instructorId !== undefined ? data.instructorId : null,
      isAnswer: data.isAnswer !== undefined ? data.isAnswer : false,
      createdAt: new Date(),
      updatedAt: new Date(),
      answers: [],
    }

    this.answers.push(answer)

    return answer
  }

  async findById(id: string) {
    const answer = this.answers.find((answer) => answer.id === id)

    if (!answer) {
      return null
    }

    return answer
  }

  async findAll() {
    return this.answers
  }

  async delete(id: string): Promise<Answers | null> {
    const answer = this.answers.find((answer) => answer.id === id)

    if (!answer) {
      return null
    }

    this.answers = this.answers.filter((answer) => answer.id !== id)

    return answer
  }

  async update(id: string, data: Prisma.AnswersUncheckedUpdateInput) {
    const answer = this.answers.findIndex((answer) => answer.id === id)

    this.answers[answer] = {
      ...this.answers[answer],
      id: this.answers[answer].id,
      content:
        typeof data.content === 'string'
          ? data.content
          : this.answers[answer].content,
      parentId: typeof data.parentId === 'string' ? data.parentId : null,
      forumId: typeof data.forumId === 'string' ? data.forumId : null,
      upvotes: typeof data.upvotes === 'number' ? data.upvotes : 0,
      downvotes: typeof data.downvotes === 'number' ? data.downvotes : 0,
      studentId: typeof data.studentId === 'string' ? data.studentId : null,
      instructorId:
        typeof data.instructorId === 'string'
          ? data.instructorId
          : this.answers[answer].instructorId,
      isAnswer: typeof data.isAnswer === 'boolean' ? data.isAnswer : false,
      createdAt: this.answers[answer].createdAt,
      updatedAt: new Date(),
    }

    return this.answers[answer]
  }

  async findChildren(id: string): Promise<AnswersWithChildren[]> {
    const findChildrenRecursive = (
      id: string,
      answers: Answers[],
    ): AnswersWithChildren[] => {
      const result: AnswersWithChildren[] = []

      for (const answer of answers) {
        if (answer.parentId === id) {
          const answerWithChildren: AnswersWithChildren = {
            ...answer,
            answers: [],
          }
          answerWithChildren.answers = findChildrenRecursive(answer.id, answers)
          result.push(answerWithChildren)
        }
      }

      return result
    }

    const answers = findChildrenRecursive(id, this.answers)

    return answers
  }

  async findParent(id: string) {
    const answer = this.answers.find((answer) => answer.id === id)

    if (!answer) {
      return null
    }

    const parent = this.answers.find((answer) => answer.id === answer.parentId)

    if (!parent) {
      return null
    }

    return parent
  }
}
