import { useState } from 'react'

import { SignupSteps, SignupData } from '@/types/auth'

type UseSignupHook = {
  currentStep: SignupSteps
  data: SignupData
  goToNextStep: () => void
  goToPrevStep: () => void
  setData: (data: Partial<SignupData>) => void
}

export const useSignup = (): UseSignupHook => {
  // Initializing state for current step and form data
  const [currentStep, setCurrentStep] = useState<SignupSteps>(
    SignupSteps.GetStarted
  )
  const [data, setData] = useState<SignupData>({})

  // Move to the next step
  const goToNextStep = () => {
    switch (currentStep) {
      case SignupSteps.GetStarted:
        setCurrentStep(SignupSteps.SetupAccount)
        break
      case SignupSteps.SetupAccount:
        setCurrentStep(SignupSteps.SetPassword)
        break
      case SignupSteps.SetPassword:
        setCurrentStep(SignupSteps.VerifyEmail)
        break
      case SignupSteps.VerifyEmail:
        setCurrentStep(SignupSteps.VerifySuccess)
        break
      default:
        break
    }
  }

  // Move to the previous step
  const goToPrevStep = () => {
    switch (currentStep) {
      case SignupSteps.SetPassword:
        setCurrentStep(SignupSteps.SetupAccount)
        break
      case SignupSteps.VerifyEmail:
        setCurrentStep(SignupSteps.SetPassword)
        break
      default:
        break
    }
  }

  // Update data for the specific step
  const handleSetData = (newData: Partial<SignupData>) => {
    setData((prevData: SignupData) => ({
      ...prevData,
      ...newData,
    }))
  }

  return {
    currentStep,
    data,
    goToNextStep,
    goToPrevStep,
    setData: handleSetData,
  }
}

// export default useSignup
