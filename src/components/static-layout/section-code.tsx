'use client'

import { useEffect, useState } from 'react'
import ClipboardCopyButton from '../custom/clipboard-copy-button'
import { ScrollArea, ScrollBar } from '../ui/scroll-area'
import { cn } from '@/lib/utils'

interface SectionCodeProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string
  children: string
  codeClassName?: string
}

export default function SectionCode({
  title,
  children,
  codeClassName,
}: SectionCodeProps) {
  const [width, setWidth] = useState(760); // Default width

  useEffect(() => {
    const updateWidth = () => {
      setWidth(window.innerWidth > 768 ? 760 : window.innerWidth - 70);
    };

    updateWidth(); // Set initial width
    window.addEventListener("resize", updateWidth);

    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  return (
    <div className='space-y-2'>
      <div>{title}</div>
      <div
        className='relative overflow-hidden rounded-lg bg-gray-100 p-3 pr-10 pb-2'
        style={{
          width: width,
        }}
      >
        <div className='absolute top-1 right-0'>
          <ClipboardCopyButton
            className='size-10 py-0 text-black'
            value={children}
          />
        </div>
        <ScrollArea
          type='hover'
          className={cn('whitespace-pre', codeClassName)}
        >
          <code className={cn('whitespace-pre', codeClassName)}>
            {children}
          </code>

          <ScrollBar orientation='horizontal' />
        </ScrollArea>
      </div>
    </div>
  )
}
