'use client'

import { motion, useAnimation } from 'framer-motion'
import { useEffect, useRef } from 'react'
import { useInView } from 'framer-motion'

type Props = {
  children: React.ReactNode
  delay?: number
  duration?: number
}

export function SlideUpOnScroll({ children, delay = 0 }: Props) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const controls = useAnimation()

  useEffect(() => {
    if (isInView) {
      controls.start('visible')
    }
  }, [isInView, controls])

  return (
    <motion.div
      ref={ref}
      initial='hidden'
      animate={controls}
      transition={{ duration: 0.6, ease: 'easeOut', delay }}
      variants={{
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0 },
      }}
    >
      {children}
    </motion.div>
  )
}

export function SlideDownOnScroll({
  children,
  delay = 0,
  duration = 0.6,
}: Props) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const controls = useAnimation()

  useEffect(() => {
    if (isInView) {
      controls.start('visible')
    }
  }, [isInView, controls])

  return (
    <motion.div
      ref={ref}
      initial='hidden'
      animate={controls}
      transition={{ duration, ease: 'easeOut', delay }}
      variants={{
        hidden: { opacity: 0, y: -50 },
        visible: { opacity: 1, y: 0 },
      }}
    >
      {children}
    </motion.div>
  )
}
export function SlideLeftOnScroll({
  children,
  delay = 0,
  duration = 0.6,
}: Props) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const controls = useAnimation()

  useEffect(() => {
    if (isInView) {
      controls.start('visible')
    }
  }, [isInView, controls])

  return (
    <motion.div
      ref={ref}
      initial='hidden'
      animate={controls}
      transition={{ duration, ease: 'easeOut', delay }}
      variants={{
        hidden: { opacity: 0, x: -50 },
        visible: { opacity: 1, x: 0 },
      }}
    >
      {children}
    </motion.div>
  )
}
export function SlideRightOnScroll({ children, delay = 0 }: Props) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const controls = useAnimation()

  useEffect(() => {
    if (isInView) {
      controls.start('visible')
    }
  }, [isInView, controls])

  return (
    <motion.div
      ref={ref}
      initial='hidden'
      animate={controls}
      transition={{ duration: 0.6, ease: 'easeOut', delay }}
      variants={{
        hidden: { opacity: 0, x: 50 },
        visible: { opacity: 1, x: 0 },
      }}
    >
      {children}
    </motion.div>
  )
}
