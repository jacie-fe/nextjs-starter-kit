'use client'

import { Button } from '@/components/custom/button'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { cn, getInitials } from '@/lib/utils'
import { LogOutIcon, UserIcon } from 'lucide-react'
import { UserProfile } from '@/types/global'
import { useAuth } from '@/providers/auth'
import { Link } from '@/i18n/navigation'
import { routePaths } from '@/lib/routePaths'
import { useEffect } from 'react'

interface UserInfoBoxProps extends React.HTMLAttributes<HTMLDivElement> {
  user?: UserProfile | null
}

export const UserInfoBox = ({ user, className }: UserInfoBoxProps) => {
  const display_name = user?.first_name + ' ' + user?.last_name
  const initials = getInitials(user?.first_name || user?.email)
  return (
    <div className={cn('flex gap-3', className)}>
      <Avatar className='h-10 w-10 rounded-full'>
        <AvatarFallback className='rounded-lg bg-[#5a2a00] text-white'>
          {initials ? (
            <span>{initials}</span>
          ) : (
            <UserIcon className='white h-6 w-6' />
          )}
        </AvatarFallback>
      </Avatar>
      <div className='grid flex-1 text-left text-sm leading-tight'>
        <span className='truncate font-semibold'>{display_name}</span>
        <span className='truncate text-xs'>{user?.email}</span>
      </div>
    </div>
  )
}

export function UserNav() {
  const { isAuth, user, isLoadingUserInfo, logout } = useAuth()

  const handleLogoutClick = () => {
    logout()
  }
  const initials = user && getInitials(user.first_name || user.email)

  if(isLoadingUserInfo){
    return (<></>)
  }

  if (!isAuth) {
    const auth = {
      login: { title: 'Login', url: routePaths.guest.signin },
      signup: { title: 'Sign up', url: routePaths.guest.signup },
    }

    return (
      <div className='flex items-center gap-2'>
        <Button asChild size='sm' variant='outline'>
          <Link href={auth.signup.url}>{auth.signup.title}</Link>
        </Button>
        <Button asChild size='sm'>
          <Link href={auth.login.url}>{auth.login.title}</Link>
        </Button>
      </div>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          size='lg'
          variant='ghost'
          className='h-14 w-full bg-transparent p-2 data-[state=open]:bg-[#f4f4f5] data-[state=open]:text-[#18181b]'
        >
          <Avatar className='h-10 w-10 rounded-full'>
            <AvatarFallback className='rounded-lg bg-[#5a2a00] text-white'>
              {initials ? (
                <span>{initials}</span>
              ) : (
                <UserIcon className='h-6 w-6 text-white' />
              )}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className='w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg'
        align='end'
        sideOffset={0}
      >
        <DropdownMenuLabel className='p-0 font-normal'>
          <div className='flex items-center gap-2 px-2 py-3 text-left text-sm'>
            <UserInfoBox user={user} />
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogoutClick}>
          <LogOutIcon className='mr-2 text-gray-600' />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
