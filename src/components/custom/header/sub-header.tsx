'use client'

import { usePathname } from '@/i18n/navigation'
import { useAuth } from '@/providers/auth'

const Subheader = () => {
  const { user } = useAuth()
  const pathname = usePathname()
  const isConsolePage = pathname.includes('/console')

  if (!user || !isConsolePage) {
    return <></>
  }

  return (
    <span className='ml-2 text-base text-gray-800'>
      /
      <span className='ml-2 text-sm'>
        {user.organization_name}
      </span>
    </span>
  )
}

export default Subheader
