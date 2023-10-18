import { Instructor, Prisma, Role } from '@prisma/client'
import { InstructorsRepository } from '../instructors.repository'

export class InMemoryInstructorsRepository implements InstructorsRepository {
  async update(
    id: string,
    data: Prisma.InstructorUncheckedUpdateInput,
  ): Promise<Instructor> {
    const instructor = this.instructors.findIndex(
      (instructor) => instructor.id === id,
    )

    this.instructors[instructor] = {
      ...this.instructors[instructor],
      id: this.instructors[instructor].id,
      name: data.name as string,
      email: data.email as string,
      password: data.password as string,
      avatar: data.avatar as string | null,
      biography: data.biography as string | null,
      location: data.location as string | null,
      socialLinks: data.socialLinks as string[],
      banner: data.banner as string | null,
      interests: data.interests as string[],
      role: data.role as Role,
      createdAt: this.instructors[instructor].createdAt,
      updatedAt: new Date(),
    }

    return this.instructors[instructor]
  }

  async delete(id: string): Promise<void> {
    const instructor = this.instructors.findIndex(
      (instructor) => instructor.id === id,
    )

    this.instructors.splice(instructor, 1)
  }

  async findAll() {
    const instructors = this.instructors

    return instructors
  }

  async findById(id: string) {
    const instructor = this.instructors.find(
      (instructor) => instructor.id === id,
    )

    if (!instructor) {
      return null
    }

    return instructor
  }

  public instructors: Instructor[] = []

  async create(data: Prisma.InstructorCreateInput) {
    const instructorData = {
      id: 'any_id',
      name: data.name,
      email: data.email,
      password: data.password,
      avatar: data.avatar || null,
      biography: data.biography || null,
      location: data.location || null,
      banner: data.banner || null,
      socialLinks: (data.socialLinks as string[]) || null,
      interests: (data.interests as string[]) || null,
      role: data.role || Role.INSTRUCTOR,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    this.instructors.push(instructorData)

    return instructorData
  }

  async findByEmail(email: string) {
    const instructor = this.instructors.find(
      (instructor) => instructor.email === email,
    )

    if (!instructor) {
      return null
    }

    return instructor
  }
}
