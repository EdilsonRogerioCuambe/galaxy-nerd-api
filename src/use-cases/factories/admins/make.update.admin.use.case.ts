import { PrismaAdminsRepository } from '@/repositories/prisma-repositories/prisma.admins.repository'
import { UpdateAdminUseCase } from '@/use-cases/admins/update.admin.use.case'

export function makeUpdateAdminUseCase() {
  const prismaAdminsRepository = new PrismaAdminsRepository()
  const updateAdminUseCase = new UpdateAdminUseCase(prismaAdminsRepository)

  return updateAdminUseCase
}
