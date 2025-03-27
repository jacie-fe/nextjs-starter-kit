import Image from 'next/image'
import { settingUpItems, whyChoosingUsItems } from '../constants'
import ImageCloud from '../images/cloud.svg'
import ImageRole from '../images/role-based-access-control.png'
import List from '@/components/static-layout/list'
import SectionLevel from '@/components/static-layout/sectionLevel'
import { Separator } from '@/components/ui/separator'

export default function DetailFeatures() {
  return (
    <div className='flex flex-col gap-15'>
      <SectionLevel
        id='automatic-user-synchronization'
        title='Automatic User Synchronization'
      >
        <div>
          Real-time sync between your directory service and authentication
          system.
        </div>
        <div>
          Automatically update user details (name, email, roles) in real-time.
        </div>
        <div>
          Support for multiple directory sources (AD, Azure AD, Okta, LDAP,
          Google Workspace).
        </div>
      </SectionLevel>
      <SectionLevel
        id='automated-user-provisioning'
        title='Automated User Provisioning & Deprovisioning'
      >
        <div>
          Automatically add new employees to the authentication system based on
          directory updates.
        </div>
        <div>Instantly remove access when employees leave or change roles.</div>
        <div>
          Prevent security risks by eliminating orphan accounts and revoking
          unused credentials.
        </div>
      </SectionLevel>
      <SectionLevel
        id='role-based-access-control'
        title='Role-Based Access Control (RBAC)'
      >
        <div className='flex flex-col gap-10 sm:flex-row'>
          <div className='flex max-w-[489px] flex-col gap-6'>
            <div>
              Assign roles and permissions dynamically based on directory
              groups.{' '}
            </div>
            <div>
              Ensure least-privilege access to critical apps and systems.
            </div>
            <div>Custom role mapping for flexible access management.</div>
          </div>
          <Image
            src={ImageRole}
            width={270}
            alt='Role-Based Access Control (RBAC)'
          />
        </div>
      </SectionLevel>
      <SectionLevel
        id='multi-directory'
        title='Multi-Directory Support & Cloud Integration'
      >
        <div className='flex flex-col gap-10 sm:flex-row'>
          <div className='flex max-w-[489px] flex-col gap-6'>
            <div>
              Sync users from multiple directories (hybrid on-prem & cloud).
            </div>
            <div>
              Integrate with cloud providers (AWS, Google Cloud, Microsoft 365).
            </div>
            <div>
              Custom API support for integrating with proprietary directories.
            </div>
          </div>
          <Image
            src={ImageCloud}
            width={251}
            height={173}
            alt='Multi-Directory Support & Cloud Integration'
          />
        </div>
      </SectionLevel>
      <SectionLevel
        id='sso-integration'
        title='Single Sign-On (SSO) Integration'
      >
        <div>
          Enable SSO with directory authentication for seamless user experience.
        </div>
        <div>Supports SAML, OAuth, and OpenID Connect protocols.</div>
        <div>
          Reduce password fatigue & enhance security with unified login.
        </div>
      </SectionLevel>
      <Separator className='my-4' />

      <SectionLevel id='setting-up' title='Setting up directory integration'>
        {settingUpItems.map((item: { text?: string; title: string }, idx) => (
          <div className='flex items-center gap-[12px]' key={idx}>
            <div className='flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#69c0ff33] text-xs font-bold text-[#69C0FF]'>
              {idx + 1}
            </div>
            <div className='space-y-2'>
              <span className='text-lg font-bold'>{item.title}</span>
              <span className='ml-1'>{item.text}</span>
            </div>
          </div>
        ))}
      </SectionLevel>
      <Separator className='my-4' />

      <SectionLevel
        id='why-choose-us'
        title='Why Choose Our Directory Integration?'
      >
        <List items={whyChoosingUsItems} />
      </SectionLevel>
    </div>
  )
}
