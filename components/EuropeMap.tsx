'use client'

import { useState } from 'react'

type CouncilInfo = {
  council: string
  members: number
  reports: number
  partner: string
}

type Country = {
  id: string
  name: string
  path: string
  cx: number
  cy: number
  active?: boolean
  info?: CouncilInfo
}

const countries: Country[] = [
  {
    id: 'AT', name: 'Austria', cx: 223, cy: 411,
    path: 'M227,396 L235,399 L238,393 L254,397 L256,406 L255,410 L250,410 L252,412 L250,419 L233,427 L215,423 L213,418 L202,422 L190,418 L192,412 L195,416 L198,412 L203,414 L217,410 L220,413 L218,405 L227,396 Z',
  },
  {
    id: 'BE', name: 'Belgium', cx: 148, cy: 369,
    path: 'M144,362 L146,359 L150,359 L158,364 L156,368 L162,375 L157,380 L157,386 L149,382 L149,377 L143,380 L142,375 L130,368 L129,365 L134,361 L144,362 Z',
  },
  {
    id: 'BG', name: 'Bulgaria', cx: 329, cy: 471,
    path: 'M350,470 L346,475 L351,481 L339,481 L334,484 L334,488 L327,489 L318,485 L307,488 L307,483 L302,477 L302,471 L307,466 L303,463 L302,456 L304,454 L308,456 L307,459 L328,461 L341,455 L350,456 L356,462 L352,464 L350,470 Z',
  },
  {
    id: 'CY', name: 'Cyprus', cx: 397, cy: 558,
    path: 'M400,555 L408,551 L402,556 L404,559 L395,563 L389,561 L388,558 L400,555 Z',
  },
  {
    id: 'CZ', name: 'Czechia', cx: 241, cy: 383,
    path: 'M235,399 L230,398 L218,388 L212,375 L220,374 L231,365 L235,368 L239,366 L241,369 L249,371 L248,374 L252,378 L255,377 L254,374 L261,375 L262,380 L271,384 L264,392 L254,398 L238,393 L235,399 Z',
  },
  {
    id: 'DE', name: 'Germany', cx: 196, cy: 349,
    path: 'M223,313 L226,318 L223,320 L221,318 L223,313 Z M202,317 L201,324 L206,324 L216,316 L219,317 L214,319 L220,317 L231,327 L230,340 L234,344 L237,365 L236,368 L231,365 L220,374 L212,375 L217,387 L227,398 L218,405 L220,413 L217,410 L203,414 L198,412 L195,416 L192,412 L182,409 L181,412 L173,412 L172,405 L178,394 L165,391 L162,387 L158,355 L165,353 L168,348 L165,344 L168,343 L170,328 L176,327 L181,332 L182,325 L187,325 L192,330 L184,324 L182,317 L185,315 L181,310 L179,312 L180,307 L180,309 L193,311 L192,316 L202,317 Z',
  },
  {
    id: 'DK', name: 'Denmark', cx: 197, cy: 295,
    path: 'M207,310 L210,313 L202,311 L204,308 L207,310 Z M200,300 L198,307 L191,300 L196,298 L198,301 L199,298 L200,300 Z M216,293 L213,308 L205,305 L201,296 L205,296 L205,293 L209,293 L209,298 L211,294 L211,298 L210,292 L214,290 L216,293 Z M194,276 L196,281 L192,282 L197,282 L195,285 L202,286 L200,290 L196,290 L194,297 L190,297 L192,299 L189,306 L192,310 L187,311 L182,309 L182,301 L177,300 L177,293 L178,295 L180,294 L177,292 L177,284 L178,281 L183,285 L186,280 L185,284 L188,284 L186,278 L194,276 Z M197,267 L197,277 L186,276 L180,280 L181,283 L178,282 L182,275 L188,274 L193,267 L199,265 L197,267 Z',
  },
  {
    id: 'EE', name: 'Estonia', cx: 321, cy: 250,
    path: 'M307,250 L310,253 L302,257 L298,262 L300,258 L297,252 L307,250 Z M305,244 L308,246 L304,249 L299,245 L305,244 Z M331,233 L352,237 L346,247 L349,263 L345,268 L338,268 L327,259 L319,262 L321,255 L317,257 L312,251 L315,248 L311,247 L311,240 L331,233 Z',
  },
  {
    id: 'ES', name: 'Spain', cx: 79, cy: 500,
    path: 'M135,506 L137,507 L133,512 L127,509 L132,504 L135,506 Z M38,459 L45,463 L55,461 L91,464 L102,471 L112,472 L113,470 L118,472 L119,475 L135,477 L132,484 L112,494 L114,495 L104,509 L108,518 L102,522 L100,530 L94,532 L88,540 L68,540 L57,548 L49,537 L42,535 L41,531 L46,524 L42,521 L46,514 L41,507 L45,507 L46,492 L52,485 L49,481 L35,483 L35,479 L29,482 L30,472 L28,474 L29,471 L25,470 L38,459 Z',
  },
  {
    id: 'FI', name: 'Finland', cx: 322, cy: 153, active: true,
    info: { council: 'Faktabaari Council', members: 24, reports: 18, partner: 'Faktabaari' },
    path: 'M352,20 L360,25 L362,30 L358,36 L359,41 L354,45 L358,46 L355,54 L357,62 L363,64 L368,73 L360,91 L369,117 L367,118 L365,133 L370,136 L369,144 L373,148 L368,157 L382,173 L366,198 L348,218 L338,219 L339,215 L337,220 L332,220 L333,222 L330,220 L320,227 L311,227 L312,225 L306,230 L310,226 L308,228 L309,226 L306,224 L308,220 L303,223 L304,220 L293,215 L296,199 L291,176 L296,171 L294,167 L301,166 L300,163 L310,154 L321,136 L328,135 L328,122 L322,118 L322,113 L317,115 L313,106 L316,93 L312,85 L314,79 L311,78 L313,67 L306,57 L299,55 L286,41 L290,41 L292,34 L296,35 L302,49 L309,51 L315,46 L324,52 L331,42 L333,26 L337,19 L343,20 L350,15 L352,20 Z',
  },
  {
    id: 'FR', name: 'France', cx: 126, cy: 430,
    path: 'M189,472 L186,488 L183,486 L181,476 L188,472 L189,468 L189,472 Z M129,365 L130,368 L143,376 L143,380 L149,377 L149,382 L154,386 L178,394 L172,405 L173,412 L167,413 L158,429 L166,426 L166,435 L169,440 L164,443 L168,446 L166,452 L173,454 L172,459 L160,468 L150,464 L150,462 L147,464 L141,462 L133,468 L134,475 L128,476 L113,470 L112,472 L102,471 L91,465 L97,448 L97,437 L102,446 L96,436 L97,428 L88,421 L88,416 L91,416 L84,415 L86,413 L82,413 L83,411 L79,413 L72,408 L68,409 L65,406 L69,405 L67,402 L70,402 L65,401 L78,395 L83,400 L94,398 L90,383 L95,384 L97,388 L110,387 L108,384 L119,378 L121,368 L129,365 Z',
  },
  {
    id: 'GR', name: 'Greece', cx: 315, cy: 524,
    path: 'M315,553 L336,557 L322,559 L312,556 L312,552 L315,553 Z M311,516 L317,519 L320,526 L306,517 L310,514 L311,516 Z M337,512 L339,515 L332,513 L337,512 Z M336,484 L339,488 L334,495 L326,492 L313,495 L319,502 L314,500 L316,504 L311,500 L314,504 L310,504 L306,496 L304,498 L304,503 L310,513 L308,514 L307,511 L308,514 L303,516 L316,523 L317,528 L312,526 L307,527 L312,532 L309,534 L305,531 L309,543 L304,539 L303,544 L300,537 L296,539 L295,532 L291,527 L297,522 L306,527 L309,524 L302,521 L291,523 L287,517 L291,515 L287,515 L281,507 L287,502 L290,494 L318,485 L332,488 L336,484 Z',
  },
  {
    id: 'HR', name: 'Croatia', cx: 248, cy: 451,
    path: 'M251,426 L262,435 L271,433 L272,440 L276,441 L272,446 L266,443 L254,441 L249,444 L244,442 L247,454 L260,469 L254,464 L246,462 L233,440 L228,447 L224,438 L234,436 L240,439 L243,429 L251,426 Z',
  },
  {
    id: 'HU', name: 'Hungary', cx: 277, cy: 416,
    path: 'M271,433 L260,434 L251,425 L247,421 L250,419 L251,409 L255,410 L256,406 L262,410 L269,409 L271,406 L280,405 L288,399 L301,401 L306,405 L298,412 L291,428 L271,433 Z',
  },
  {
    id: 'IE', name: 'Ireland', cx: 31, cy: 331,
    path: 'M42,309 L35,316 L40,321 L45,317 L49,322 L53,322 L51,324 L54,338 L51,349 L45,348 L36,355 L33,354 L30,358 L21,360 L24,356 L18,357 L23,354 L16,354 L21,350 L15,349 L30,342 L20,344 L28,334 L18,332 L23,325 L20,325 L18,320 L32,319 L31,318 L35,313 L30,312 L37,305 L39,306 L40,304 L39,309 L41,307 L42,302 L46,304 L42,309 Z',
  },
  {
    id: 'IT', name: 'Italy', cx: 214, cy: 482,
    path: 'M212,419 L215,423 L226,425 L223,428 L228,436 L222,435 L214,438 L214,454 L225,462 L229,472 L235,479 L247,481 L246,487 L264,496 L268,502 L266,506 L262,500 L254,498 L250,506 L256,510 L256,515 L251,517 L247,527 L243,526 L248,517 L243,503 L203,476 L194,456 L183,451 L172,459 L173,454 L166,452 L168,446 L164,443 L169,440 L166,434 L175,433 L180,426 L185,434 L188,426 L195,429 L194,425 L198,425 L198,421 L212,419 Z M189,490 L192,498 L190,513 L185,512 L182,516 L179,514 L181,505 L178,493 L189,490 Z M242,524 L238,532 L238,541 L215,528 L223,524 L226,526 L242,524 Z',
  },
  {
    id: 'LT', name: 'Lithuania', cx: 314, cy: 305, active: true,
    info: { council: 'Debunk Council', members: 31, reports: 42, partner: 'Debunk.org' },
    path: 'M325,288 L339,298 L337,303 L340,304 L332,310 L331,321 L329,318 L319,325 L312,324 L310,319 L304,316 L304,307 L292,304 L290,291 L300,286 L317,288 L324,285 L325,288 Z',
  },
  {
    id: 'LU', name: 'Luxembourg', cx: 160, cy: 382,
    path: 'M159,377 L163,382 L162,387 L157,386 L159,377 Z',
  },
  {
    id: 'LV', name: 'Latvia', cx: 320, cy: 280,
    path: 'M290,286 L290,279 L296,267 L304,264 L309,275 L314,277 L320,272 L319,262 L327,259 L338,268 L347,268 L353,288 L347,296 L338,298 L324,285 L317,288 L299,286 L291,291 L290,286 Z',
  },
  {
    id: 'MT', name: 'Malta', cx: 233, cy: 549,
    path: 'M233,545 L237,549 L233,553 L229,549 Z',
  },
  {
    id: 'NL', name: 'Netherlands', cx: 152, cy: 349, active: true,
    info: { council: 'DROG Council', members: 45, reports: 67, partner: 'DROG' },
    path: 'M157,346 L151,346 L156,343 L157,346 Z M166,332 L169,338 L165,344 L168,348 L165,353 L158,355 L161,359 L159,369 L156,368 L158,364 L150,359 L137,360 L140,358 L144,360 L139,356 L143,356 L140,354 L146,345 L154,348 L158,345 L153,336 L151,346 L146,345 L148,338 L158,332 L166,332 Z',
  },
  {
    id: 'PL', name: 'Poland', cx: 272, cy: 353, active: true,
    info: { council: 'Poland Pilot Council', members: 38, reports: 53, partner: 'PORT Lukasiewicz' },
    path: 'M271,386 L268,381 L260,378 L261,375 L254,374 L255,377 L252,378 L248,374 L249,370 L241,369 L239,366 L236,368 L238,362 L234,354 L234,344 L230,340 L231,327 L234,326 L231,324 L248,319 L250,315 L263,310 L270,313 L267,312 L271,318 L278,316 L274,319 L279,316 L307,317 L311,320 L315,337 L315,342 L309,348 L313,351 L312,358 L317,368 L316,374 L304,385 L306,393 L295,387 L284,388 L282,391 L276,385 L274,388 L271,386 Z',
  },
  {
    id: 'PT', name: 'Portugal', cx: 36, cy: 507,
    path: 'M35,482 L49,481 L52,485 L46,492 L45,507 L41,507 L46,514 L42,521 L46,524 L41,531 L42,535 L28,537 L31,521 L26,521 L28,515 L27,518 L24,517 L31,496 L29,482 L35,479 L35,482 Z',
  },
  {
    id: 'RO', name: 'Romania', cx: 323, cy: 436,
    path: 'M287,430 L291,428 L301,410 L308,405 L324,410 L340,403 L353,423 L351,437 L357,442 L364,439 L365,446 L358,445 L356,460 L342,455 L328,461 L308,459 L302,451 L305,449 L300,451 L293,446 L294,442 L283,430 L287,430 Z',
  },
  {
    id: 'SE', name: 'Sweden', cx: 259, cy: 206,
    path: 'M253,279 L250,289 L256,271 L253,279 Z M265,278 L264,268 L272,262 L265,278 Z M297,53 L306,57 L313,67 L311,78 L314,79 L312,85 L316,93 L313,104 L317,115 L308,117 L304,113 L304,116 L301,114 L302,121 L296,117 L300,120 L294,124 L295,127 L292,125 L295,129 L290,136 L295,143 L288,155 L278,163 L276,161 L265,176 L261,172 L264,179 L258,181 L260,186 L258,192 L259,197 L256,196 L256,198 L256,210 L258,216 L261,218 L263,216 L269,222 L266,221 L273,231 L264,238 L261,237 L260,230 L261,236 L258,232 L258,236 L251,233 L246,235 L253,235 L258,240 L267,236 L269,238 L266,238 L263,246 L261,241 L258,248 L248,250 L254,252 L250,252 L253,254 L253,262 L250,260 L252,265 L250,262 L252,269 L245,291 L235,290 L231,294 L230,302 L222,303 L220,302 L220,297 L215,288 L218,289 L219,282 L210,270 L208,263 L210,257 L204,255 L203,244 L205,242 L208,245 L210,229 L215,225 L216,217 L213,209 L217,208 L219,202 L212,196 L212,160 L218,152 L228,152 L230,149 L230,143 L226,140 L233,125 L233,108 L241,105 L240,100 L249,88 L247,80 L252,68 L257,64 L262,67 L264,54 L280,58 L284,47 L282,41 L288,42 L297,53 Z',
  },
  {
    id: 'SI', name: 'Slovenia', cx: 236, cy: 430,
    path: 'M226,425 L233,427 L248,421 L251,426 L243,429 L240,439 L234,436 L226,439 L228,436 L223,428 L226,425 Z',
  },
  {
    id: 'SK', name: 'Slovakia', cx: 277, cy: 398,
    path: 'M257,406 L253,402 L255,396 L261,395 L268,386 L274,388 L276,385 L282,391 L284,388 L295,387 L303,392 L299,401 L287,399 L280,405 L271,406 L269,409 L262,410 L257,406 Z',
  },
]

export default function EuropeMap() {
  const [hovered, setHovered] = useState<string | null>(null)

  const hoveredCountry = hovered ? countries.find((c) => c.id === hovered) : null

  return (
    <div className="w-full max-w-lg mx-auto">
      <svg
        viewBox="0 0 423 578"
        className="w-full h-auto"
        role="img"
        aria-label="Map of EU member states showing active Resilience Councils"
      >
        {/* Country shapes layer */}
        {countries.map((c) => {
          const isActive = c.active
          const isHovered = hovered === c.id

          return (
            <g
              key={c.id}
              onMouseEnter={() => setHovered(c.id)}
              onMouseLeave={() => setHovered(null)}
              style={{ cursor: isActive ? 'pointer' : 'default' }}
            >
              <path
                d={c.path}
                fill={
                  isActive
                    ? isHovered ? '#7c6fe0' : '#8b7ff5'
                    : isHovered ? '#c4c4cc' : '#e4e4e7'
                }
                stroke={isActive ? '#6b5fd4' : '#d4d4d8'}
                strokeWidth={isActive ? 1.5 : 0.5}
                strokeLinejoin="round"
              />
              {isActive && (
                <path
                  d={c.path}
                  fill="none"
                  stroke="#8b7ff5"
                  strokeWidth={3}
                  strokeOpacity={0.2}
                  strokeLinejoin="round"
                />
              )}
            </g>
          )
        })}

        {/* Tooltip layer - rendered on top of all countries */}
        {hoveredCountry && (() => {
          const c = hoveredCountry
          const isActive = c.active

          if (isActive && c.info) {
            const tw = 140
            const th = 64
            const tx = Math.min(Math.max(c.cx - tw / 2, 4), 423 - tw - 4)
            const above = c.cy - th - 12
            const ty = above > 4 ? above : c.cy + 16
            return (
              <g style={{ pointerEvents: 'none' }}>
                <rect
                  x={tx} y={ty} width={tw} height={th}
                  rx={6} fill="#0a0a0f" fillOpacity={0.95}
                />
                {above > 4 ? (
                  <polygon
                    points={`${c.cx - 4},${ty + th} ${c.cx + 4},${ty + th} ${c.cx},${ty + th + 5}`}
                    fill="#0a0a0f" fillOpacity={0.95}
                  />
                ) : (
                  <polygon
                    points={`${c.cx - 4},${ty} ${c.cx + 4},${ty} ${c.cx},${ty - 5}`}
                    fill="#0a0a0f" fillOpacity={0.95}
                  />
                )}
                <text x={tx + 8} y={ty + 13} fontSize={8} fontWeight={700} fill="#ffffff" fontFamily="Inter, system-ui, sans-serif">
                  {c.info.council}
                </text>
                <text x={tx + 8} y={ty + 24} fontSize={7} fill="#a1a1aa" fontFamily="Inter, system-ui, sans-serif">
                  Led by {c.info.partner}
                </text>
                <text x={tx + 8} y={ty + 38} fontSize={7.5} fontWeight={600} fill="#8b7ff5" fontFamily="Inter, system-ui, sans-serif">
                  {c.info.members} members
                </text>
                <text x={tx + 8} y={ty + 50} fontSize={7.5} fontWeight={600} fill="#8b7ff5" fontFamily="Inter, system-ui, sans-serif">
                  {c.info.reports} reports filed
                </text>
              </g>
            )
          }

          // Inactive tooltip
          const labelWidth = c.name.length * 6 + 12
          const tx = Math.min(Math.max(c.cx - labelWidth / 2, 4), 423 - labelWidth - 4)
          const ty = c.cy - 20
          return (
            <g style={{ pointerEvents: 'none' }}>
              <rect
                x={tx} y={ty} width={labelWidth} height={16}
                rx={3} fill="#0a0a0f" fillOpacity={0.9}
              />
              <text
                x={tx + labelWidth / 2} y={ty + 11}
                textAnchor="middle" fontSize={7.5} fill="#ffffff"
                fontFamily="Inter, system-ui, sans-serif"
              >
                {c.name}
              </text>
            </g>
          )
        })()}
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
