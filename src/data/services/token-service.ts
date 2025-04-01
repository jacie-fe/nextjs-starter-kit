import { cookies } from "next/headers"

export const ACCESS_TOKEN_KEY = 'access_token'
export const REFRESH_TOKEN_KEY = 'refresh_token'

/**
 * @param key Token key (access_token or refresh_token)
 * @returns Token value or null
 */
export async function getToken(
  key: 'access_token' | 'refresh_token'
): Promise<string | null> {
  return (await cookies()).get(key)?.value || null
}

/**
 * Set a token in cookies (server only)
 * @param key Token key (access_token or refresh_token)
 * @param value Token value
 * @param expires Expiry time in seconds
 */
export async function setToken(
  key: 'access_token' | 'refresh_token',
  value: string,
  expires: number = 7 * 24 * 60 * 60
) {
  ;(await cookies()).set({
    name: key,
    value,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: expires,
  })
}

/**
 * Remove a token from cookies
 * @param key Token key (access_token or refresh_token)
 */
export async function removeToken(key: 'access_token' | 'refresh_token') {
  (await cookies()).set({
    name: key,
    value: '',
    maxAge: -1, // Expire immediately
    path: '/',
  })
}

/**
 * Clear all auth tokens
 */
export async function clearTokens() {
  await removeToken(ACCESS_TOKEN_KEY)
  await removeToken(REFRESH_TOKEN_KEY)
}
