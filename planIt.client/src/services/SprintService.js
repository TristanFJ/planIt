import { Popover } from "bootstrap"
import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import Pop from "../utils/Pop"
import { api } from "./AxiosService"

class SprintService {
  async getAll(query = '') {
    const res = await api.get(query)
    logger.log('sprints ', res)
    AppState.sprints = res.data
  }
  async createSprint(id, data) {
    Pop.toast('created', 'success')
    const res = await api.post('api/projects/' + id + '/sprints', data)
    // logger.log(res)
    AppState.sprints.push(res.data)
    AppState.activeProject = res.data
  }

  async remove(sprintId, routeId) {
    const yes = await Pop.confirm('Delete?')
    if (!yes) { return }
    await api.delete('api/projects/' + routeId + '/sprints/' + sprintId)
    AppState.sprints = AppState.sprints.filter(s => s.id !== sprintId)
  }
}

export const sprintService = new SprintService()