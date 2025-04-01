"use client"

import { useMemo } from 'react'

import { Progress } from '@/components/ui/progress'
import { cn } from '@/lib/utils'
import { CheckIcon } from 'lucide-react'
import { SignupSteps } from '@/types/auth'

const StepNumber = ({
  title,
  step,
  currentStep,
}: {
  title?: string
  step: number
  currentStep: number
}) => {
  const isActive = currentStep === step
  const isCompleted = currentStep > step
  return (
    <div className='relative'>
      {step === 1 && (
        <div
          className={cn('absolute top-0 left-0 h-full w-1/2 bg-white')}
        ></div>
      )}
      <div className='relative z-10 flex flex-col items-center'>
        <div className='bg-white p-1'>
          <div
            className={cn(
              'z-10 flex h-6 w-6 items-center justify-center rounded-full bg-[#c0c0c0] text-xs text-white',
              isCompleted && 'bg-green-600',
              isActive && 'bg-blue-600'
            )}
          >
            {isCompleted ? <CheckIcon /> : step}
          </div>
        </div>
      </div>
      {step === 3 && (
        <div
          className={cn('absolute top-0 right-0 h-full w-1/2 bg-white')}
        ></div>
      )}
      <div className='relative z-10 mt-2'>{title}</div>
    </div>
  )
}

const SignupProgressBar = ({ currentStep }: { currentStep: SignupSteps }) => {
  const progress = useMemo(() => {
    if (currentStep === SignupSteps.SetupAccount) return 0
    if (currentStep === SignupSteps.SetPassword) return 50
    if (currentStep === SignupSteps.VerifyEmail) return 100
  }, [currentStep])

  const currentStepNumber = useMemo(() => {
    if (currentStep === SignupSteps.SetupAccount) return 1
    if (currentStep === SignupSteps.SetPassword) return 2
    if (currentStep === SignupSteps.VerifyEmail) return 3
    return 1
  }, [currentStep])
  return (
    <div>
      <Progress value={progress} className='h-1' />
      <div className='relative mt-[-20px] flex h-16 justify-between'>
        <StepNumber
          currentStep={currentStepNumber}
          step={1}
          title='Set up account'
        />
        <StepNumber
          currentStep={currentStepNumber}
          step={2}
          title='Set password'
        />
        <StepNumber
          currentStep={currentStepNumber}
          step={3}
          title='Verify email'
        />
      </div>
    </div>
  )
}

export default SignupProgressBar
