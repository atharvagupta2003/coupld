import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Bell, X, RefreshCw, Lock, Eye, EyeOff, Coins } from 'lucide-react'
import { profiles, currentUser, type Profile } from '../data/mockData'
import CupidCharacter from '../components/CupidCharacter'

const REPLACE_COST = 5

// Extra profiles available as replacements
const REPLACEMENT_POOL: Profile[] = [
  {
    id: 'r1',
    name: 'Rachel',
    age: 28,
    city: 'London',
    photos: ['https://images.pexels.com/photos/2520446/pexels-photo-2520446.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800'],
    bio: 'Freelance photographer. Endlessly curious. Will always order the most interesting thing on the menu.',
    compatibility: 77,
    dimensions: { values: 80, personality: 82, lifestyle: 76, emotional: 78, attachment: 80, social: 84, intent: 75, aesthetic: 88 },
    traits: ['Creative', 'Independent', 'Curious'],
    coachNote: 'Rachel has a high aesthetic alignment with you and her curiosity dimension is particularly strong.',
  },
  {
    id: 'r2',
    name: 'Julia',
    age: 30,
    city: 'London',
    photos: ['https://images.pexels.com/photos/4219910/pexels-photo-4219910.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800'],
    bio: 'Marketing director. Runs marathons. Brutally honest — always.',
    compatibility: 75,
    dimensions: { values: 76, personality: 80, lifestyle: 78, emotional: 74, attachment: 76, social: 88, intent: 78, aesthetic: 72 },
    traits: ['Driven', 'Active', 'Direct'],
    coachNote: 'Julia is goal-oriented and values directness — similar to how you communicate. High social score.',
  },
  {
    id: 'r3',
    name: 'Priya',
    age: 29,
    city: 'London',
    photos: ['https://images.pexels.com/photos/36084709/pexels-photo-36084709.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800'],
    bio: 'Biotech researcher. Reads Ursula Le Guin. Quietly ambitious.',
    compatibility: 73,
    dimensions: { values: 78, personality: 76, lifestyle: 72, emotional: 80, attachment: 74, social: 70, intent: 82, aesthetic: 76 },
    traits: ['Intellectual', 'Ambitious', 'Warm'],
    coachNote: 'Priya leads with emotional depth — strong EI alignment. Her intent score is high, which matches yours.',
  },
]

// Hidden profile — this person has chosen to hide their photo
const HIDDEN_PROFILE = {
  id: 'hidden-1',
  name: 'Emma',
  age: 28,
  city: 'London',
  bio: 'Works in law. Intentional about who I spend time with. Prefer to connect on values first, photos later.',
  compatibility: 79,
  traits: ['Private', 'Values-driven', 'Serious intent'],
  coachNote: "Emma has chosen to hide her photo — she prefers to connect on depth and values before appearance. In our matching data, this is a reliable indicator of serious intent. Six of your eight dimensions are in strong alignment.",
}

interface Slot {
  profile: Profile | null
  hidden?: boolean
  key: string
}

function HiddenPhotoCard() {
  return (
    <div
      className="w-full flex flex-col items-center justify-center gap-3"
      style={{ height: 280, background: 'linear-gradient(145deg, rgba(45,27,78,0.8) 0%, rgba(28,11,58,1) 100%)' }}
    >
      {/* Silhouette */}
      <div
        className="relative flex items-center justify-center"
        style={{ width: 90, height: 90 }}
      >
        <svg width="90" height="90" viewBox="0 0 90 90" fill="none">
          <circle cx="45" cy="45" r="45" fill="rgba(184,160,212,0.08)" />
          <circle cx="45" cy="32" r="16" fill="rgba(184,160,212,0.2)" />
          <path d="M10 82 C10 60 25 52 45 52 C65 52 80 60 80 82Z" fill="rgba(184,160,212,0.2)" />
        </svg>
        <div
          className="absolute bottom-0 right-0 w-7 h-7 rounded-full flex items-center justify-center"
          style={{ background: 'rgba(28,11,58,0.9)', border: '2px solid rgba(184,160,212,0.3)' }}
        >
          <EyeOff size={13} className="text-brand-lavender" />
        </div>
      </div>
      <div className="text-center px-6">
        <p className="text-brand-lavender font-semibold text-sm">Photo hidden</p>
        <p className="text-brand-textSub text-xs mt-1 leading-relaxed">
          This person has chosen to keep their photo private. They connect on values first.
        </p>
      </div>
    </div>
  )
}

export default function Home() {
  const navigate = useNavigate()
  const [credits, setCredits] = useState(currentUser.credits)
  const [showCupid, setShowCupid] = useState(false)
  const [replacingKey, setReplacingKey] = useState<string | null>(null)
  const [replacementIdx, setReplacementIdx] = useState(0)
  const [showInsufficientCredits, setShowInsufficientCredits] = useState(false)

  // Build initial slots: first 2 real profiles, hidden profile, last 2 real profiles
  const [slots, setSlots] = useState<Slot[]>([
    { profile: profiles[0], key: profiles[0].id },
    { profile: profiles[1], key: profiles[1].id },
    { profile: null, hidden: true, key: 'hidden-1' },
    { profile: profiles[2], key: profiles[2].id },
    { profile: profiles[3], key: profiles[3].id },
  ])

  const handleReplace = (slotKey: string, slotIdx: number) => {
    if (replacingKey) return
    if (credits < REPLACE_COST) {
      setShowInsufficientCredits(true)
      setTimeout(() => setShowInsufficientCredits(false), 2200)
      return
    }
    const nextReplacement = REPLACEMENT_POOL[replacementIdx % REPLACEMENT_POOL.length]
    setCredits((c) => c - REPLACE_COST)
    setReplacingKey(slotKey)
    setTimeout(() => {
      setSlots((prev) =>
        prev.map((s, i) =>
          i === slotIdx
            ? { profile: nextReplacement, key: `${nextReplacement.id}-${Date.now()}` }
            : s
        )
      )
      setReplacementIdx((i) => i + 1)
      setReplacingKey(null)
    }, 450)
  }

  return (
    <motion.div
      className="flex flex-col w-full min-h-screen bg-[#1C0B3A] pb-24"
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
        <span className="text-white font-bold text-lg pl-16">Coupld</span>
        <div className="flex items-center gap-2">
          <Bell size={20} className="text-brand-textSub" />
          {/* Credits badge */}
          <motion.div
            key={credits}
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full"
            style={{ background: 'rgba(212,168,67,0.15)', border: '1px solid rgba(212,168,67,0.5)' }}
          >
            <Coins size={12} style={{ color: '#D4A843' }} />
            <span className="font-bold text-xs" style={{ color: '#D4A843' }}>{credits} credits</span>
          </motion.div>
        </div>
      </div>

      {/* Insufficient credits toast */}
      <AnimatePresence>
        {showInsufficientCredits && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mx-4 mt-3 px-4 py-3 rounded-xl text-sm font-medium text-center"
            style={{ background: 'rgba(194,84,122,0.15)', border: '1px solid rgba(194,84,122,0.35)', color: '#E08090' }}
          >
            Not enough credits. <button onClick={() => navigate('/upgrade')} className="underline font-semibold">Upgrade to get more</button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="px-5 pt-5 pb-2">
        <h2 className="text-white font-bold text-xl">Your Matches</h2>
        <p className="text-brand-textSub text-xs mt-1">
          5 curated for you · Replace any match for {REPLACE_COST} credits
        </p>
      </div>

      <div className="flex flex-col gap-4 px-4 mt-3">
        <AnimatePresence mode="popLayout">
          {slots.map((slot, slotIdx) => {
            const isReplacing = replacingKey === slot.key

            if (slot.hidden) {
              // Hidden profile card
              return (
                <motion.div
                  key={slot.key}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: isReplacing ? 0.3 : 1, y: 0, scale: isReplacing ? 0.97 : 1 }}
                  exit={{ opacity: 0, x: -40, scale: 0.95 }}
                  transition={{ delay: slotIdx * 0.06 }}
                  className="rounded-2xl overflow-hidden"
                  style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(184,160,212,0.15)' }}
                >
                  <div className="relative">
                    <HiddenPhotoCard />
                    {/* Badges */}
                    <div className="absolute top-3 left-3 flex gap-2">
                      <span
                        className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold"
                        style={{ background: 'rgba(184,160,212,0.18)', border: '1px solid rgba(184,160,212,0.35)', color: '#B8A0D4' }}
                      >
                        <EyeOff size={10} /> Private mode
                      </span>
                    </div>
                    <span
                      className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-xs font-bold"
                      style={{ background: 'rgba(212,168,67,0.15)', border: '1px solid #D4A843', color: '#D4A843' }}
                    >
                      {HIDDEN_PROFILE.compatibility}% match
                    </span>
                  </div>

                  <div className="p-4">
                    <div className="flex items-baseline justify-between mb-2">
                      <span className="text-white font-bold text-lg">{HIDDEN_PROFILE.name}, {HIDDEN_PROFILE.age}</span>
                      <span className="text-brand-textSub text-xs">{HIDDEN_PROFILE.city}</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5 mb-2">
                      {HIDDEN_PROFILE.traits.map((t) => (
                        <span
                          key={t}
                          className="px-2.5 py-1 rounded-full text-xs"
                          style={{ background: 'transparent', border: '1px solid rgba(184,160,212,0.3)', color: '#B8A0D4' }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                    <p className="text-brand-textSub text-xs leading-relaxed">{HIDDEN_PROFILE.bio}</p>

                    {/* Coach note */}
                    <div
                      className="mt-3 px-3 py-2.5 rounded-xl"
                      style={{ background: 'rgba(184,160,212,0.06)', border: '1px solid rgba(184,160,212,0.15)' }}
                    >
                      <p className="text-brand-textSub text-xs leading-relaxed italic">"{HIDDEN_PROFILE.coachNote}"</p>
                    </div>
                  </div>

                  <div className="flex gap-2 px-4 py-3" style={{ borderTop: '1px solid rgba(184,160,212,0.1)' }}>
                    <button
                      onClick={() => handleReplace(slot.key, slotIdx)}
                      disabled={!!replacingKey}
                      className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl text-xs font-semibold shrink-0 transition-all disabled:opacity-40"
                      style={{ border: '1px solid rgba(184,160,212,0.25)', color: '#9B8FB0', background: 'rgba(184,160,212,0.06)' }}
                    >
                      <RefreshCw size={12} className={isReplacing ? 'animate-spin' : ''} />
                      {REPLACE_COST} cr
                    </button>
                    <button
                      className="flex-1 py-2.5 rounded-xl text-sm font-bold text-[#1C0B3A]"
                      style={{ background: '#D4A843' }}
                    >
                      <span className="flex items-center justify-center gap-1.5">
                        <Eye size={14} />
                        Connect First
                      </span>
                    </button>
                  </div>
                </motion.div>
              )
            }

            const profile = slot.profile!
            return (
              <motion.div
                key={slot.key}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isReplacing ? 0.3 : 1, y: 0, scale: isReplacing ? 0.97 : 1 }}
                exit={{ opacity: 0, x: -40, scale: 0.95 }}
                transition={{ delay: slotIdx * 0.06 }}
                className="rounded-2xl overflow-hidden"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(184,160,212,0.15)' }}
              >
                <div className="relative">
                  <img
                    src={profile.photos[0]}
                    alt={profile.name}
                    className="w-full object-cover"
                    style={{ height: 280 }}
                  />
                  <span
                    className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-xs font-bold"
                    style={{ background: 'rgba(212,168,67,0.15)', border: '1px solid #D4A843', color: '#D4A843' }}
                  >
                    {profile.compatibility}% match
                  </span>
                </div>

                <div className="p-4">
                  <div className="flex items-baseline justify-between mb-2">
                    <span className="text-white font-bold text-lg">{profile.name}, {profile.age}</span>
                    <span className="text-brand-textSub text-xs">{profile.city}</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    {profile.traits.map((t) => (
                      <span
                        key={t}
                        className="px-2.5 py-1 rounded-full text-xs"
                        style={{ background: 'transparent', border: '1px solid rgba(184,160,212,0.3)', color: '#B8A0D4' }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <p className="text-brand-textSub text-xs truncate">{profile.bio}</p>
                </div>

                <div className="flex gap-2 px-4 py-3" style={{ borderTop: '1px solid rgba(184,160,212,0.1)' }}>
                  {/* Replace button */}
                  <button
                    onClick={() => handleReplace(slot.key, slotIdx)}
                    disabled={!!replacingKey}
                    className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl text-xs font-semibold shrink-0 transition-all disabled:opacity-40 active:scale-95"
                    style={{ border: '1px solid rgba(184,160,212,0.25)', color: '#9B8FB0', background: 'rgba(184,160,212,0.06)' }}
                    title={`Replace this match for ${REPLACE_COST} credits`}
                  >
                    <RefreshCw size={12} className={isReplacing ? 'animate-spin' : ''} />
                    {REPLACE_COST} cr
                  </button>
                  <button
                    onClick={() => navigate(`/profile/${profile.id}`)}
                    className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-white"
                    style={{ border: '1px solid rgba(184,160,212,0.2)' }}
                  >
                    View Profile
                  </button>
                  <button
                    onClick={() => navigate('/messages')}
                    className="flex-1 py-2.5 rounded-xl text-sm font-bold text-[#1C0B3A]"
                    style={{ background: '#D4A843' }}
                  >
                    Message
                  </button>
                </div>
              </motion.div>
            )
          })}
        </AnimatePresence>

        {/* Credits info strip */}
        <div
          className="rounded-xl px-4 py-3 flex items-center gap-3"
          style={{ background: 'rgba(212,168,67,0.06)', border: '1px solid rgba(212,168,67,0.15)' }}
        >
          <Coins size={16} style={{ color: '#D4A843' }} className="shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="text-white text-xs font-semibold">You have <span style={{ color: '#D4A843' }}>{credits} credits</span> remaining</p>
            <p className="text-brand-textSub text-xs mt-0.5">Replace a match costs {REPLACE_COST} credits. Get more with Premium.</p>
          </div>
          <button
            onClick={() => navigate('/upgrade')}
            className="shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold"
            style={{ background: 'rgba(212,168,67,0.15)', color: '#D4A843', border: '1px solid rgba(212,168,67,0.3)' }}
          >
            Get more
          </button>
        </div>

        {/* Locked / premium section */}
        <div className="relative rounded-2xl overflow-hidden" style={{ height: 200 }}>
          <div className="absolute inset-0 flex flex-col gap-3 p-4 opacity-20 blur-sm pointer-events-none">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-12 rounded-xl" style={{ background: 'rgba(255,255,255,0.06)' }} />
            ))}
          </div>
          <div
            className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-6"
            style={{ background: 'rgba(28,11,58,0.75)', backdropFilter: 'blur(4px)' }}
          >
            <Lock size={24} className="text-brand-lavender" />
            <p className="text-white font-semibold text-sm text-center">Unlock unlimited matches with Premium</p>
            <button
              onClick={() => navigate('/upgrade')}
              className="px-6 py-2.5 rounded-xl font-bold text-sm text-[#1C0B3A]"
              style={{ background: '#D4A843' }}
            >
              Upgrade now
            </button>
          </div>
        </div>
      </div>

      {/* Cupid floating button */}
      <motion.button
        className="fixed bottom-20 right-2 z-20"
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        onClick={() => setShowCupid(true)}
        whileTap={{ scale: 0.9 }}
      >
        <CupidCharacter size={50} />
      </motion.button>

      {/* Cupid sheet */}
      <AnimatePresence>
        {showCupid && (
          <>
            <motion.div
              className="fixed inset-0 z-30 bg-black/40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowCupid(false)}
            />
            <motion.div
              className="fixed bottom-0 left-0 right-0 mx-auto max-w-[390px] z-40 rounded-t-2xl p-6"
              style={{ background: '#1C0B3A', border: '1px solid rgba(184,160,212,0.15)' }}
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 26, stiffness: 200 }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <CupidCharacter size={36} />
                  <p className="text-brand-lavender font-semibold uppercase tracking-widest text-xs">
                    From Your Coach
                  </p>
                </div>
                <button onClick={() => setShowCupid(false)}>
                  <X size={18} className="text-brand-textSub" />
                </button>
              </div>
              <p className="text-white text-sm leading-relaxed mb-4">
                You have a date with Isabelle on Saturday at Brat, Shoreditch. Keep things light until then — one or two messages at most.
              </p>
              <button
                onClick={() => { setShowCupid(false); navigate('/messages?thread=1') }}
                className="w-full py-3 rounded-xl font-bold text-[#1C0B3A]"
                style={{ background: '#D4A843' }}
              >
                Get a conversation starter
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
