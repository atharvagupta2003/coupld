import { motion } from 'framer-motion'

interface Props {
  size?: number
  showLabel?: boolean
}

export default function CupidCharacter({ size = 52, showLabel = false }: Props) {
  return (
    <div className="flex flex-col items-center gap-1">
      <motion.div
        style={{ width: size, height: size * 1.2 }}
        animate={{ y: [0, -4, 0], rotate: [-1, 1, -1] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <svg
          viewBox="0 0 80 96"
          width={size}
          height={size * 1.2}
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <radialGradient id="skinGrad" cx="50%" cy="40%" r="60%">
              <stop offset="0%" stopColor="#F5D5C0" />
              <stop offset="100%" stopColor="#E8B99A" />
            </radialGradient>
            <radialGradient id="robeGrad" cx="50%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#C8AAEE" />
              <stop offset="100%" stopColor="#7B5EA7" />
            </radialGradient>
            <radialGradient id="wingGrad" cx="30%" cy="30%" r="80%">
              <stop offset="0%" stopColor="rgba(255,255,255,0.9)" />
              <stop offset="100%" stopColor="rgba(184,160,212,0.5)" />
            </radialGradient>
          </defs>

          {/* Left wing */}
          <motion.path
            d="M26 52 Q4 38 8 22 Q12 8 22 18 Q28 26 28 42"
            fill="url(#wingGrad)"
            stroke="rgba(184,160,212,0.4)"
            strokeWidth="0.5"
            animate={{ rotate: [-3, 3, -3] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            style={{ originX: '28px', originY: '42px' }}
          />
          {/* Left wing shine */}
          <path
            d="M22 28 Q12 24 14 18 Q18 12 22 20"
            fill="rgba(255,255,255,0.5)"
            stroke="none"
          />

          {/* Right wing */}
          <motion.path
            d="M54 52 Q76 38 72 22 Q68 8 58 18 Q52 26 52 42"
            fill="url(#wingGrad)"
            stroke="rgba(184,160,212,0.4)"
            strokeWidth="0.5"
            animate={{ rotate: [3, -3, 3] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            style={{ originX: '52px', originY: '42px' }}
          />
          {/* Right wing shine */}
          <path
            d="M58 28 Q68 24 66 18 Q62 12 58 20"
            fill="rgba(255,255,255,0.5)"
            stroke="none"
          />

          {/* Body / robe */}
          <ellipse cx="40" cy="72" rx="15" ry="20" fill="url(#robeGrad)" />
          {/* Robe highlight */}
          <ellipse cx="36" cy="64" rx="5" ry="8" fill="rgba(255,255,255,0.15)" />

          {/* Neck */}
          <rect x="36" y="52" width="8" height="8" rx="4" fill="url(#skinGrad)" />

          {/* Head */}
          <circle cx="40" cy="42" r="16" fill="url(#skinGrad)" />
          {/* Head highlight */}
          <ellipse cx="35" cy="36" rx="5" ry="4" fill="rgba(255,255,255,0.25)" />

          {/* Hair / halo */}
          <ellipse cx="40" cy="28" rx="14" ry="5" fill="rgba(212,168,67,0.25)" stroke="#D4A843" strokeWidth="1.5" strokeDasharray="none" />
          {/* Curly hair */}
          <path d="M26 34 Q28 26 32 30 Q30 36 26 34" fill="#C8956A" />
          <path d="M54 34 Q52 26 48 30 Q50 36 54 34" fill="#C8956A" />
          <path d="M28 40 Q26 32 30 28 Q34 24 36 30" fill="#C8956A" />
          <path d="M52 40 Q54 32 50 28 Q46 24 44 30" fill="#C8956A" />

          {/* Eyes */}
          <ellipse cx="35" cy="42" rx="3" ry="3.5" fill="white" />
          <ellipse cx="45" cy="42" rx="3" ry="3.5" fill="white" />
          <circle cx="35.5" cy="42.5" r="2" fill="#3D2060" />
          <circle cx="45.5" cy="42.5" r="2" fill="#3D2060" />
          {/* Eye shine */}
          <circle cx="36.5" cy="41.5" r="0.8" fill="white" />
          <circle cx="46.5" cy="41.5" r="0.8" fill="white" />

          {/* Eyebrows */}
          <path d="M32 38 Q35 36.5 38 38" stroke="#A07050" strokeWidth="1.2" fill="none" strokeLinecap="round" />
          <path d="M42 38 Q45 36.5 48 38" stroke="#A07050" strokeWidth="1.2" fill="none" strokeLinecap="round" />

          {/* Smile */}
          <path d="M35 48 Q40 53 45 48" stroke="#C08060" strokeWidth="1.5" fill="none" strokeLinecap="round" />

          {/* Cheeks */}
          <ellipse cx="31" cy="47" rx="3.5" ry="2" fill="rgba(220,120,100,0.25)" />
          <ellipse cx="49" cy="47" rx="3.5" ry="2" fill="rgba(220,120,100,0.25)" />

          {/* Left arm + bow */}
          <path d="M28 60 Q18 52 16 44" stroke="url(#skinGrad)" strokeWidth="5" fill="none" strokeLinecap="round" />
          {/* Bow arc */}
          <path d="M10 36 Q16 28 22 36" stroke="#D4A843" strokeWidth="2" fill="none" strokeLinecap="round" />
          {/* Bow string */}
          <line x1="10" y1="36" x2="22" y2="36" stroke="#D4A843" strokeWidth="1" strokeDasharray="1,1" />
          {/* Arrow shaft */}
          <line x1="22" y1="36" x2="40" y2="20" stroke="#D4A843" strokeWidth="1.5" />
          {/* Arrow tip */}
          <polygon points="38,17 43,18 40,22" fill="#D4A843" />
          {/* Arrow feathers */}
          <path d="M22 36 L18 33 L20 37" fill="rgba(212,168,67,0.6)" />

          {/* Right arm */}
          <path d="M52 60 Q62 54 64 48" stroke="url(#skinGrad)" strokeWidth="5" fill="none" strokeLinecap="round" />
          {/* Right hand - pointing/open */}
          <circle cx="64" cy="47" r="4" fill="url(#skinGrad)" />

          {/* Floating hearts */}
          <motion.g
            animate={{ y: [-2, -8, -2], opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
          >
            <path d="M66 30 Q67 28 68 30 Q69 28 70 30 Q70 32 68 34 Q66 32 66 30" fill="#C2547A" />
          </motion.g>
          <motion.g
            animate={{ y: [-2, -7, -2], opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 2.5, repeat: Infinity, delay: 1 }}
          >
            <path d="M10 56 Q11 54.5 12 56 Q13 54.5 14 56 Q14 57.5 12 59 Q10 57.5 10 56" fill="#C2547A" />
          </motion.g>
        </svg>
      </motion.div>

      {showLabel && (
        <motion.span
          className="text-brand-lavender font-semibold uppercase tracking-widest"
          style={{ fontSize: 9 }}
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Cupid
        </motion.span>
      )}
    </div>
  )
}
