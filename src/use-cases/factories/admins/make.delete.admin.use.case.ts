import { PrismaAdminsRepository } from '@/repositories/prisma-repositories/prisma.admins.repository'
import { DeleteAdminUseCase } from '@/use-cases/admins/delete.admin.use.case'

export function makeDeleteAdminUseCase() {
  const adminsRepository = new PrismaAdminsRepository()
  const deleteAdminUseCase = new DeleteAdminUseCase(adminsRepository)

  return deleteAdminUseCase
}
