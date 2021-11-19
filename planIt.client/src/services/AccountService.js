import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class AccountService {
  async getAccount() {
    try {
      const res = await api.get('/api/account')
      AppState.account = res.data
    } catch (err) {
      logger.error('HAVE YOU STARTED YOUR SERVER YET???', err)
    }
  }

  async edit(account, id) {
    logger.log('edit account')
    const res = await api.put('api/account/' + id, account)
    logger.log(res.data)
    AppState.account = res.data
  }
}

export const accountService = new AccountService()
