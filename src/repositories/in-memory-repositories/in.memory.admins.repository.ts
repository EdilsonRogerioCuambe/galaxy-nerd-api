import { Administrator, Prisma, Role } from '@prisma/client'
import { AdminsRepository } from '../admins.repository'

export class InMemoryAdminsRepository implements AdminsRepository {
  async update(
    id: string,
    data: Prisma.AdministratorUncheckedUpdateInput,
  ): Promise<Administrator> {
    const admin = this.admins.findIndex((admin) => admin.id === id)

    this.admins[admin] = {
      ...this.admins[admin],
      id: this.admins[admin].id,
      name: data.name as string,
      email: data.email as string,
      password: data.password as string,
      avatar: data.avatar as string | null,
      biography: data.biography as string | null,
      location: data.location as string | null,
      socialLinks: data.socialLinks as string[],
      interests: data.interests as string[],
      banner: data.banner as string | null,
      role: data.role as Role,
      createdAt: this.admins[admin].createdAt,
      updatedAt: new Date(),
    }

    return this.admins[admin]
  }

  async delete(id: string): Promise<void> {
    const admin = this.admins.findIndex((admin) => admin.id === id)

    this.admins.splice(admin, 1)
  }

  async findAll() {
    const admins = this.admins

    return admins
  }

  async findById(id: string) {
    const admin = this.admins.find((admin) => admin.id === id)

    if (!admin) {
      return null
    }

    return admin
  }

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
      interests: (data.interests as string[]) || null,
      banner: data.banner || null,
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
