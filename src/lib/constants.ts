export enum CodeResponse {
  SUCCESS = 'SUCCESS',
  INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR',
  SESSION_EXPIRED = 'SESSION_EXPIRED',
  USER_INACTIVE = 'USER_INACTIVE',
}


export const ErrorMessages: Record<string, string> = {
  [CodeResponse.INTERNAL_SERVER_ERROR]: 'An unexpected error occurred',
  [CodeResponse.USER_INACTIVE]: 'User is inactive',
}

export enum SignupSteps {
  GetStarted = 'get-started',
  SetupAccount = 'setup-account',
  SetPassword = 'set-password',
  VerifyEmail = 'verify-email',
  VerifySuccess = 'verify-success',
}

export enum ForgotPasswordSteps {
  GetStarted = 'get-started',
  VerifyOtp = 'verify-otp',
  VerifySuccess = 'verify-success',
}


export const passwordRuleCode = {
  minLength: {
    code: 'minLength',
    regex: /.{8,}/,
    message: 'Must be at least 8 characters',
  },
  number: {
    code: 'number',
    regex: /[0-9]/,
    message: 'Must contain at least one number',
  },
  lowercase: {
    code: 'lowercase',
    regex: /[a-z]/,
    message: 'Must contain at least one lowercase letter',
  },
  uppercase: {
    code: 'uppercase',
    regex: /[A-Z]/,
    message: 'Must contain at least one uppercase letter',
  },
  symbol: {
    code: 'symbol',
    regex: /[\W_]/,
    message: 'Must contain at least one symbol',
  },
}
