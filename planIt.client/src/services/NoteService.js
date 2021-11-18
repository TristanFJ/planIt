import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import Pop from "../utils/Pop"
import { api } from "./AxiosService"

class NoteService {
  async getAll(query = '') {
    const res = await api.get(query)
    logger.log('get notes', res)
    AppState.notes = res.data
  }
  async createNote(id, data) {
    Pop.toast('created', 'success')
    const res = await api.post('api/projects/' + id + '/notes', data)
    logger.log('new note', res)
    AppState.notes.push(res.data)
  }
}

export const noteService = new NoteService()