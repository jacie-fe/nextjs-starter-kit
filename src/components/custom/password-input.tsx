import * as React from 'react'

import { cn } from '@/lib/utils'
import { EyeIcon, EyeOffIcon } from 'lucide-react'
import { Button } from './button'

export type PasswordInputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'>

const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ className, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false)
    return (
      <div className='relative rounded-md'>
        <input
          type={showPassword ? 'text' : 'password'}
          className={cn(
            'border-input placeholder:text-muted-foreground focus-visible:ring-ring flex h-9 w-full rounded-md border bg-transparent px-3 py-1 text-sm shadow-xs transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:ring-1 focus-visible:outline-hidden disabled:cursor-not-allowed disabled:opacity-50',
            className
          )}
          ref={ref}
          {...props}
        />
        <Button
          size='icon'
          variant='ghost'
          className='text-muted-foreground absolute top-1/2 right-1 h-6 w-6 -translate-y-1/2 rounded-md'
          onClick={() => setShowPassword((prev) => !prev)}
        >
          {showPassword ? <EyeIcon size={18} /> : <EyeOffIcon size={18} />}
        </Button>
      </div>
    )
  }
)
PasswordInput.displayName = 'PasswordInput'

export { PasswordInput }
