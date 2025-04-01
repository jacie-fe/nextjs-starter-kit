
import { cn } from '@/lib/utils'
import LinkCopyable from './link-copyable'

interface SectionLevelProps extends React.HTMLAttributes<HTMLDivElement> {
  level?: number
  id?: string
  title: string
}

export default function SectionLevel({
  level,
  id,
  title,
  children,
  className,
}: SectionLevelProps) {
  if (!id) {
    return (
      <section
        className={cn(
          'flex flex-col gap-7',
          {
            'space-y-3': level === 2,
          },
          className
        )}
      >
        <div className='group flex items-end gap-3'>
          <div
            className={cn('ms:text-3xl text-2xl font-medium', {
              'text-xl': level === 2,
            })}
          >
            {title}
          </div>
        </div>
        {children}
      </section>
    )
  }
  return (
    <section
      id={id}
      className={cn(
        'flex flex-col gap-2 space-y-4',
        {
          'space-y-3': level === 2,
        },
        className
      )}
    >
      <LinkCopyable id={id} title={title} level={level} />
      {children}
    </section>
  )
}
