import { useId } from 'react'
import type { Artwork } from '../data/products'

/** Original vector product illustrations: no remote images or real brand assets. */
export function ProductArt({
  kind,
  color = '#aebcb7',
  hero = false,
}: {
  kind: Artwork
  color?: string
  hero?: boolean
}) {
  const id = useId().replace(/:/g, '')
  const screen = `${id}-screen`
  const metal = `${id}-metal`
  const shadow = `${id}-shadow`
  return (
    <svg
      viewBox="0 0 500 340"
      fill="none"
      aria-hidden="true"
      className={`product-art${hero ? ' hero-product-art' : ''}`}
    >
      <defs>
        <linearGradient
          id={screen}
          x1="130"
          y1="60"
          x2="360"
          y2="215"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#254c42" />
          <stop offset="1" stopColor="#142f29" />
        </linearGradient>
        <linearGradient
          id={metal}
          x1="100"
          y1="80"
          x2="400"
          y2="275"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor={color} />
          <stop offset=".5" stopColor={color} />
          <stop offset="1" stopColor="#7e8b86" />
        </linearGradient>
        <filter id={shadow} x="-50%" y="-200%" width="200%" height="500%">
          <feGaussianBlur stdDeviation="10" />
        </filter>
      </defs>
      <ellipse
        cx="251"
        cy="278"
        rx="156"
        ry="10"
        fill="#233c36"
        opacity=".14"
        filter={`url(#${shadow})`}
      />
      {kind === 'laptop' && (
        <g transform="rotate(-7 250 170)">
          <rect
            x="121"
            y="51"
            width="266"
            height="173"
            rx="10"
            fill={`url(#${metal})`}
            stroke="#6b7774"
            strokeWidth="1.5"
          />
          <rect x="128" y="58" width="252" height="157" rx="5" fill={`url(#${screen})`} />
          <svg x="128" y="58" width="252" height="157" viewBox="0 0 252 157" overflow="hidden">
            <path d="M-30 155C10 51 67 11 151 8c-71 39-96 81-107 164" fill="#d2eab0" />
            <path d="M16 164C57 64 133 23 281 27c-93 32-117 54-139 139" fill="#8ca894" />
            <path d="M97 176c21-60 94-93 167-66v66" fill="#e7a783" />
            <path d="M133 177c24-31 67-48 122-47" stroke="#f3c6a6" strokeWidth="2" />
            <circle cx="214" cy="25" r="9" fill="#e5edda" opacity=".8" />
          </svg>
          <circle cx="254" cy="55" r="1.2" fill="#414c48" />
          <path
            d="M121 222h266l51 44c2 2 0 5-3 5H72c-3 0-5-3-2-5l51-44Z"
            fill={`url(#${metal})`}
            stroke="#81928a"
          />
          <path d="M71 270h365l-7 7H79l-8-7Z" fill="#798c81" />
          <path d="M139 228h233l26 24H112l27-24Z" fill="#65716b" />
          {Array.from({ length: 4 }, (_, row) =>
            Array.from({ length: 13 }, (_, col) => (
              <path
                key={`${row}-${col}`}
                d={`M${143 + col * 17 - row * 6} ${230 + row * 5}h13l3 3h-13z`}
                fill="#ccd4cc"
                opacity=".85"
              />
            )),
          )}
          <path d="M220 257h69l7 10h-84l8-10Z" fill={color} stroke="#83978b" strokeWidth=".7" />
          <path d="M70 270h366" stroke="#d6dfd7" strokeWidth="1.3" />
        </g>
      )}
      {kind === 'desktop' && (
        <g transform="rotate(-8 250 170)">
          <path d="m153 137 134-45 75 41-135 51-74-47Z" fill="#dce1e0" stroke="#abb6b4" />
          <path d="M153 137v97l74 47v-97l-74-47Z" fill="#a7b2b0" />
          <path d="m227 184 135-51v101l-135 47v-97Z" fill={`url(#${metal})`} />
          <path d="m154 146 70 44" stroke="#8f9f9b" />
          <rect
            x="250"
            y="225"
            width="20"
            height="7"
            rx="2"
            fill="#53625c"
            transform="rotate(-20 250 225)"
          />
          <rect
            x="279"
            y="215"
            width="20"
            height="7"
            rx="2"
            fill="#53625c"
            transform="rotate(-20 279 215)"
          />
          <circle cx="337" cy="198" r="4" fill="#d9f289" />
          <path d="m200 130 43-14 22 12-43 15-22-13Z" fill="#a7b4b0" />
          <path d="M168 177v31m8-26v31m8-26v31m8-26v31m8-26v31" stroke="#657970" strokeWidth="2" />
        </g>
      )}
      {kind === 'monitor' && (
        <g transform="rotate(-5 250 170)">
          <rect x="115" y="58" width="275" height="172" rx="8" fill={color} />
          <rect x="123" y="66" width="259" height="150" rx="3" fill={`url(#${screen})`} />
          <svg x="123" y="66" width="259" height="150" viewBox="0 0 259 150" overflow="hidden">
            <circle cx="162" cy="140" r="101" fill="#d3e4b0" />
            <circle cx="40" cy="149" r="96" fill="#839b8a" />
            <path d="M60 155c36-58 89-71 195-26v30" fill="#e7ad87" />
          </svg>
          <path d="M239 230h27l9 42h-45l9-42Z" fill="#88968f" />
          <path d="M196 275h116l-17-8h-81l-18 8Z" fill="#687b72" />
          <circle cx="253" cy="223" r="2" fill="#cbe6a6" />
        </g>
      )}
      {kind === 'keyboard' && (
        <g transform="rotate(-12 250 170)">
          <rect x="91" y="122" width="328" height="128" rx="12" fill="#aeb6a5" />
          <rect
            x="86"
            y="116"
            width="328"
            height="128"
            rx="12"
            fill={color}
            stroke="#b8c0b0"
            strokeWidth="2"
          />
          {Array.from({ length: 5 }, (_, row) =>
            Array.from({ length: 13 }, (_, col) => (
              <rect
                key={`${row}-${col}`}
                x={98 + col * 23}
                y={128 + row * 21}
                width={19}
                height={16}
                rx="3"
                fill={row === 4 && col > 3 && col < 9 ? '#c3ceba' : '#f4f4e9'}
                stroke="#c5ccbd"
              />
            )),
          )}
          <rect x="187" y="212" width="131" height="16" rx="3" fill="#c3ceba" />
          <circle cx="393" cy="122" r="2" fill="#536d4e" />
        </g>
      )}
      {kind === 'mouse' && (
        <g transform="rotate(-22 250 170)">
          <path
            d="M250 76c53 0 77 37 77 95v41c0 48-32 68-77 68s-77-20-77-68v-41c0-58 24-95 77-95Z"
            fill="#995e49"
          />
          <path
            d="M248 69c50 0 73 35 73 90v40c0 46-30 68-73 68s-73-22-73-68v-40c0-55 23-90 73-90Z"
            fill={color}
            stroke="#a05f47"
          />
          <path d="M248 72v98m-70 0h139" stroke="#925640" strokeWidth="1.4" />
          <rect
            x="241"
            y="100"
            width="14"
            height="36"
            rx="7"
            fill="#f0c2a6"
            stroke="#9f624a"
            strokeWidth="2"
          />
          <path
            d="M190 210c5 24 26 41 57 41"
            stroke="#ca8a68"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </g>
      )}
    </svg>
  )
}
