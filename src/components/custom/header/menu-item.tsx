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
import { Button } from '../button'
import { routePaths } from '@/lib/routePaths'
import { useLocale, useTranslations } from 'next-intl'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { GlobeIcon } from 'lucide-react'

interface IMenuItemProps extends React.HTMLAttributes<HTMLDivElement> {
  item: MenuItemType
}

function MenuItem({ item }: IMenuItemProps) {
  const pathname = usePathname()
  const isMenuActive = (url: string) => pathname.startsWith(url)
  return (
    <NavigationMenuItem key={item.title} className='flex items-center'>
      {item.items ? (
        <>
          <NavigationMenuTrigger
            className={cn(
              'menu-link flex h-auto flex-row items-center gap-2 rounded-md bg-transparent p-3 text-base leading-3 font-semibold no-underline transition-colors outline-none select-none',
              {
                active: isMenuActive(item.url),
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
          active: isMenuActive(item.url),
        },
        className
      )}
      href={item.url}
    >
      {item.title}
    </Link>
  )
}

type IAuthButtonsProps = React.HTMLAttributes<HTMLDivElement>
const AuthButtons = ({ className }: IAuthButtonsProps) => {
  const t = useTranslations('common')

  const auth = {
    login: { title: t('sign_in'), url: routePaths.guest.signin },
    signup: { title: t('sign_up'), url: routePaths.guest.signup },
  }

  return (
    <div className={cn('flex items-center gap-2', className)}>
      <Button asChild variant='outline'>
        <Link href={auth.login.url}>{auth.login.title}</Link>
      </Button>
      <Button asChild>
        <Link href={auth.signup.url}>{auth.signup.title}</Link>
      </Button>
    </div>
  )
}

const LangugeSwitcher = () => {
  const t = useTranslations('common')
  const locale = useLocale()

  const language = {
    en: { title: t('english'), url: '/en', shortName: 'En' },
    th: { title: t('thai'), url: '/th', shortName: 'ไทย' },
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='outline' className='flex items-center gap-1 px-2 py-1'>
          <GlobeIcon size='16' />
          {locale === 'en' ? language.en.shortName : language.th.shortName}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='bg-popover text-popover-foreground z-50 min-w-[150px]'>
        <DropdownMenuItem asChild>
          <Link
            href={language.en.url}
            className='menu-link hover:bg-accent flex items-center gap-2 px-3 py-2 text-base font-semibold no-underline focus:outline-none'
          >
            {language.en.title}
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link
            href={language.th.url}
            className='menu-link hover:bg-accent flex items-center gap-2 px-3 py-2 text-base font-semibold no-underline focus:outline-none'
          >
            {language.th.title}
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export { MenuItem, MenuLink, AuthButtons, LangugeSwitcher }
export type MenuItemProps = IMenuItemProps
export type MenuLinkProps = IMenuLinkProps
