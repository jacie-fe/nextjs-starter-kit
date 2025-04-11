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
    play: {
      index: '/play',
      mega531: '/mega531',
      mega636: '/mega636',
    },
    support: '/support',
    privacyPolicy: '/privacy-policy',
    playResponsibly: '/play-responsibly',
  },
} as const
