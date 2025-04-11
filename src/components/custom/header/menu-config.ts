import { routePaths } from '@/lib/routePaths'

export interface MenuItemType {
  title: string
  url: string
  description?: string
  icon?: React.ReactNode
  items?: MenuItemType[]
}

export const menu: MenuItemType[] = [
  {
    title: 'Play',
    url: routePaths.guest.play.index,
    items: [
      {
        title: 'Mega 5/31',
        url: routePaths.guest.play.mega531,
      },
      {
        title: 'Mega 6/36',
        url: routePaths.guest.play.mega636,
      },
    ],
  },
  {
    title: 'Play Responsibly',
    url: routePaths.guest.playResponsibly,
  },
  {
    title: 'Support',
    url: routePaths.guest.support,
  },
] as const
