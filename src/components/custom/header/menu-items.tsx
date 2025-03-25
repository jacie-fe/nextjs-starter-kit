"use client";

import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu'
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';

interface MenuItem {
    title: string
    url: string
    description?: string
    icon?: React.ReactNode
    items?: MenuItem[]
  }
  
const SubMenuLink = ({ item }: { item: MenuItem }) => {
  return (
    <a
      className='hover:bg-muted hover:text-accent-foreground flex flex-row gap-4 rounded-md p-3 leading-none no-underline transition-colors outline-none select-none'
      href={item.url}
    >
      <div className='text-foreground'>{item.icon}</div>
      <div>
        <div className='text-sm font-semibold'>{item.title}</div>
        {item.description && (
          <p className='text-muted-foreground text-sm leading-snug'>
            {item.description}
          </p>
        )}
      </div>
    </a>
  )
}

export const MenuItem = (item: MenuItem) => {
   
  const pathname = usePathname()

  function isMenuActive(url: string) {
    return pathname.startsWith(url)
  }

  if (item.items) {
    return (
      <NavigationMenuItem key={item.title}>
        <NavigationMenuTrigger>{item.title}</NavigationMenuTrigger>
        <NavigationMenuContent className='bg-popover text-popover-foreground'>
          {item.items.map((subItem) => (
            <NavigationMenuLink asChild key={subItem.title} className='w-80'>
              <SubMenuLink item={subItem} />
            </NavigationMenuLink>
          ))}
        </NavigationMenuContent>
      </NavigationMenuItem>
    )
  }

  return (
    <NavigationMenuItem key={item.title}>
      <NavigationMenuLink
        href={item.url}
        className={cn(
          'group bg-background hover:bg-muted hover:text-accent-foreground inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors',
          {
            'text-accent-foreground': isMenuActive(item.url),
          }
        )}
      >
        {item.title}
      </NavigationMenuLink>
    </NavigationMenuItem>
  )
}
