import { cn } from '@/lib/utils'

interface BoxProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  contentClassName?: string
}

export default function Box({
  title,
  children,
  className,
  contentClassName,
}: BoxProps) {
  return (
    <div
      className={cn(
        'relative rounded-md border border-gray-300 p-3 pt-5',
        className
      )}
    >
      {title && (
        <div className='absolute -top-3 bg-white px-2'>
          <p className='mb-2 font-bold'>{title}</p>
        </div>
      )}
      <div className={(cn('box-content'), contentClassName)}>{children}</div>
    </div>
  )
}
