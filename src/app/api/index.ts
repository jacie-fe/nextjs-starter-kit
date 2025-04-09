import { createApplicationApi } from './applicationApi'
import { createAuthApi } from './authApi'

const authApi: ReturnType<typeof createAuthApi> = createAuthApi()
const applicationApi: ReturnType<typeof createApplicationApi> = createApplicationApi()

export { authApi, applicationApi }
export type { CreateApplicationParams, UpdateApplicationParams } from './applicationApi'
