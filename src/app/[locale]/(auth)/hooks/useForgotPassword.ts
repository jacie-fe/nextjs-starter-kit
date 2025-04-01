"use client"

import { useState } from 'react'

import { ForgotPasswordSteps, ForgotPasswordData } from '@/types/auth'

type UseForgotPasswordHook = {
  currentStep: ForgotPasswordSteps
  data: ForgotPasswordData
  goToNextStep: () => void
  setData: (data: Partial<ForgotPasswordData>) => void
}

const useForgotPassword = (): UseForgotPasswordHook => {
  // Initializing state for current step and form data
  const [currentStep, setCurrentStep] = useState<ForgotPasswordSteps>(
    ForgotPasswordSteps.GetStarted
  )
  const [data, setData] = useState<ForgotPasswordData>({})

  // Move to the next step
  const goToNextStep = () => {
    switch (currentStep) {
      case ForgotPasswordSteps.GetStarted:
        setCurrentStep(ForgotPasswordSteps.VerifyOtp)
        break
      case ForgotPasswordSteps.VerifyOtp:
        setCurrentStep(ForgotPasswordSteps.VerifySuccess)
        break
      default:
        break
    }
  }

  // Update data for the specific step
  const handleSetData = (newData: Partial<ForgotPasswordData>) => {
    setData((prevData: ForgotPasswordData) => ({
      ...prevData,
      ...newData,
    }))
  }

  return {
    currentStep,
    data,
    goToNextStep,
    setData: handleSetData,
  }
}

export default useForgotPassword
