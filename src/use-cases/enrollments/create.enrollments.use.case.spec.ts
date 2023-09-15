import { InMemoryEnrollmentsRepository } from '@/repositories/in-memory-repositories/in.memory.enrollments.repository'
import { InMemoryStudentsRepository } from '@/repositories/in-memory-repositories/in.memory.students.repository'
import { InMemoryCoursesRepository } from '@/repositories/in-memory-repositories/in.memory.courses.repository'
import { CreateEnrollmentUseCase } from './create.enrollments.use.case'
import { it, expect, describe, beforeEach } from 'vitest'

let sut: CreateEnrollmentUseCase
let studentsRepository: InMemoryStudentsRepository
let coursesRepository: InMemoryCoursesRepository
let enrollmentsRepository: InMemoryEnrollmentsRepository

describe('Create Enrollment Use Case', () => {
  beforeEach(() => {
    studentsRepository = new InMemoryStudentsRepository()
    coursesRepository = new InMemoryCoursesRepository()
    enrollmentsRepository = new InMemoryEnrollmentsRepository()
    sut = new CreateEnrollmentUseCase(
      enrollmentsRepository,
      studentsRepository,
      coursesRepository,
    )
  })

  it('should create a new enrollment', async () => {
    const student = await studentsRepository.create({
      name: 'John Doe',
      email: 'eddyrogerioyuran@gmail.com',
      password: '@1723jdhf',
      avatar: 'any_avatar',
      biography: 'any_biography',
      location: 'any_location',
      role: 'STUDENT',
      interests: ['any_interest'],
      socialLinks: ['any_social_link'],
    })

    const course = await coursesRepository.create({
      title: 'any_title',
      thumbnail: 'any_thumbnail',
      price: '300',
      categoryId: 'any_category_id',
      description: 'any_description',
      instructorId: 'any_instructor_id',
      slug: 'any_slug',
    })

    const { enrollment } = await sut.execute({
      studentId: student.id,
      courseId: course.id,
    })

    expect(enrollment).toEqual({
      id: expect.any(String),
      studentId: student.id,
      courseId: course.id,
      createdAt: new Date(enrollment.createdAt),
    })
  }, 10000)
})
