import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth', // Enables smooth scrolling
  })
}

export function sleep(delay = 1000) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true)
    }, delay)
  })
}

export const getInitials = (name?: string) => {
  if (!name) return ''
  return name.charAt(0).toUpperCase()
}