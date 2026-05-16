import { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Loader2 } from 'lucide-react'
import GamificationBadge from '../components/GamificationBadge'

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
    </svg>
  )
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18">
      <path fill="#1877F2" d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 4.99 3.657 9.128 8.438 9.878v-6.987h-2.54V12.073h2.54V9.846c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12.073h2.773l-.443 2.89h-2.33v6.988C20.343 21.201 24 17.063 24 12.073z"/>
    </svg>
  )
}

function XIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16">
      <path fill="#111827" d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  )
}

export default function Splash() {
  const navigate = useNavigate()
  const [socialLoading, setSocialLoading] = useState<string | null>(null)
  const [showBadge, setShowBadge] = useState(false)

  const handleSocial = (id: string) => {
    setSocialLoading(id)
    setTimeout(() => {
      setSocialLoading(null)
      setShowBadge(true)
    }, 900)
  }

  return (
    <motion.div
      className="relative flex flex-col items-center justify-center min-h-screen w-full overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      {/* Light teal/white gradient background */}
      <div className="absolute inset-0 bg-white">
        <div className="absolute inset-0 opacity-40" style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(13,148,136,0.15) 0%, transparent 70%), radial-gradient(ellipse 60% 50% at 20% 80%, rgba(20,184,166,0.10) 0%, transparent 60%)' }} />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center px-8 w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-center"
        >
          <h1 className="text-gray-900 font-bold" style={{ fontSize: 52, letterSpacing: '-1px', lineHeight: 1.1 }}>
            Coupld
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="flex flex-col items-center gap-2 mt-5"
        >
          <p className="text-teal-600 italic" style={{ fontSize: 20 }}>Find that special someone</p>
          <div className="flex items-center gap-2">
            <div className="w-1 h-1 rounded-full bg-brand-textSub opacity-50" />
            <p className="text-brand-textSub font-medium" style={{ fontSize: 14 }}>No ghosting allowed</p>
            <div className="w-1 h-1 rounded-full bg-brand-textSub opacity-50" />
          </div>
        </motion.div>

        <div className="h-10" />

        {/* Social sign-up */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="w-full flex flex-col gap-2.5"
        >
          {[
            { id: 'google', label: 'Continue with Google', Icon: GoogleIcon, bg: 'rgba(0,0,0,0.03)', border: 'rgba(0,0,0,0.15)' },
            { id: 'facebook', label: 'Continue with Facebook', Icon: FacebookIcon, bg: 'rgba(24,119,242,0.08)', border: 'rgba(24,119,242,0.3)' },
            { id: 'x', label: 'Continue with X', Icon: XIcon, bg: 'rgba(0,0,0,0.03)', border: 'rgba(0,0,0,0.15)' },
          ].map(btn => (
            <button
              key={btn.id}
              onClick={() => handleSocial(btn.id)}
              disabled={!!socialLoading}
              className="w-full py-3.5 rounded-xl font-semibold text-gray-900 flex items-center justify-center gap-2.5 transition-all active:scale-97 disabled:opacity-60"
              style={{ background: btn.bg, border: `1px solid ${btn.border}`, fontSize: 15 }}
            >
              {socialLoading === btn.id ? <Loader2 size={16} className="animate-spin" /> : <btn.Icon />}
              {btn.label}
            </button>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="w-full flex flex-col gap-2 mt-4"
        >
          <div className="flex items-center gap-3">
            <div className="flex-1 h-px" style={{ background: 'rgba(0,0,0,0.08)' }} />
            <span className="text-brand-textSub text-xs">or</span>
            <div className="flex-1 h-px" style={{ background: 'rgba(0,0,0,0.08)' }} />
          </div>

          <button
            onClick={() => navigate('/signup')}
            className="w-full py-4 rounded-xl font-bold text-white transition-opacity hover:opacity-90 active:scale-[0.98]"
            style={{ backgroundColor: '#0D9488', fontSize: 16 }}
          >
            Create an Account
          </button>

          <button
            onClick={() => navigate('/login')}
            className="w-full py-4 rounded-xl font-semibold text-gray-900 border transition-opacity hover:opacity-80 active:scale-[0.98]"
            style={{ borderColor: '#0D9488', background: 'transparent', fontSize: 16 }}
          >
            Sign In
          </button>
        </motion.div>
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.7 }}
        className="absolute bottom-8 text-brand-textSub text-center px-8"
        style={{ fontSize: 11 }}
      >
        By continuing you agree to our Terms and Privacy Policy
      </motion.p>

      <GamificationBadge
        show={showBadge}
        badgeType="journey"
        title="You've started your journey"
        subtitle="Your profile is being created. This is the beginning of something genuinely different."
        onDismiss={() => { setShowBadge(false); navigate('/how-coupld-works') }}
        autoDismissMs={3000}
      />
    </motion.div>
  )
}
