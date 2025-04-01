export const docsSidebar = [
  {
    title: 'Getting started',
    href: '#getting-started',
    id: 'getting-started',
    items: [
      {
        title: 'Introduction',
        href: '#introduction',
        id: 'introduction',
      },
      {
        title: 'Quick guide',
        href: '#quick-guide',
        id: 'quick-guide',
        sub: [
          {
            title: 'Prerequisites',
            href: '#setup',
            id: 'setup',
          },
          {
            title: 'Push notification',
            href: '#push-notification',
            id: 'push-notification',
          },
          {
            title: 'TOTP',
            href: '#totp',
            id: 'totp',
          },
        ],
      },
    ],
  },
  {
    title: 'API reference',
    href: '#api-reference',
    id: 'api-reference',
    items: [
      {
        title: 'Get session token',
        href: '#get-session-token',
        id: 'get-session-token',
      },
      {
        title: 'Receive response',
        href: '#receive-response',
        id: 'receive-response-api',
      },
    ],
  },
]
