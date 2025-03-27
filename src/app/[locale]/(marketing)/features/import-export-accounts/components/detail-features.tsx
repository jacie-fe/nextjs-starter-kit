import {
  exportingItems,
  importingItems,
  whyChoosingUsItems,
} from '../constants'
import ImageData from '../images/data.png'
import ImageServer from '../images/image-server.png'
import ImageSmartPhone from '../images/smart-phone.png'
import List from '@/components/static-layout/list'
import SectionLevel from '@/components/static-layout/sectionLevel'
import { Separator } from '@/components/ui/separator'
import Image from 'next/image'

export default function DetailFeatures() {
  return (
    <div className='flex flex-col gap-15'>
      <SectionLevel
        id='effortless-import'
        title='Effortless Import of Accounts'
      >
        <div>
          Migrate from other password managers (CSV files, browser-stored
          credentials, third-party integrations).
        </div>
        <div>
          Bulk import multiple accounts in one step, saving time and effort.
        </div>
        <div>
          Supports major platforms: Chrome, Firefox, Edge, Safari, 1Password,
          LastPass, and more.
        </div>
        <div>
          Smart conflict resolution to detect duplicates and avoid overwriting
          existing data.
        </div>
        <div>AES-256 encryption ensures all imported data remains secure.</div>
      </SectionLevel>

      <SectionLevel
        id='secure-encrypted-export'
        title='Secure & Encrypted Credential Export'
      >
        <div>
          Back up your credentials in an encrypted file for secure storage.
        </div>
        <div>
          Export passwords securely for transferring to another password
          manager.
        </div>
        <div>
          User-controlled encryption – choose to password-protect your exported
          files.
        </div>
        <div>
          Data protection measures to prevent unauthorized access to exported
          files.
        </div>
      </SectionLevel>
      <div className='flex flex-col items-center gap-4 sm:flex-row'>
        <SectionLevel
          id='enterprise-grade-security'
          title='Enterprise-Grade Security for Data Transfers'
        >
          <div>
            End-to-end encryption (AES-256) protects credentials during
            import/export.
          </div>
          <div>
            Zero-knowledge security – your data remains encrypted, even we can’t
            access it.
          </div>
          <div>
            Multi-Factor Authentication (MFA) required before exporting
            credentials for added protection.
          </div>
          <div>
            Auto-delete temporary import/export files after a defined period to
            prevent unauthorized access.
          </div>
        </SectionLevel>
        <div className='shrink-0 grow-0'>
          <Image src={ImageServer} width={187} alt="Enterprise-Grade Security for Data Transfers" />
        </div>
      </div>
      <Separator className='my-4' />

      <SectionLevel title='How it works?' id='how-it-work'>
        <div className='grid grid-cols-2 gap-3'>
          <div className='col-span-2 flex sm:col-span-1'>
            <div>
              <Image src={ImageSmartPhone} width={213} className='m-auto' alt='Importing Credentials' />
              <div className='mt-9 space-y-5'>
                <div className='pl-10 text-2xl font-medium'>
                  Importing Credentials
                </div>
                <div className='space-y-3'>
                  <List items={importingItems} />
                </div>
              </div>
            </div>
            <Separator orientation='vertical' className='hidden sm:block' />
          </div>
          <div className='col-span-2 sm:col-span-1'>
            <Image src={ImageData} width={218} className='m-auto'  alt='Exporting Credentials'/>
            <div className='mt-9 space-y-5'>
              <div className='pl-10 text-2xl font-medium'>
                Exporting Credentials
              </div>
              <div className='space-y-3'>
                <List items={exportingItems} />
              </div>
            </div>
          </div>
        </div>
      </SectionLevel>
      <Separator className='my-4' />

      <SectionLevel
        id='why-choose-us'
        title='Why choose Our Import & Export Feature?'
      >
        <List items={whyChoosingUsItems} />
      </SectionLevel>
    </div>
  )
}
