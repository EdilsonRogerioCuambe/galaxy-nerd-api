import { AdminsRepository } from '@/repositories/admins.repository'
import { AdminNotFoundError } from './err/admin.not.found.error'

interface DeleteAdminUseCaseProps {
  adminId: string
}

export class DeleteAdminUseCase {
  constructor(private readonly adminsRepository: AdminsRepository) {}

  async execute({ adminId }: DeleteAdminUseCaseProps): Promise<void> {
    const admin = await this.adminsRepository.findById(adminId)

    if (!admin) {
      throw new AdminNotFoundError()
    }

    await this.adminsRepository.delete(adminId)
  }
}
