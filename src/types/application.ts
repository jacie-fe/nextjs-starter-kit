export interface Application {
  client_id: string
  application_name: string
  description?: string
  callback_url: string
  ip: string
  is_active: boolean
  domain: string
  api_key: string
}
