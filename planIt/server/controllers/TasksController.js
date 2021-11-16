import { Auth0Provider } from '@bcwdev/auth0provider'
import { tasksService } from '../services/TasksService'
import BaseController from '../utils/BaseController'
import { logger } from '../utils/Logger'

export class TasksController extends BaseController {
  constructor() {
    super('api/projects')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('/:projectId/tasks', this.getAll)
      .get('/:projectId/tasks/:id', this.getById)
      .post('/:projectId/tasks', this.create)
      .put('/:projectId/tasks/:id', this.edit)
      .delete('/:projectId/tasks/:id', this.remove)
  }

  async getAll(req, res, next) {
    try {
      const query = req.params
      const tasks = await tasksService.getAll(query)
      return res.send(tasks)
    } catch (e) {
      next(e)
    }
  }

  async getById(req, res, next) {
    try {
      const task = await tasksService.getById(req.params.id)
      return res.send(task)
    } catch (e) {
      next(e)
    }
  }

  async create(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      req.body.projectId = req.params.projectId
      const task = await tasksService.create(req.body)
      return res.send(task)
    } catch (e) {
      next(e)
    }
  }

  async edit(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      req.body.id = req.params.id
      const task = await tasksService.edit(req.body)
      return res.send(task)
    } catch (error) {
      next(error)
    }
  }

  async remove(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const userId = req.userInfo.id
      const taskId = req.params.id
      await tasksService.remove(taskId, userId)
      res.send('Deleted')
    } catch (error) {
      next(error)
    }
  }
}
