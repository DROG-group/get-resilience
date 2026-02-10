'use client'

import { useState } from 'react'

type Country = {
  id: string
  name: string
  x: number
  y: number
  active?: boolean
}

const countries: Country[] = [
  { id: 'FI', name: 'Finland', x: 342, y: 52, active: true },
  { id: 'SE', name: 'Sweden', x: 272, y: 72 },
  { id: 'EE', name: 'Estonia', x: 340, y: 110 },
  { id: 'LV', name: 'Latvia', x: 336, y: 131 },
  { id: 'LT', name: 'Lithuania', x: 332, y: 152, active: true },
  { id: 'DK', name: 'Denmark', x: 198, y: 136 },
  { id: 'IE', name: 'Ireland', x: 56, y: 162 },
  { id: 'NL', name: 'Netherlands', x: 160, y: 168, active: true },
  { id: 'DE', name: 'Germany', x: 213, y: 184 },
  { id: 'PL', name: 'Poland', x: 290, y: 176, active: true },
  { id: 'BE', name: 'Belgium', x: 160, y: 190 },
  { id: 'CZ', name: 'Czechia', x: 252, y: 203 },
  { id: 'LU', name: 'Lux.', x: 160, y: 210 },
  { id: 'SK', name: 'Slovakia', x: 292, y: 207 },
  { id: 'AT', name: 'Austria', x: 235, y: 224 },
  { id: 'HU', name: 'Hungary', x: 292, y: 228 },
  { id: 'FR', name: 'France', x: 128, y: 240 },
  { id: 'SI', name: 'Slovenia', x: 248, y: 244 },
  { id: 'HR', name: 'Croatia', x: 275, y: 258 },
  { id: 'RO', name: 'Romania', x: 333, y: 238 },
  { id: 'IT', name: 'Italy', x: 220, y: 278 },
  { id: 'BG', name: 'Bulgaria', x: 338, y: 266 },
  { id: 'ES', name: 'Spain', x: 90, y: 296 },
  { id: 'GR', name: 'Greece', x: 312, y: 300 },
  { id: 'PT', name: 'Portugal', x: 46, y: 296 },
  { id: 'MT', name: 'Malta', x: 242, y: 330 },
  { id: 'CY', name: 'Cyprus', x: 398, y: 325 },
]

const TILE_W = 32
const TILE_H = 18

export default function EuropeMap() {
  const [hovered, setHovered] = useState<string | null>(null)

  return (
    <div className="w-full">
      <svg
        viewBox="0 0 450 365"
        className="w-full h-auto"
        role="img"
        aria-label="Map of EU member states showing active Resilience Councils"
      >
        {/* Connecting lines between active countries */}
        {(() => {
          const active = countries.filter((c) => c.active)
          const lines: { x1: number; y1: number; x2: number; y2: number }[] = []
          for (let i = 0; i < active.length; i++) {
            for (let j = i + 1; j < active.length; j++) {
              lines.push({
                x1: active[i].x,
                y1: active[i].y,
                x2: active[j].x,
                y2: active[j].y,
              })
            }
          }
          return lines.map((l, i) => (
            <line
              key={i}
              x1={l.x1}
              y1={l.y1}
              x2={l.x2}
              y2={l.y2}
              stroke="#8b7ff5"
              strokeWidth={1}
              strokeOpacity={0.15}
              strokeDasharray="3 3"
            />
          ))
        })()}

        {/* Country tiles */}
        {countries.map((c) => {
          const isActive = c.active
          const isHovered = hovered === c.id

          return (
            <g
              key={c.id}
              onMouseEnter={() => setHovered(c.id)}
              onMouseLeave={() => setHovered(null)}
              style={{ cursor: 'default' }}
            >
              {/* Glow for active */}
              {isActive && (
                <rect
                  x={c.x - TILE_W / 2 - 2}
                  y={c.y - TILE_H / 2 - 2}
                  width={TILE_W + 4}
                  height={TILE_H + 4}
                  rx={7}
                  fill="none"
                  stroke="#8b7ff5"
                  strokeWidth={1.5}
                  strokeOpacity={0.3}
                />
              )}

              {/* Tile */}
              <rect
                x={c.x - TILE_W / 2}
                y={c.y - TILE_H / 2}
                width={TILE_W}
                height={TILE_H}
                rx={5}
                fill={isActive ? '#8b7ff5' : isHovered ? '#d4d4d8' : '#e4e4e7'}
                stroke={isActive ? '#7c6fe0' : 'transparent'}
                strokeWidth={1}
              />

              {/* ISO code */}
              <text
                x={c.x}
                y={c.y + 5}
                textAnchor="middle"
                fontSize={isActive ? 9 : 8}
                fontWeight={isActive ? 700 : 500}
                fill={isActive ? '#ffffff' : '#71717a'}
                fontFamily="Inter, system-ui, sans-serif"
                style={{ pointerEvents: 'none' }}
              >
                {c.id}
              </text>

              {/* Country name label for active */}
              {isActive && (
                <text
                  x={c.x}
                  y={c.y + TILE_H / 2 + 12}
                  textAnchor="middle"
                  fontSize={7}
                  fontWeight={600}
                  fill="#8b7ff5"
                  fontFamily="Inter, system-ui, sans-serif"
                  style={{ pointerEvents: 'none' }}
                >
                  {c.name}
                </text>
              )}

              {/* Tooltip for inactive on hover */}
              {isHovered && !isActive && (
                <>
                  <rect
                    x={c.x - 30}
                    y={c.y - TILE_H / 2 - 22}
                    width={60}
                    height={18}
                    rx={4}
                    fill="#0a0a0f"
                  />
                  <text
                    x={c.x}
                    y={c.y - TILE_H / 2 - 10}
                    textAnchor="middle"
                    fontSize={7}
                    fill="#ffffff"
                    fontFamily="Inter, system-ui, sans-serif"
                    style={{ pointerEvents: 'none' }}
                  >
                    {c.name}
                  </text>
                </>
              )}
            </g>
          )
        })}
      </svg>

      {/* Legend */}
      <div className="flex items-center justify-center gap-6 mt-4">
        <div className="flex items-center gap-2">
          <div className="w-4 h-3 rounded bg-brand-400" />
          <span className="text-xs text-dark-400">Active Council</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-3 rounded bg-[#e4e4e7]" />
          <span className="text-xs text-dark-400">Coming Soon</span>
        </div>
      </div>
    </div>
  )
}
