'use client'

import Link from 'next/link'
import {
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
} from '@/components/ui/navigation-menu'
import { cn } from '@/lib/utils'
import { usePathname } from '@/i18n/navigation'
import { MenuItemType } from './menu-config'

interface IMenuItemProps extends React.HTMLAttributes<HTMLDivElement> {
  item: MenuItemType
}

function MenuItem({ item }: IMenuItemProps) {
  const pathname = usePathname()
  const isMenuActive = (url: string) => pathname.startsWith(url)
  return (
    <NavigationMenuItem
      key={item.title}
      className='flex items-center'
    >
      {item.items ? (
        <>
          <NavigationMenuTrigger
            className={cn(
              'menu-link h-auto flex bg-transparent leading-3 flex-row items-center gap-2 rounded-md p-3 text-base font-semibold no-underline transition-colors outline-none select-none',
              {
                'active': isMenuActive(item.url),
              }
            )}
          >
            {item.title}
          </NavigationMenuTrigger>
          <NavigationMenuContent className='bg-popover text-popover-foreground round-sm z-50 !mt-0 min-w-[300px]'>
            {item.items.map((subItem) => (
              <MenuLink item={subItem} key={subItem.title} />
            ))}
          </NavigationMenuContent>
        </>
      ) : (
        <MenuLink item={item} />
      )}
    </NavigationMenuItem>
  )
}

interface IMenuLinkProps extends React.HTMLAttributes<HTMLDivElement> {
  item: MenuItemType
}
const MenuLink = ({ item, className }: IMenuLinkProps) => {
  const pathname = usePathname()
  const isMenuActive = (url: string) => pathname.startsWith(url) && url !== '/'
  return (
    <Link
      className={cn(
        'menu-link hover:bg-accent flex flex-row items-center gap-2 rounded-md p-3 text-base font-semibold no-underline transition-colors outline-none select-none',
        {
          'active': isMenuActive(item.url),
        },
        className
      )}
      href={item.url}
    >
      {item.title}
    </Link>
  )
}

export { MenuItem, MenuLink }
export type MenuItemProps = IMenuItemProps
export type MenuLinkProps = IMenuLinkProps
