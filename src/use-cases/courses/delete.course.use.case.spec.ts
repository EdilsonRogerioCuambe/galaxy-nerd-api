import { InMemoryCoursesRepository } from '@/repositories/in-memory-repositories/in.memory.courses.repository'
import { CourseNotFoundError } from './err/course.not.found.error'
import { DeleteCourseUseCase } from './delete.course.use.case'
import { it, describe, expect, beforeEach } from 'vitest'
import { slugify } from '@/utils/slug'

let sut: DeleteCourseUseCase
let coursesRepository: InMemoryCoursesRepository

describe('Delete Course Use Case', () => {
  beforeEach(() => {
    coursesRepository = new InMemoryCoursesRepository()
    sut = new DeleteCourseUseCase(coursesRepository)
  })

  it('should be able to delete a course', async () => {
    const title = 'any_title'
    const description = 'any_description'
    const price = '0'
    const instructorId = 'any_instructor_id'
    const thumbnail = 'any_thumbnail'

    const slug = slugify({ slug: title })

    const course = await coursesRepository.create({
      title,
      description,
      price,
      slug,
      instructorId,
      thumbnail,
    })

    await sut.execute({ courseId: course.id })

    const courseExists = await coursesRepository.findById(course.id)

    expect(courseExists).toBeFalsy()
  })

  it('should not be able to delete a course if it does not exists', async () => {
    await expect(
      sut.execute({ courseId: 'any_course_id' }),
    ).rejects.toBeInstanceOf(CourseNotFoundError)
  })
})
