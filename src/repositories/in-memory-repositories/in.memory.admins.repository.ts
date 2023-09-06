import { Administrator, Prisma, Role } from '@prisma/client'
import { AdminsRepository } from '../admins.repository'

export class InMemoryAdminsRepository implements AdminsRepository {
  public admins: Administrator[] = []

  async create(data: Prisma.AdministratorCreateInput) {
    const adminData = {
      id: 'any_id',
      name: data.name,
      email: data.email,
      password: data.password,
      avatar: data.avatar || null,
      biography: data.biography || null,
      location: data.location || null,
      socialLinks: (data.socialLinks as string[]) || null,
      role: Role.ADMIN,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    this.admins.push(adminData)

    return adminData
  }

  async findByEmail(email: string) {
    const admin = this.admins.find((admin) => admin.email === email)

    if (!admin) {
      return null
    }

    return admin
  }
}
