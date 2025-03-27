'use client'

import { useMemo, useState } from 'react'

import { cn } from '@/lib/utils'
import Link from 'next/link'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '../ui/sheet'
import { ChevronRight } from 'lucide-react'

export interface NavLink {
  title: string
  label?: string
  href?: string
  icon?: React.ReactNode
  activeRoutePaths?: string[]
  id: string
}
export interface SideLink extends NavLink {
  sub?: NavLink[]
  level?: number
}

export interface SideGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  items?: SideLink & { id: string }[]
  id: string
}
export const SideGroup = ({
  title,
  id,
  items,
  className,
  ...props
}: SideGroupProps) => {
  const navItems = useMemo(() => {
    return (items?.map((item) => {
      return {
        ...item,
        href: `#${item.id}`,
      }
    }) || []) as unknown as SideLink[]
  }, [items])

  const handleClick = (targetId: string) => {
    window.location.hash = targetId
  }

  return (
    <div className={cn('mt-4', className)} {...props}>
      <div>
        <Link href={`#${id}`} className='font-[600] text-[#A6A6A6] uppercase'>
          {title}
        </Link>
      </div>

      {!!navItems?.length &&
        navItems.map((item) => {
          return (
            <div
              onClick={() => handleClick(item.id)}
              key={item.id}
              className='focus-visible:ring-ring hover:bg-accent hover:text-accent-foreground inline-flex h-8 w-full cursor-pointer items-center justify-start rounded-none px-3 py-2 text-sm font-medium text-wrap whitespace-nowrap transition-colors focus-visible:ring-1 focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-50'
            >
              <div>{item.title}</div>
            </div>
          )
        })}
    </div>
  )
}

export const SidebarDocsMobile = ({ items }: { items: SideGroupProps[] }) => {
  const [openMobileNav, setOpenMobileNav] = useState(false)

  return (
    <Sheet open={openMobileNav} onOpenChange={setOpenMobileNav}>
      <SheetTrigger asChild>
        <div className='bg-background flex w-full cursor-pointer items-center justify-between border-b px-6 py-3'>
          Features by category <ChevronRight />
        </div>
      </SheetTrigger>
      <SheetContent side='bottom' className='p-4'>
        <div style={{ position: 'absolute', width: '1px', height: '1px', margin: '-1px', padding: '0', overflow: 'hidden', clip: 'rect(0, 0, 0, 0)', whiteSpace: 'nowrap', border: '0' }}>
          <SheetHeader>
            <SheetTitle></SheetTitle>
          </SheetHeader>
        </div>
         {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
        {items.map((group: any) => (
          <SideGroup
            key={group.title}
            {...group}
            closeNav={() => setOpenMobileNav(false)}
          />
        ))}
      </SheetContent>
    </Sheet>
  )
}
