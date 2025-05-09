'use client'

import { HTMLAttributes, useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { PasswordInput } from '@/components/custom/password-input'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { routePaths } from '@/lib/routePaths'
import { Button } from '@/components/custom/button'
import { signInAction } from '@/app/actions/auth'
import { useRouter } from '@/i18n/navigation'
import { useSearchParams } from 'next/navigation'
import { ApiError } from '@/lib/errors'
import { useErrorHandler } from '@/hooks/use-error-handler'
import { useAuth } from '@/providers/AuthProvider'

type SigninFormProps = HTMLAttributes<HTMLDivElement>

const formSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Please enter your email' })
    .email('Invalid email'),
  password: z.string().min(1, {
    message: 'Please enter your password',
  }),
})

export function SigninForm({ className, ...props }: SigninFormProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { handleRootFormError } = useErrorHandler()
  const { getUserInfo } = useAuth()
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true)
      const userCridentials = await signInAction(data)
      if (userCridentials.error) {
        throw new ApiError(userCridentials.error?.message)
      }

      // get user info after login and redirect to the returnUrl or home page
      await getUserInfo()
      const returnUrl = searchParams.get('returnUrl') || routePaths.guest.home
      router.push(returnUrl)
    } catch (error) {
      handleRootFormError({
        error,
        fallbackErrorMessage: 'Username or password is incorrect',
        setErrorFn: form.setError,
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className='grid'>
            <div className='grid gap-4'>
              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem className='space-y-1'>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='password'
                render={({ field }) => (
                  <FormItem className='space-y-1'>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <PasswordInput {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {form.formState.errors?.root && (
              <div className='ea-error-message'>
                {form.formState.errors?.root?.message}
              </div>
            )}
            <div className='mt-2 flex justify-end'>
              <Button variant='link' asChild className='p-0'>
                <Link href={routePaths.guest.forgotPassword}>
                  Forgot password?
                </Link>
              </Button>
            </div>

            <Button type='submit' loading={isLoading}>
              Login
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
