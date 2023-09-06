import { Prisma, Administrator } from '@prisma/client'

export interface AdminsRepository {
  create(data: Prisma.AdministratorCreateInput): Promise<Administrator>
  findByEmail(email: string): Promise<Administrator | null>
  findById(id: string): Promise<Administrator | null>
  findAll(): Promise<Administrator[]>
  delete(id: string): Promise<void>
}
