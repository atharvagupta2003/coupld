import { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { ChevronLeft, Loader2 } from 'lucide-react'

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
      <path fill="white" d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  )
}

const SOCIAL_BUTTONS = [
  {
    id: 'google',
    label: 'Continue with Google',
    icon: GoogleIcon,
    bg: 'rgba(255,255,255,0.06)',
    border: 'rgba(255,255,255,0.15)',
  },
  {
    id: 'facebook',
    label: 'Continue with Facebook',
    icon: FacebookIcon,
    bg: 'rgba(24,119,242,0.1)',
    border: 'rgba(24,119,242,0.35)',
  },
  {
    id: 'x',
    label: 'Continue with X',
    icon: XIcon,
    bg: 'rgba(255,255,255,0.06)',
    border: 'rgba(255,255,255,0.2)',
  },
]

export default function Login() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [socialLoading, setSocialLoading] = useState<string | null>(null)

  const handleSignIn = () => {
    setLoading(true)
    setTimeout(() => navigate('/home'), 800)
  }

  const handleSocial = (id: string) => {
    setSocialLoading(id)
    setTimeout(() => navigate('/home'), 900)
  }

  return (
    <motion.div
      className="flex flex-col min-h-screen w-full bg-[#1C0B3A] px-5 pt-14 pb-8"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.35 }}
    >
      <button onClick={() => navigate('/')} className="mb-8 text-white w-fit">
        <ChevronLeft size={24} />
      </button>

      <div className="glass rounded-2xl p-6 flex flex-col gap-5">
        <div>
          <p className="text-brand-lavender font-semibold uppercase tracking-widest text-xs mb-2">
            Welcome Back
          </p>
          <h1 className="text-white font-bold text-2xl">Sign in to Coupld</h1>
        </div>

        {/* Social login buttons */}
        <div className="flex flex-col gap-2.5">
          {SOCIAL_BUTTONS.map(btn => {
            const Icon = btn.icon
            return (
              <button
                key={btn.id}
                onClick={() => handleSocial(btn.id)}
                disabled={!!socialLoading || loading}
                className="w-full py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2.5 transition-all active:scale-97 disabled:opacity-60"
                style={{ background: btn.bg, border: `1px solid ${btn.border}`, color: 'white' }}
              >
                {socialLoading === btn.id ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  <Icon />
                )}
                {btn.label}
              </button>
            )
          })}
        </div>

        <div className="flex items-center gap-3">
          <div className="flex-1 h-px" style={{ background: 'rgba(184,160,212,0.15)' }} />
          <span className="text-brand-textSub text-xs">or sign in with email</span>
          <div className="flex-1 h-px" style={{ background: 'rgba(184,160,212,0.15)' }} />
        </div>

        <div className="flex flex-col gap-3">
          <div>
            <label className="text-brand-textSub text-xs font-semibold uppercase tracking-widest mb-1.5 block">
              Email
            </label>
            <input
              readOnly
              defaultValue="alex@example.com"
              className="w-full rounded-xl px-4 py-3 text-white text-sm outline-none"
              style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(184,160,212,0.2)' }}
            />
          </div>
          <div>
            <label className="text-brand-textSub text-xs font-semibold uppercase tracking-widest mb-1.5 block">
              Password
            </label>
            <input
              readOnly
              type="password"
              defaultValue="password"
              className="w-full rounded-xl px-4 py-3 text-white text-sm outline-none"
              style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(184,160,212,0.2)' }}
            />
          </div>
        </div>

        <button
          onClick={handleSignIn}
          disabled={loading || !!socialLoading}
          className="w-full py-4 rounded-xl font-bold text-[#1C0B3A] flex items-center justify-center gap-2 transition-opacity hover:opacity-90 active:scale-[0.98] disabled:opacity-60"
          style={{ backgroundColor: '#D4A843' }}
        >
          {loading ? <Loader2 size={18} className="animate-spin" /> : 'Sign In'}
        </button>

        <p className="text-center text-brand-textSub text-sm">
          Don't have an account?{' '}
          <button onClick={() => navigate('/signup')} className="text-brand-lavender font-semibold">
            Create one
          </button>
        </p>
      </div>
    </motion.div>
  )
}
