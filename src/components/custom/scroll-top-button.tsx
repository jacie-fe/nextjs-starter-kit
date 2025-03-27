"use client";
import { scrollToTop } from '@/lib/utils'
import { Button } from '../ui/button'
import { ArrowUpIcon } from 'lucide-react'

export default function ScrollTopButton() {
  const handleScrollToTop = () => {
    scrollToTop()
  }
  return (
    <div className='fixed right-8 bottom-4'>
      <Button variant='outline' size='icon' onClick={handleScrollToTop}>
        <ArrowUpIcon className='h-6 w-6' />
        <span className='sr-only'>Scroll to top</span>
      </Button>
    </div>
  )
}
