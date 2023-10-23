import { ForunsRepository } from '@/repositories/forum.repository'
import { ForumNotFoundError } from './error/forum.not.found.error'
import { Forum } from '@prisma/client'

interface DeleteForumUseCaseProps {
  id: string
}

interface DeleteForumUseCaseResponse {
  forum: Forum
}

export class DeleteForumUseCase {
  constructor(private forumsRepository: ForunsRepository) {}

  async execute({
    id,
  }: DeleteForumUseCaseProps): Promise<DeleteForumUseCaseResponse> {
    const forum = await this.forumsRepository.findById(id)

    if (!forum) {
      throw new ForumNotFoundError()
    }

    await this.forumsRepository.delete(id)

    return { forum }
  }
}
