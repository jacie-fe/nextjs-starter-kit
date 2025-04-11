'use client'

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Link } from '@/i18n/navigation'
import { Button } from '../button'
import { LogOutIcon, Menu } from 'lucide-react'
import Image from 'next/image'
import Logo from '@/assets/logo.svg'
import { menu, MenuItemType } from './menu-config'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { useAuth } from '@/providers/auth'
import { routePaths } from '@/lib/routePaths'
import { UserInfoBox } from './user-nav'
import { useState } from 'react'
import { MenuLink } from './menu-item'

export default function MobileMenu() {
  const { isAuth, user, logout } = useAuth()
  const [activeItem, setActiveItem] = useState<string>()
  const handleToggle = (item: string) => {
    setActiveItem((prev) => (prev === item ? menu[0].url : item))
  }

  const auth = {
    login: { title: 'Login', url: routePaths.guest.signin },
    signup: { title: 'Sign up', url: routePaths.guest.signup },
  }

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
      <div className='grid grid-cols-2 gap-3'>
        <Button asChild variant='outline'>
          <a href={auth.login.url}>{auth.login.title}</a>
        </Button>
        <Button asChild>
          <a href={auth.signup.url}>{auth.signup.title}</a>
        </Button>
      </div>
    )
  }

  return (
    <>
      {/* Mobile Menu */}
      <div className='block h-full lg:hidden'>
        <div className='flex h-full items-center justify-between px-3'>
          {/* Logo */}
          <Link className='flex items-center gap-2' href='/'>
            <Image
              src={Logo}
              className='max-h-8'
              alt='eAuthenticator'
              width={60}
              height={60}
            />
          </Link>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant='outline' size='icon'>
                <Menu className='size-4' />
              </Button>
            </SheetTrigger>
            <SheetContent className='overflow-y-auto'>
              <SheetHeader></SheetHeader>
              <div className='flex flex-col gap-4 p-4'>
                {renderMobileAction()}
                {isAuth && <UserInfoBox user={user} className='mb-3' />}
                <Accordion
                  type='single'
                  collapsible
                  className='flex w-full flex-col gap-4'
                  value={activeItem}
                  onValueChange={handleToggle}
                >
                  {menu.map((item) => (
                    <MobileMenuItem item={item} key={item.title} />
                  ))}
                </Accordion>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </>
  )
}

const MobileMenuItem = ({ item }: { item: MenuItemType }) => {
  if (item.items) {
    return (
      <AccordionItem key={item.title} value={item.url} className='border-b-0'>
        <AccordionTrigger className='py-0 font-medium text-base hover:no-underline'>
          {item.title}
        </AccordionTrigger>
        <AccordionContent className='mt-2'>
          {item.items.map((subItem) => (
            <MenuLink key={subItem.title} item={subItem} />
          ))}
        </AccordionContent>
      </AccordionItem>
    )
  }

  return <MenuLink key={item.title} item={item} className='p-0' />
}
