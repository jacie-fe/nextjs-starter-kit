import { cn } from '@/lib/utils'

export const ListItem = ({
  number,
  text,
  title,
  children,
  className,
}: {
  text?: string
  title: string
  number: number
  children?: React.ReactNode
  className?: string
}) => (
  <div className={cn('flex max-w-[427px] gap-[12px]', className)}>
    <div className='flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#69c0ff33] text-xs font-bold text-[#69C0FF]'>
      {number}
    </div>
    {children ? (
      children
    ) : (
      <div className='space-y-2'>
        <div className='text-lg font-bold'>{title}</div>
        <div>{text}</div>
      </div>
    )}
  </div>
)

interface ListProps extends React.HTMLAttributes<HTMLDivElement> {
   
  items: { text?: string; title: string }[]
  itemClassName?: string
}

export default function List({ items, itemClassName }: ListProps) {
  return items.map((item: { text?: string; title: string }, idx) => (
    <ListItem
      key={idx}
      {...{ ...item, number: idx + 1 }}
      className={itemClassName}
    />
  ))
}
