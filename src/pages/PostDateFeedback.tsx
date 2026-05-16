import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { ChevronLeft, Star, CheckCircle, Sparkles, Heart } from 'lucide-react'
import CupidCharacter from '../components/CupidCharacter'
import { profiles } from '../data/mockData'

const isabelle = profiles[0]

type Step = 'overall' | 'accuracy' | 'chemistry' | 'again' | 'notes' | 'result'

const OVERALL_OPTIONS = [
  { id: 'great', label: 'It was great', sub: 'Strong connection, good vibes', color: '#78C4A0' },
  { id: 'okay', label: 'Okay, nothing special', sub: 'Fine but no real spark', color: '#B8A0D4' },
  { id: 'notfit', label: 'Not really a fit', sub: 'Didn\'t click in person', color: '#C2547A' },
  { id: 'exclusive', label: 'We want to be exclusive', sub: 'This is the one', color: '#D4A843', special: true },
]

const ACCURACY_OPTIONS = [
  { id: 'yes', label: 'Yes, exactly as expected', icon: '✓' },
  { id: 'mostly', label: 'Mostly — small differences', icon: '~' },
  { id: 'somewhat', label: 'Somewhat different', icon: '?' },
  { id: 'no', label: 'Very different from their profile', icon: '✗' },
]

const AGAIN_OPTIONS = [
  { id: 'yes', label: "Absolutely, planning it now" },
  { id: 'maybe', label: "Maybe — need more time" },
  { id: 'no', label: "No, I don't think so" },
]

const CUPID_ANALYSIS: Record<string, string> = {
  great: "Strong signal. Isabelle also rated the date positively through her app feedback. I'd suggest a second date within 7–10 days — momentum matters here. I can help you plan something that builds on what you already have.",
  okay: "Appreciate the honesty. This is useful. Not every strong compatibility translates on first meeting — some of the best connections take two or three dates to find their rhythm. I'd suggest one more before drawing conclusions.",
  notfit: "Understood. It happens — compatibility data captures a lot, but not everything. I've noted this feedback and it will improve your future matches. I'll start identifying alternatives that address what felt off today.",
  exclusive: "This is what Coupld is built for. I'm marking both profiles as exclusive — billing pauses now. Congratulations. This is a real outcome.",
}

export default function PostDateFeedback() {
  const navigate = useNavigate()
  const [step, setStep] = useState<Step>('overall')
  const [overall, setOverall] = useState<string | null>(null)
  const [accuracy, setAccuracy] = useState<string | null>(null)
  const [chemistry, setChemistry] = useState(0)
  const [hoverStar, setHoverStar] = useState(0)
  const [again, setAgain] = useState<string | null>(null)
  const [notes, setNotes] = useState('')

  const STEPS: Step[] = ['overall', 'accuracy', 'chemistry', 'again', 'notes', 'result']
  const stepIdx = STEPS.indexOf(step)
  const progress = ((stepIdx) / (STEPS.length - 1)) * 100

  const next = (nextStep: Step) => {
    if (nextStep === 'result' && overall === 'exclusive') {
      navigate('/exclusive')
      return
    }
    setStep(nextStep)
  }

  return (
    <motion.div
      className="flex flex-col w-full min-h-screen bg-white"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
    >
      {/* Header */}
      <div
        className="sticky top-0 z-10 flex items-center gap-3 px-4 py-4"
        style={{ background: 'rgba(255,255,255,0.97)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(0,0,0,0.08)' }}
      >
        <button onClick={() => navigate(-1)} className="pl-8">
          <ChevronLeft size={22} className="text-gray-900" />
        </button>
        <div className="flex-1">
          <h1 className="text-gray-900 font-bold text-lg">Date Feedback</h1>
          <p className="text-brand-textSub" style={{ fontSize: 11 }}>With Isabelle — Saturday evening</p>
        </div>
      </div>

      {/* Progress bar */}
      {step !== 'result' && (
        <div className="h-0.5 mx-4 mt-1 rounded-full overflow-hidden" style={{ background: 'rgba(0,0,0,0.08)' }}>
          <motion.div
            className="h-full rounded-full"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.4 }}
            style={{ background: 'linear-gradient(90deg, #0D9488, #14B8A6)' }}
          />
        </div>
      )}

      {/* Match card at top */}
      {step !== 'result' && (
        <div className="flex items-center gap-3 px-5 py-4">
          <img src={isabelle.photos[0]} alt={isabelle.name} className="w-12 h-12 rounded-full object-cover" style={{ border: '2px solid rgba(13,148,136,0.4)' }} />
          <div>
            <p className="text-gray-900 font-semibold text-sm">{isabelle.name}, {isabelle.age}</p>
            <p className="text-brand-textSub text-xs">{isabelle.compatibility}% compatibility · Saturday, Brat Shoreditch</p>
          </div>
        </div>
      )}

      <div className="flex-1 px-5 pb-10">
        <AnimatePresence mode="wait">

          {/* STEP 1: Overall */}
          {step === 'overall' && (
            <motion.div key="overall" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}>
              <p className="text-gray-900 font-bold text-xl mb-1">How did it go?</p>
              <p className="text-brand-textSub text-sm mb-6">Be honest — this shapes your future matches.</p>
              <div className="flex flex-col gap-3">
                {OVERALL_OPTIONS.map(opt => (
                  <motion.button
                    key={opt.id}
                    onClick={() => { setOverall(opt.id); next('accuracy') }}
                    whileTap={{ scale: 0.97 }}
                    className="text-left p-4 rounded-2xl transition-all"
                    style={{
                      background: opt.special ? 'rgba(13,148,136,0.05)' : 'rgba(0,0,0,0.03)',
                      border: opt.special ? `1px solid ${opt.color}` : '1px solid rgba(0,0,0,0.08)',
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-3 h-3 rounded-full shrink-0"
                        style={{ background: opt.color }}
                      />
                      <div>
                        <p className="text-gray-900 font-semibold text-sm">{opt.label}</p>
                        <p className="text-brand-textSub text-xs mt-0.5">{opt.sub}</p>
                      </div>
                      {opt.special && <Heart size={16} style={{ color: '#D4A843' }} className="ml-auto shrink-0" />}
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {/* STEP 2: Profile accuracy */}
          {step === 'accuracy' && (
            <motion.div key="accuracy" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}>
              <p className="text-gray-900 font-bold text-xl mb-1">Did Isabelle match her profile?</p>
              <p className="text-brand-textSub text-sm mb-6">Photos, bio, personality — how accurate was it?</p>
              <div className="flex flex-col gap-3">
                {ACCURACY_OPTIONS.map(opt => (
                  <motion.button
                    key={opt.id}
                    onClick={() => { setAccuracy(opt.id); next('chemistry') }}
                    whileTap={{ scale: 0.97 }}
                    className="flex items-center gap-4 text-left p-4 rounded-2xl transition-all"
                    style={{
                      background: accuracy === opt.id ? 'rgba(13,148,136,0.08)' : 'rgba(0,0,0,0.03)',
                      border: '1px solid rgba(0,0,0,0.08)',
                    }}
                  >
                    <span
                      className="w-8 h-8 rounded-xl flex items-center justify-center font-bold text-base shrink-0"
                      style={{ background: 'rgba(13,148,136,0.08)', color: '#0D9488' }}
                    >
                      {opt.icon}
                    </span>
                    <p className="text-gray-900 font-medium text-sm">{opt.label}</p>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {/* STEP 3: Chemistry stars */}
          {step === 'chemistry' && (
            <motion.div key="chemistry" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}>
              <p className="text-gray-900 font-bold text-xl mb-1">Rate the chemistry</p>
              <p className="text-brand-textSub text-sm mb-8">That ineffable in-person energy.</p>
              <div className="flex justify-center gap-4 mb-10">
                {[1, 2, 3, 4, 5].map(n => (
                  <motion.button
                    key={n}
                    whileTap={{ scale: 0.85 }}
                    onMouseEnter={() => setHoverStar(n)}
                    onMouseLeave={() => setHoverStar(0)}
                    onClick={() => setChemistry(n)}
                  >
                    <Star
                      size={42}
                      fill={(hoverStar || chemistry) >= n ? '#0D9488' : 'none'}
                      style={{ color: (hoverStar || chemistry) >= n ? '#0D9488' : 'rgba(0,0,0,0.15)' }}
                    />
                  </motion.button>
                ))}
              </div>
              {chemistry > 0 && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                  <p className="text-center text-brand-textSub text-sm mb-8">
                    {chemistry === 5 ? 'Electric.' : chemistry === 4 ? 'Really good.' : chemistry === 3 ? 'Decent — something there.' : chemistry === 2 ? 'A little flat.' : 'Not much there.'}
                  </p>
                  <button
                    onClick={() => next('again')}
                    className="w-full py-3.5 rounded-xl font-bold text-sm"
                    style={{ background: '#0D9488', color: 'white' }}
                  >
                    Continue
                  </button>
                </motion.div>
              )}
            </motion.div>
          )}

          {/* STEP 4: See again */}
          {step === 'again' && (
            <motion.div key="again" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}>
              <p className="text-gray-900 font-bold text-xl mb-1">Would you see her again?</p>
              <p className="text-brand-textSub text-sm mb-6">No wrong answer here.</p>
              <div className="flex flex-col gap-3">
                {AGAIN_OPTIONS.map(opt => (
                  <motion.button
                    key={opt.id}
                    onClick={() => { setAgain(opt.id); next('notes') }}
                    whileTap={{ scale: 0.97 }}
                    className="text-left p-4 rounded-2xl"
                    style={{ background: 'rgba(0,0,0,0.03)', border: '1px solid rgba(0,0,0,0.08)' }}
                  >
                    <p className="text-gray-900 font-medium text-sm">{opt.label}</p>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {/* STEP 5: Notes */}
          {step === 'notes' && (
            <motion.div key="notes" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}>
              <p className="text-gray-900 font-bold text-xl mb-1">Anything else?</p>
              <p className="text-brand-textSub text-sm mb-5">Tell your coach what happened. Optional but useful.</p>
              <textarea
                value={notes}
                onChange={e => setNotes(e.target.value)}
                rows={5}
                placeholder="She was funnier in person than I expected. The venue was perfect..."
                className="w-full rounded-xl px-4 py-3 text-gray-900 text-sm outline-none resize-none placeholder:text-brand-textSub/50 mb-5"
                style={{ background: 'rgba(0,0,0,0.03)', border: '1px solid rgba(0,0,0,0.08)' }}
              />
              <button
                onClick={() => next('result')}
                className="w-full py-3.5 rounded-xl font-bold text-sm"
                style={{ background: '#0D9488', color: 'white' }}
              >
                Get Cupid's analysis
              </button>
            </motion.div>
          )}

          {/* RESULT */}
          {step === 'result' && (
            <motion.div key="result" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <div className="flex flex-col items-center pt-4 pb-6">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', damping: 12 }}
                >
                  <CheckCircle size={52} style={{ color: '#78C4A0' }} />
                </motion.div>
                <p className="text-gray-900 font-bold text-xl mt-4 mb-1">Feedback received</p>
                <p className="text-brand-textSub text-sm">Cupid has updated your profile.</p>
              </div>

              {/* Summary */}
              <div
                className="rounded-2xl p-4 mb-4"
                style={{ background: 'rgba(0,0,0,0.02)', border: '1px solid rgba(0,0,0,0.08)' }}
              >
                <p className="text-brand-lavender font-semibold uppercase tracking-widest mb-3" style={{ fontSize: 10 }}>Your summary</p>
                <div className="flex flex-col gap-2.5">
                  <div className="flex justify-between">
                    <span className="text-brand-textSub text-xs">Overall</span>
                    <span className="text-gray-900 text-xs font-medium capitalize">{OVERALL_OPTIONS.find(o => o.id === overall)?.label}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-brand-textSub text-xs">Profile accuracy</span>
                    <span className="text-gray-900 text-xs font-medium">{ACCURACY_OPTIONS.find(o => o.id === accuracy)?.label}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-brand-textSub text-xs">Chemistry</span>
                    <div className="flex gap-0.5">
                      {[1, 2, 3, 4, 5].map(n => (
                        <Star key={n} size={12} fill={chemistry >= n ? '#0D9488' : 'none'} style={{ color: chemistry >= n ? '#0D9488' : 'rgba(0,0,0,0.15)' }} />
                      ))}
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-brand-textSub text-xs">See again</span>
                    <span className="text-gray-900 text-xs font-medium">{AGAIN_OPTIONS.find(o => o.id === again)?.label}</span>
                  </div>
                </div>
              </div>

              {/* Cupid analysis */}
              <div
                className="rounded-2xl p-4 mb-5"
                style={{ background: 'rgba(13,148,136,0.06)', border: '1px solid rgba(13,148,136,0.15)' }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <CupidCharacter size={32} />
                  <div>
                    <p className="text-brand-lavender font-semibold text-xs uppercase tracking-widest">Cupid's read</p>
                    <Sparkles size={11} style={{ color: '#D4A843' }} className="mt-0.5" />
                  </div>
                </div>
                <p className="text-gray-900 text-sm leading-relaxed">
                  {overall ? CUPID_ANALYSIS[overall] : CUPID_ANALYSIS['okay']}
                </p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => navigate('/date-planning')}
                  className="flex-1 py-3 rounded-xl font-semibold text-sm"
                  style={{ background: 'rgba(13,148,136,0.08)', border: '1px solid rgba(13,148,136,0.25)', color: '#0D9488' }}
                >
                  Plan date 2
                </button>
                <button
                  onClick={() => navigate('/home')}
                  className="flex-1 py-3 rounded-xl font-bold text-sm"
                  style={{ background: '#0D9488', color: 'white' }}
                >
                  Back to matches
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}
