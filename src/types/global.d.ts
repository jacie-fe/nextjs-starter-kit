// Use type safe message keys with `next-intl`
type Messages = typeof import('../locales/en.json')

// eslint-disable-next-line
declare interface IntlMessages extends Messages {}

export type UserInfo = {
  email: string
  user_id: string
  first_name: string
  last_name: string
  organization_name: string
}
