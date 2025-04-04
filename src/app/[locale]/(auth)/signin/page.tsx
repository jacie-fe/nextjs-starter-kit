import Link from 'next/link'
import { Card } from '@/components/ui/card'
import { routePaths } from '@/lib/routePaths'
import { SigninForm } from '../components/sign-in-form'
import { Button } from '@/components/custom/button'
import { Suspense } from 'react'

export default function SignIn() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className='container grid min-h-[calc(100vh-(var(--header-height)+var(--footer-height)))] flex-col items-center justify-center lg:max-w-none lg:px-0'>
        <div className='mx-auto flex w-full flex-col justify-center space-y-2 p-3 sm:w-[480px] lg:p-8'>
          <Card className='p-6 pb-8'>
            <div className='flex flex-col space-y-2 text-left'>
              <h1 className='text-center text-2xl font-semibold tracking-tight'>
                Login
              </h1>
              <p className='text-muted-foreground mb-4 text-sm'>
                Enter your email and password below to log into your account
              </p>
            </div>
            <SigninForm />
          </Card>
          <div className='text-center text-sm'>
            Don’t have an account?
            <Button asChild variant='link' className='pl-1'>
              <Link href={routePaths.guest.signup}>Sign up</Link>
            </Button>
          </div>
        </div>
      </div>
    </Suspense>
  )
}
