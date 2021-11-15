import { projectsService } from '../services/ProjectsService'
import BaseController from '../utils/BaseController'
import { logger } from '../utils/Logger'

export class ProjectsController extends BaseController {
  constructor() {
    super('api/projects')
    this.router
      // TODO AUTHORIZATION
      .get('', this.getAll)
  }

  async getAll(req, res, next) {
    try {
      const query = req.query
      const projects = await projectsService.getAll(query)
      logger.log(projects)
      return res.send(projects)
    } catch (e) {
      logger.error(e)
    }
  }
}
