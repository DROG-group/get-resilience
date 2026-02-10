'use client'

import { useState } from 'react'

interface FlipCardProps {
  front: React.ReactNode
  back: React.ReactNode
  className?: string
  height?: string
}

export default function FlipCard({ front, back, className = '', height = '160px' }: FlipCardProps) {
  const [flipped, setFlipped] = useState(false)

  return (
    <div
      className={`group [perspective:1000px] ${className}`}
      style={{ height }}
      onClick={() => setFlipped((f) => !f)}
    >
      <div
        className={`relative w-full h-full transition-transform duration-600 [transform-style:preserve-3d] cursor-pointer
          ${flipped ? '[transform:rotateY(180deg)]' : ''}
          md:group-hover:[transform:rotateY(180deg)]`}
        style={{ transitionDuration: '600ms' }}
      >
        {/* Front */}
        <div className="absolute inset-0 [backface-visibility:hidden] rounded-2xl overflow-hidden">
          {front}
        </div>
        {/* Back */}
        <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] rounded-2xl overflow-hidden">
          {back}
        </div>
      </div>
    </div>
  )
}
