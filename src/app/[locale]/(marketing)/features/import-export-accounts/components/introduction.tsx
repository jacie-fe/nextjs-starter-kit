import Image from 'next/image'
import ImageIntro from '../images/image-intro.png'
import SectionLevel from '@/components/static-layout/sectionLevel'

export default function Introduction() {
  return (
    <div
      className='flex flex-col gap-4 space-y-4 sm:flex-row'
      id='introduction'
    >
      <SectionLevel title='Secure & Effortless Credential Transfer'>
        <div>
          Seamlessly transfer your credentials across platforms. With our Import
          & Export Accounts feature, you can securely transfer your saved
          logins, passwords, and authentication data with just a few clicks.
          Whether switching from another password manager, backing up
          credentials, or setting up a new device, the process remains
          effortless and secure.
        </div>
        <div className='text-xl font-medium sm:text-2xl'>
          <p>No more manual data entry</p>
          <p>Enjoy a smooth and encrypted migration process!</p>
        </div>
      </SectionLevel>
      <div className='shrink-0 grow-0'>
        <Image src={ImageIntro} width={270} alt='Secure & Effortless Credential Transfer' />
      </div>
    </div>
  )
}
