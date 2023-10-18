import { Prisma, Role, Student } from '@prisma/client'
import { StudentsRepository } from '../students.repository'

export class InMemoryStudentsRepository implements StudentsRepository {
  private students: Student[] = []

  async create(data: Prisma.StudentCreateInput) {
    const studentData = {
      id: 'any_id',
      name: data.name,
      email: data.email,
      password: data.password,
      banner: data.banner || null,
      avatar: data.avatar || null,
      biography: data.biography || null,
      location: data.location || null,
      socialLinks: (data.socialLinks as string[]) || null,
      interests: (data.interests as string[]) || null,
      role: data.role as Role,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    this.students.push(studentData)

    return studentData
  }

  async findById(id: string) {
    const student = this.students.find((student) => student.id === id)

    if (!student) {
      return null
    }

    return student
  }

  async findByEmail(email: string) {
    const student = this.students.find((student) => student.email === email)

    if (!student) {
      return null
    }

    return student
  }

  async update(id: string, data: Prisma.StudentUpdateInput) {
    const student = this.students.findIndex((student) => student.id === id)

    this.students[student] = {
      ...this.students[student],
      id: this.students[student].id,
      name: data.name as string,
      email: data.email as string,
      password: data.password as string,
      banner: data.banner as string | null,
      avatar: data.avatar as string | null,
      biography: data.biography as string | null,
      location: data.location as string | null,
      socialLinks: data.socialLinks as string[],
      interests: data.interests as string[],
      role: data.role as Role,
      createdAt: this.students[student].createdAt,
      updatedAt: new Date(),
    }

    return this.students[student]
  }

  async findAll() {
    return this.students
  }

  async delete(id: string): Promise<void> {
    const student = this.students.findIndex((student) => student.id === id)

    this.students.splice(student, 1)
  }
}
