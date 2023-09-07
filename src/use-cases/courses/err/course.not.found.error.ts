export class CourseNotFoundError extends Error {
  constructor() {
    super('Course not found')
    this.name = 'CourseNotFoundError'
  }
}
