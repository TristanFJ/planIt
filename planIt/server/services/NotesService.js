import { dbContext } from '../db/DbContext'
import { BadRequest, Forbidden } from '../utils/Errors'
import { logger } from '../utils/Logger'

class NotesService {
  async getAll(query = {}) {
    const notes = await dbContext.Notes.find(query)
      .populate('creator', 'name picture')
    return notes
  }
}

export const notesService = new NotesService()
