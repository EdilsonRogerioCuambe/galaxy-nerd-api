import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { AdminsRepository } from '../admins.repository'

export class PrismaAdminsRepository implements AdminsRepository {
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
