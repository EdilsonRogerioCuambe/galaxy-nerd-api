export class TopicAlreadyExistsError extends Error {
  constructor() {
    super('Topic already exists')
  }
}
