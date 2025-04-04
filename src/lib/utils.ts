import { ColumnSort } from "@tanstack/react-table"
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


export const generateSorting = (sort_by?: string) => {
  const [id = '', desc = ''] = sort_by?.split?.(':') || []
  if (!id || !desc || !sort_by) return []

  return [
    {
      desc: desc === 'desc',
      id: id,
    },
  ]
}

export const generateSortByString = (sorting: ColumnSort) => {
  const { desc, id } = sorting || {}
  return `${id}:${desc ? 'desc' : 'asc'}`
}

export const randomApiKey = () => {
  return (
    Math.random().toString(36).substring(2, 18) +
    Math.random().toString(36).substring(2, 18)
  )
}

export const cleanQueyParams = <TParams>(params: TParams) => {
  for (const key in params) {
    if (!String(params[key])) {
      delete params[key]
    }
  }

  return params
}