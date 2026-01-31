'use client'
import { motion } from 'framer-motion'
import React from 'react'

export default function FadeIn({
  children,
  delay = 0,
  duration = 1.3,
  position = 'center'
}: {
  children: React.ReactNode
  delay?: number
  duration?: number
  position?: 'start' | 'center' | 'end'
}) {
  return (
    <motion.div
      className={`w-full h-full flex items-${position} justify-${position}`}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration, delay, ease: 'easeOut' }}
      viewport={{ once: false }}
    >
      {children}
    </motion.div>
  )
}