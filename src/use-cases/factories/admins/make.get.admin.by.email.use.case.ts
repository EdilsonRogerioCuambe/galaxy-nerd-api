import { PrismaAdminsRepository } from '@/repositories/prisma-repositories/prisma.admins.repository'
import { GetAdminByEmailUseCase } from '@/use-cases/admins/get.admin.by.email.use.case'

export const makeGetAdminByEmailUseCase = () => {
  const adminsRepository = new PrismaAdminsRepository()
  const getAdminByEmailUseCase = new GetAdminByEmailUseCase(adminsRepository)

  return getAdminByEmailUseCase
}
