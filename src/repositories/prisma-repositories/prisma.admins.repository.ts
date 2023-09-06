import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { AdminsRepository } from '../admins.repository'

export class PrismaAdminsRepository implements AdminsRepository {
  async findAll() {
    const admins = await prisma.administrator.findMany()

    return admins
  }

  async findById(id: string) {
    const admin = await prisma.administrator.findUnique({
      where: { id },
    })

    return admin
  }

  async findByEmail(email: string) {
    const emailAlreadyExists = await prisma.administrator.findUnique({
      where: { email },
    })

    return emailAlreadyExists
  }

  async create(data: Prisma.AdministratorCreateInput) {
    const user = await prisma.administrator.create({
      data,
    })

    return user
  }
}
