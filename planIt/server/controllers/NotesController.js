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
  }

  async getAll(req, res, next) {
    throw new Error('Method not implemented.')
  }
}
