import { Menu } from 'lucide-react'
import Image from 'next/image'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { cn } from '@/lib/utils'
// import { usePathname } from 'next/navigation'
import Logo from '@/assets/logo.svg'
import { menu } from '@/lib/constants'
import { UserNav } from './user-nav'
import { Button } from '../button'
import { Link } from '@/i18n/navigation'
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
              width={32}
              height={32}
            />
            <span className='text-primary text-xl font-medium'>
              eAuthenticator
            </span>
          </Link>
          <div className='flex items-center'>
            <NavigationMenu viewport={false}>
              <NavigationMenuList>
                {menu.map((item) => renderMenuItem(item))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>
          <div className='flex items-center gap-2'>
            <UserNav />
          </div>
        </nav>

        {/* Mobile Menu */}
        <div className='block lg:hidden'>
          <div className='flex items-center justify-between'>
            {/* Logo */}
            <Link className='flex items-center gap-2' href='/'>
              <Image
                src={Logo}
                className='max-h-8'
                alt='eAuthenticator'
                width={32}
                height={32}
              />
              <span className='text-primary text-xl font-medium'>
                eAuthenticator
              </span>
            </Link>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant='outline' size='icon'>
                  <Menu className='size-4' />
                </Button>
              </SheetTrigger>
              <SheetContent className='overflow-y-auto'>
                <SheetHeader>
                  <SheetTitle>
                    <Link className='flex items-center gap-2' href='/'>
                      <Image
                        src={Logo}
                        className='max-h-8'
                        alt='eAuthenticator'
                        width={32}
                        height={32}
                      />
                      <span className='text-primary text-xl font-medium'>
                        eAuthenticator
                      </span>
                    </Link>
                  </SheetTitle>
                </SheetHeader>
                <div className='flex flex-col gap-6 p-4'>
                  <Accordion
                    type='single'
                    collapsible
                    className='flex w-full flex-col gap-4'
                  >
                    {menu.map((item) => renderMobileMenuItem(item))}
                  </Accordion>

                  {/* <div className='flex flex-col gap-3'>
                    <Button asChild variant='outline'>
                      <a href={auth.signup.url}>{auth.signup.title}</a>
                    </Button>
                    <Button asChild>
                      <a href={auth.login.url}>{auth.login.title}</a>
                    </Button>
                  </div> */}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </section>
  )
}

const renderMenuItem = (item: MenuItem) => {
  // const pathname = usePathname();

  // function isMenuActive(url: string) {
  //   return pathname.startsWith(url);
  // }

  if (item.items) {
    return (
      <NavigationMenuItem key={item.title}>
        <NavigationMenuTrigger className='h-auto rounded-none border-b-[2px] border-b-transparent px-4 pt-[30px] pb-[28px]'>
          {item.title}
        </NavigationMenuTrigger>
        <NavigationMenuContent className='bg-popover text-popover-foreground round-sm z-50'>
          {item.items.map((subItem) => (
            <SubMenuLink item={subItem} key={subItem.title} />
          ))}
        </NavigationMenuContent>
      </NavigationMenuItem>
    )
  }

  return (
    <NavigationMenuItem key={item.title} className=''>
      <Link
        href={item.url}
        className={cn(
          'group bg-background hover:bg-muted hover:text-accent-foreground inline-flex w-max items-center justify-center rounded-none border-b-[2px] border-b-transparent px-4 pt-[30px] pb-[28px] text-sm font-medium transition-colors',
          {
            // 'text-accent-foreground': isMenuActive(item.url),
          }
        )}
      >
        {item.title}
      </Link>
    </NavigationMenuItem>
  )
}

const renderMobileMenuItem = (item: MenuItem) => {
  if (item.items) {
    return (
      <AccordionItem key={item.title} value={item.title} className='border-b-0'>
        <AccordionTrigger className='text-md py-0 font-semibold hover:no-underline'>
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

  return (
    <a key={item.title} href={item.url} className='text-md font-semibold'>
      {item.title}
    </a>
  )
}

const SubMenuLink = ({ item }: { item: MenuItem }) => {
  return (
    <Link
      className='hover:bg-muted hover:text-accent-foreground flex flex-row items-center gap-2 rounded-md p-3 leading-none no-underline transition-colors outline-none select-none'
      href={item.url}
    >
      {item.title}
    </Link>
  )
}

export default Header
