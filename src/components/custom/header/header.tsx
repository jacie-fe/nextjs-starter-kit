'use client'

import Image from 'next/image'

import {
  NavigationMenu,
  NavigationMenuList,
} from '@/components/ui/navigation-menu'
import { cn } from '@/lib/utils'
import Logo from '@/assets/logo.svg'
import { UserNav } from './user-nav'
import { Link, usePathname } from '@/i18n/navigation'
import { menu } from './menu-config'
import { MenuItem } from './menu-item'
import MobileMenu from './mobile-menu'
import { useEffect, useMemo, useState } from 'react'
interface MenuItem {
  title: string
  url: string
  description?: string
  icon?: React.ReactNode
  items?: MenuItem[]
}

type HeaderProps = React.HTMLAttributes<HTMLUListElement>

const Header = ({ className }: HeaderProps) => {
  const pathname = usePathname()

  const [isScrolled, setIsScrolled] = useState(false)
  const isHomePage = useMemo(() => {
    return pathname === '/' || pathname === '/home'
  }, [pathname])

  useEffect(() => {
    const scrollElement =
      document.getElementsByClassName('scrollable-content')?.[0]
    if (!scrollElement) return

    const handleScroll = () => {
      setIsScrolled(scrollElement.scrollTop > 50)
    }

    scrollElement.addEventListener('scroll', handleScroll)

    return () => scrollElement.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section
      className={cn(
        'fixed top-0 z-50 h-[var(--header-height)] w-full shrink-0 border-b',
        className,
        {
          'transition-colors duration-300': isHomePage,
          'bg-white': isScrolled,
          'bg-transparent': !isScrolled,
          'border-transparent': !isScrolled && isHomePage,
        }
      )}
    >
      <div className='container mx-auto h-full'>
        {/* Desktop Menu */}
        <nav className='menubar hidden justify-between lg:flex'>
          <Link className='flex items-center gap-2' href='/'>
            <Image src={Logo} className='max-h-8' alt='eAuthenticator' />
          </Link>
          <div className='flex items-center'>
            <NavigationMenu viewport={false}>
              <NavigationMenuList className='h-[calc(var(--header-height)-1px)]'>
                {menu.map((item) => (
                  <MenuItem
                    item={item}
                    key={item.title}
                    className='rounded-none border-b-[2px] border-b-transparent'
                  />
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>
          <div className='flex items-center gap-2'>
            <UserNav />
          </div>
        </nav>
        {/* Mobile Menu */}
        <MobileMenu />
      </div>
    </section>
  )
}

export default Header
