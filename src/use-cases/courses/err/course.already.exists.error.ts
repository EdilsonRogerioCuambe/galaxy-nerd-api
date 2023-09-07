export class CourseAlreadyExistsError extends Error {
  constructor() {
    super('Course already exists')
  }
}
