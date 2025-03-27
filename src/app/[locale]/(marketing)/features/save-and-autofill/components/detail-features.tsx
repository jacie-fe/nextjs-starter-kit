import ImageDevice from '../images/image-device.png'
import ImageSecure from '../images/image-secure.png'
import List from '@/components/static-layout/list'
import SectionLevel from '@/components/static-layout/sectionLevel'
import { Separator } from '@/components/ui/separator'
import Image from 'next/image'

export default function DetailFeatures() {
  const whyChoosingUsItems = [
    {
      title: 'Lightning-Fast Logins',
      text: 'Say goodbye to manually typing passwords manually.',
    },
    {
      title: 'Maximum Security',
      text: 'Fully encrypted storage with MFA protection.',
    },
    {
      title: 'Universal Compatibility',
      text: 'Compatible with across all devices, browsers, and platforms.',
    },
    {
      title: 'User-Friendly & Seamless',
      text: 'Designed for effortless password management.',
    },
    {
      title: 'Protects Against Cyber Threats',
      text: 'Eliminates phishing and keylogging risks.',
    },
    {
      title: 'Perfect for Individuals & Businesses',
      text: 'Ideal for both personal use and enterprise security.',
    },
  ]
  return (
    <div className='flex flex-col gap-15'>
      <div className='flex flex-col gap-4 sm:flex-row'>
        <SectionLevel
          id='automatically-save-credentials'
          title='Automatically save credentials'
        >
          <div>
            Save your login credentials automatically as you enter them.
          </div>
          <div>
            Supports saving usernames, passwords, payment details, and secure
            notes.
          </div>
          <div>
            Cloud backup prevents data loss and allows multi-device access.
          </div>
        </SectionLevel>
        <div className='grow-0'>
          <Image src={ImageSecure} className='w-[185px]' alt='Automatically save credentials' />
        </div>
      </div>

      <SectionLevel
        id='one-click-autofill'
        title='One-Click Autofill for Instant Access'
      >
        <div>
          Autofill usernames and passwords instantly on websites and apps.
        </div>
        <div>
          Works seamlessly across browsers (Chrome, Edge, Firefox, Safari) and
          mobile apps.
        </div>
        <div>
          Supports multi-page logins, custom fields, and complex authentication
          forms.
        </div>
      </SectionLevel>
      <SectionLevel
        id='end-to-end-encryption'
        title='End-to-End Encryption & Security'
      >
        <div>
          Your saved credentials are stored in a zero-knowledge encrypted vault,
          ensuring that only you can access them.
        </div>
        <div>
          Prevents phishing attacks by ensuring credentials are autofilled only
          on trusted websites.
        </div>
        <div>
          Protects against keyloggers and brute-force attacks by eliminating the
          need to manually enter passwords.
        </div>
      </SectionLevel>
      <SectionLevel id='passwordless-login' title='Passwordless login'>
        <div>Access your account without remembering a master password.</div>
        <div>
          Use biometric authentication (Fingerprint, Face ID) or a hardware key
          for seamless, secure access.
        </div>
      </SectionLevel>
      <SectionLevel id='easy-import-export' title='Easy Import & Export'>
        <div>
          Import credentials from browsers, other password managers, or CSV
          files.
        </div>
        <div>
          Securely export passwords for backup with encryption to prevent
          unauthorized access.
        </div>
        <div>
          Hassle-free migration from other services, keeping all your
          credentials safe.
        </div>
      </SectionLevel>
      <Separator className='my-4' />

      <SectionLevel
        title='Cross-Platform & Multi-Device Compatibility'
        id='cross-and-multi'
      >
        <div className='flex flex-col gap-4 sm:flex-row'>
          <div className='max-w-[510px] space-y-4'>
            <div>
              Sync & Autofill across Windows, macOS, iOS, Android, and major
              browsers.
            </div>
            <div>
              Works on mobile apps, desktop software, and web applications.
            </div>
            <div>
              Offline access support, allowing you to access stored credentials
              even without an internet connection.
            </div>
          </div>
          <Image src={ImageDevice} width={192} alt='Cross-Platform & Multi-Device Compatibility' />
        </div>
      </SectionLevel>
      <Separator className='my-4' />

      <SectionLevel
        id='why-choose-us'
        title='Why Choose Our Save & Autofill Feature?'
      >
        <List items={whyChoosingUsItems} />
      </SectionLevel>
    </div>
  )
}
