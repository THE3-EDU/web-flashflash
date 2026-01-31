'use client'
import { motion } from 'framer-motion'
import React from 'react'

export default function AnimatedText({
  text,
  delay = 0,
  duration = 0.04,
  className = ''
}: {
  text: string
  delay?: number
  duration?: number
  className?: string
}) {
  return (
    <span className={className} style={{ display: 'inline-block', whiteSpace: 'pre' }}>
      {text.split('').map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: delay + i * duration,
            duration: 0.3,
            ease: [0.77, 0, 0.175, 1]
          }}
          style={{ display: 'inline-block' }}
        >
          {char}
        </motion.span>
      ))}
    </span>
  )
}