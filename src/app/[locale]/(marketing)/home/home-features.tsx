import IconBiometric from './images/biometric.svg'
import IconDirectionIntegrate from './images/direction-integrate.svg'
import IconMfa from './images/mfa.svg'
import IconPasswordManagement from './images/password-management.svg'
import IconPushNotifications from './images/push-notification.svg'
import IconTOTP from './images/totp.svg'
import Image from 'next/image'

const FeatureIcon = ({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) => (
  <div className='col-span-6 flex items-center justify-center gap-3 sm:col-span-2'>
    <div className=''>{children}</div>
    <div className='w-[124px] text-[20px] font-[600] text-[#525252]'>
      {title}
    </div>
  </div>
)

export default function HomeFeatures() {
  return (
    <div className='relative z-5 mx-auto max-w-[1730px] bg-white p-[60px]'>
      <div className='text-center'>
        <div className='text-primary text-[30px] font-[700] sm:text-[40px]'>
          Powerful Features to Keep You Secure
        </div>
        <div className='mt-3 text-[24px] font-medium'>
          Effortless security for peace of mind, anytime, anywhere.
        </div>
      </div>
      <div className='mt-10'>
        <div className='grid grid-cols-6 gap-10 gap-y-[113px]'>
          <FeatureIcon title='TOTP Generation'>
            <Image
              src={IconTOTP}
              alt='TOTP Generation'
              width={100}
              height={100}
            />
          </FeatureIcon>
          <FeatureIcon title='Push Notifications'>
            <Image
              src={IconPushNotifications}
              alt='Push Notifications'
              width={100}
              height={100}
            />
          </FeatureIcon>
          <FeatureIcon title='Biometric Lock'>
            <Image
              src={IconBiometric}
              alt='Biometric Lock'
              width={100}
              height={100}
            />
          </FeatureIcon>
        </div>
        <div className='mt-[113px] grid grid-cols-6 gap-10 gap-y-[113px]'>
          <FeatureIcon title='Multifactor authentication'>
            <Image
              src={IconMfa}
              alt='Multifactor authentication'
              width={100}
              height={100}
            />
          </FeatureIcon>
          <FeatureIcon title='Password management'>
            <Image
              src={IconPasswordManagement}
              alt='Password management'
              width={100}
              height={100}
            />
          </FeatureIcon>
          <FeatureIcon title='Directory integration'>
            <Image
              src={IconDirectionIntegrate}
              alt='Directory integration'
              width={100}
              height={100}
            />
          </FeatureIcon>
        </div>
      </div>
    </div>
  )
}
