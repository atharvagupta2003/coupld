import { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Volume2, Check } from 'lucide-react'
import AdamCharacter from '../components/AdamCharacter'
import EveCharacter from '../components/EveCharacter'
import GamificationBadge from '../components/GamificationBadge'
import { useSpeech, COACH_VOICES } from '../hooks/useElevenLabs'

const coaches = [
  {
    id: 'adam' as const,
    name: 'Adam',
    tagline: 'Warm, direct & grounding',
    description: 'Keeps it real. Calls things out gently when needed. Pushes you to show up as your best self.',
    voicePreview: "Hey. I'm Adam — your Coupld coach. Warm, direct, and genuinely invested in helping you find someone worth keeping. Let's get started.",
    accent: '#6BB5C4',
    bg: 'linear-gradient(145deg, rgba(107,181,196,0.12) 0%, rgba(45,27,78,0.5) 100%)',
    border: 'rgba(107,181,196,0.3)',
  },
  {
    id: 'eve' as const,
    name: 'Eve',
    tagline: 'Intuitive, warm & perceptive',
    description: 'Listens deeply. Helps you understand yourself better along the way. Patient and genuinely curious.',
    voicePreview: "Hi, I'm Eve — your Coupld coach. Intuitive, patient, and here to help you build something real. I'm excited to start this with you.",
    accent: '#C2547A',
    bg: 'linear-gradient(145deg, rgba(194,84,122,0.12) 0%, rgba(45,27,78,0.5) 100%)',
    border: 'rgba(194,84,122,0.3)',
  },
]

export default function ChooseCoach() {
  const navigate = useNavigate()
  const { speaking, say, authError } = useSpeech()
  const [selected, setSelected] = useState<'adam' | 'eve' | null>(null)
  const [playingId, setPlayingId] = useState<'adam' | 'eve' | null>(null)
  const [showBadge, setShowBadge] = useState(false)
  const [confirmed, setConfirmed] = useState(false)

  const handlePlayIntro = async (coach: typeof coaches[0]) => {
    if (speaking) return
    setPlayingId(coach.id)
    await say(coach.voicePreview, COACH_VOICES[coach.id])
    setPlayingId(null)
  }

  const handleSelect = (id: 'adam' | 'eve') => {
    setSelected(id)
  }

  const handleConfirm = () => {
    if (!selected || confirmed) return
    setConfirmed(true)
    localStorage.setItem('coachId', selected)
    setShowBadge(true)
  }

  const selectedCoach = coaches.find((c) => c.id === selected)

  return (
    <motion.div
      className="flex flex-col min-h-screen w-full bg-[#1C0B3A] px-5 pt-12 pb-8"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
    >
      {/* Ambient glow */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(75,32,128,0.28) 0%, transparent 70%)',
        }}
      />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="relative z-10 text-center mb-8"
      >
        <p className="text-brand-lavender font-semibold uppercase tracking-widest mb-2" style={{ fontSize: 11 }}>
          Your Dating Coach
        </p>
        <h1 className="text-white font-bold text-2xl mb-2">Choose who guides you</h1>
        <p className="text-brand-textSub text-sm">
          Your coach knows your profile and stays with you throughout your journey.
        </p>
      </motion.div>

      {/* Coach cards */}
      <div className="relative z-10 flex flex-col gap-4 mb-6">
        {coaches.map((coach, i) => {
          const isSelected = selected === coach.id
          const isPlaying = playingId === coach.id && speaking

          return (
            <motion.div
              key={coach.id}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + i * 0.1 }}
              onClick={() => handleSelect(coach.id)}
              className="rounded-2xl p-4 cursor-pointer transition-all"
              style={{
                background: isSelected ? coach.bg.replace('0.12', '0.22') : coach.bg,
                border: `1.5px solid ${isSelected ? coach.accent : coach.border.replace('0.3', '0.2')}`,
                boxShadow: isSelected ? `0 0 24px ${coach.accent}22` : 'none',
              }}
            >
              <div className="flex items-start gap-4">
                {/* Character illustration */}
                <div className="flex flex-col items-center gap-2 shrink-0">
                  {coach.id === 'adam' ? (
                    <AdamCharacter size={100} speaking={isPlaying} />
                  ) : (
                    <EveCharacter size={100} speaking={isPlaying} />
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0 pt-1">
                  <div className="flex items-center justify-between mb-1">
                    <div>
                      <h3 className="text-white font-bold text-lg leading-none">{coach.name}</h3>
                      <p className="font-medium mt-0.5" style={{ fontSize: 12, color: coach.accent }}>
                        {coach.tagline}
                      </p>
                    </div>
                    {isSelected && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-6 h-6 rounded-full flex items-center justify-center"
                        style={{ background: coach.accent }}
                      >
                        <Check size={13} className="text-white" strokeWidth={3} />
                      </motion.div>
                    )}
                  </div>
                  <p className="text-brand-textSub text-xs leading-relaxed mb-3">
                    {coach.description}
                  </p>
                  <button
                    onClick={(e) => { e.stopPropagation(); handlePlayIntro(coach) }}
                    disabled={speaking}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-opacity disabled:opacity-50"
                    style={{
                      background: `${coach.accent}18`,
                      border: `1px solid ${coach.accent}44`,
                      color: coach.accent,
                    }}
                  >
                    <Volume2 size={12} />
                    {isPlaying ? 'Playing...' : 'Hear intro'}
                  </button>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Confirm button */}
      <motion.div
        className="relative z-10 mt-auto"
        animate={{ opacity: selected ? 1 : 0.4 }}
        transition={{ duration: 0.2 }}
      >
        <button
          onClick={handleConfirm}
          disabled={!selected}
          className="w-full py-4 rounded-xl font-bold text-sm transition-all active:scale-[0.98] disabled:cursor-not-allowed"
          style={{
            background: selected ? '#D4A843' : 'rgba(255,255,255,0.08)',
            color: selected ? '#1C0B3A' : '#9B8FB0',
          }}
        >
          {selected
            ? `Continue with ${selectedCoach?.name}`
            : 'Select a coach to continue'}
        </button>
      </motion.div>

      {/* Gamification badge */}
      <GamificationBadge
        show={showBadge}
        badgeType="coach"
        title={`${selectedCoach?.name} is your coach`}
        subtitle={`Your coach is ready to guide you. Let's build your profile together.`}
        onDismiss={() => { setShowBadge(false); navigate('/signup/verify') }}
        autoDismissMs={3000}
      />
    </motion.div>
  )
}
