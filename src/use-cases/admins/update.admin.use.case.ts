import { AdminsRepository } from '@/repositories/admins.repository'
import { AdminNotFoundError } from './err/admin.not.found.error'
import { Administrator, Role } from '@prisma/client'

interface UpdateAdminUseCaseProps {
  adminId: string
  name?: string
  email?: string
  password?: string
  avatar?: string
  biography?: string
  location?: string
  socialLinks?: string[]
  role?: Role
}

interface UpdateAdminUseCaseResponse {
  admin: Administrator
}

export class UpdateAdminUseCase {
  constructor(private readonly adminsRepository: AdminsRepository) {}

  async execute({
    adminId,
    name,
    email,
    password,
    avatar,
    biography,
    location,
    socialLinks,
    role,
  }: UpdateAdminUseCaseProps): Promise<UpdateAdminUseCaseResponse> {
    const admin = await this.adminsRepository.findById(adminId)

    if (!admin) {
      throw new AdminNotFoundError()
    }

    const updatedAdmin = await this.adminsRepository.update(adminId, {
      name,
      email,
      password,
      avatar,
      biography,
      location,
      socialLinks,
      role,
    })

    return {
      admin: updatedAdmin,
    }
  }
}
