import { PrismaAdminsRepository } from '@/repositories/prisma-repositories/prisma.admins.repository'
import { GetAllAdminsUseCase } from '@/use-cases/admins/get.all.admins.use.case'

export function makeGetAllAdminsUseCase(): GetAllAdminsUseCase {
  const adminsRepository = new PrismaAdminsRepository()
  const getAllAdminsUseCase = new GetAllAdminsUseCase(adminsRepository)

  return getAllAdminsUseCase
}
