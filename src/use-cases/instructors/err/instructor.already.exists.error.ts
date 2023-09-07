export class InstructorAlreadyExistsError extends Error {
  constructor() {
    super('Instructor already exists')
  }
}
