import { Instructor, Prisma } from '@prisma/client'

export interface InstructorsRepository {
  create(data: Prisma.InstructorCreateInput): Promise<Instructor>
  findByEmail(email: string): Promise<Instructor | null>
  findById(id: string): Promise<Instructor | null>
  findAll(): Promise<Instructor[]>
  delete(id: string): Promise<void>
  update(
    id: string,
    data: Prisma.InstructorUncheckedUpdateInput,
  ): Promise<Instructor>
}
