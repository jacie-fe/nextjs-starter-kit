'use client'

import { HTMLAttributes, useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import AuthImage from '@/assets/auth-image.svg'
import { Button } from '@/components/custom/button'
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
import { useErrorHandler } from '@/hooks/use-error-handler'
import { cn } from '@/lib/utils'
import { SignupData } from '@/types/auth'
import Image from 'next/image'
import { checkEmailExists } from '@/app/actions/auth'

interface SetupEmailFormProps extends HTMLAttributes<HTMLDivElement> {
  data: Partial<SignupData>
  onNext: (data: unknown) => void
}

const formSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Please enter your email' })
    .email('Invalid email'),
})

export function SetupEmailForm({ data, onNext }: SetupEmailFormProps) {
  const { handleRootFormError } = useErrorHandler()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: data?.email || '',
    },
  })
  const [isLoading, setLoading] = useState(false)

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      setLoading(true)
      const { data: response } = await checkEmailExists(data)
      const { exists } = response
      if (!exists) {
        return onNext(data)
      }
      form.setError('email', { message: 'Email already exists' })
    } catch (error) {
      handleRootFormError({ error, setErrorFn: form.setError })
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Card className='p-6'>
        <CardHeader className='px-0'>
          <CardTitle className='text-center text-2xl font-semibold tracking-tight'>
            Sign Up
          </CardTitle>
          <CardDescription className='text-center'>
            Just a few quick things to get started
          </CardDescription>
          <Image
            src={AuthImage}
            alt='Auth Image'
            width={100}
            height={100}
            className='m-auto mt-4'
          />
        </CardHeader>

        <div className={cn('mt-6 grid gap-6')}>
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
                          <Input
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
                </div>
                {form.formState.errors.root && (
                  <p className='ea-error-message'>
                    {form.formState.errors.root.message}
                  </p>
                )}
                <Button type='submit' className='mt-4' loading={isLoading}>
                  Get Started
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </Card>
    </>
  )
}
