import { Menu } from 'lucide-react'
import Image from 'next/image'

import {
  NavigationMenu,
  NavigationMenuList,
} from '@/components/ui/navigation-menu'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from '@/components/ui/sheet'
import { cn } from '@/lib/utils'
import Logo from '@/assets/logo.svg'
import { menu } from '@/lib/constants'
import { UserNav } from './user-nav'
import { Button } from '../button'
import { Link } from '@/i18n/navigation'
import { MenuItem, MobileMenu } from './menu-item'
interface MenuItem {
  title: string
  url: string
  description?: string
  icon?: React.ReactNode
  items?: MenuItem[]
}

type HeaderProps = React.HTMLAttributes<HTMLUListElement>

const Header = ({ className }: HeaderProps) => {
  return (
    <section
      className={cn(
        'fixed top-0 z-50 w-full shrink-0 border-b bg-white',
        className
      )}
    >
      <div className='container mx-auto'>
        {/* Desktop Menu */}
        <nav className='hidden justify-between lg:flex'>
          <Link className='flex items-center gap-2' href='/'>
            <Image
              src={Logo}
              className='max-h-8'
              alt='eAuthenticator'
            />
          </Link>
          <div className='flex items-center'>
            <NavigationMenu viewport={false}>
              <NavigationMenuList>
                {menu.map((item) => (
                  <MenuItem
                    item={item}
                    key={item.title}
                    className='h-auto rounded-none border-b-[2px] border-b-transparent'
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
        <div className='block h-16 lg:hidden'>
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
                <SheetHeader>
                </SheetHeader>
                  <MobileMenu items={menu} />
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Header
