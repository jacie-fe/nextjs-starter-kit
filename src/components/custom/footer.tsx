import { ImgHTMLAttributes } from 'react'

import Link from 'next/link'
import Image from 'next/image'
import GetAppAndroid from '@/assets/get-app-android.svg'
import GetAppIos from '@/assets/get-app-ios.svg'
import { cn } from '@/lib/utils'
import { Gitlab, Linkedin, Twitter } from 'lucide-react'
export default function Footer({ className, ...props }: ImgHTMLAttributes<HTMLImageElement>) {
  const iosAppLink = process.env.VITE_IOS_APP_STORE_URL || ''
  const androidAppLink = process.env.VITE_ANDROID_PLAY_STORE_URL || ''

  const footerItems = [
    {
      title: 'Authenticator',
      links: [
        { title: 'Home', href: '#' },
        { title: 'Features', href: '#' },
        { title: 'Products', href: '#' },
        { title: 'Docs', href: '#' },
      ],
    },
    {
      title: 'Features',
      links: [
        { title: 'Password manager', href: '#' },
        { title: 'Import & export account', href: '#' },
        { title: 'Directory integration', href: '#' },
        { title: 'Multi-factor authentication', href: '#' },
      ],
    },
    {
      title: 'Docs',
      links: [
        { title: 'Quick guide', href: '#' },
        { title: 'Integration docs', href: '#' },
      ],
    },
    {
      title: 'Support',
      links: [
        { title: 'Community', href: '#' },
        { title: 'Support', href: '#' },
        { title: 'Help', href: '#' },
        { title: 'FAQs', href: '#' },
      ],
    },
    {
      title: 'Company',
      links: [
        { title: 'About Us', href: '#' },
        { title: 'Careers', href: '#' },
        { title: 'Contact Us', href: '#' },
      ],
    },
  ]

  return (
    <footer
      className={cn(
        'w-full bg-[linear-gradient(180deg,_#003176_0%,_#033A88_100%)] p-6 md:py-12 dark:bg-gray-800',
        className
      )}
      {...props}
    >
      <div className='container mx-auto grid max-w-7xl grid-cols-2 gap-8 text-sm sm:grid-cols-3 md:grid-cols-5 xl:grid-cols-6'>
        {footerItems.map((item) => (
          <div className='grid gap-1' key={item.title}>
            <h3 className='font-semibold text-[#69C0FF]'>{item.title}</h3>
            {item.links.map((link) => (
              <Link className='text-white' href={link.href} key={link.title}>
                {link.title}
              </Link>
            ))}
          </div>
        ))}

        <div className='grid gap-1'>
          <h3 className='font-semibold text-[#69C0FF]'>Get Authen</h3>
          <div className='flex flex-col gap-2'>
            <Link href={iosAppLink} target='_blank'>
              <Image src={GetAppIos} alt='GetAppIos'width={120} />
            </Link>
            <Link href={androidAppLink} target='_blank'>
              <Image src={GetAppAndroid} alt='GetAppAndroid' width={120} />
            </Link>
          </div>
        </div>
      </div>
      <div className='container mx-auto mt-8 flex max-w-7xl flex-col items-center justify-between text-[#69C0FF] sm:flex-row'>
        <div className='flex items-center space-x-4'>
          <Link
            href='#'
            className='hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50'
          >
            <Twitter className='h-5 w-5' />
            <span className='sr-only'>Twitter</span>
          </Link>
          <Link
            href='#'
            className='hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50'
          >
            <Gitlab className='h-5 w-5' />
            <span className='sr-only'>GitHub</span>
          </Link>
          <Link
            href='#'
            className='hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50'
          >
            <Linkedin className='h-5 w-5' />
            <span className='sr-only'>LinkedIn</span>
          </Link>
        </div>
      </div>
    </footer>
  )
}
