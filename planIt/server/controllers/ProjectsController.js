import { Auth0Provider } from '@bcwdev/auth0provider'
import { projectsService } from '../services/ProjectsService'
import BaseController from '../utils/BaseController'
import { logger } from '../utils/Logger'

export class ProjectsController extends BaseController {
  constructor() {
    super('api/projects')
    this.router
      // TODO AUTHORIZATION
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getAll)
      .get('/:id', this.getById)
      .post('', this.create)
  }

  async getAll(req, res, next) {
    try {
      const query = req.query
      const projects = await projectsService.getAll(query)
      logger.log(projects)
      return res.send(projects)
    } catch (e) {
      next(e)
    }
  }

  async getById(req, res, next) {
    try {
      const projectResult = await projectsService.getById(req.params.id)
      return res.send(projectResult)
    } catch (e) {
      next(e)
    }
  }

  async create(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const newProject = await projectsService.create(req.body)
      logger.log('projectController ', newProject)
      return res.send(newProject)
    } catch (e) {
      next(e)
    }
  }
}
