'use client'

import { HTMLAttributes, useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/custom/button'
import { PasswordInput } from '@/components/custom/password-input'
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { cn, sleep } from '@/lib/utils'
import { passwordRuleCode } from '@/lib/constants'
import { SignupData, SignupRequestParams } from '@/types/auth'
import { signup } from '@/data/services/client/auth-service'

interface SetPasswordFormProps extends HTMLAttributes<HTMLDivElement> {
  data: Partial<SignupData>
  onNext: (data: unknown) => void
}

const passwordSchema = z
  .string()
  .min(8, passwordRuleCode.minLength.code)
  .regex(/[0-9]/, passwordRuleCode.number.code)
  .regex(/[a-z]/, passwordRuleCode.lowercase.code)
  .regex(/[A-Z]/, passwordRuleCode.uppercase.code)
  .regex(/[\W_]/, passwordRuleCode.symbol.code)

const formSchema = z
  .object({
    password: passwordSchema,
    password_confirm: z.string().min(1, {
      message: 'Please confirm your password',
    }),
    isAgreed: z.boolean().refine((data) => data === true, {
      message: 'not_agreed',
    }),
  })
  .refine((data) => data.password === data.password_confirm, {
    message: 'Passwords do not match',
    path: ['password_confirm'],
  })

export function SetPasswordForm({
  data,
  onNext,
  className,
  ...props
}: SetPasswordFormProps) {
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: '',
      password_confirm: '',
    },
  })

  const [validations, setValidations] = useState({
    [passwordRuleCode.minLength.code]: false,
    [passwordRuleCode.number.code]: false,
    [passwordRuleCode.lowercase.code]: false,
    [passwordRuleCode.uppercase.code]: false,
    [passwordRuleCode.symbol.code]: false,
  })

  const onSubmit = async (dataForm: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true)
      await sleep()
      const payload: SignupRequestParams = {
        email: data.email!,
        password: dataForm.password,
        first_name: data.first_name!,
        last_name: data.last_name!,
        organization_name: data.organization_name!,
      }
      await signup(payload)

      form.reset()
      onNext?.(dataForm)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      if (err.code === 'USER_ALREADY_EXISTS') {
        form.setError('root', { message: 'User already exists' })
      } else {
        form.setError('root', {
          message: err?.response?.data?.message || err?.message,
        })
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleValidation = (value: string) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setValidations((prev: any) => {
      for (const key in passwordRuleCode) {
        const rule = passwordRuleCode[key as keyof typeof passwordRuleCode]
        const isValid = rule.regex.test(value)
        prev[rule.code] = isValid
      }
      return { ...prev }
    })
  }

  return (
    <Card className='p-6'>
      <CardHeader className='px-0'>
        <CardTitle className='text-center text-2xl font-semibold tracking-tight'>
          Setup your password
        </CardTitle>
        <CardDescription className='text-center'>
          Create the strongest security
        </CardDescription>
      </CardHeader>
      <div className={cn('grid gap-6', className)} {...props}>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className='grid gap-4'>
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
                          handleValidation(e.target.value)
                        }}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <div className='grid gap-2'>
                {Object.values(passwordRuleCode).map((rule, i) => (
                  <div
                    key={i}
                    className={cn(
                      'flex items-center space-x-1',
                      validations[rule.code]
                        ? 'text-success'
                        : 'text-muted-foreground',
                      form.formState.errors.password?.message === rule.code &&
                        'text-destructive'
                    )}
                  >
                    <div className='w-5'>
                      {validations[rule.code] ? '✓' : '•'}
                    </div>
                    <span>{rule.message}</span>
                  </div>
                ))}
              </div>
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
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {form.formState.errors?.root && (
                <div className='ea-error-message'>
                  {form.formState.errors?.root?.message}
                </div>
              )}

              <FormField
                control={form.control}
                name='isAgreed'
                render={({ field }) => (
                  <FormItem className='flex flex-col'>
                    <FormControl>
                      <div className='flex items-center space-x-2'>
                        {/* @ts-ignore */}
                        <Checkbox
                          id='isAgreed'
                          checked={field.value}
                          className={cn('h-5 w-5 border-gray-400', {
                            'border-destructive':
                              form.formState.errors.isAgreed,
                          })}
                          {...field}
                          onCheckedChange={(e) => {
                            field.onChange(e)
                          }}
                        />
                        <label
                          className={cn('Label text-gray-700')}
                          htmlFor='isAgreed'
                        >
                          In order to use this service, you must agree to our{' '}
                          <span className={cn('text-sm text-blue-600')}>
                            Term of Service and Privacy Policy
                          </span>
                        </label>
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button type='submit' className='mt-2 flex-1' loading={isLoading}>
                Continue
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </Card>
  )
}
