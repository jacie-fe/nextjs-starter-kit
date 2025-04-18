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
import { UserInfoBox } from './user-nav'
import { useState } from 'react'
import { AuthButtons, MenuLink } from './menu-item'
import { useAuth } from '@/providers/AuthProvider'

export default function MobileMenu() {
  const { isAuth, user, logout } = useAuth()
  const [activeItem, setActiveItem] = useState<string>()
  const handleToggle = (item: string) => {
    setActiveItem((prev) => (prev === item ? menu[0].url : item))
  }

  const handleLogoutClick = () => {
    logout()
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
                {!isAuth && (
                  <AuthButtons className='mb-4 grid grid-cols-2 gap-3' />
                )}
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
                {isAuth && (
                  <Button
                    onClick={handleLogoutClick}
                    variant='outline'
                    className='mt-4'
                  >
                    <LogOutIcon size={16} className='mr-2' />
                    Logout
                  </Button>
                )}
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
        <AccordionTrigger className='menu-link py-0 text-base leading-3 font-semibold hover:no-underline'>
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
