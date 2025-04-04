'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import {
  getTokenAction,
  getUserInfoAction,
  logoutAction,
} from '@/app/actions/auth'
import { useRouter } from 'next/navigation'
import { UserProfile } from '@/types/global'

type AuthContextType = {
  isAuth: boolean
  user: UserProfile | null
  isLoadingUserInfo: boolean
  logout: () => Promise<void>
  getUserInfo: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null)
  const [isLoadingUserInfo, setIsLoadingUserInfo] = useState(true)
  const router = useRouter()

  // Fetch user info on mount
  useEffect(() => {
    getUserInfo()
  }, [])

  const logout = async () => {
    await logoutAction()
    setUser(null)
    router.push('/signin') // Redirect to login after logout
  }

  const getUserInfo = async () => {
    const token = await getTokenAction()
    if (!token.access_token) {
      setIsLoadingUserInfo(false)
      return
    }
    setIsLoadingUserInfo(true)
    try {
      const userData = await getUserInfoAction()
      setUser(userData)
    } catch (error) {
      console.error('Failed to refresh user info:', error)
      setUser(null)
      // Clear tokens if user info fetch fails, no need to redirect to signin
      logoutAction()
    } finally {
      setIsLoadingUserInfo(false)
    }
  }

  return (
    <AuthContext.Provider
      value={{
        isAuth: !!user,
        user,
        isLoadingUserInfo,
        logout,
        getUserInfo,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
