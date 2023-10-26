export class AnswerNotFoundError extends Error {
  constructor() {
    super(`Answer not found`)
    this.name = 'AnswerNotFoundError'
  }
}
