"use client"

import { HTMLAttributes, useEffect, useState } from 'react'

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
import { cn } from '@/lib/utils'
import { toast } from 'sonner'
import { resendOtp, verifySigupOtp } from '@/app/actions/auth'

interface VerifyOtpFormProps extends HTMLAttributes<HTMLDivElement> {
  email: string
  onNext?: () => void
}

const formSchema = z.object({
  otp: z.string().min(1, {
    message: 'Please enter OTP',
  }),
})

export function VerifyOtpForm({
  email,
  onNext,
  className,
  ...props
}: VerifyOtpFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [timeLeft, setTimeLeft] = useState<number>(30) // 30 seconds countdown
  const [isResendDisabled, setIsResendDisabled] = useState<boolean>(false)

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [commonError, setCommonError] = useState<any>(null)
//   const { verifySigupOtp, resendOtp } = useAuth()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      otp: '',
    },
  })

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true)
      const payload = { email, otp: data.otp }
      await verifySigupOtp(payload)
      onNext?.()

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setCommonError(err?.message)
    } finally {
      setIsLoading(false)
    }
  }

  const handleResendOtp = async () => {
    try {
      await resendOtp({ email })
      // Reset timer after sending OTP
      setTimeLeft(30)
      setIsResendDisabled(true)
      toast('We have sent the OTP code to your email')
    } catch (_) {
      toast('Failed to resend OTP code')
    }
  }

  useEffect(() => {
    let timer: NodeJS.Timeout
    // If the resend is disabled, start the countdown
    if (isResendDisabled && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1)
      }, 1000)
    } else if (timeLeft === 0) {
      // Re-enable the resend button after 0 seconds
      setIsResendDisabled(false)
    }

    // Clean up interval on component unmount or when timeLeft changes
    return () => clearInterval(timer)
  }, [timeLeft, isResendDisabled])

  return (
    <div>
      <Card className='p-6'>
        <CardHeader className='px-0'>
          <CardTitle className='text-center text-2xl font-semibold tracking-tight'>
            OTP Verification
          </CardTitle>
          <CardDescription className='text-center'>
            We emailed you the OTP code <br />
            Enter the code below to confirm your account.
          </CardDescription>
        </CardHeader>
        <div className={cn('mt-4 grid gap-6', className)} {...props}>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className='grid gap-2'>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input disabled value={email} className='bg-gray-200' />
                </FormControl>
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

                {commonError && (
                  <p className='text-destructive mt-2 text-[0.8rem] font-medium'>
                    Invalid OTP
                  </p>
                )}

                <Button type='submit' className='mt-2' loading={isLoading}>
                  Verify
                </Button>
              </div>
              <div className='mt-2'>
                <span className='text-sm'>
                  Did not receive the verification OTP? &nbsp;
                </span>
                {isResendDisabled ? (
                  <span className='text-sm'>
                    Resend in <span className='text-blue-600'>{timeLeft}s</span>
                  </span>
                ) : (
                  <Button
                    variant='link'
                    onClick={handleResendOtp}
                    className='p-0'
                  >
                    Resend
                  </Button>
                )}
              </div>
            </form>
          </Form>
        </div>
      </Card>
    </div>
  )
}
