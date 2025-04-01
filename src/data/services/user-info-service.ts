import { UserProfile } from '@/types/global'
import { LRUCache } from 'lru-cache'
import { jwtDecode } from 'jwt-decode'

const tokenCache = new LRUCache<string, string>({
  max: 100, // Max 100 entries
  ttl: 1000 * 60 * 5, // 5 minutes TTL (time-to-live)
})

// To get a cached token
function getCachedUserInfo(accessToken: string) {
  const userInfoString = tokenCache.get(accessToken)
  if (!userInfoString) {
    return null
  }
  try {
    const userInfo: UserProfile = JSON.parse(userInfoString)
    return userInfo
  } catch (error) {
    console.error('Error parsing cached user info:', error)
    return null
  }
}

// To set a token in cache
function setCachedUserInfo(accessToken: string, userInfo: UserProfile) {
  try {
    const userInfoString = JSON.stringify(userInfo)
    const decoded = jwtDecode(accessToken) as { exp: number }
    // Set the cache with the expiration time from the token
    // Note: exp is in seconds, so we multiply by 1000 to convert to milliseconds
    tokenCache.set(accessToken, userInfoString, {
      ttl: decoded.exp * 1000,
    })
  } catch (error) {
    console.error('Error serializing user info for caching:', error)
  }
}

function clearCachedUserInfo(accessToken: string) {
  tokenCache.delete(accessToken)
}

export { getCachedUserInfo, setCachedUserInfo, clearCachedUserInfo }
