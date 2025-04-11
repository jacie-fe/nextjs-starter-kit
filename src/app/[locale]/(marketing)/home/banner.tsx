'use client'

import { motion, useAnimation } from 'framer-motion'
import { useEffect } from 'react'

const banners = [
  "Welcome to our site!",
  "Don't miss our new features!",
  "Enjoy fast, secure access!",
]

export default function Banner() {
  const controls = useAnimation()

  useEffect(() => {
    let index = 0

    const slide = async () => {
      while (true) {
        await controls.start({
          x: `-${index * 100}vw`,
          transition: { duration: 0.8, ease: 'easeInOut' },
        })
        index = (index + 1) % banners.length
        await new Promise((resolve) => setTimeout(resolve, 3000))
      }
    }

    slide()
  }, [controls])

  return (
    <div className="overflow-hidden w-ful text-white h-full">
      <motion.div
        className="flex w-full h-full"
        animate={controls}
        style={{ width: `${banners.length * 100}%` }}
      >
        {banners.map((text, idx) => (
          <div
            key={idx}
            className="w-screen h-full flex items-center flex-shrink-0 text-center justify-center py-4 text-4xl font-bold"
          >
            {text}
          </div>
        ))}
      </motion.div>
    </div>
  )
}
