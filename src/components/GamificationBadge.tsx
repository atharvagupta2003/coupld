import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Props {
  show: boolean
  title: string
  subtitle: string
  badgeType?: 'journey' | 'coach' | 'profile' | 'star'
  onDismiss: () => void
  autoDismissMs?: number
}

function BadgeIcon({ type }: { type: NonNullable<Props['badgeType']> }) {
  if (type === 'journey') {
    return (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
        <path d="M18 4 L21.5 13.5 H32 L23.5 19.5 L27 29 L18 23 L9 29 L12.5 19.5 L4 13.5 H14.5 Z" fill="#0D9488" opacity="0.15" />
        <path d="M18 4 L21.5 13.5 H32 L23.5 19.5 L27 29 L18 23 L9 29 L12.5 19.5 L4 13.5 H14.5 Z" stroke="#0D9488" strokeWidth="1.5" strokeLinejoin="round" />
        <circle cx="18" cy="18" r="4" fill="#0D9488" />
      </svg>
    )
  }
  if (type === 'coach') {
    return (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
        {/* Two connected circles — coach + user */}
        <circle cx="13" cy="14" r="6" stroke="#B8A0D4" strokeWidth="1.5" fill="rgba(184,160,212,0.12)" />
        <circle cx="23" cy="14" r="6" stroke="#0D9488" strokeWidth="1.5" fill="rgba(212,168,67,0.12)" />
        {/* Connection bridge */}
        <path d="M17.5 17.5 L18.5 17.5" stroke="#0D9488" strokeWidth="2" strokeLinecap="round" />
        {/* Heart between them */}
        <path d="M18 21 C16 19.5 13 19 11 21.5 C9 24 11 27 18 31 C25 27 27 24 25 21.5 C23 19 20 19.5 18 21Z" fill="none" stroke="#C2547A" strokeWidth="1.2" />
      </svg>
    )
  }
  if (type === 'profile') {
    return (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
        <circle cx="18" cy="13" r="7" stroke="#B8A0D4" strokeWidth="1.5" fill="rgba(184,160,212,0.1)" />
        <path d="M5 31 C5 24 10.5 19 18 19 C25.5 19 31 24 31 31" stroke="#B8A0D4" strokeWidth="1.5" strokeLinecap="round" fill="none" />
        <path d="M22 27 L25 30 L31 23" stroke="#0D9488" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  }
  // default star
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
      <polygon points="18,3 21.9,13.6 33,13.6 24,20.4 27.3,31 18,24.6 8.7,31 12,20.4 3,13.6 14.1,13.6"
        stroke="#0D9488" strokeWidth="1.5" strokeLinejoin="round" fill="rgba(212,168,67,0.12)" />
      <polygon points="18,9 20.5,16.4 28.3,16.4 22,20.8 24.3,28.2 18,24 11.7,28.2 14,20.8 7.7,16.4 15.5,16.4"
        fill="#0D9488" opacity="0.25" />
    </svg>
  )
}

export default function GamificationBadge({
  show,
  title,
  subtitle,
  badgeType = 'star',
  onDismiss,
  autoDismissMs = 2800,
}: Props) {
  useEffect(() => {
    if (!show) return
    const t = setTimeout(onDismiss, autoDismissMs)
    return () => clearTimeout(t)
  }, [show, autoDismissMs, onDismiss])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="badge-overlay"
          className="fixed inset-0 z-[100] flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onDismiss}
          style={{ background: 'rgba(14,4,30,0.78)', backdropFilter: 'blur(6px)' }}
        >
          <motion.div
            initial={{ scale: 0.4, opacity: 0, y: 40 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.75, opacity: 0, y: -20 }}
            transition={{ type: 'spring', damping: 18, stiffness: 220 }}
            className="flex flex-col items-center gap-5 px-8 py-8 rounded-3xl mx-8"
            style={{
              background: 'linear-gradient(145deg, #F0FDF9 0%, #FFFFFF 100%)',
              border: '1px solid rgba(13,148,136,0.35)',
              boxShadow: '0 0 60px rgba(13,148,136,0.12), 0 20px 40px rgba(0,0,0,0.15)',
              maxWidth: 320,
              width: '100%',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Burst rings behind badge */}
            <div className="relative flex items-center justify-center">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="absolute rounded-full"
                  style={{ border: `1px solid rgba(13,148,136,${0.35 - i * 0.1})` }}
                  initial={{ width: 62, height: 62, opacity: 0.9 }}
                  animate={{ width: 62 + i * 28, height: 62 + i * 28, opacity: 0 }}
                  transition={{ duration: 1.4, delay: i * 0.3, repeat: Infinity }}
                />
              ))}

              {/* Badge circle */}
              <div
                className="relative w-16 h-16 rounded-full flex items-center justify-center"
                style={{
                  background: 'linear-gradient(135deg, rgba(13,148,136,0.2) 0%, rgba(240,253,250,0.8) 100%)',
                  border: '1.5px solid rgba(13,148,136,0.5)',
                }}
              >
                <BadgeIcon type={badgeType} />
              </div>
            </div>

            <div className="text-center">
              <p
                className="text-brand-lavender font-semibold uppercase tracking-widest mb-2"
                style={{ fontSize: 10 }}
              >
                Achievement Unlocked
              </p>
              <h2 className="text-gray-900 font-bold text-xl leading-tight mb-2">{title}</h2>
              <p className="text-gray-500 text-sm leading-relaxed">{subtitle}</p>
            </div>

            {/* Animated shimmer rule */}
            <div className="w-full overflow-hidden rounded-full" style={{ height: 1 }}>
              <motion.div
                className="h-full w-1/2"
                style={{ background: 'linear-gradient(90deg, transparent, #0D9488, transparent)' }}
                animate={{ x: ['-100%', '300%'] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              />
            </div>

            <p className="text-gray-400" style={{ fontSize: 11 }}>
              Tap anywhere to continue
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
