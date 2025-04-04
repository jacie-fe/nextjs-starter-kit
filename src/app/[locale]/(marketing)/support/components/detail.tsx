import { Button } from '@/components/custom/button'
import { processFaqs, productFaqs } from '../constants'
import SectionLevel from '@/components/static-layout/sectionLevel'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import { Heart, MessageCircleIcon } from 'lucide-react'

export const FaqItem = ({
  text,
  title,
  number,
  className,
}: {
  text: string
  title: string
  number: number
  className?: string
}) => (
  <div className={cn('', className)}>
    <div className={cn('flex max-w-[765px] gap-[12px]')}>
      <div className='mt-4 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#69c0ff33] text-xs font-bold text-[#69C0FF]'>
        {number}
      </div>
      <AccordionItem value={number?.toString()} className='flex-1'>
        <AccordionTrigger>{title}</AccordionTrigger>
        <AccordionContent>
          {text === 'resetPassword' ? <ResetPasswordStep /> : text}
        </AccordionContent>
      </AccordionItem>
    </div>
  </div>
)

const ResetPasswordStep = () => {
  return (
    <>
      <p>
        If you’re unable to access your eAuthenticator app and need to reset
        your password, follow these steps to regain access to your account:
      </p>
      <ol className='mt-3 list-decimal space-y-4 pl-6 marker:font-medium'>
        <li>
          Go to the <strong>Password Reset Page</strong>: On the login page,
          click the <strong>Forgot Password</strong> link.
        </li>
        <li>
          <strong>Enter Your Account Information</strong>: Provide your
          registered email address or username to initiate the password reset
          process.
        </li>
        <li>
          <strong>Verify Your Identity</strong>: A one-time verification code
          will be sent to your registered email address. Enter this code to
          confirm your identity.
        </li>
        <li>
          <strong>Reset Your Password</strong>: Once you’ve successfully
          verified your identity, you will be prompted to enter a new password.
          Choose a strong password that is different from previous ones.
        </li>
      </ol>
    </>
  )
}

export default function Detail() {
  return (
    <div className='flex flex-col gap-15'>
      <SectionLevel title='Product FAQs' id='product-faqs'>
        <div>
          <Accordion type='single' collapsible className='w-full'>
            {productFaqs.map((item, index) => (
              <FaqItem
                key={index}
                text={item.text}
                title={item.title}
                number={index + 1}
              />
            ))}
          </Accordion>
        </div>
      </SectionLevel>
      <SectionLevel title='Process FAQs' id='process-faqs'>
        <div>
          <Accordion type='single' collapsible className='w-full'>
            {processFaqs.map((item, index) => (
              <FaqItem
                key={index}
                text={item.text}
                title={item.title}
                number={index + 1}
              />
            ))}
          </Accordion>
        </div>
      </SectionLevel>
      <Separator />
      <div>
        <div className='document-heading' id='contact-us'>
          Contact Us
        </div>
        <div className='flex flex-col gap-6 sm:flex-row'>
          <div>
            Real support from real people. We’re available through instant live
            chat and email to help you set up and troubleshoot.
          </div>
          <div className='flex w-full gap-2 sm:w-[260px] flex-col'>
            <Button className='w-full justify-between'>
              Livechat 24/7
              <MessageCircleIcon />
            </Button>
            <Button className='w-full justify-between'>
              support@authen.com
              <Heart className='ml-2' />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
