import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class SprintService {
  async getAll(query = '') {
    const res = await api.get(query)
    logger.log(res)
    AppState.sprints = res.data
  }
}

export const sprintService = new SprintService()