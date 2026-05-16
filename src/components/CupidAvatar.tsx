import { motion } from 'framer-motion'

interface Props {
  size?: number
  pulse?: boolean
}

export default function CupidAvatar({ size = 40, pulse = true }: Props) {
  const fontSize = Math.round(size * 0.36)

  return (
    <div className="relative inline-flex items-center justify-center shrink-0" style={{ width: size, height: size }}>
      {/* Outer pulse ring */}
      {pulse && (
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{ background: 'rgba(13,148,136,0.2)' }}
          animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0, 0.4] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
        />
      )}
      {/* Secondary ring */}
      {pulse && (
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{ background: 'rgba(13,148,136,0.12)' }}
          animate={{ scale: [1, 1.18, 1], opacity: [0.3, 0, 0.3] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
        />
      )}
      {/* Avatar circle */}
      <motion.div
        className="relative z-10 rounded-full flex items-center justify-center"
        style={{
          width: size,
          height: size,
          background: 'linear-gradient(135deg, #0D9488 0%, #0F766E 50%, #134E4A 100%)',
          boxShadow: '0 0 16px rgba(13,148,136,0.35)',
        }}
        animate={pulse ? { scale: [1, 1.04, 1] } : {}}
        transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
      >
        <span
          className="text-white font-bold select-none"
          style={{ fontSize, letterSpacing: '-0.5px' }}
        >
          C
        </span>
      </motion.div>
    </div>
  )
}
