import { dbContext } from '../db/DbContext'
import { BadRequest, Forbidden } from '../utils/Errors'
import { logger } from '../utils/Logger'

class SprintsService {
  async getAll(query = {}) {
    const sprints = await dbContext.Sprints.find(query)
      .populate('creator', 'name picture')
      .populate('project')
    return sprints
  }

  async getById(id) {
    const sprint = await dbContext.Sprints.findById(id)
      .populate('creator', 'name picture')
      .populate('project')
    if (!sprint) {
      throw new BadRequest('invalid id')
    }
    return sprint
  }

  async create(body) {
    const newSprint = await dbContext.Sprints.create(body)
    return await this.getById(newSprint.id)
  }

  async remove(sprintId, userId) {
    const sprint = await this.getById(sprintId)
    if (sprint.creatorId.toString() !== userId) {
      throw new Forbidden('ACCESS DENIED')
    }
    await dbContext.Sprints.findByIdAndDelete(sprintId)
  }
}

export const sprintsService = new SprintsService()
