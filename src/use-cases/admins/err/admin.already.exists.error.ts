export class AdminAlreadyExistsError extends Error {
  constructor() {
    super('Email already exists')
  }
}
