import { CheckCircledIcon } from '@radix-ui/react-icons'
import { Link } from 'react-router-dom'

import { Button } from '@/components/custom/button'
import { Card, CardHeader, CardTitle } from '@/components/ui/card'
import { routePaths } from '@/constants/routePaths'

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
          <CheckCircledIcon
            width={80}
            height={80}
            className='text-primary m-auto'
          />
        </CardTitle>
      </CardHeader>
      <div className='my-8'>
        <div className='text-center'>{description}</div>
      </div>
      <div className='flex justify-center'>
        <Button asChild className='w-[200px]'>
          <Link to={routePaths.guest.signin}>Login</Link>
        </Button>
      </div>
    </Card>
  )
}

export default SuccessScreen
