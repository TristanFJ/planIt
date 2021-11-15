import { dbContext } from '../db/DbContext'
import { BadRequest, Forbidden } from '../utils/Errors'
import { logger } from '../utils/Logger'
class ProjectsService {
  async getAll(query = {}) {
    const res = await dbContext.Projects.find({}).populate('creator', 'name picture')
    logger.log(res)
    return res
  }
}
export const projectsService = new ProjectsService()
