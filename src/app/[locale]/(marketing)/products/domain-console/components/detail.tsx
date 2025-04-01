import Image from 'next/image'
import { policyConfigItems, whyChoosingUsItems } from '../constants'
import ImageConsole from '../images/console.png'
import ImageMockupChart from '../images/mockup-chart.png'
import ImageSmartPhone from '../images/smart-phone.png'
import ImageUsers from '../images/users.png'
import List from '@/components/static-layout/list'
import SectionLevel from '@/components/static-layout/sectionLevel'

export default function Detail() {
  return (
    <div className='flex flex-col gap-15'>
      <SectionLevel
        id='centralized-domain-management'
        title='Centralized Domain Management'
      >
        <div>
          Manage and configure all your domains in a centralized location. You
          can add new domains, update existing ones, and delete domains that are
          no longer in use. This section also provides an overview of each
          domain’s status and associated authentication configurations.
        </div>
        <div>
          <Image src={ImageConsole} alt='Centralized Domain Management' />
        </div>
      </SectionLevel>
      <SectionLevel
        id='authentication-policy-configuration'
        title='Authentication Policy Configuration'
      >
        <div>
          Here you can configure and enforce security policies for each domain.
          Policies include settings for Single Sign-On (SSO), Two-Factor
          Authentication (2FA), password strength, and more.
        </div>
        <div className='flex flex-col gap-4'>
          <List items={policyConfigItems} itemClassName='max-w-[765px]' />
        </div>
      </SectionLevel>
      <SectionLevel
        id='user-management'
        title='User Management & Role Assignment'
      >
        <div>
          View and manage all user accounts associated with each domain.
          Administrators can search for specific accounts, reset passwords, and
          assign authentication roles.
        </div>
        <div>
          <Image alt='User Management & Role Assignment' src={ImageUsers} />
        </div>
      </SectionLevel>
      <SectionLevel
        id='logs-and-activity-monitoring'
        title='Logs and Activity Monitoring'
      >
        <div className='flex flex-col gap-4'>
          <List items={policyConfigItems} itemClassName='max-w-[765px]' />
        </div>
        <div>
          <Image alt='Logs and Activity Monitoring' src={ImageMockupChart} width={634} />
        </div>
      </SectionLevel>
      <SectionLevel id='alerts-notifications' title='Alerts & Notifications'>
        <div className='flex flex-col gap-10 sm:flex-row'>
          <div className='flex max-w-[489px] flex-col gap-6'>
            <div>
              Receive emails or SMS notifications for important events like
              policy changes, account lockouts, and suspicious login activities.
            </div>
            <div>
              Set thresholds for alerts (e.g., too many failed login attempts
              within a short timeframe) to proactively address security
              concerns.
            </div>
          </div>
          <div>
            <Image alt='Alerts & Notifications' src={ImageSmartPhone} width={114} />
          </div>
        </div>
      </SectionLevel>

      <SectionLevel id='why-choose-us' title='Why Choose the Domain Console?'>
        <List items={whyChoosingUsItems} itemClassName='max-w-[765px]' />
      </SectionLevel>
    </div>
  )
}
