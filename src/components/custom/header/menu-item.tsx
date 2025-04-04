'use client'

import Link from 'next/link'

import {
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
} from '@/components/ui/navigation-menu'
import { cn } from '@/lib/utils'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { NavigationMenuItem as INavigationMenuItem } from '@/types/global'
import { usePathname } from '@/i18n/navigation'
import { useState } from 'react'
import { Button } from '../button'
import { routePaths } from '@/lib/routePaths'
import { useAuth } from '@/providers/auth'
import { UserInfoBox } from './user-nav'
import { LogOutIcon } from 'lucide-react'

interface MenuItemProps extends React.HTMLAttributes<HTMLDivElement> {
  item: INavigationMenuItem
}

export function MenuItem({ item }: MenuItemProps) {
  const pathname = usePathname()
  const isMenuActive = (url: string) => pathname.startsWith(url)

  if (item.items) {
    return (
      <NavigationMenuItem key={item.title}>
        <NavigationMenuTrigger
          className={cn(
            'h-auto rounded-none border-b-[2px] border-b-transparent px-4 pt-[30px] pb-[28px]',
            {
              'border-primary': isMenuActive(item.url),
            }
          )}
        >
          {item.title}
        </NavigationMenuTrigger>
        <NavigationMenuContent className='bg-popover text-popover-foreground round-sm z-50 !mt-0 min-w-[300px]'>
          {item.items.map((subItem) => (
            <SubMenuLink item={subItem} key={subItem.title} />
          ))}
        </NavigationMenuContent>
      </NavigationMenuItem>
    )
  }

  return (
    <NavigationMenuItem key={item.title}>
      <Link
        href={item.url}
        className={cn(
          'group bg-background hover:bg-muted hover:text-accent-foreground inline-flex w-max items-center justify-center rounded-none border-b-[2px] border-b-transparent px-4 pt-[30px] pb-[28px] text-sm font-medium transition-colors',
          {
            'border-primary': isMenuActive(item.url),
          }
        )}
      >
        {item.title}
      </Link>
    </NavigationMenuItem>
  )
}

interface SubMenuLinkProps extends React.HTMLAttributes<HTMLDivElement> {
  item: INavigationMenuItem
}
const SubMenuLink = ({ item, className }: SubMenuLinkProps) => {
  const pathname = usePathname()
  const isMenuActive = (url: string) => pathname.startsWith(url) && url !== '/'
  return (
    <Link
      className={cn(
        'hover:bg-muted hover:text-accent-foreground flex flex-row items-center gap-2 rounded-md p-3 text-sm leading-none font-medium no-underline transition-colors outline-none select-none',
        {
          'text-primary': isMenuActive(item.url),
        },
        className
      )}
      href={item.url}
    >
      {item.title}
    </Link>
  )
}

export const MobileMenu = ({ items }: { items: INavigationMenuItem[] }) => {
  const { isAuth, user, logout } = useAuth()
  const pathname = usePathname()

  const isConsoleContext = pathname.startsWith(routePaths.private.console)

  const [activeItem, setActiveItem] = useState<string>()
  const handleToggle = (item: string) => {
    setActiveItem((prev) => (prev === item ? items[0].url : item))
  }

  const auth = {
    login: { title: 'Login', url: routePaths.guest.signin },
    signup: { title: 'Sign up', url: routePaths.guest.signup },
  }

  const additionalAuthMobileMenu = [
    isConsoleContext
      ? {
          title: 'Home',
          url: routePaths.guest.home,
        }
      : {
          title: 'Console',
          url: routePaths.private.applications,
        },
  ]

  const mobileMenuItems = isAuth
    ? [...additionalAuthMobileMenu, ...items]
    : items

  const handleLogoutClick = () => {
    logout()
  }

  const renderMobileAction = () => {
    if (isAuth) {
      return (
        <Button onClick={handleLogoutClick} variant='outline' className='mt-4'>
          <LogOutIcon size={16} className='mr-2' />
          Logout
        </Button>
      )
    }

    return (
      <div className='flex flex-col gap-3'>
        <Button asChild variant='outline'>
          <a href={auth.signup.url}>{auth.signup.title}</a>
        </Button>
        <Button asChild>
          <a href={auth.login.url}>{auth.login.title}</a>
        </Button>
      </div>
    )
  }

  return (
    <div className='flex flex-col gap-4 p-4'>
      {isAuth && <UserInfoBox user={user} className='mb-3' />}
      <Accordion
        type='single'
        collapsible
        className='flex w-full flex-col gap-4'
        value={activeItem}
        onValueChange={handleToggle}
      >
        {mobileMenuItems.map((item) => (
          <MobileMenuItem item={item} key={item.title} />
        ))}
      </Accordion>
      {renderMobileAction()}
    </div>
  )
}

const MobileMenuItem = ({ item }: { item: INavigationMenuItem }) => {
  if (item.items) {
    return (
      <AccordionItem key={item.title} value={item.url} className='border-b-0'>
        <AccordionTrigger className='py-0 font-medium hover:no-underline'>
          {item.title}
        </AccordionTrigger>
        <AccordionContent className='mt-2'>
          {item.items.map((subItem) => (
            <SubMenuLink key={subItem.title} item={subItem} />
          ))}
        </AccordionContent>
      </AccordionItem>
    )
  }

  return <SubMenuLink key={item.title} item={item} className='p-0' />
}
