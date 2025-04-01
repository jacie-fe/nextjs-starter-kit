'use client'
import { LinkIcon } from 'lucide-react'
import ClipboardCopyButton from '../custom/clipboard-copy-button'
import { cn } from '@/lib/utils'
import { useEffect, useState } from 'react'

export default function LinkCopyable({
  id,
  title,
  level,
}: {
  id: string
  title: string
  level?: number
}) {
  const [url, setUrl] = useState('')
  useEffect(() => {
    const referenceUrl = window.location.href.split('#')[0] + `#${id}`
    setUrl(referenceUrl)
  }, [id])
  return (
    <div className='group flex items-end gap-3'>
      <a
        href={`#${id}`}
        className={cn('ms:text-3xl text-2xl font-medium', {
          'text-xl': level === 2,
        })}
      >
        {title}
      </a>
      <ClipboardCopyButton
        value={url}
        className='opacity-0 group-hover:opacity-100'
      >
        <LinkIcon size='20' className='text-black' />
      </ClipboardCopyButton>
    </div>
  )
}
