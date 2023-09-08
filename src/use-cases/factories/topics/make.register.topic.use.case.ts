import { InMemoryTopicsRepository } from '@/repositories/in-memory-repositories/in.memory.topics.repository'
import { RegisterTopicUseCase } from '@/use-cases/topics/register.topic.use.case'

export function makeRegisterTopicUseCase() {
  const inMemoryTopicsRepository = new InMemoryTopicsRepository()
  const registerTopicUseCase = new RegisterTopicUseCase(
    inMemoryTopicsRepository,
  )

  return registerTopicUseCase
}
