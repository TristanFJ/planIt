import { dbContext } from '../db/DbContext'
import { BadRequest, Forbidden } from '../utils/Errors'
import { logger } from '../utils/Logger'

class NotesService {
  async getAll(query = {}) {
    const notes = await dbContext.Notes.find(query)
      .populate('creator', 'name picture')
    return notes
  }

  async getById(id) {
    const note = await dbContext.Notes.findById(id)
      .populate('creator', 'name picture')
    if (!note) {
      throw new BadRequest('invalid id')
    }
    return note
  }

  async create(body) {
    const newNote = await dbContext.Notes.create(body)
    return await this.getById(newNote.id)
  }

  async remove(noteId, userId) {
    const note = await this.getById(noteId)
    if (note.creatorId.toString() !== userId) {
      throw new Forbidden('ACCESS DENIED')
    }
    await dbContext.Notes.findByIdAndDelete(noteId)
  }
}

export const notesService = new NotesService()
