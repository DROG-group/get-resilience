'use client'

import { useRef, useState, useCallback } from 'react'

interface TiltCardProps {
  children: React.ReactNode
  className?: string
  maxTilt?: number
  scale?: number
  glare?: boolean
}

export default function TiltCard({
  children,
  className = '',
  maxTilt = 8,
  scale = 1.02,
  glare = false,
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [style, setStyle] = useState<React.CSSProperties>({
    transform: 'perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)',
    transition: 'transform 400ms ease-out',
  })
  const [glareStyle, setGlareStyle] = useState<React.CSSProperties>({ opacity: 0 })

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const card = cardRef.current
      if (!card) return
      const rect = card.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const centerX = rect.width / 2
      const centerY = rect.height / 2
      const rotateX = ((centerY - y) / centerY) * maxTilt
      const rotateY = ((x - centerX) / centerX) * maxTilt

      setStyle({
        transform: `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(${scale},${scale},${scale})`,
        transition: 'transform 100ms ease-out',
      })

      if (glare) {
        const glareX = (x / rect.width) * 100
        const glareY = (y / rect.height) * 100
        setGlareStyle({
          opacity: 0.15,
          background: `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.4), transparent 60%)`,
        })
      }
    },
    [maxTilt, scale, glare]
  )

  const handleMouseLeave = useCallback(() => {
    setStyle({
      transform: 'perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)',
      transition: 'transform 400ms ease-out',
    })
    if (glare) setGlareStyle({ opacity: 0 })
  }, [glare])

  return (
    <div
      ref={cardRef}
      className={`relative ${className}`}
      style={style}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      {glare && (
        <div
          className="pointer-events-none absolute inset-0 rounded-[inherit] transition-opacity duration-300"
          style={glareStyle}
        />
      )}
    </div>
  )
}
