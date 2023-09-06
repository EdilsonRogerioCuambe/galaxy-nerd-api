import { AdminsRepository } from '@/repositories/admins.repository'
import { Administrator } from '@prisma/client'
import { InvalidCredentialsError } from './err/admin.invalid.credentials'
import { compare } from 'bcryptjs'

interface AuthenticateAdminsUseCaseProps {
  email: string
  password: string
}

interface AuthenticateAdminsUseCaseResponse {
  admin: Administrator
}

export class AuthenticateAdminsUseCase {
  constructor(private adminRepository: AdminsRepository) {}

  async execute({
    email,
    password,
  }: AuthenticateAdminsUseCaseProps): Promise<AuthenticateAdminsUseCaseResponse> {
    const admin = await this.adminRepository.findByEmail(email)

    if (!admin) {
      throw new InvalidCredentialsError()
    }

    const doesPasswordMatch = await compare(password, admin.password)

    if (!doesPasswordMatch) {
      throw new InvalidCredentialsError()
    }

    return { admin }
  }
}
