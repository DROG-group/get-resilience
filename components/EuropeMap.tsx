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
    id: 'AT', name: 'Austria', cx: 368, cy: 384,
    path: 'M375,371 L387,374 L392,369 L415,371 L423,380 L421,383 L412,384 L416,385 L413,387 L413,391 L385,398 L354,395 L351,390 L321,393 L312,388 L316,385 L322,388 L326,385 L363,386 L359,379 L375,371 Z',
  },
  {
    id: 'BE', name: 'Belgium', cx: 243, cy: 348,
    path: 'M236,342 L243,339 L259,343 L257,348 L267,353 L258,358 L259,362 L253,363 L245,360 L245,355 L234,358 L234,354 L211,344 L236,342 Z',
  },
  {
    id: 'BG', name: 'Bulgaria', cx: 543, cy: 436,
    path: 'M578,435 L572,439 L580,444 L560,444 L552,447 L553,450 L507,450 L508,446 L498,441 L499,435 L508,432 L498,425 L503,421 L508,422 L506,425 L525,427 L543,427 L566,422 L588,426 L578,435 Z',
  },
  {
    id: 'CY', name: 'Cyprus', cx: 657, cy: 510,
    path: 'M662,508 L676,505 L666,508 L668,511 L653,515 L642,510 L662,508 Z',
  },
  {
    id: 'CZ', name: 'Czechia', cx: 397, cy: 360,
    path: 'M387,374 L359,365 L349,353 L381,345 L388,348 L394,345 L411,350 L409,352 L415,356 L421,355 L419,352 L431,354 L429,355 L443,358 L447,363 L420,373 L392,369 L387,374 Z',
  },
  {
    id: 'DE', name: 'Germany', cx: 323, cy: 331,
    path: 'M368,300 L373,305 L364,304 L370,302 L368,300 Z M333,304 L331,310 L356,302 L361,303 L353,305 L363,303 L381,312 L383,319 L379,323 L386,326 L386,336 L391,345 L349,353 L358,364 L374,373 L359,379 L363,386 L326,385 L322,388 L299,382 L284,385 L284,379 L293,369 L266,364 L269,359 L263,357 L266,352 L259,345 L264,341 L260,336 L276,331 L271,327 L276,326 L281,317 L276,316 L279,313 L290,312 L297,317 L300,310 L317,314 L303,309 L303,305 L299,304 L305,302 L298,297 L294,299 L296,295 L318,298 L317,303 L333,304 Z',
  },
  {
    id: 'DK', name: 'Denmark', cx: 325, cy: 285,
    path: 'M341,298 L346,300 L333,298 L341,298 Z M330,289 L330,294 L326,295 L314,289 L330,289 Z M356,282 L357,286 L351,289 L355,292 L348,294 L349,296 L337,293 L332,286 L345,283 L345,287 L347,283 L349,287 L346,283 L356,282 Z M319,268 L323,272 L317,274 L332,278 L327,281 L325,278 L322,285 L317,284 L319,286 L312,286 L316,288 L311,294 L315,298 L300,297 L297,294 L300,294 L299,290 L291,288 L292,283 L296,284 L292,282 L292,274 L301,276 L306,271 L309,275 L307,270 L319,268 Z M325,261 L324,269 L306,268 L300,270 L298,275 L293,273 L299,267 L310,267 L328,259 L325,261 Z',
  },
  {
    id: 'EE', name: 'Estonia', cx: 531, cy: 246,
    path: 'M507,246 L512,249 L493,256 L496,253 L491,248 L507,246 Z M504,241 L508,243 L501,245 L494,241 L504,241 Z M548,231 L583,235 L572,243 L572,252 L577,257 L571,261 L559,262 L541,254 L527,257 L530,250 L524,252 L515,247 L520,244 L515,243 L514,237 L548,231 Z',
  },
  {
    id: 'ES', name: 'Spain', cx: 129, cy: 460,
    path: 'M221,466 L224,466 L218,471 L208,468 L221,466 Z M60,426 L148,430 L166,436 L222,441 L217,447 L184,456 L187,457 L169,468 L177,476 L167,480 L164,487 L150,489 L143,495 L110,495 L93,502 L65,487 L73,481 L68,479 L73,473 L65,467 L72,467 L73,454 L84,448 L78,444 L56,446 L55,442 L45,445 L50,440 L45,441 L48,437 L43,438 L45,436 L39,434 L60,426 Z',
  },
  {
    id: 'FI', name: 'Finland', cx: 532, cy: 163, active: true,
    info: { council: 'Faktabaari Council', members: 24, reports: 18, partner: 'Faktabaari' },
    path: 'M582,48 L596,52 L599,57 L592,63 L594,66 L586,70 L592,71 L587,77 L590,84 L609,94 L596,110 L611,131 L606,133 L603,140 L607,142 L604,146 L611,148 L610,155 L617,158 L609,166 L632,180 L606,201 L576,218 L558,219 L561,216 L557,220 L549,220 L550,222 L515,225 L506,229 L512,225 L506,224 L509,221 L501,223 L502,220 L484,216 L485,202 L488,202 L482,195 L484,192 L480,182 L488,178 L486,175 L498,174 L496,171 L512,164 L530,148 L542,147 L542,136 L532,133 L532,128 L525,130 L518,123 L517,118 L522,111 L516,105 L519,99 L514,99 L517,89 L472,66 L479,67 L483,61 L488,61 L499,73 L510,75 L522,71 L536,76 L548,68 L550,53 L558,48 L579,44 L582,48 Z',
  },
  {
    id: 'FR', name: 'France', cx: 206, cy: 400,
    path: 'M311,437 L313,442 L308,450 L301,448 L298,440 L309,437 L310,434 L311,437 Z M211,344 L234,354 L234,358 L244,355 L245,360 L253,363 L293,369 L284,379 L284,385 L275,386 L261,400 L273,397 L276,403 L273,405 L278,409 L270,412 L276,415 L275,420 L285,422 L283,425 L263,433 L247,428 L231,428 L219,433 L220,439 L213,440 L153,433 L148,430 L159,416 L156,416 L157,407 L166,414 L156,405 L158,399 L143,393 L143,389 L147,388 L105,380 L113,377 L105,376 L105,374 L123,371 L135,374 L154,373 L146,360 L156,361 L158,365 L180,364 L175,363 L195,356 L198,347 L211,344 Z',
  },
  {
    id: 'GR', name: 'Greece', cx: 520, cy: 481,
    path: 'M520,506 L555,508 L535,512 L515,508 L520,506 Z M514,475 L524,477 L530,483 L505,475 L514,475 Z M556,471 L560,473 L549,472 L556,471 Z M555,447 L560,450 L553,456 L539,454 L518,456 L528,462 L518,460 L522,464 L513,461 L518,464 L513,464 L506,457 L501,459 L502,464 L513,472 L507,470 L509,473 L501,475 L523,481 L522,486 L515,483 L507,484 L515,488 L504,487 L510,498 L502,494 L500,498 L495,492 L489,494 L488,488 L480,484 L491,480 L506,484 L511,481 L481,480 L475,475 L481,473 L475,474 L464,467 L474,463 L478,455 L526,448 L551,451 L555,447 Z',
  },
  {
    id: 'HR', name: 'Croatia', cx: 409, cy: 418,
    path: 'M414,397 L430,404 L447,403 L449,409 L456,411 L449,414 L403,411 L408,421 L429,434 L406,428 L394,421 L399,421 L384,409 L376,415 L370,408 L394,408 L402,404 L401,400 L414,397 Z',
  },
  {
    id: 'HU', name: 'Hungary', cx: 457, cy: 388,
    path: 'M447,403 L430,404 L408,393 L413,391 L413,387 L416,385 L413,383 L421,383 L423,380 L445,383 L476,374 L506,380 L493,386 L481,399 L447,403 Z',
  },
  {
    id: 'IE', name: 'Ireland', cx: 49, cy: 315,
    path: 'M67,296 L56,303 L68,307 L72,303 L85,308 L81,309 L87,322 L80,329 L82,331 L73,330 L40,340 L32,340 L36,336 L27,338 L35,335 L24,336 L33,332 L22,331 L46,325 L30,327 L44,318 L26,316 L35,310 L30,310 L27,306 L51,305 L48,304 L55,300 L46,300 L53,294 L63,292 L63,296 L67,291 L73,293 L67,296 Z',
  },
  {
    id: 'IT', name: 'Italy', cx: 353, cy: 445,
    path: 'M350,391 L373,396 L368,399 L376,406 L352,408 L350,410 L356,413 L352,416 L353,421 L372,428 L377,437 L388,443 L408,445 L405,449 L435,457 L442,462 L441,465 L420,459 L413,466 L423,470 L423,474 L415,475 L407,484 L401,483 L404,477 L409,474 L401,463 L335,440 L320,423 L301,419 L283,426 L285,422 L275,420 L276,415 L270,412 L277,410 L273,404 L288,403 L295,397 L304,404 L309,397 L321,400 L320,396 L326,396 L326,393 L350,391 Z M312,452 L316,458 L313,472 L296,474 L298,465 L293,455 L312,452 Z M399,482 L393,488 L396,492 L393,496 L354,485 L367,481 L399,482 Z',
  },
  {
    id: 'LT', name: 'Lithuania', cx: 520, cy: 293, active: true,
    info: { council: 'Debunk Council', members: 31, reports: 42, partner: 'Debunk.org' },
    path: 'M537,278 L560,287 L558,291 L563,292 L548,297 L544,304 L548,306 L543,305 L528,310 L515,309 L504,304 L506,298 L502,295 L482,292 L479,284 L494,277 L537,278 Z',
  },
  {
    id: 'LU', name: 'Luxembourg', cx: 262, cy: 360,
    path: 'M261,355 L269,359 L266,364 L258,363 L261,355 Z',
  },
  {
    id: 'LV', name: 'Latvia', cx: 529, cy: 271,
    path: 'M479,277 L479,271 L489,261 L502,258 L511,267 L519,269 L528,265 L527,257 L541,254 L559,262 L573,261 L583,279 L574,285 L560,287 L535,276 L494,277 L479,281 L479,277 Z',
  },
  {
    id: 'MT', name: 'Malta', cx: 384, cy: 502,
    path: 'M384,498 L388,502 L384,506 L380,502 Z',
  },
  {
    id: 'NL', name: 'Netherlands', cx: 250, cy: 331, active: true,
    info: { council: 'DROG Council', members: 45, reports: 67, partner: 'DROG' },
    path: 'M258,328 L248,329 L258,328 Z M274,316 L279,321 L271,327 L276,331 L260,336 L264,340 L259,345 L261,348 L256,347 L259,344 L247,340 L224,339 L236,340 L227,337 L234,337 L230,336 L240,328 L253,330 L259,327 L252,320 L248,322 L251,325 L247,329 L240,328 L243,322 L274,316 Z',
  },
  {
    id: 'PL', name: 'Poland', cx: 450, cy: 334, active: true,
    info: { council: 'Poland Pilot Council', members: 38, reports: 53, partner: 'PORT Lukasiewicz' },
    path: 'M447,363 L443,358 L429,355 L431,354 L419,352 L421,355 L415,356 L409,352 L411,349 L389,347 L392,342 L386,336 L386,326 L379,323 L383,319 L381,312 L386,311 L380,309 L436,298 L446,300 L441,299 L446,304 L459,303 L453,305 L505,303 L514,306 L521,324 L510,330 L517,332 L515,338 L524,347 L522,352 L503,362 L506,369 L487,364 L465,367 L456,362 L447,363 Z',
  },
  {
    id: 'PT', name: 'Portugal', cx: 58, cy: 467,
    path: 'M55,445 L78,444 L84,448 L73,454 L72,467 L65,467 L73,473 L69,476 L73,481 L65,487 L66,491 L44,492 L48,479 L41,479 L44,474 L36,475 L48,457 L45,445 L55,442 L55,445 Z',
  },
  {
    id: 'RO', name: 'Romania', cx: 534, cy: 406,
    path: 'M475,400 L481,399 L497,383 L510,379 L535,383 L561,377 L581,391 L583,408 L604,410 L603,414 L593,413 L591,416 L594,416 L591,417 L588,426 L566,422 L543,427 L525,427 L506,425 L508,422 L500,418 L503,417 L484,415 L486,411 L468,401 L475,400 Z',
  },
  {
    id: 'SE', name: 'Sweden', cx: 427, cy: 208,
    path: 'M418,271 L412,280 L412,274 L422,264 L418,271 Z M438,270 L437,261 L450,256 L445,265 L438,270 Z M490,76 L505,80 L517,89 L514,99 L519,99 L516,105 L522,111 L517,121 L524,130 L509,132 L502,128 L503,131 L498,129 L499,135 L490,131 L496,135 L485,137 L488,140 L482,138 L488,142 L479,147 L487,154 L475,164 L460,171 L456,169 L438,182 L431,179 L436,185 L425,187 L430,191 L426,196 L428,201 L423,199 L423,211 L426,216 L444,222 L440,221 L451,230 L436,236 L432,235 L429,229 L427,231 L431,234 L426,231 L426,234 L406,233 L444,236 L439,236 L433,243 L430,238 L426,244 L409,246 L420,248 L412,248 L418,252 L417,256 L413,255 L416,259 L412,256 L416,262 L404,281 L387,280 L380,285 L380,291 L362,290 L363,286 L355,278 L360,279 L357,277 L361,274 L347,263 L343,257 L346,252 L337,250 L335,241 L343,242 L345,228 L355,225 L357,219 L351,210 L360,205 L350,199 L352,191 L347,174 L350,169 L362,161 L379,159 L379,154 L372,152 L384,139 L384,124 L398,121 L397,117 L411,107 L407,100 L417,90 L424,86 L433,89 L437,85 L436,78 L463,81 L469,72 L465,67 L476,67 L490,76 Z',
  },
  {
    id: 'SI', name: 'Slovenia', cx: 390, cy: 401,
    path: 'M373,396 L385,398 L409,393 L415,397 L401,400 L402,404 L394,408 L386,406 L372,408 L376,406 L368,399 L373,396 Z',
  },
  {
    id: 'SK', name: 'Slovakia', cx: 458, cy: 373,
    path: 'M424,380 L418,376 L421,371 L431,370 L443,363 L456,362 L465,367 L487,364 L501,368 L494,376 L474,374 L445,383 L424,380 Z',
  },
]

export default function EuropeMap() {
  const [hovered, setHovered] = useState<string | null>(null)

  return (
    <div className="w-full">
      <svg
        viewBox="0 0 700 530"
        className="w-full h-auto"
        role="img"
        aria-label="Map of EU member states showing active Resilience Councils"
      >
        {/* Country shapes */}
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
              {/* Country shape */}
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

              {/* Glow effect for active countries */}
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

              {/* Rich tooltip for active countries on hover */}
              {isHovered && isActive && c.info && (() => {
                const tw = 160
                const th = 72
                const tx = Math.min(Math.max(c.cx - tw / 2, 4), 700 - tw - 4)
                const above = c.cy - th - 16
                const ty = above > 4 ? above : c.cy + 20
                return (
                  <>
                    <rect
                      x={tx}
                      y={ty}
                      width={tw}
                      height={th}
                      rx={8}
                      fill="#0a0a0f"
                      fillOpacity={0.95}
                    />
                    {/* Arrow */}
                    {above > 4 ? (
                      <polygon
                        points={`${c.cx - 5},${ty + th} ${c.cx + 5},${ty + th} ${c.cx},${ty + th + 6}`}
                        fill="#0a0a0f"
                        fillOpacity={0.95}
                      />
                    ) : (
                      <polygon
                        points={`${c.cx - 5},${ty} ${c.cx + 5},${ty} ${c.cx},${ty - 6}`}
                        fill="#0a0a0f"
                        fillOpacity={0.95}
                      />
                    )}
                    {/* Council name */}
                    <text
                      x={tx + 10}
                      y={ty + 16}
                      fontSize={10}
                      fontWeight={700}
                      fill="#ffffff"
                      fontFamily="Inter, system-ui, sans-serif"
                      style={{ pointerEvents: 'none' }}
                    >
                      {c.info.council}
                    </text>
                    {/* Partner */}
                    <text
                      x={tx + 10}
                      y={ty + 30}
                      fontSize={8.5}
                      fill="#a1a1aa"
                      fontFamily="Inter, system-ui, sans-serif"
                      style={{ pointerEvents: 'none' }}
                    >
                      Led by {c.info.partner}
                    </text>
                    {/* Stats */}
                    <text
                      x={tx + 10}
                      y={ty + 46}
                      fontSize={9}
                      fontWeight={600}
                      fill="#8b7ff5"
                      fontFamily="Inter, system-ui, sans-serif"
                      style={{ pointerEvents: 'none' }}
                    >
                      {c.info.members} members
                    </text>
                    <text
                      x={tx + 10}
                      y={ty + 60}
                      fontSize={9}
                      fontWeight={600}
                      fill="#8b7ff5"
                      fontFamily="Inter, system-ui, sans-serif"
                      style={{ pointerEvents: 'none' }}
                    >
                      {c.info.reports} reports filed
                    </text>
                  </>
                )
              })()}

              {/* Tooltip for inactive on hover */}
              {isHovered && !isActive && (() => {
                const labelWidth = c.name.length * 7 + 16
                const tx = Math.min(Math.max(c.cx - labelWidth / 2, 4), 700 - labelWidth - 4)
                const ty = c.cy - 24
                return (
                  <>
                    <rect
                      x={tx}
                      y={ty}
                      width={labelWidth}
                      height={20}
                      rx={4}
                      fill="#0a0a0f"
                      fillOpacity={0.9}
                    />
                    <text
                      x={tx + labelWidth / 2}
                      y={ty + 14}
                      textAnchor="middle"
                      fontSize={9}
                      fill="#ffffff"
                      fontFamily="Inter, system-ui, sans-serif"
                      style={{ pointerEvents: 'none' }}
                    >
                      {c.name}
                    </text>
                  </>
                )
              })()}
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
