import { Answers, Prisma } from '@prisma/client'

export interface AnswersRepository {
  create(data: Prisma.AnswersCreateInput): Promise<Answers>
  findById(id: string): Promise<Answers | null>
  findAll(): Promise<Answers[]>
  delete(id: string): Promise<Answers | null>
  update(id: string, data: Prisma.AnswersUpdateInput): Promise<Answers>
  findChildren(id: string): Promise<Answers[] | null>
  findByForumId(forumId: string): Promise<Answers[]>
  findParent(id: string): Promise<Answers | null>
}
