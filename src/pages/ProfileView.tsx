import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate, useParams } from 'react-router-dom'
import { ChevronLeft, CheckCircle } from 'lucide-react'
import { profiles } from '../data/mockData'

function AnimatedBar({ value, delay }: { value: number; delay: number }) {
  const [width, setWidth] = useState(0)
  useEffect(() => {
    const t = setTimeout(() => setWidth(value), delay * 1000)
    return () => clearTimeout(t)
  }, [value, delay])
  return (
    <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.08)' }}>
      <div
        className="h-full rounded-full transition-all duration-700"
        style={{ width: `${width}%`, background: 'linear-gradient(90deg, #B8A0D4, #D4A843)' }}
      />
    </div>
  )
}

function ScoreCounter({ target }: { target: number }) {
  const [val, setVal] = useState(0)
  useEffect(() => {
    let start = 0
    const step = () => {
      start += 2
      if (start >= target) { setVal(target); return }
      setVal(start)
      requestAnimationFrame(step)
    }
    const t = setTimeout(() => requestAnimationFrame(step), 300)
    return () => clearTimeout(t)
  }, [target])
  return <>{val}</>
}

export default function ProfileView() {
  const { id } = useParams()
  const navigate = useNavigate()
  const profile = profiles.find((p) => p.id === id) || profiles[0]

  const dims = Object.entries(profile.dimensions) as [string, number][]

  return (
    <motion.div
      className="flex flex-col w-full min-h-screen bg-[#1C0B3A] pb-28"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Hero */}
      <div className="relative w-full" style={{ height: 360 }}>
        <img src={profile.photos[0]} alt={profile.name} className="w-full h-full object-cover" />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to bottom, transparent 40%, #1C0B3A 100%)' }}
        />
        <button
          onClick={() => navigate(-1)}
          className="absolute top-12 left-4 w-9 h-9 rounded-full flex items-center justify-center"
          style={{ background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(8px)' }}
        >
          <ChevronLeft size={20} className="text-white" />
        </button>
        <div className="absolute top-12 right-4 flex items-center gap-1 px-2.5 py-1 rounded-full"
          style={{ background: 'rgba(184,160,212,0.15)', border: '1px solid rgba(184,160,212,0.3)' }}
        >
          <CheckCircle size={12} className="text-brand-lavender" />
          <span className="text-brand-lavender text-xs font-semibold">Verified</span>
        </div>
        <div className="absolute bottom-4 left-5">
          <h1 className="text-white font-bold text-3xl">{profile.name}, {profile.age}</h1>
          <p className="text-brand-lavender text-sm mt-0.5">{profile.city}</p>
        </div>
      </div>

      {/* Gallery */}
      <div className="flex gap-2 px-5 mt-4 overflow-x-auto scrollbar-hide">
        {profile.photos.map((photo, i) => (
          <img
            key={i}
            src={photo}
            alt=""
            className="shrink-0 rounded-xl object-cover"
            style={{ width: 90, height: 110 }}
          />
        ))}
      </div>

      <div className="px-5 mt-6 flex flex-col gap-6">
        {/* Compatibility */}
        <div>
          <h2 className="text-white font-bold text-lg mb-4">Compatibility</h2>
          <div className="flex items-center gap-6 mb-5">
            <div className="relative flex items-center justify-center" style={{ width: 90, height: 90 }}>
              <svg viewBox="0 0 90 90" className="absolute inset-0" width="90" height="90">
                <circle cx="45" cy="45" r="38" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="8" />
                <circle
                  cx="45" cy="45" r="38" fill="none"
                  stroke="#D4A843" strokeWidth="8"
                  strokeDasharray={`${2 * Math.PI * 38 * profile.compatibility / 100} ${2 * Math.PI * 38}`}
                  strokeLinecap="round"
                  transform="rotate(-90 45 45)"
                />
              </svg>
              <span className="text-white font-bold text-2xl relative z-10">
                <ScoreCounter target={profile.compatibility} />%
              </span>
            </div>
            <div className="flex-1">
              <p className="text-brand-textSub text-sm leading-relaxed">
                Strong alignment across {dims.filter(([, v]) => v >= 88).length} of 8 dimensions.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            {dims.map(([key, val], i) => (
              <div key={key}>
                <div className="flex justify-between mb-1">
                  <span className="text-white text-xs capitalize font-medium">{key}</span>
                  <span className="text-brand-textSub text-xs">{val}%</span>
                </div>
                <AnimatedBar value={val} delay={0.3 + i * 0.08} />
              </div>
            ))}
          </div>
        </div>

        {/* Coach note */}
        <div className="rounded-2xl p-4"
          style={{ background: 'rgba(212,168,67,0.06)', border: '1px solid rgba(212,168,67,0.2)' }}
        >
          <p className="text-brand-gold font-semibold uppercase tracking-widest text-xs mb-2">
            From Your Coach
          </p>
          <p className="text-white text-sm leading-relaxed">{profile.coachNote}</p>
        </div>

        {/* CTAs */}
        <div className="flex flex-col gap-2">
          <button
            onClick={() => navigate(`/messages?thread=${profile.id}`)}
            className="w-full py-4 rounded-xl font-bold text-[#1C0B3A]"
            style={{ background: '#D4A843' }}
          >
            Start a Conversation
          </button>
          <div>
            <button
              className="w-full py-4 rounded-xl font-semibold text-white"
              style={{ background: 'rgba(184,160,212,0.1)', border: '1px solid #B8A0D4' }}
            >
              Book This Match
            </button>
            <p className="text-brand-textSub text-xs text-center mt-1.5">
              Uses 1 credit · 42 remaining
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
