"use client"
import React, { useState } from 'react'

import { useCopyToClipboard } from 'react-use'

import { cn } from '@/lib/utils'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip'
import { Button } from '../ui/button'
import { Copy } from 'lucide-react'
interface ClipboardCopyButton
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string
}
const ClipboardCopyButton = React.forwardRef<
  HTMLButtonElement,
  ClipboardCopyButton
>(({ className, children, value, ...props }, ref) => {
  const [copied, setCopied] = useState(false)
  const [open, setOpen] = useState(false)

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, copyToClipboard] = useCopyToClipboard()

  const handleCopy = () => {
    if (copied) return

    copyToClipboard(value)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000) // Reset after 2 seconds
  }

  return (
    <TooltipProvider delayDuration={300}>
      <Tooltip open={open} onOpenChange={setOpen}>
        <TooltipTrigger
          asChild
          onClick={(e) => {
            e.preventDefault()
            setOpen(true)
          }}
        >
          <Button
            ref={ref}
            variant='ghost'
            className={cn('text-primary flex p-0', className)}
            {...props}
            onClick={handleCopy}
          >
            {children ? children : <Copy size={20} />}
          </Button>
        </TooltipTrigger>
        <TooltipContent sticky='always' className='bg-gray-800'>
          {copied ? 'Copied!' : 'Copy to Clipboard'}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
})

ClipboardCopyButton.displayName = 'ClipboardCopyButton'
export default ClipboardCopyButton
