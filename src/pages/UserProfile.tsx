import { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate, useLocation } from 'react-router-dom'
import {
  CheckCircle, Instagram, Camera, ChevronRight,
  Sparkles, Shield, MapPin, Edit2, Settings
} from 'lucide-react'

function FacebookIcon({ size = 18 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size}>
      <path fill="#1877F2" d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 4.99 3.657 9.128 8.438 9.878v-6.987h-2.54V12.073h2.54V9.846c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12.073h2.773l-.443 2.89h-2.33v6.988C20.343 21.201 24 17.063 24 12.073z"/>
    </svg>
  )
}

function XIcon({ size = 16 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size}>
      <path fill="white" d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  )
}
import { currentUser, alexPhotos } from '../data/mockData'
import CupidCharacter from '../components/CupidCharacter'

const CUPID_TIPS = [
  {
    id: 1,
    priority: 'High',
    tip: 'Add a photo from outdoors — your hiking interest is a key part of your personality but none of your current photos show it in context.',
  },
  {
    id: 2,
    priority: 'Medium',
    tip: 'Your bio is strong, but adding one concrete detail — a specific place, book, or experience — makes it significantly more memorable.',
  },
  {
    id: 3,
    priority: 'Medium',
    tip: 'Profiles with a third photo see 38% more first messages. You have two. Add one more.',
  },
  {
    id: 4,
    priority: 'Low',
    tip: 'Connecting your Instagram adds a layer of authenticity that high-intent matches respond well to.',
  },
]

const PRIORITY_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  High:   { bg: 'rgba(194,84,122,0.12)', text: '#C2547A', border: 'rgba(194,84,122,0.3)' },
  Medium: { bg: 'rgba(212,168,67,0.10)', text: '#D4A843',  border: 'rgba(212,168,67,0.3)' },
  Low:    { bg: 'rgba(184,160,212,0.10)', text: '#B8A0D4', border: 'rgba(184,160,212,0.25)' },
}

export default function UserProfile() {
  const navigate = useNavigate()
  const location = useLocation()
  const fromOnboarding = (location.state as { fromOnboarding?: boolean } | null)?.fromOnboarding === true
  const [igConnected, setIgConnected] = useState(false)
  const [fbConnected, setFbConnected] = useState(false)
  const [xConnected, setXConnected] = useState(false)

  return (
    <motion.div
      className="flex flex-col w-full min-h-screen bg-[#1C0B3A] pb-28"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Top bar */}
      <div
        className="sticky top-0 z-10 flex items-center justify-between px-5 py-4"
        style={{ background: 'rgba(28,11,58,0.96)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(184,160,212,0.08)' }}
      >
        <h1 className="text-white font-bold text-xl">My Profile</h1>
        <button>
          <Settings size={20} className="text-brand-textSub" />
        </button>
      </div>

      {/* Hero avatar */}
      <div className="flex flex-col items-center pt-8 pb-6 px-5">
        <div className="relative mb-4">
          {/* Profile photo */}
          <div
            className="w-24 h-24 rounded-full overflow-hidden"
            style={{ border: '3px solid rgba(184,160,212,0.4)', boxShadow: '0 0 28px rgba(184,160,212,0.2)' }}
          >
            <img
              src={alexPhotos[0]}
              alt="Alex"
              className="w-full h-full object-cover"
            />
          </div>
          {/* Edit button */}
          <button
            className="absolute bottom-0 right-0 w-8 h-8 rounded-full flex items-center justify-center"
            style={{ background: '#D4A843', border: '2px solid #1C0B3A' }}
          >
            <Edit2 size={13} style={{ color: '#1C0B3A' }} />
          </button>
        </div>

        <h2 className="text-white font-bold text-2xl">{currentUser.name}, {currentUser.age}</h2>
        <div className="flex items-center gap-1.5 mt-1">
          <MapPin size={13} className="text-brand-textSub" />
          <span className="text-brand-textSub text-sm">{currentUser.city}</span>
        </div>

        {/* Status badges */}
        <div className="flex items-center gap-2 mt-3">
          <div
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full"
            style={{ background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.3)' }}
          >
            <CheckCircle size={12} className="text-green-400" />
            <span className="text-green-400 font-semibold text-xs">ID Verified</span>
          </div>
          <div
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full"
            style={{ background: 'rgba(184,160,212,0.1)', border: '1px solid rgba(184,160,212,0.25)' }}
          >
            <Shield size={12} className="text-brand-lavender" />
            <span className="text-brand-lavender font-semibold text-xs">Age Verified</span>
          </div>
        </div>
      </div>

      <div className="px-5 flex flex-col gap-5">
        {/* Photos */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <p className="text-white font-semibold text-sm">Your Photos</p>
            <p className="text-brand-textSub text-xs">{alexPhotos.length} / 6</p>
          </div>
          <div className="flex gap-2">
            {alexPhotos.map((photo, i) => (
              <div key={i} className="relative rounded-xl overflow-hidden" style={{ width: 100, height: 120 }}>
                <img src={photo} alt="" className="w-full h-full object-cover" />
                {i === 0 && (
                  <div
                    className="absolute bottom-1 left-1 px-1.5 py-0.5 rounded text-white font-semibold"
                    style={{ background: 'rgba(212,168,67,0.9)', fontSize: 9 }}
                  >
                    Main
                  </div>
                )}
              </div>
            ))}
            {/* Add photo slot */}
            <button
              className="rounded-xl flex flex-col items-center justify-center gap-1 shrink-0"
              style={{
                width: 100, height: 120,
                background: 'rgba(255,255,255,0.03)',
                border: '1.5px dashed rgba(184,160,212,0.25)',
              }}
            >
              <Camera size={18} className="text-brand-lavender" />
              <span className="text-brand-textSub" style={{ fontSize: 10 }}>Add</span>
            </button>
          </div>
        </div>

        {/* Instagram */}
        <div
          className="rounded-2xl p-4 flex items-center gap-4"
          style={{
            background: igConnected
              ? 'rgba(184,160,212,0.08)'
              : 'rgba(255,255,255,0.03)',
            border: igConnected
              ? '1px solid rgba(184,160,212,0.3)'
              : '1px solid rgba(184,160,212,0.15)',
          }}
        >
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
            style={{
              background: 'linear-gradient(135deg, #833ab4, #fd1d1d, #fcb045)',
            }}
          >
            <Instagram size={20} className="text-white" />
          </div>
          <div className="flex-1">
            <p className="text-white font-semibold text-sm">Instagram</p>
            <p className="text-brand-textSub text-xs mt-0.5">
              {igConnected ? '@alex.london · Connected' : 'Adds authenticity to your profile'}
            </p>
          </div>
          <button
            onClick={() => setIgConnected(!igConnected)}
            className="px-3 py-1.5 rounded-full font-semibold text-xs shrink-0 transition-all"
            style={
              igConnected
                ? { background: 'rgba(255,255,255,0.06)', color: '#9B8FB0', border: '1px solid rgba(184,160,212,0.2)' }
                : { background: 'linear-gradient(135deg, #833ab4, #fd1d1d, #fcb045)', color: 'white' }
            }
          >
            {igConnected ? 'Connected' : 'Connect'}
          </button>
        </div>

        {/* Facebook */}
        <div
          className="rounded-2xl p-4 flex items-center gap-4"
          style={{
            background: fbConnected ? 'rgba(24,119,242,0.08)' : 'rgba(255,255,255,0.03)',
            border: fbConnected ? '1px solid rgba(24,119,242,0.35)' : '1px solid rgba(184,160,212,0.15)',
          }}
        >
          <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: 'rgba(24,119,242,0.15)' }}>
            <FacebookIcon size={20} />
          </div>
          <div className="flex-1">
            <p className="text-white font-semibold text-sm">Facebook</p>
            <p className="text-brand-textSub text-xs mt-0.5">
              {fbConnected ? 'alex.johnson · Connected' : 'Verify your identity with Facebook'}
            </p>
          </div>
          <button
            onClick={() => setFbConnected(!fbConnected)}
            className="px-3 py-1.5 rounded-full font-semibold text-xs shrink-0 transition-all"
            style={fbConnected
              ? { background: 'rgba(255,255,255,0.06)', color: '#9B8FB0', border: '1px solid rgba(184,160,212,0.2)' }
              : { background: 'rgba(24,119,242,0.2)', color: '#1877F2', border: '1px solid rgba(24,119,242,0.4)' }}
          >
            {fbConnected ? 'Connected' : 'Connect'}
          </button>
        </div>

        {/* X (Twitter) */}
        <div
          className="rounded-2xl p-4 flex items-center gap-4"
          style={{
            background: xConnected ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.03)',
            border: xConnected ? '1px solid rgba(255,255,255,0.25)' : '1px solid rgba(184,160,212,0.15)',
          }}
        >
          <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: 'rgba(255,255,255,0.1)' }}>
            <XIcon size={18} />
          </div>
          <div className="flex-1">
            <p className="text-white font-semibold text-sm">X (Twitter)</p>
            <p className="text-brand-textSub text-xs mt-0.5">
              {xConnected ? '@alex_london · Connected' : 'Show your public presence'}
            </p>
          </div>
          <button
            onClick={() => setXConnected(!xConnected)}
            className="px-3 py-1.5 rounded-full font-semibold text-xs shrink-0 transition-all"
            style={xConnected
              ? { background: 'rgba(255,255,255,0.06)', color: '#9B8FB0', border: '1px solid rgba(184,160,212,0.2)' }
              : { background: 'rgba(255,255,255,0.1)', color: 'white', border: '1px solid rgba(255,255,255,0.25)' }}
          >
            {xConnected ? 'Connected' : 'Connect'}
          </button>
        </div>

        {/* Cupid profile tips */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <CupidCharacter size={38} />
            <div>
              <div className="flex items-center gap-1.5">
                <p className="text-white font-semibold text-sm">Cupid's Suggestions</p>
                <Sparkles size={12} style={{ color: '#D4A843' }} />
              </div>
              <p className="text-brand-textSub text-xs mt-0.5">
                How to get better matches
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            {CUPID_TIPS.map((tip, i) => {
              const colors = PRIORITY_COLORS[tip.priority]
              return (
                <motion.div
                  key={tip.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.07 }}
                  className="rounded-2xl p-4"
                  style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(184,160,212,0.12)',
                  }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className="px-2 py-0.5 rounded-full font-semibold uppercase tracking-wide"
                      style={{ fontSize: 9, background: colors.bg, color: colors.text, border: `1px solid ${colors.border}` }}
                    >
                      {tip.priority} Priority
                    </span>
                  </div>
                  <p className="text-white text-sm leading-relaxed">{tip.tip}</p>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Profile completeness */}
        <div
          className="rounded-2xl p-4"
          style={{ background: 'rgba(212,168,67,0.06)', border: '1px solid rgba(212,168,67,0.18)' }}
        >
          <div className="flex items-center justify-between mb-2">
            <p className="text-brand-gold font-semibold text-sm" style={{ color: '#D4A843' }}>Profile Strength</p>
            <p className="text-brand-gold font-bold text-sm" style={{ color: '#D4A843' }}>72%</p>
          </div>
          <ProfileBar value={72} />
          <p className="text-brand-textSub text-xs mt-2">
            Connect Instagram and add one more photo to reach 90%.
          </p>
        </div>

        {/* Settings rows */}
        <div
          className="rounded-2xl overflow-hidden"
          style={{ border: '1px solid rgba(184,160,212,0.12)' }}
        >
          {[
            { label: 'Edit bio and details', sub: 'Architect · London · 28' },
            { label: 'Match preferences', sub: 'Women · 24–36 · London' },
            { label: 'Notification settings', sub: 'Matches, messages, coach' },
            { label: 'Subscription', sub: 'Free plan · 42 credits remaining' },
          ].map((row, i) => (
            <button
              key={row.label}
              className="w-full flex items-center justify-between px-4 py-3.5 text-left hover:bg-white/5 transition-colors"
              style={{ borderBottom: i < 3 ? '1px solid rgba(184,160,212,0.08)' : 'none' }}
              onClick={() => i === 3 && navigate('/upgrade')}
            >
              <div>
                <p className="text-white text-sm font-medium">{row.label}</p>
                <p className="text-brand-textSub text-xs mt-0.5">{row.sub}</p>
              </div>
              <ChevronRight size={16} className="text-brand-textSub shrink-0" />
            </button>
          ))}
        </div>

        {fromOnboarding && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="rounded-2xl p-5"
            style={{ background: 'rgba(184,160,212,0.07)', border: '1px solid rgba(184,160,212,0.2)' }}
          >
            <p className="text-white font-semibold text-sm">Onboarding complete</p>
            <p className="text-brand-textSub text-xs mt-1 leading-relaxed">
              Your profile is live. Use the <strong className="text-brand-lavender">Workflows</strong> button (top-left) to explore other parts of the prototype.
            </p>
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}

function ProfileBar({ value }: { value: number }) {
  return (
    <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.08)' }}>
      <motion.div
        className="h-full rounded-full"
        style={{ background: 'linear-gradient(90deg, #B8A0D4, #D4A843)' }}
        initial={{ width: 0 }}
        animate={{ width: `${value}%` }}
        transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
      />
    </div>
  )
}
