import { ImgHTMLAttributes } from 'react'

import Link from 'next/link'
import Logo from '@/assets/logo.svg'
import { cn } from '@/lib/utils'
import { Gitlab, Linkedin, Twitter } from 'lucide-react'
import Image from 'next/image'
export default function Footer({ className, ...props }: ImgHTMLAttributes<HTMLImageElement>) {

  const footerItems = [
    {
      title: 'Quick Links',
      links: [
        { title: 'Home', href: '#' },
        { title: 'Features', href: '#' },
        { title: 'Products', href: '#' },
        { title: 'Docs', href: '#' },
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
        'w-full bg-muted p-8',
        className
      )}
      {...props}
    >
      <div className='container mx-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8'>
        <div className='grid gap-1' >
          <div>
            <Link
              href='/'
              className='flex items-center gap-2'
            >
              <Image
                src={Logo}
                alt='eAuthenticator'
                className='max-h-8'
              />
            </Link>
            
          </div>
        </div>
        {footerItems.map((item) => (
          <div className='grid gap-1' key={item.title}>
            <h3 className='font-semibold'>{item.title}</h3>
            {item.links.map((link) => (
              <Link href={link.href} key={link.title}>
                {link.title}
              </Link>
            ))}
          </div>
        ))}
      </div>
      <div className='container mx-auto mt-8 flex max-w-7xl flex-col items-center justify-between sm:flex-row'>
        <div className='flex items-center space-x-4'>
          <Link
            href='#'
            className='hover:text-gray-900'
          >
            <Twitter className='h-5 w-5' />
            <span className='sr-only'>Twitter</span>
          </Link>
          <Link
            href='#'
            className='hover:text-gray-900'
          >
            <Gitlab className='h-5 w-5' />
            <span className='sr-only'>GitHub</span>
          </Link>
          <Link
            href='#'
            className='hover:text-gray-900'
          >
            <Linkedin className='h-5 w-5' />
            <span className='sr-only'>LinkedIn</span>
          </Link>
        </div>
      </div>
    </footer>
  )
}
