import { Prisma, Student } from '@prisma/client'

export interface StudentsRepository {
  create(data: Prisma.StudentCreateInput): Promise<Student>
  findById(id: string): Promise<Student | null>
  findByEmail(email: string): Promise<Student | null>
  update(id: string, data: Prisma.StudentUpdateInput): Promise<Student>
  delete(id: string): Promise<void>
}
