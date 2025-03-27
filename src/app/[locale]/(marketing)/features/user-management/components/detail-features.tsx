import Image from 'next/image'
import { manageUsersItems, whyChoosingUsItems } from '../constants'
import ImageFace from '../images/image-face.png'
import ImageSecure from '../images/image-secure.png'
import List from '@/components/static-layout/list'
import SectionLevel from '@/components/static-layout/sectionLevel'
import { Separator } from '@/components/ui/separator'

export default function DetailFeatures() {
  return (
    <div className='flex flex-col gap-15'>
      <SectionLevel
        id='centralized-user-dashboard'
        title='Centralized User Dashboard'
      >
        <div className='flex flex-col gap-10 sm:flex-row'>
          <div className='flex max-w-[489px] flex-col gap-6'>
            <div>
              View and manage all users from a single, unified interface.
            </div>
            <div>Quick search & filtering to find users instantly. </div>
            <div>Bulk user actions (activate, deactivate, update roles).</div>
            <div>
              Real-time user status (active, suspended, pending approval).
            </div>
          </div>
          <div>
            <Image alt='Centralized User Dashboard' src={ImageSecure} width={268} className='shrink-0 grow-0' />
          </div>
        </div>
      </SectionLevel>
      <SectionLevel
        id='mfa-enforcement'
        title='Multi-Factor Authentication (MFA) Enforcement'
      >
        <div className='flex flex-col gap-10 sm:flex-row'>
          <div className='flex max-w-[489px] flex-col gap-6'>
            <div>Require MFA for specific roles or all users. </div>
            <div>
              Adaptive authentication enhances security for sensitive access.
            </div>
            <div>
              One-tap push notifications, biometrics, or OTPs for secure login.{' '}
            </div>
          </div>
          <div>
            <Image alt='Multi-Factor Authentication (MFA) Enforcement' src={ImageFace} width={182} className='shrink-0 grow-0' />
          </div>
        </div>
      </SectionLevel>
      <SectionLevel
        id='real-time-user-activity'
        title='Real-Time User Activity Monitoring & Audit Logs'
      >
        <div>Track login attempts & session history.</div>
        <div>Monitor user activities for security compliance. </div>
        <div>
          Generate detailed audit logs for compliance (GDPR, SOC 2, ISO 27001).
        </div>
        <div>
          Instant alerts for suspicious activities (failed logins, unusual
          access locations).
        </div>
      </SectionLevel>
      <Separator className='my-4' />

      <SectionLevel id='managing-user' title='Managing Users in 3 Simple Steps'>
        <List items={manageUsersItems} />
      </SectionLevel>
      <Separator className='my-4' />

      <SectionLevel
        id='why-choose-us'
        title='Why Choose Our User Management System?'
      >
        <List items={whyChoosingUsItems} />
      </SectionLevel>
    </div>
  )
}
