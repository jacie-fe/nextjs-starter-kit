import Image from 'next/image'
import { authMethodsItems, settingUpItems, BenefitsItems } from '../constants'
import ImageMethod from '../images/image-methods.png'
import ImagePocilies from '../images/image-policies.png'
import List from '@/components/static-layout/list'
import SectionLevel from '@/components/static-layout/sectionLevel'
import { Separator } from '@/components/ui/separator'

export default function DetailFeatures() {
  return (
    <div className='flex flex-col gap-15'>
      <SectionLevel
        id='multiple-authentication-methods'
        title='Multiple Authentication Methods'
      >
        <div className='flex flex-col gap-10 sm:flex-row'>
          <div className='flex flex-col gap-4'>
            <List items={authMethodsItems} />
          </div>
          <Image alt='Multiple Authentication Methods' src={ImageMethod} width={204} />
        </div>
      </SectionLevel>
      <SectionLevel
        id='adaptive-authentication'
        title='Adaptive Authentication for Smart Security'
      >
        <div>
          Detects risk factors (new device, unusual location, multiple failed
          attempts).
        </div>
        <div>
          Dynamically adjusts security levels – Adds extra authentication layers
          if risk is detected.{' '}
        </div>
        <div>
          Reduces friction – Only prompts MFA when necessary for a smooth user
          experience.
        </div>
      </SectionLevel>
      <SectionLevel
        id='customizable-security'
        title='Customizable Security Policies'
      >
        <div className='flex flex-col gap-10 sm:flex-row'>
          <div className='flex max-w-[489px] flex-col gap-6'>
            <div>
              Set different MFA requirements based on user roles, devices, or
              locations.
            </div>
            <div>
              Whitelist trusted networks to reduce unnecessary authentication
              prompts.
            </div>
            <div>
              Define session timeouts & re-authentication rules for critical
              systems.
            </div>
          </div>
          <Image alt='Customizable Security Policies' src={ImagePocilies} width={136} />
        </div>
      </SectionLevel>
      <Separator className='my-4' />

      <SectionLevel id='setting-up' title='Setting Up MFA in 3 Simple Steps'>
        <List items={settingUpItems} />
      </SectionLevel>
      <Separator className='my-4' />

      <SectionLevel
        id='benefits'
        title='Benefits of Multi-factor authentication'
      >
        <List items={BenefitsItems} />
      </SectionLevel>
    </div>
  )
}
