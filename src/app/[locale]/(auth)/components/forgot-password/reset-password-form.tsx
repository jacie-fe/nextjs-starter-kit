import { HTMLAttributes, useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { z } from 'zod'

import { Button } from '@/components/custom/button'
import { PasswordInput } from '@/components/custom/password-input'
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { passwordRuleCode } from '@/constants/password'
import { routePaths } from '@/constants/routePaths'
import { cn, sleep } from '@/lib/utils'
import { authService } from '@/services'
import { ForgotPassRequestParams, ForgotPasswordData } from '@/types/auth'

interface ResetPasswordFormProps extends HTMLAttributes<HTMLDivElement> {
  data: Partial<ForgotPasswordData>
  onNext: (data: unknown) => void
}

const passwordSchema = z
  .string()
  .min(8, passwordRuleCode.minLength.message)
  .regex(/[0-9]/, passwordRuleCode.number.message)
  .regex(/[a-z]/, passwordRuleCode.lowercase.message)
  .regex(/[A-Z]/, passwordRuleCode.uppercase.message)
  .regex(/[\W_]/, passwordRuleCode.symbol.message)

const formSchema = z
  .object({
    otp: z.string().min(1, {
      message: 'Please enter OTP',
    }),
    password: passwordSchema,
    password_confirm: z.string().min(1, {
      message: 'Please confirm your password',
    }),
  })
  .refine((data) => data.password === data.password_confirm, {
    message: 'Passwords do not match',
    path: ['password_confirm'],
  })

export function ResetPasswordForm({
  data,
  onNext,
  className,
  ...props
}: ResetPasswordFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [commonError, setCommonError] = useState<any>(null)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      otp: '',
      password: '',
      password_confirm: '',
    },
  })

  const onSubmit = async (dataForm: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true)
      setCommonError(null)
      await sleep()
      const payload: ForgotPassRequestParams = {
        email: data.email!,
        password: dataForm.password,
        password_confirmation: dataForm.password_confirm,
        otp: dataForm.otp,
      }
      await authService.verifyForgotPasswordOtp(payload)
      form.reset()
      onNext?.(dataForm)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.log(err)
      setCommonError(err?.response?.data?.message || err?.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className='p-6'>
      <CardHeader className='px-0'>
        <CardTitle className='text-center text-2xl font-semibold tracking-tight'>
          New Credentials
        </CardTitle>
        <CardDescription className='text-center'>
          We have sent the OTP code to your email {data.email}. Enter it below
          to reset your password.
        </CardDescription>
      </CardHeader>
      <div className={cn('grid gap-6', className)} {...props}>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className='grid gap-4'>
              <FormField
                control={form.control}
                name='otp'
                render={({ field }) => (
                  <FormItem className='space-y-1'>
                    <FormLabel>OTP</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        onChange={(e) => {
                          field.onChange(e)
                          setCommonError(null)
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='password'
                render={({ field }) => (
                  <FormItem className='flex flex-col'>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <PasswordInput
                        {...field}
                        onChange={(e) => {
                          field.onChange(e)
                          setCommonError(null)
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='password_confirm'
                render={({ field }) => (
                  <FormItem className='flex flex-col'>
                    <FormLabel>Confirm password</FormLabel>
                    <FormControl>
                      <PasswordInput
                        {...field}
                        onChange={(e) => {
                          field.onChange(e)
                          setCommonError(null)
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {commonError && (
                <p className='text-destructive mt-2 text-[0.8rem] font-medium'>
                  {commonError}
                </p>
              )}
              <Button type='submit' className='mt-2 flex-1' loading={isLoading}>
                Change Password
              </Button>
            </div>
            <div className='mt-4 text-sm'>
              Already have an account?
              <Button asChild variant='link' className='pl-1'>
                <Link to={routePaths.guest.signin}>Login</Link>
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </Card>
  )
}
