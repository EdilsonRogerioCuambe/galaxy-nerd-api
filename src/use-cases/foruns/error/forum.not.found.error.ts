export class ForumNotFoundError extends Error {
  constructor() {
    super('Forum not found')
    this.name = 'ForumNotFoundError'
  }
}
