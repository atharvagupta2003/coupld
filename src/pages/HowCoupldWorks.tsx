import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { User, Users, MessageCircle, Heart, Shield, ArrowRight } from 'lucide-react'

const slides = [
  {
    num: '1',
    label: 'Step One',
    icon: User,
    iconBg: 'rgba(196,103,74,0.18)',
    iconColor: '#D4956A',
    title: 'Build your compatibility profile',
    titleEm: 'compatibility profile',
    body: 'Answer thoughtfully crafted questions across 8 psychological dimensions — your values, how you communicate, what you need in a partner, and where you see your life going. No tick-box quizzes. Just an honest picture of you.',
    pills: ['Personality', 'Core Values', 'Communication', 'Attachment Style', 'Life Vision'],
    pillColor: 'rgba(212,149,106,0.18)',
    pillText: '#D4956A',
  },
  {
    num: '2',
    label: 'Step Two',
    icon: Users,
    iconBg: 'rgba(107,143,113,0.18)',
    iconColor: '#6B9B71',
    title: 'Meet your five matches',
    titleEm: 'five matches',
    body: 'At any one time, you have five carefully chosen, compatible people to explore — and no more. Five is enough to feel real possibility, focused enough to feel genuine intention.',
    pills: ['5 matches max', 'No swiping', 'See why you matched', 'No infinite scroll'],
    pillColor: 'rgba(107,155,113,0.18)',
    pillText: '#6B9B71',
  },
  {
    num: '3',
    label: 'Step Three',
    icon: MessageCircle,
    iconBg: 'rgba(184,160,212,0.18)',
    iconColor: '#B8A0D4',
    title: 'Your AI Coach is with you every step',
    titleEm: 'every step',
    body: 'Before the date, during the conversation, after the awkward moment — your Coupld coach is there. It knows your profile, understands your patterns, and helps you show up as your best self.',
    pills: ['Pre-date briefings', 'Conversation support', 'Pattern reflection', 'Always available'],
    pillColor: 'rgba(184,160,212,0.18)',
    pillText: '#B8A0D4',
  },
  {
    num: '4',
    label: 'You Found Someone',
    icon: Heart,
    iconBg: 'rgba(194,84,122,0.18)',
    iconColor: '#C2547A',
    title: 'You found someone. A new chapter begins.',
    titleEm: 'A new chapter begins.',
    body: 'When you tell us you\'re in a relationship, Coupld transforms. Your matches pause, you move into a protected private space away from all other daters, and a whole new set of features unlocks just for the two of you.',
    pills: ['Fully isolated', 'Private shared space', 'Matches pause'],
    pillColor: 'rgba(194,84,122,0.18)',
    pillText: '#C2547A',
  },
  {
    num: '5',
    label: 'Your Relationship Space',
    icon: Shield,
    iconBg: 'rgba(74,46,98,0.25)',
    iconColor: '#9B7AC4',
    title: 'Same coach. Built for two.',
    titleEm: 'Built for two.',
    body: 'Your AI coach evolves alongside you as a couple. A new suite unlocks: shared chat, relationship coaching, help navigating the moments that test every couple, and check-ins that help you grow together.',
    pills: ['Couples chat', 'Relationship coaching', 'Conflict navigation', 'Shared goals'],
    pillColor: 'rgba(155,122,196,0.18)',
    pillText: '#9B7AC4',
  },
]

export default function HowCoupldWorks() {
  const navigate = useNavigate()
  const [current, setCurrent] = useState(0)
  const dragStartX = useRef(0)

  const goNext = () => {
    if (current < slides.length - 1) setCurrent((c) => c + 1)
    else navigate('/choose-coach')
  }

  const goPrev = () => {
    if (current > 0) setCurrent((c) => c - 1)
  }

  const slide = slides[current]
  const Icon = slide.icon
  const isLast = current === slides.length - 1

  return (
    <motion.div
      className="flex flex-col min-h-screen w-full bg-white overflow-hidden"
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
      transition={{ duration: 0.3 }}
    >
      {/* Ambient */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 50% at 50% -10%, rgba(13,148,136,0.08) 0%, transparent 70%)',
        }}
      />

      {/* Dot indicators */}
      <div className="relative z-10 flex justify-center gap-2 pt-12 pb-6">
        {slides.map((_, i) => (
          <button key={i} onClick={() => setCurrent(i)}>
            <motion.div
              className="rounded-full"
              animate={{
                width: i === current ? 24 : 6,
                background: i === current ? '#0D9488' : 'rgba(0,0,0,0.15)',
              }}
              transition={{ duration: 0.3 }}
              style={{ height: 6 }}
            />
          </button>
        ))}
      </div>

      {/* Slide content */}
      <div
        className="flex-1 px-6 overflow-hidden"
        onPointerDown={(e) => { dragStartX.current = e.clientX }}
        onPointerUp={(e) => {
          const dx = dragStartX.current - e.clientX
          if (dx > 50) goNext()
          else if (dx < -50) goPrev()
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.28 }}
            className="flex flex-col h-full"
          >
            {/* Step label */}
            <p className="text-brand-textSub font-semibold uppercase tracking-widest mb-4" style={{ fontSize: 11 }}>
              {slide.label}
            </p>

            {/* Icon + number */}
            <div className="flex items-center gap-3 mb-5">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{ background: slide.iconBg }}
              >
                <Icon size={22} style={{ color: slide.iconColor }} />
              </div>
              <span
                className="font-bold"
                style={{ fontSize: 48, lineHeight: 1, color: slide.iconColor, opacity: 0.3, fontFamily: 'serif' }}
              >
                {slide.num}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-gray-900 font-bold mb-4" style={{ fontSize: 26, lineHeight: 1.2 }}>
              {slide.title.replace(slide.titleEm, '').trim()}{' '}
              <span style={{ color: slide.iconColor, fontStyle: 'italic' }}>{slide.titleEm}</span>
            </h1>

            {/* Body */}
            <p className="text-brand-textSub leading-relaxed mb-6" style={{ fontSize: 15 }}>
              {slide.body}
            </p>

            {/* Pills */}
            <div className="flex flex-wrap gap-2">
              {slide.pills.map((pill) => (
                <span
                  key={pill}
                  className="px-3 py-1.5 rounded-full text-xs font-medium"
                  style={{
                    background: slide.pillColor,
                    color: slide.pillText,
                    border: `1px solid ${slide.pillText}40`,
                  }}
                >
                  {pill}
                </span>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom */}
      <div className="relative z-10 px-6 pb-10 pt-4">
        <button
          onClick={goNext}
          className="w-full py-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-opacity active:scale-[0.98]"
          style={{ background: '#0D9488', color: 'white' }}
        >
          {isLast ? 'Meet your coach' : 'Next'}
          <ArrowRight size={16} />
        </button>
        {current > 0 && (
          <button onClick={goPrev} className="w-full py-3 text-brand-textSub text-sm text-center mt-1">
            Back
          </button>
        )}
      </div>
    </motion.div>
  )
}
