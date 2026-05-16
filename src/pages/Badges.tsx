import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  MessageCircle, Star, CalendarCheck, ClipboardCheck, Crown, Heart, Gem,
  Lock, Shield, Zap, Coffee, Users, Smile, Award, TrendingUp, CheckCircle,
  type LucideIcon,
} from 'lucide-react'

interface Badge {
  id: string
  icon: LucideIcon
  label: string
  description: string
  xp: number
  unlocked: boolean
  category: string
  rarity: 'common' | 'rare' | 'epic' | 'legendary'
  unlockedAt?: string
}

const RARITY_COLORS = {
  common:    { bg: 'rgba(13,148,136,0.08)',  border: 'rgba(13,148,136,0.2)',  text: '#0D9488', glow: 'rgba(13,148,136,0.1)' },
  rare:      { bg: 'rgba(107,181,196,0.1)',   border: 'rgba(107,181,196,0.3)',  text: '#6BB5C4', glow: 'rgba(107,181,196,0.2)'  },
  epic:      { bg: 'rgba(20,184,166,0.08)',   border: 'rgba(20,184,166,0.3)',   text: '#14B8A6', glow: 'rgba(20,184,166,0.15)' },
  legendary: { bg: 'rgba(232,96,122,0.1)',    border: 'rgba(232,96,122,0.4)',   text: '#E8607A', glow: 'rgba(232,96,122,0.25)' },
}

const ALL_BADGES: Badge[] = [
  // Connection
  { id: 'first-msg',    icon: MessageCircle, label: 'First Words',         description: 'Sent your first message.',                  xp: 25,  unlocked: true,  category: 'Connection', rarity: 'common',    unlockedAt: '3 days ago' },
  { id: 'first-match',  icon: Star,          label: 'First Match',         description: 'Received your first curated match.',         xp: 25,  unlocked: true,  category: 'Connection', rarity: 'common',    unlockedAt: '3 days ago' },
  { id: 'convo-spark',  icon: Zap,           label: 'Conversation Spark',  description: 'Kept a thread going for 10+ messages.',      xp: 50,  unlocked: true,  category: 'Connection', rarity: 'rare',      unlockedAt: '2 days ago' },
  { id: 'good-listener',icon: Smile,         label: 'Good Listener',       description: 'Your match gave you a positive rating.',     xp: 75,  unlocked: false, category: 'Connection', rarity: 'rare'       },
  { id: 'popular',      icon: Users,         label: 'In Demand',           description: '3 matches actively messaging you.',          xp: 100, unlocked: false, category: 'Connection', rarity: 'epic'       },

  // Dating
  { id: 'first-date',   icon: CalendarCheck, label: 'First Date',          description: 'Went on your first Coupld-planned date.',    xp: 100, unlocked: true,  category: 'Dating',     rarity: 'rare',      unlockedAt: 'Yesterday' },
  { id: 'gift-sender',  icon: Coffee,        label: 'Thoughtful',          description: 'Sent a gift through Coupld.',                xp: 75,  unlocked: true,  category: 'Dating',     rarity: 'rare',      unlockedAt: '2 days ago' },
  { id: 'second-date',  icon: TrendingUp,    label: 'Second Chapter',      description: 'Went on a second date with the same person.', xp: 125, unlocked: false, category: 'Dating',     rarity: 'epic'       },
  { id: 'adventurer',   icon: Star,          label: 'Weekend Explorer',    description: 'Booked 3 different venue types with Coupld.', xp: 150, unlocked: false, category: 'Dating',     rarity: 'epic'       },

  // Relationship
  { id: 'review',       icon: ClipboardCheck,label: 'First Review',        description: 'Gave your first date feedback.',             xp: 50,  unlocked: true,  category: 'Relationship', rarity: 'common',  unlockedAt: 'Yesterday' },
  { id: 'exclusive',    icon: Heart,         label: 'The One',             description: 'Declared an exclusive relationship.',        xp: 500, unlocked: false, category: 'Relationship', rarity: 'legendary' },
  { id: 'one-month',    icon: Award,         label: '1 Month Strong',      description: 'Together for one month.',                    xp: 200, unlocked: false, category: 'Relationship', rarity: 'epic'       },
  { id: 'three-months', icon: CheckCircle,   label: '3 Months In',         description: 'Together for three months.',                 xp: 350, unlocked: false, category: 'Relationship', rarity: 'epic'       },
  { id: 'engaged',      icon: Gem,           label: 'Engaged',             description: 'Reported an engagement.',                    xp: 750, unlocked: false, category: 'Relationship', rarity: 'legendary' },
  { id: 'married',      icon: Crown,         label: 'Married',             description: 'Reported a marriage.',                      xp: 1000, unlocked: false, category: 'Relationship', rarity: 'legendary' },

  // Trust & Safety
  { id: 'verified',     icon: Shield,        label: 'ID Verified',         description: 'Verified your identity.',                    xp: 75,  unlocked: true,  category: 'Trust',      rarity: 'rare',      unlockedAt: '3 days ago' },
  { id: 'safe-sender',  icon: CheckCircle,   label: 'Safe Sender',         description: '90 days with zero content warnings.',        xp: 150, unlocked: false, category: 'Trust',      rarity: 'epic'       },

  // Premium
  { id: 'premium',      icon: Crown,         label: 'Premium Member',      description: 'Upgraded to a Coupld Premium plan.',         xp: 200, unlocked: false, category: 'Premium',    rarity: 'legendary'  },
]

const CATEGORIES = ['All', 'Connection', 'Dating', 'Relationship', 'Trust', 'Premium']

const LEVELS = [
  { level: 1, label: 'Newcomer',  minXp: 0,    maxXp: 150,  color: '#B8A0D4' },
  { level: 2, label: 'Connector', minXp: 150,  maxXp: 350,  color: '#6BB5C4' },
  { level: 3, label: 'Charmer',   minXp: 350,  maxXp: 600,  color: '#D4A843' },
  { level: 4, label: 'Devoted',   minXp: 600,  maxXp: 900,  color: '#E8607A' },
  { level: 5, label: 'Soulmate',  minXp: 900,  maxXp: 9999, color: '#ffffff' },
]

function ProgressBar({ value, color }: { value: number; color: string }) {
  const [width, setWidth] = useState(0)
  useEffect(() => {
    const t = setTimeout(() => setWidth(value), 350)
    return () => clearTimeout(t)
  }, [value])
  return (
    <div className="h-2 rounded-full overflow-hidden" style={{ background: 'rgba(0,0,0,0.08)' }}>
      <div
        className="h-full rounded-full transition-all duration-1000"
        style={{ width: `${width}%`, background: `linear-gradient(90deg, ${color}99, ${color})` }}
      />
    </div>
  )
}

export default function Badges() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [selectedBadge, setSelectedBadge] = useState<Badge | null>(null)

  const totalXp = ALL_BADGES.filter(b => b.unlocked).reduce((sum, b) => sum + b.xp, 0)
  const unlockedCount = ALL_BADGES.filter(b => b.unlocked).length

  const currentLevel = LEVELS.reduce((cur, lv) => (totalXp >= lv.minXp ? lv : cur), LEVELS[0])
  const nextLevel = LEVELS.find(lv => lv.level === currentLevel.level + 1)
  const xpIntoLevel = totalXp - currentLevel.minXp
  const xpNeeded = nextLevel ? nextLevel.minXp - currentLevel.minXp : 1
  const levelProgress = Math.min((xpIntoLevel / xpNeeded) * 100, 100)

  const filtered = activeCategory === 'All'
    ? ALL_BADGES
    : ALL_BADGES.filter(b => b.category === activeCategory)

  return (
    <motion.div
      className="flex flex-col w-full min-h-screen bg-white pb-28"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Top bar */}
      <div
        className="sticky top-0 z-10 px-5 py-4"
        style={{ background: 'rgba(255,255,255,0.96)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(0,0,0,0.08)' }}
      >
        <h1 className="text-gray-900 font-bold text-xl">Badges &amp; Journey</h1>
        <p className="text-brand-textSub text-xs mt-0.5">{unlockedCount} of {ALL_BADGES.length} unlocked</p>
      </div>

      {/* Level card */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mx-5 mt-5 rounded-2xl p-5"
        style={{
          background: 'linear-gradient(135deg, rgba(13,148,136,0.06) 0%, rgba(249,250,251,1) 100%)',
          border: `1px solid ${currentLevel.color}40`,
          boxShadow: `0 0 30px ${currentLevel.color}18`,
        }}
      >
        <div className="flex items-center justify-between mb-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-2xl" style={{ color: currentLevel.color }}>Lv.{currentLevel.level}</span>
              <span className="font-semibold text-lg text-gray-900">{currentLevel.label}</span>
            </div>
            <p className="text-brand-textSub text-xs mt-0.5">
              {nextLevel ? `${xpNeeded - xpIntoLevel} XP to ${nextLevel.label}` : 'Max level reached'}
            </p>
          </div>
          <div className="text-right">
            <p className="font-bold text-xl" style={{ color: currentLevel.color }}>{totalXp}</p>
            <p className="text-brand-textSub text-xs">total XP</p>
          </div>
        </div>
        <ProgressBar value={levelProgress} color={currentLevel.color} />

        {/* Stats row */}
        <div className="flex gap-4 mt-4">
          {[
            { label: 'Badges', value: unlockedCount },
            { label: 'Dates', value: 1 },
            { label: 'Streak', value: '3d' },
          ].map(s => (
            <div key={s.label} className="flex-1 text-center">
              <p className="text-gray-900 font-bold text-lg">{s.value}</p>
              <p className="text-brand-textSub text-xs">{s.label}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Category filter */}
      <div className="flex gap-2 px-5 mt-5 overflow-x-auto scrollbar-hide pb-1">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className="shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold transition-all"
            style={
              activeCategory === cat
                ? { background: '#0D9488', color: 'white' }
                : { background: 'rgba(0,0,0,0.04)', color: '#6B7280', border: '1px solid rgba(0,0,0,0.08)' }
            }
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Badge grid */}
      <div className="grid grid-cols-2 gap-3 px-5 mt-4">
        {filtered.map((badge, i) => {
          const Icon = badge.icon
          const rc = RARITY_COLORS[badge.rarity]

          return (
            <motion.button
              key={badge.id}
              initial={{ opacity: 0, scale: 0.88 }}
              animate={{ opacity: badge.unlocked ? 1 : 0.45, scale: 1 }}
              transition={{ delay: i * 0.04, type: 'spring', damping: 20 }}
              onClick={() => setSelectedBadge(badge)}
              className="relative rounded-2xl p-4 flex flex-col items-center text-center text-left transition-all active:scale-97"
              style={{
                background: badge.unlocked ? rc.bg : 'rgba(0,0,0,0.02)',
                border: badge.unlocked ? `1px solid ${rc.border}` : '1px solid rgba(0,0,0,0.07)',
                boxShadow: badge.unlocked ? `0 0 20px ${rc.glow}` : 'none',
              }}
            >
              {!badge.unlocked && (
                <Lock size={12} className="absolute top-2.5 right-2.5 text-brand-textSub opacity-60" />
              )}

              {/* XP chip */}
              {badge.unlocked && (
                <div
                  className="absolute top-2.5 right-2.5 px-1.5 py-0.5 rounded-full font-bold"
                  style={{ background: `${rc.text}20`, color: rc.text, fontSize: 9 }}
                >
                  +{badge.xp}XP
                </div>
              )}

              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-2.5 mt-1"
                style={{
                  background: badge.unlocked ? `${rc.text}18` : 'rgba(0,0,0,0.04)',
                }}
              >
                <Icon size={24} style={{ color: badge.unlocked ? rc.text : '#D1D5DB' }} />
              </div>

              <p className={`font-bold text-xs mb-0.5 ${badge.unlocked ? 'text-gray-900' : 'text-brand-textSub'}`}>
                {badge.label}
              </p>
              <p className="text-brand-textSub leading-tight" style={{ fontSize: 10 }}>
                {badge.description}
              </p>

              {/* Rarity pill */}
              <div
                className="mt-2 px-2 py-0.5 rounded-full font-semibold uppercase tracking-wider"
                style={{
                  fontSize: 8,
                  background: badge.unlocked ? `${rc.text}18` : 'rgba(0,0,0,0.04)',
                  color: badge.unlocked ? rc.text : '#9CA3AF',
                }}
              >
                {badge.rarity}
              </div>
            </motion.button>
          )
        })}
      </div>

      {/* Badge detail sheet */}
      <AnimatePresence>
        {selectedBadge && (
          <>
            <motion.div
              className="fixed inset-0 z-30 bg-black/50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedBadge(null)}
            />
            <motion.div
              className="fixed bottom-0 left-0 right-0 mx-auto max-w-[390px] z-40 rounded-t-3xl p-6"
              style={{ background: '#FFFFFF', border: '1px solid rgba(0,0,0,0.08)' }}
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 26, stiffness: 200 }}
            >
              {(() => {
                const b = selectedBadge
                const Icon = b.icon
                const rc = RARITY_COLORS[b.rarity]
                return (
                  <>
                    <div className="flex items-center gap-4 mb-4">
                      <div
                        className="w-16 h-16 rounded-2xl flex items-center justify-center shrink-0"
                        style={{
                          background: b.unlocked ? rc.bg : 'rgba(0,0,0,0.04)',
                          border: b.unlocked ? `1px solid ${rc.border}` : '1px solid rgba(0,0,0,0.08)',
                          boxShadow: b.unlocked ? `0 0 24px ${rc.glow}` : 'none',
                        }}
                      >
                        <Icon size={30} style={{ color: b.unlocked ? rc.text : '#D1D5DB' }} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-0.5">
                          <p className="text-gray-900 font-bold text-lg">{b.label}</p>
                        </div>
                        <div
                          className="inline-block px-2 py-0.5 rounded-full font-semibold uppercase tracking-wider"
                          style={{ fontSize: 9, background: `${rc.text}18`, color: rc.text }}
                        >
                          {b.rarity}
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="font-bold text-xl" style={{ color: rc.text }}>{b.xp}</p>
                        <p className="text-brand-textSub text-xs">XP</p>
                      </div>
                    </div>

                    <p className="text-brand-textSub text-sm leading-relaxed mb-4">{b.description}</p>

                    {b.unlocked && b.unlockedAt && (
                      <div
                        className="flex items-center gap-2 rounded-xl px-4 py-2.5 mb-4"
                        style={{ background: 'rgba(120,196,160,0.08)', border: '1px solid rgba(120,196,160,0.25)' }}
                      >
                        <CheckCircle size={14} style={{ color: '#78C4A0' }} />
                        <p className="text-sm" style={{ color: '#78C4A0' }}>Unlocked {b.unlockedAt}</p>
                      </div>
                    )}

                    {!b.unlocked && (
                      <div
                        className="flex items-center gap-2 rounded-xl px-4 py-2.5 mb-4"
                        style={{ background: 'rgba(0,0,0,0.04)', border: '1px solid rgba(0,0,0,0.08)' }}
                      >
                        <Lock size={14} className="text-brand-textSub" />
                        <p className="text-brand-textSub text-sm">Complete the action above to unlock</p>
                      </div>
                    )}

                    <button
                      onClick={() => setSelectedBadge(null)}
                      className="w-full py-3 rounded-xl font-semibold text-sm"
                      style={{ background: 'rgba(0,0,0,0.04)', color: '#6B7280', border: '1px solid rgba(0,0,0,0.08)' }}
                    >
                      Close
                    </button>
                  </>
                )
              })()}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
