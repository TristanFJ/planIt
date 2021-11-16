import { Auth0Provider } from '@bcwdev/auth0provider'
import { sprintsService } from '../services/SprintsService'
import BaseController from '../utils/BaseController'
import { logger } from '../utils/Logger'

export class SprintsController extends BaseController {
  constructor() {
    super('api/projects')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('/:projectId/sprints', this.getAll)
      .get('/:projectId/sprints/:id', this.getById)
      .post('/:projectId/sprints', this.create)
      .delete('/:projectId/sprints/:id', this.remove)
  }

  async getAll(req, res, next) {
    try {
      // NOTE you must pass it an object so the server knows that to look for
      const query = req.params
      logger.log(query)
      const sprints = await sprintsService.getAll(query)
      return res.send(sprints)
    } catch (e) {
      next(e)
    }
  }

  async getById(req, res, next) {
    try {
      const sprint = await sprintsService.getById(req.params.id)
      return res.send(sprint)
    } catch (e) {
      next(e)
    }
  }

  async create(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      // NOTE populate projectId
      req.body.projectId = req.params.projectId
      const sprint = await sprintsService.create(req.body)
      return res.send(sprint)
    } catch (e) {
      next(e)
    }
  }

  async remove(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const userId = req.userInfo.id
      const sprintId = req.params.id
      await sprintsService.remove(sprintId, userId)
      res.send('delete successful')
    } catch (e) {
      next(e)
    }
  }
}
