import { NavigationMenuItem } from '@/types/global'
import { routePaths } from '@/lib/routePaths'

export enum CodeResponse {
  SUCCESS = 'SUCCESS',
  INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR',
  SESSION_EXPIRED = 'SESSION_EXPIRED',
}

export const menu: NavigationMenuItem[] = [
  {
    title: 'Products',
    url: routePaths.guest.products.index,
    items: [
      {
        title: 'Domain Console',
        url: routePaths.guest.products.domainConsole,
      },
      {
        title: 'Authenticator Application',
        url: routePaths.guest.products.authenticatorApplication,
      },
    ],
  },
  {
    title: 'Features',
    url: routePaths.guest.features.index,
    items: [
      {
        title: 'Password management',
        url: routePaths.guest.features.passwordManagement,
      },
      {
        title: 'Save and autofill',
        url: routePaths.guest.features.saveAndAutofill,
      },
      {
        title: 'Import & Export accounts',
        url: routePaths.guest.features.importExportAccounts,
      },
      {
        title: 'Directory integration',
        url: routePaths.guest.features.directoryIntegration,
      },
      {
        title: 'User management',
        url: routePaths.guest.features.userManagement,
      },
      {
        title: 'Multi-factor authentication',
        url: routePaths.guest.features.mfa,
      },
    ],
  },
  {
    title: 'Docs',
    url: routePaths.guest.docs,
    items: [
      {
        title: 'Quick guide',
        url: `${routePaths.guest.docs}#getting-started`,
      },
      {
        title: 'Intergration docs',
        url: `${routePaths.guest.docs}#api-reference`,
      },
    ],
  },
  {
    title: 'Support',
    url: routePaths.guest.support,
  },
] as const

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
