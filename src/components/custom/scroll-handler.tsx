'use client'

import { useEffect } from 'react'
import { useLocation } from 'react-use'

export default function ScrollHandler() {
  const location = useLocation()
  const hash = location.hash

  useEffect(() => {
    if (hash) {
      scrollToHash(hash)
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [hash, location])

  return null
}

export function scrollToHash(hash: string) {
  // When the location changes (due to hash change)
  if (hash) {
    const element = document.querySelector(hash)
    if (element) {
      const top = element.getBoundingClientRect().top + window.pageYOffset
      const offset = 100 // The offset (e.g., header height)
      window.scrollTo({
        top: top - offset,
        behavior: 'smooth',
      })
    }
  }
}