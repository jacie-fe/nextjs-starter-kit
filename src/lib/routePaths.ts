export const routePaths = {
  private: {
    console: '/console',
    applications: '/console/applications',
    applicationDetail: '/console/applications/:id',
  },
  public: {},
  guest: {
    signin: '/signin',
    signup: '/signup',
    forgotPassword: '/forgot-password',
    home: '/',
    products: {
      index: '/products',
      domainConsole: '/products/domain-console',
      authenticatorApplication: '/products/authenticator-application',
    },
    features: {
      index: '/features',
      passwordManagement: '/features/password-management',
      saveAndAutofill: '/features/save-and-autofill',
      importExportAccounts: '/features/import-export-accounts',
      directoryIntegration: '/features/directory-integration',
      userManagement: '/features/user-management',
      mfa: '/features/multifactor-authentication',
    },
    docs: '/docs',
    support: '/support',
    privacyPolicy: '/privacy-policy',
  },
} as const
