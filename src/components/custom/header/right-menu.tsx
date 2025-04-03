'use client'

import { Button } from '@/components/custom/button'
import { HomeIcon, TerminalIcon } from 'lucide-react'
import { Link, usePathname } from '@/i18n/navigation'
import { routePaths } from '@/lib/routePaths'
import { useEffect, useState } from 'react'

export function RightMenu() {
  const pathname = usePathname()
  const [isConsoleRoute, setIsConsoleRoute] = useState(false)

  useEffect(() => {
    const isConsolePath = pathname.startsWith(routePaths.private.applications)
    setIsConsoleRoute(isConsolePath)
  }
  , [pathname])

  return (
    <p>
      {!isConsoleRoute ? (
        <Button
          asChild
          variant='outline'
          className='text-primary hover:text-primary border border-blue-600 hover:bg-blue-100'
        >
          <Link href={routePaths.private.applications}>
            Console
            <TerminalIcon className='ml-2' />
          </Link>
        </Button>
      ) : (
        <Button
          asChild
          variant='outline'
          className='text-primary hover:text-primary border border-blue-600 hover:bg-blue-100'
        >
          <Link href={routePaths.guest.home}>
            Home
            <HomeIcon width={20} className='ml-2' />
          </Link>
        </Button>
      )}
    </p>
  )
}
