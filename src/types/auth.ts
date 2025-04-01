// #region signup
export enum SignupSteps {
  GetStarted = 'get-started',
  SetupAccount = 'setup-account',
  SetPassword = 'set-password',
  VerifyEmail = 'verify-email',
  VerifySuccess = 'verify-success',
}
export type SignupData = {
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
export enum ForgotPasswordSteps {
  GetStarted = 'get-started',
  VerifyOtp = 'verify-otp',
  VerifySuccess = 'verify-success',
}

export type ForgotPasswordData = {
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
