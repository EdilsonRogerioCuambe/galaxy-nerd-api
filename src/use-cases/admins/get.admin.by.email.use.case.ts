import { AdminsRepository } from '@/repositories/admins.repository'
import { AdminNotFoundError } from './err/admin.not.found.error'
import { Administrator } from '@prisma/client'

interface GetAdminByEmailUseCaseProps {
  email: string
}

interface GetAdminByEmailUseCaseResponse {
  admin: Administrator
}

export class GetAdminByEmailUseCase {
  constructor(private readonly adminsRepository: AdminsRepository) {}

  async execute({
    email,
  }: GetAdminByEmailUseCaseProps): Promise<GetAdminByEmailUseCaseResponse> {
    const admin = await this.adminsRepository.findByEmail(email)

    if (!admin) {
      throw new AdminNotFoundError()
    }

    return { admin }
  }
}
