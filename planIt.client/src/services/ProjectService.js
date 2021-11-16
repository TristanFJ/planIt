import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import Pop from "../utils/Pop"
import { api } from "./AxiosService"

class ProjectService {
  async getAll(query = '') {
    const res = await api.get(query)
    AppState.projects = res.data
  }

  async setActive(id) {
    const found = AppState.projects.find(s => s.id === id)
    if (!found) {
      throw new Error('no id')
    }
    AppState.activeProject = found
  }

  async createProject(data) {
    Pop.toast('created', 'success')
    const res = await api.post('api/projects', data)
    logger.log(res)
    AppState.projects.unshift(res.data)
  }

}

export const projectService = new ProjectService()