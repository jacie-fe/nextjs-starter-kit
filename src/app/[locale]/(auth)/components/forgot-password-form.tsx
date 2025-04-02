'use client'

import { ProvideEmailForm } from './forgot-password/provide-email'
import { ResetPasswordForm } from './forgot-password/reset-password-form'
import SuccessScreen from './success-screen'
import useForgotPassword from '../hooks/useForgotPassword'
import { ForgotPasswordData, ForgotPasswordSteps } from '@/types/auth'
import { Button } from '@/components/custom/button'
import Link from 'next/link'
import { routePaths } from '@/lib/routePaths'

export default function ForgotPasswordForm() {
  const {
    currentStep,
    data: forgotPasswordData,
    goToNextStep,
    setData,
  } = useForgotPassword()

  const handleNext = (data: unknown) => {
    setData(data as Partial<ForgotPasswordData>)
    goToNextStep()
  }

  return (
    <>
      <div className='container grid min-h-[calc(100vh-(var(--header-height)+var(--footer-height)))] flex-col items-center justify-center lg:max-w-none lg:px-0'>
        <div className='mx-auto flex w-full flex-col justify-center space-y-2 p-3 sm:w-[480px] lg:p-8'>
          {currentStep === ForgotPasswordSteps.GetStarted && (
            <ProvideEmailForm onNext={handleNext} data={forgotPasswordData} />
          )}
          {currentStep === ForgotPasswordSteps.VerifyOtp && (
            <ResetPasswordForm onNext={handleNext} data={forgotPasswordData} />
          )}
          {currentStep === ForgotPasswordSteps.VerifySuccess && (
            <SuccessScreen
              description='Your password has been updated.'
              title='Password Updated'
            />
          )}

          <div className='text-sm text-center'>
            Already have an account?
            <Button asChild variant='link' className='pl-1'>
              <Link href={routePaths.guest.signin}>Login</Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
