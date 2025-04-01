"use client"

import { HTMLAttributes, useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

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
import { cn, sleep } from '@/lib/utils'
import { SignupData } from '@/types/auth'

interface SetupAccountFormProps extends HTMLAttributes<HTMLDivElement> {
  data: Partial<SignupData>
  onNext: (data: unknown) => void
}

const formSchema = z.object({
  first_name: z.string().min(1, { message: 'Please enter your first name' }),
  last_name: z.string().min(1, { message: 'Please enter your last name' }),
  organization_name: z
    .string()
    .min(1, { message: 'Please enter your organization' }),
})

export function SetupAccountForm({
  data,
  onNext,
  className,
  ...props
}: SetupAccountFormProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [commonError, setCommonError] = useState<any>(null)
  const [isLoading, setLoading] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      first_name: data?.first_name || '',
      last_name: data?.last_name || '',
      organization_name: data?.organization_name || '',
    },
  })
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setLoading(true)
    await sleep(500)
    setLoading(false)
    onNext(data)
  }

  return (
    <Card className='p-6'>
      <CardHeader className='px-0'>
        <CardTitle className='text-center text-2xl font-semibold tracking-tight'>
          Set up your account
        </CardTitle>
        <CardDescription className='text-center'>
          Complete the fields below to get started
        </CardDescription>
      </CardHeader>
      <div className={cn('grid gap-6', className)} {...props}>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className='grid gap-4'>
              <FormField
                control={form.control}
                name='first_name'
                render={({ field }) => (
                  <FormItem className='space-y-1'>
                    <FormLabel>First name</FormLabel>
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
                name='last_name'
                render={({ field }) => (
                  <FormItem className='space-y-1'>
                    <FormLabel>Last name</FormLabel>
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
                name='organization_name'
                render={({ field }) => (
                  <FormItem className='space-y-1'>
                    <FormLabel>Organization name</FormLabel>
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

              {commonError && (
                <p className='text-destructive mt-2 text-[0.8rem] font-medium'>
                  {commonError}
                </p>
              )}

              <Button type='submit' className='mt-2' loading={isLoading}>
                Save and Continue
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </Card>
  )
}
