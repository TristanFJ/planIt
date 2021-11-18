import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import Pop from "../utils/Pop"
import { api } from "./AxiosService"

class TaskService {
  async getAll(query = '') {
    const res = await api.get(query)
    // logger.log('tasks', res)
    AppState.tasks = res.data
  }
  async createTask(projectId, data) {
    // logger.log(data)
    const res = await api.post('api/projects/' + projectId + '/tasks', data)
    // logger.log('create task ', res)
    AppState.tasks.push(res.data)
  }
  async remove(taskId, routeId) {
    const yes = await Pop.confirm('Delete?')
    if (!yes) { return }
    await api.delete('api/projects/' + routeId + '/tasks/' + taskId)
    AppState.tasks = AppState.tasks.filter(t => t.id !== taskId)
  }

  async edit(taskId, routeId, data) {
    // logger.log('taskId', taskId, 'routeId', routeId, 'data', data)
    const res = await api.put('api/projects/' + routeId + '/tasks/' + taskId, data)
    const index = AppState.tasks.findIndex(t => t.id === res.data.id)
    if (index === -1) {
      AppState.tasks.push(res.data)
      return
    }
    AppState.tasks.splice(index, 1, res.data)
  }
}
export const taskService = new TaskService()