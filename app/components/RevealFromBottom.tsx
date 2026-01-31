'use client'
import React from 'react'
import { motion } from 'framer-motion'

export default function RevealFromBottom({
  children,
  delay = 0,
  position = 'start'
}: {
  children: React.ReactNode
  delay?: number,
  position?: 'start' | 'center'
}) {
  return (
    <motion.div
      className={`relative overflow-hidden w-full h-full flex items-center justify-${position}`}
      initial={{
        clipPath: 'polygon(0% 100%, 0% 100%, 0% 100%, 0% 100%)',
        y: 10
      }}
      whileInView={{
        clipPath: 'polygon(0% 100%, 0% 0%, 100% 0%, 100% 100%)',
        y: 0
      }}
      viewport={{ once: false }}
      transition={{ duration: 0.5, delay: delay, ease: [0.77, 0, 0.175, 1] }}
      style={{ willChange: 'clip-path, transform' }}
    >
      {children}
    </motion.div>
  )
}