'use client'
import React, { useRef, useEffect } from 'react'

interface LogoAnimationProps {
  letters?: string
  fontSizeMin?: number
  angleDistortion?: number
  stepSize?: number
  className?: string
}

export default function LogoAnimation({
  letters = "FLASH",
  fontSizeMin = 16,
  angleDistortion = 0.2,
  stepSize = 12,
  className = "",
}: LogoAnimationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const lastPosRef = useRef({ x: 0, y: 0 })
  const counterRef = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    const handleMouseMove = (e: MouseEvent) => {
        const rect = canvas.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top
      
        const lastPos = lastPosRef.current
      
        // 如果初始值是 0,0，说明是第一次移动，直接设置为当前位置
        if (lastPos.x === 0 && lastPos.y === 0) {
          lastPosRef.current = { x, y }
          return
        }
      
        const d = Math.sqrt((x - lastPos.x) ** 2 + (y - lastPos.y) ** 2)
      
        if (d > stepSize) {
          const angle = Math.atan2(y - lastPos.y, x - lastPos.x)
          const letter = letters.charAt(counterRef.current % letters.length)
          const size = fontSizeMin + d / 4
      
          ctx.save()
          ctx.translate(lastPos.x, lastPos.y)
          ctx.rotate(angle + (Math.random() - 0.5) * angleDistortion)
          ctx.font = `${size}px Arial`
          ctx.fillStyle = 'white'
          ctx.textAlign = 'left'
          ctx.textBaseline = 'middle'
          ctx.fillText(letter, 0, 0)
          ctx.restore()
      
          lastPosRef.current = { x, y }
          counterRef.current += 1
        }
      }

    canvas.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      canvas.removeEventListener('mousemove', handleMouseMove)
    }
  }, [letters, fontSizeMin, angleDistortion, stepSize])

  return (
    <div className={`relative ${className}`}>
      <canvas
        ref={canvasRef}
        className="cursor-crosshair w-full h-full"
        style={{ background: 'black' }}
      />
    </div>
  )
}