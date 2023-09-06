import { PrismaAdminsRepository } from '@/repositories/prisma-repositories/prisma.admins.repository'
import { GetAdminProfileUseCase } from '@/use-cases/admins/get.admin.profile.use.case'

export function makeGetAdminProfileUseCase(): GetAdminProfileUseCase {
  const adminsRepository = new PrismaAdminsRepository()
  const getAdminProfileUseCase = new GetAdminProfileUseCase(adminsRepository)
  return getAdminProfileUseCase
}
