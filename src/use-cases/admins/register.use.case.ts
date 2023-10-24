import { hash } from 'bcryptjs'
import { AdminAlreadyExistsError } from './err/admin.already.exists.error'
import { AdminsRepository } from '@/repositories/admins.repository'
import { Administrator } from '@prisma/client'

interface RegisterAdminUseCaseProps {
  name: string
  email: string
  password: string
  avatar?: string
  biography?: string
  location?: string
  banner?: string
  role: 'ADMIN' | 'INSTRUCTOR' | 'STUDENT'
}

interface RegisterAdminUseCaseResponse {
  admin: Administrator
}

export class RegisterAdminUseCase {
  constructor(private adminsRepository: AdminsRepository) {}

  async execute({
    name,
    email,
    password,
    avatar,
    biography,
    location,
    role,
    banner,
  }: RegisterAdminUseCaseProps): Promise<RegisterAdminUseCaseResponse> {
    const hashedPassword = await hash(password, 12)

    const emailAlreadyExists = await this.adminsRepository.findByEmail(email)

    if (emailAlreadyExists) {
      throw new AdminAlreadyExistsError()
    }

    const admin = await this.adminsRepository.create({
      name,
      email,
      password: hashedPassword,
      avatar,
      biography,
      location,
      role,
      banner,
    })

    return { admin }
  }
}
