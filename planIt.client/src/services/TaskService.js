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

  async completedTask(routeId, id) {
    // AppState.activeSpell.prepared = !AppState.activeSpell.prepared
    // await api.put(`api/${AppState.account.name}/spells/${AppState.activeSpell.id}`, AppState.activeSpell)
    const task = AppState.tasks.find(t => t.id == id)
    task.isComplete = !task.isComplete
    logger.log("prepared", task.isComplete)
    const res = await api.put('api/projects/' + routeId + '/tasks/' + id, task)
    logger.log(res.data)
    // AppState.tasks = AppState.tasks
  }
}
export const taskService = new TaskService()