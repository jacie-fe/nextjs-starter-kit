'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

import { Pagination, Autoplay, Navigation } from 'swiper/modules'

const banners = [
  { id: 1, title: 'Welcome to our site!' },
  { id: 2, title: 'New Features Available!' },
  { id: 3, title: 'Secure & Fast Access!' },
]

export default function Banner() {
  return (
    <div className='absolute top-0 left-0 h-full w-full max-w-screen overflow-hidden'>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={false}
        modules={[Autoplay, Pagination, Navigation]}
        className='h-full w-full'
      >
        {banners.map((banner) => (
          <SwiperSlide key={banner.id}>
            <div className='flex h-full items-center justify-center text-3xl font-bold text-white'>
              {banner.title}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}
