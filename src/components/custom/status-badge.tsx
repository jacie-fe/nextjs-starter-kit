import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const badgeDotVariants = cva('h-1.5 w-1.5 rounded-full shrink-0', {
  variants: {
    variant: {
      default: 'bg-[#1890FF]',
      secondary: 'bg-[#BFBFBF]',
      success: 'bg-[#52C41A]',
      destructive: 'bg-[#F5222D]',
      warning: 'bg-[#FAAD14]',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})

export interface BadgeDotProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeDotVariants> {}

function BadgeDot({
  className,
  variant,
  children,
  ...props
}: StatusBadgeProps) {
  return (
    <div className={cn(badgeDotVariants({ variant }), className)} {...props} />
  )
}

const statusBadgeVariants = cva(
  'inline-flex items-center gap-2 rounded-md border px-2 text-xs font-normal text-sm leading-[22px] transition-colors focus:outline-hidden focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default:
          'border-transparent bg-[#BAE7FF] text-[#096DD9] shadow-sm hover:bg-[#BAE7FF]/80',
        secondary:
          'border-transparent bg-[#F5F5F5] text-[#8C8C8C] shadow-sm hover:bg-[#F5F5F5]/80',
        success:
          'border-transparent bg-[#D9F7BE] text-[#389E0D] hover:bg-[#D9F7BE]/80',
        destructive:
          'border-transparent bg-[#FFCCC7] text-[#CF1322] shadow-sm hover:bg-[#FFCCC7]/80',
        warning:
          'border-transparent bg-[#FFF1B8] text-[#D48806] shadow-sm hover:bg-[#FFF1B8]/80',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

export interface StatusBadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof statusBadgeVariants> {}

function StatusBadge({
  className,
  variant,
  children,
  ...props
}: StatusBadgeProps) {
  return (
    <div className={cn(statusBadgeVariants({ variant }), className)} {...props}>
      <BadgeDot variant={variant} />
      {children}
    </div>
  )
}

export { StatusBadge, statusBadgeVariants }
