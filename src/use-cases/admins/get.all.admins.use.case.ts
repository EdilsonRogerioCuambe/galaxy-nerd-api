import { AdminsRepository } from '@/repositories/admins.repository'

export class GetAllAdminsUseCase {
  constructor(private adminsRepository: AdminsRepository) {}

  async execute() {
    const admins = await this.adminsRepository.findAll()

    return { admins }
  }
}
