import { QRCodeSVG } from 'qrcode.react'
import Link from 'next/link'
import Image from 'next/image'

import AndroidIcon from './images/android.svg'
import IosIcon from './images/ios.svg'

export default function DownloadApp() {
  const iosAppLink = process.env.VITE_IOS_APP_STORE_URL || ''
  const androidAppLink = process.env.VITE_ANDROID_PLAY_STORE_URL || ''
  return (
    <div className=''>
      <div className='mx-auto max-w-[910px] px-3 py-10'>
        <div className='text-center'>
          <div className='text-primary text-[30px] font-[700] sm:text-[40px]'>
            Download the app now!
          </div>
          <div className='mt-3 text-[24px] font-medium'>
            Scan the QR code with your device
          </div>
        </div>
        <div className='mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-evenly'>
          <div className='flex flex-col items-center justify-center gap-5'>
            <div className='flex items-center gap-3 text-[40px] font-bold'>
              <Image src={IosIcon} alt='iOS' />
              iOS
            </div>
            <QRCodeSVG width={254} height={254} value={iosAppLink} />
            <Link href={iosAppLink} target='_blank' className='text-blue-600'>
              Get the app
            </Link>
          </div>
          <div className='flex flex-col items-center justify-center gap-5'>
            <div className='flex items-center gap-3 text-[40px] font-bold'>
              <Image src={AndroidIcon} alt='Android' />
              Android
            </div>

            <QRCodeSVG width={254} height={254} value={androidAppLink} />
            <Link href={androidAppLink} target='_blank' className='text-blue-600'>
              Get the app
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
