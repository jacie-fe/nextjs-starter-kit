import { cn } from '@/lib/utils'
import { LoaderIcon } from 'lucide-react'

type LoaderProps = React.HTMLAttributes<HTMLDivElement>
export default function Loader({ className, ...props }: LoaderProps) {
  return (
    <div
      className={cn('flex h-svh w-full items-center justify-center', className)}
      {...props}
    >
      {/* @ts-ignore */}
      <LoaderIcon className='h-10 w-10 animate-spin' />

      <span className='sr-only'>loading</span>
    </div>
  )
}
