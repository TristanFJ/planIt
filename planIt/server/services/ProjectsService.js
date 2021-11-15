import { dbContext } from '../db/DbContext'
import { BadRequest, Forbidden } from '../utils/Errors'
import { logger } from '../utils/Logger'
class ProjectsService {
  async getAll(query = {}) {
    const res = await dbContext.Projects.find({}).populate('creator', 'name picture')
    logger.log(res)
    return res
  }

  async getById(id) {
    const found = await dbContext.Projects.findById(id).populate('creator', 'name picture')
    if (!found) {
      throw new BadRequest('invalid id good sir')
    }
    return found
  }

  async create(body) {
    const newProject = await dbContext.Projects.create(body)
    logger.log('projectService ', newProject)
    return await this.getById(newProject.id)
  }

  async remove(projectId, userId) {
    const project = await this.getById(projectId)
    if (project.creatorId.toString() !== userId) {
      throw new Forbidden('ACCESS DENIED')
    }
    await dbContext.Projects.findByIdAndDelete(projectId)
  }
}
export const projectsService = new ProjectsService()
