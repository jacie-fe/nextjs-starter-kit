import Link from 'next/link'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { routePaths } from '@/lib/routePaths'
import { SigninForm } from '../components/sign-in-form'

export default function SignIn() {
  return (
    <>
      <div className='container grid min-h-[calc(100vh-(var(--header-height)+var(--footer-height)))] flex-col items-center justify-center lg:max-w-none lg:px-0'>
        <div className='mx-auto flex w-full flex-col justify-center space-y-2 p-3 sm:w-[480px] lg:p-8'>
          {/* <div className='mb-4 flex items-center justify-center gap-2'>
            <img
              src='images/logo.svg'
              className='relative h-12 w-12'
              width={50}
              height={50}
              alt='Vite'
            />
            <h1 className='text-xl font-medium'>eAuthenticator</h1>
          </div> */}
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
          <div className='text-sm text-center'>
            Don’t have an account?
            <Button asChild variant='link' className='pl-1'>
              <Link href={routePaths.guest.signup}>Sign up</Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
