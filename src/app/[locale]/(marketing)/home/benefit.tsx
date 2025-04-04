import ImageDevice from './images/device.png'
import ImageHand from './images/hand.png'
import Image from 'next/image'
import bgImage from '@/assets/character.png'
import {
  SlideDownOnScroll,
  SlideUpOnScroll,
} from '@/components/custom/slide-on-scroll'

export default function Benefit() {
  return (
    <div className='bg-[#D9EBFF]'>
      <div className='relative mx-auto h-[450px] max-w-[910px] px-3 py-10 sm:h-[750px]'>
        <div
          className='absolute top-10 left-0 h-full w-full bg-no-repeat opacity-80 mix-blend-soft-light'
          style={{ backgroundImage: `url(${bgImage.src})` }}
        ></div>

        <div className='text-center'>
          <div className='text-primary text-[30px] font-[700] sm:text-[40px]'>
            Effortless, Secure, and Seamless
          </div>
          <div className='mt-3 text-[24px] font-medium'>
            Security at every step.
          </div>
        </div>

        <div className='flex gap-0 sm:gap-[76px]'>
          <div className='w-1/2 text-center sm:h-[412px] sm:w-[412px]'>
            <SlideDownOnScroll delay={1} duration={1}>
              <Image src={ImageDevice} alt={'eAuthenticator'} />
            </SlideDownOnScroll>
            <SlideUpOnScroll delay={0.5} duration={1}>
              <span className='text-2xl font-medium'>Quick Setup and Sync</span>
            </SlideUpOnScroll>
          </div>
          <div className='w-1/2 text-center sm:h-[412px] sm:w-[412px]'>
            <SlideDownOnScroll delay={1} duration={1}>
              <Image src={ImageHand} alt={'eAuthenticator'} />
            </SlideDownOnScroll>
            <SlideUpOnScroll delay={0.5} duration={1}>
              <span className='text-2xl font-medium'>
                Fast & Secure Authentication
              </span>
            </SlideUpOnScroll>
          </div>
        </div>
      </div>
    </div>
  )
}
