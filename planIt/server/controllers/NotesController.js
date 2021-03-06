import { Auth0Provider } from '@bcwdev/auth0provider'
import { notesService } from '../services/NotesService'
import BaseController from '../utils/BaseController'
import { logger } from '../utils/Logger'

export class NotesController extends BaseController {
  constructor() {
    super('api/projects')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('/:projectId/notes', this.getAll)
      .get('/:projectId/notes/:id', this.getById)
      .post('/:projectId/notes', this.create)
      .delete('/:projectId/notes/:id', this.remove)
  }

  async getAll(req, res, next) {
    try {
      const query = req.params
      const notes = await notesService.getAll(query)
      return res.send(notes)
    } catch (error) {
      next(error)
    }
  }

  async getById(req, res, next) {
    try {
      const note = await notesService.getById(req.params.id)
      return res.send(note)
    } catch (error) {
      next(error)
    }
  }

  async create(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      req.body.projectId = req.params.projectId
      const note = await notesService.create(req.body)
      return res.send(note)
    } catch (error) {
      next(error)
    }
  }

  async remove(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const userId = req.userInfo.id
      const noteId = req.params.id
      await notesService.remove(noteId, userId)
      res.send('Deleted')
    } catch (error) {
      next(error)
    }
  }
}
