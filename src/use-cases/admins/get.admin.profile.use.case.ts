import { AdminsRepository } from '@/repositories/admins.repository'
import { Administrator } from '@prisma/client'
import { AdminNotFoundError } from './err/admin.not.found.error'

interface GetAdminProfileUseCaseProps {
  adminId: string
}

interface GetAdminProfileUseCaseResponse {
  admin: Administrator
}

export class GetAdminProfileUseCase {
  constructor(private readonly adminsRepository: AdminsRepository) {}

  async execute({
    adminId,
  }: GetAdminProfileUseCaseProps): Promise<GetAdminProfileUseCaseResponse> {
    const admin = await this.adminsRepository.findById(adminId)

    if (!admin) {
      throw new AdminNotFoundError()
    }

    return { admin }
  }
}
