'use client'

import { Button } from '@/components/custom/button'
import { SetPasswordForm } from '../components/sign-up/set-password-form'
import { SetupAccountForm } from '../components/sign-up/setup-account-form'
import { SetupEmailForm } from '../components/sign-up/setup-email'
import SignupProgressBar from '../components/sign-up/sign-up-progress-bar'
import { VerifyOtpForm } from '../components/sign-up/verify-otp-form'
import SuccessScreen from '../components/success-screen'
import { useSignup } from '../hooks/useSignup'
import { SignupData, SignupSteps } from '@/types/auth'
import Link from 'next/link'
import { routePaths } from '@/lib/routePaths'

export default function SignUpForm() {
  const { currentStep, data: signupData, goToNextStep, setData } = useSignup()

  const handleSignupSuccess = () => {
    goToNextStep()
  }

  const handleNext = (data: unknown) => {
    setData(data as Partial<SignupData>)
    goToNextStep()
  }

  const renderStep = () => {
    switch (currentStep) {
      case SignupSteps.GetStarted:
        return <SetupEmailForm onNext={handleNext} data={signupData} />
      case SignupSteps.SetupAccount:
        return <SetupAccountForm onNext={handleNext} data={signupData} />
      case SignupSteps.SetPassword:
        return <SetPasswordForm onNext={handleNext} data={signupData} />
      case SignupSteps.VerifyEmail:
        return (
          <VerifyOtpForm
            email={signupData.email!}
            onNext={handleSignupSuccess}
          />
        )
      case SignupSteps.VerifySuccess:
        return (
          <SuccessScreen
            description='Your account has been successfully created.'
            title='Congratulations'
          />
        )
      default:
        return null
    }
  }

  return (
    <>
      <div className='container grid min-h-[calc(100vh-(var(--header-height)+var(--footer-height)))] flex-col items-center lg:max-w-none lg:px-0'>
        <div className='mx-auto flex w-full flex-col justify-center space-y-2 p-3 sm:w-[480px] lg:p-8'>
          <div>
            {currentStep !== SignupSteps.GetStarted &&
              currentStep !== SignupSteps.VerifySuccess && (
                <div className='my-10'>
                  <SignupProgressBar currentStep={currentStep} />
                </div>
              )}
            {renderStep()}

            <div className='text-sm text-center'>
              Already have an account?
              <Button asChild variant='link' className='pl-1'>
                <Link href={routePaths.guest.signin}>Login</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
