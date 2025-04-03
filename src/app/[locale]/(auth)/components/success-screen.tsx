"use client"

import { Button } from '@/components/custom/button'
import { Card, CardHeader, CardTitle } from '@/components/ui/card'
import { routePaths } from '@/lib/routePaths'
import { CheckCircle } from 'lucide-react'
import Link from 'next/link'
interface SuccessScreenProps {
  title: string
  description: string
}

const SuccessScreen = ({ title, description }: SuccessScreenProps) => {
  return (
    <Card className='mt-5 p-6 pb-10'>
      <CardHeader className='px-0'>
        <CardTitle className='space-y-10 text-center text-2xl font-semibold tracking-tight'>
          <h3 className='text-2xl font-semibold'>{title}</h3>
          <CheckCircle
            width={80}
            height={80}
            className='text-primary m-auto'
          />
        </CardTitle>
      </CardHeader>
      <div className='my-6'>
        <div className='text-center'>{description}</div>
      </div>
      <div className='flex justify-center'>
        <Button asChild className='w-[200px]'>
          <Link href={routePaths.guest.signin}>Login</Link>
        </Button>
      </div>
    </Card>
  )
}

export default SuccessScreen
