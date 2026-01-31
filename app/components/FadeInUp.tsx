'use client'
import { motion } from 'framer-motion'
import React from 'react'

export default function FadeInUp({ children, delay = 0, y = 3 }: { children: React.ReactNode, delay?: number , y?: number}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false }}
      transition={{ duration: 0.5, delay }}
      className='relative h-full w-full flex items-center justify-center'
    >
      {children}
    </motion.div>
  )
}