import Image from 'next/image'
import ImageGeneratePass from '../images/image-generate-pass.png'
import ImageSecure from '../images/image-secure.png'
import ImageWindow from '../images/image-window.png'
import List from '@/components/static-layout/list'
import SectionLevel from '@/components/static-layout/sectionLevel'
import { Separator } from '@/components/ui/separator'

export default function DetailFeatures() {
  const importPassItems = [
    {
      title: 'Import credentials',
      text: 'Import credentials from browsers or third-party password managers (CSV files, integrations).',
    },
    {
      title: 'Secure password export',
      text: 'Secure password export options for backup (with encryption and security warnings).',
    },
    {
      title: 'Hassle-free',
      text: 'Hassle-free migration from other password managers.',
    },
  ]

  const whyChoosingUsItems = [
    {
      title: 'End-to-End Encryption',
      text: 'Your data is protected at all times.',
    },
    {
      title: 'Cross-Platform Support',
      text: 'Compatible with Windows, macOS, iOS, Android, and major browsers.',
    },
    {
      title: 'User-Friendly & Seamless',
      text: 'Designed for ease of use without compromising security.',
    },
    {
      title: 'Enterprise-Grade Security',
      text: 'Built for individuals, teams, and businesses.',
    },
  ]
  return (
    <div className='flex flex-col gap-15'>
      <div className='flex flex-col gap-4 sm:flex-row'>
        <SectionLevel
          id='secure-password-storage'
          title='Secure Password Storage'
        >
          Store all your credentials in an encrypted Password Vault, ensuring
          only you can access them. Your data is protected with zero-knowledge
          encryption, meaning even we can’t see your passwords.
        </SectionLevel>
        <Image src={ImageSecure} width={251} alt='Secure Password Storage' />
      </div>

      <SectionLevel
        id='master-password-protection'
        title='Master Password Protection'
      >
        Your Master Password is the key to accessing your vault. We enforce
        strong password policies and provide account recovery options while
        keeping your credentials secure.
      </SectionLevel>
      <SectionLevel
        id='import-export-passwords'
        title='Import & Export Passwords'
      >
        <div className='flex flex-col gap-8 sm:flex-row'>
          <Image src={ImageWindow} width={251} alt='Import & Export Passwords'/>
          <div className='flex flex-col gap-4'>
            <List items={importPassItems} />
          </div>
        </div>
      </SectionLevel>
      <SectionLevel id='password-generator' title='Password Generator'>
        <div className='flex flex-col gap-10 sm:flex-row'>
          <div className='flex flex-col gap-6'>
            <div>
              Generate random, strong passwords with customizable options:
            </div>
            <ul className='list-disc pl-6'>
              <li>Length customization</li>
              <li>Uppercase, lowercase, numbers, and special characters</li>
            </ul>
            <div>One-click password creation for stronger security.</div>
          </div>
          <Image src={ImageGeneratePass} width={184} alt='Password Generator'/>
        </div>
      </SectionLevel>
      <SectionLevel
        id='security-check-alerts'
        title='Security check and alerts'
      >
        <div>Identify weak, reused, or compromised passwords.</div>
        <div>
          Receive alerts if your credentials are found in data breaches or on
          the dark web.
        </div>
        <div>Get proactive recommendations to improve security.</div>
      </SectionLevel>
      <SectionLevel id='passwordless-login' title='Passwordless login'>
        <div>Access your account without remembering a master password.</div>
        <div>
          Use biometric authentication (Fingerprint, Face ID) or a hardware key
          for easy, secure access.
        </div>
      </SectionLevel>
      <SectionLevel
        id='secure-password-sharing'
        title='Secure password sharing'
      >
        <div>
          Share credentials securely with team members or family without
          revealing the actual password.
        </div>
        <div>Set view, edit, or time-limited access for enhanced security.</div>
      </SectionLevel>
      <Separator className='my-4' />

      <SectionLevel
        id='why-choose-us'
        title='Why Choose Our Password Management?'
      >
        <List items={whyChoosingUsItems} />
      </SectionLevel>
    </div>
  )
}
