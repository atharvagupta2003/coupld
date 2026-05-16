import { useState, type ReactNode } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { ChevronLeft } from 'lucide-react'
import SkipButton from '../components/SkipButton'
import GamificationBadge from '../components/GamificationBadge'

function InstagramIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <rect x="2" y="2" width="20" height="20" rx="6" stroke="url(#ig-grad)" strokeWidth="1.8"/>
      <circle cx="12" cy="12" r="4.5" stroke="url(#ig-grad)" strokeWidth="1.8"/>
      <circle cx="17.5" cy="6.5" r="1.2" fill="url(#ig-grad)"/>
      <defs>
        <linearGradient id="ig-grad" x1="2" y1="22" x2="22" y2="2" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F9A825"/>
          <stop offset="0.5" stopColor="#E91E63"/>
          <stop offset="1" stopColor="#9C27B0"/>
        </linearGradient>
      </defs>
    </svg>
  )
}

function AppleIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="#111827">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
    </svg>
  )
}

function GoogleIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  )
}

function SocialButton({ icon, label, onClick }: { icon: ReactNode; label: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center justify-center gap-2.5 w-full py-3 rounded-xl font-medium text-sm text-gray-900 transition-all active:scale-[0.98]"
      style={{ background: 'rgba(0,0,0,0.04)', border: '1px solid rgba(0,0,0,0.1)' }}
    >
      {icon}
      {label}
    </button>
  )
}

export default function SignUp() {
  const navigate = useNavigate()
  const [showBadge, setShowBadge] = useState(false)

  const handleContinue = () => {
    setShowBadge(true)
  }

  const handleSocial = () => {
    setShowBadge(true)
  }

  return (
    <motion.div
      className="flex flex-col min-h-screen w-full bg-white px-5 pt-14 pb-8"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.35 }}
    >
      <SkipButton />
      <button onClick={() => navigate('/splash')} className="mb-8 text-gray-900 w-fit">
        <ChevronLeft size={24} />
      </button>

      <div className="glass rounded-2xl p-6 flex flex-col gap-5">
        <div>
          <p className="text-brand-lavender font-semibold uppercase tracking-widest text-xs mb-2">
            Get Started
          </p>
          <h1 className="text-gray-900 font-bold text-2xl mb-1">Create your account</h1>
          <p className="text-brand-textSub text-sm">
            Takes about five minutes. Every answer improves your matches.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          {['Full name', 'Email address', 'Password'].map((label, i) => (
            <div key={label}>
              <label className="text-brand-textSub text-xs font-semibold uppercase tracking-widest mb-1.5 block">
                {label}
              </label>
              <input
                type={i === 2 ? 'password' : 'text'}
                placeholder={label}
                className="w-full rounded-xl px-4 py-3 text-gray-900 text-sm outline-none placeholder:text-brand-textSub/50"
                style={{ background: 'rgba(0,0,0,0.04)', border: '1px solid rgba(0,0,0,0.1)' }}
              />
            </div>
          ))}
        </div>

        <button
          onClick={handleContinue}
          className="w-full py-4 rounded-xl font-bold text-white transition-opacity hover:opacity-90 active:scale-[0.98]"
          style={{ backgroundColor: '#0D9488' }}
        >
          Continue
        </button>

        {/* Divider */}
        <div className="flex items-center gap-3">
          <div className="flex-1 h-px" style={{ background: 'rgba(0,0,0,0.08)' }} />
          <span className="text-brand-textSub text-xs">or continue with</span>
          <div className="flex-1 h-px" style={{ background: 'rgba(0,0,0,0.08)' }} />
        </div>

        {/* Social logins */}
        <div className="flex flex-col gap-2.5">
          <SocialButton icon={<InstagramIcon />} label="Continue with Instagram" onClick={handleSocial} />
          <div className="grid grid-cols-2 gap-2.5">
            <SocialButton icon={<AppleIcon />} label="Apple" onClick={handleSocial} />
            <SocialButton icon={<GoogleIcon />} label="Google" onClick={handleSocial} />
          </div>
        </div>

        <p className="text-center text-brand-textSub text-sm">
          Already have an account?{' '}
          <button onClick={() => navigate('/login')} className="text-brand-lavender font-semibold">
            Sign in
          </button>
        </p>
      </div>

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
