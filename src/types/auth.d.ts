// #region signup

export interface SignupData {
  username?: string
  email?: string
  password?: string
  otp?: string
  first_name?: string
  last_name?: string
  organization_name?: string
}
export interface SignupRequestParams {
  email: string
  password: string
  organization_name: string
  first_name: string
  last_name: string
}
// #endregion

// #region forgot-password


export interface ForgotPasswordData {
  email?: string
  password?: string
  password_confirmation?: string
  otp?: string
}
export interface ForgotPassRequestParams {
  email: string
  password: string
  password_confirmation: string
  otp: string
}
// #endregion
