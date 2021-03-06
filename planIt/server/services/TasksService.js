import { dbContext } from '../db/DbContext'
import { BadRequest, Forbidden } from '../utils/Errors'
// import { logger } from '../utils/Logger'

class TasksService {
  async getAll(query = {}) {
    const tasks = await dbContext.Tasks.find(query)
      .populate('creator', 'name picture')
    // .populate('project')
    // .populate('sprint')
    return tasks
  }

  async getById(id) {
    const task = await dbContext.Tasks.findById(id)
      .populate('creator', 'name picture')
    // .populate('project')
    // .populate('sprint')
    if (!task) {
      throw new BadRequest('invalid id')
    }
    return task
  }

  async create(body) {
    const newTask = await dbContext.Tasks.create(body)
    return await this.getById(newTask.id)
  }

  async edit(body) {
    const task = await this.getById(body.id)
    if (task.creatorId.toString() !== body.creatorId) {
      throw new Forbidden('ACCESS DENIED')
    }
    // REVIEW
    const updatedTask = dbContext.Tasks.findByIdAndUpdate({ _id: body.id, creatorId: body.creatorId }, body, { new: true })
    return updatedTask
  }

  async remove(taskId, userId) {
    const task = await this.getById(taskId)
    if (task.creatorId.toString() !== userId) {
      throw new Forbidden('ACCESS DENIED')
    }
    await dbContext.Tasks.findByIdAndDelete(taskId)
  }
}
export const tasksService = new TasksService()
