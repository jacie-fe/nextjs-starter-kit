'use client'

import { useEffect } from 'react'

export default function ScrollHandler() {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const location = typeof window !== 'undefined' ? window.location : { hash: '' }
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

function scrollToHash(hash: string) {
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
