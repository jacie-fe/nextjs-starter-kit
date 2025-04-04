import { Button } from '@/components/custom/button'
import AuthenImage1 from './images/authen1.png'
import AuthenImage2 from './images/authen2.svg'
import AuthenImage3 from './images/authen3.png'
import Image from 'next/image'
import {
  SlideLeftOnScroll,
  SlideRightOnScroll,
} from '@/components/custom/slide-on-scroll'

export default function Banner() {
  return (
    <div className='relative overflow-hidden bg-[#3CA1FF]'>
      <div className='mx-auto flex h-[400px] max-w-[1730px] items-center justify-between'>
        <div className='flex w-[160px] min-w-[160px] md:w-[434px]'>
          <SlideLeftOnScroll>
            <Image
              src={AuthenImage1}
              alt='AuthenImage1'
              height={349}
              quality={100}
            />
          </SlideLeftOnScroll>
        </div>

        <div className='absolute top-1/2 left-1/4 w-[80%] max-w-[1010px] -translate-x-1/4 -translate-y-1/2 text-white sm:left-1/2 sm:-translate-x-1/2'>
          <div className='flex items-center justify-between gap-10'>
            <div className='w-[300px] sm:w-[506px]'>
              <div className='flex flex-col gap-6'>
                <div className='flex-1 text-[20px] font-[900] sm:text-[30px] md:text-[45px]'>
                  Authentication Makes Work Easy
                </div>
                <div>
                  Fast, Reliable, and Easy-to-use Two-Factor Authentication.
                </div>

                <div className='flex gap-3'>
                  <Button size='lg' className='h-[56px]'>
                    Business
                  </Button>
                  <Button
                    size='lg'
                    className='h-[56px] border-white bg-transparent'
                    variant='outline'
                  >
                    Personal
                  </Button>
                </div>
              </div>
            </div>
            <div className='mt-[52px] hidden w-[160px] md:block md:w-[434px]'>
              <Image
                src={AuthenImage2}
                alt='AuthenImage2'
                width={356}
                quality={100}
              />
            </div>
          </div>
        </div>

        <div className='flex'>
          <div className='w-[100px] min-w-[100px] md:w-[434px] xl:mr-27'>
            <SlideRightOnScroll>
              <Image
                src={AuthenImage3}
                alt='AuthenImage3'
                height={540}
                quality={100}
              />
            </SlideRightOnScroll>
          </div>
        </div>
      </div>
    </div>
  )
}
