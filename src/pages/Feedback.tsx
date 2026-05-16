import { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

const OPTIONS = [
  { id: 'great', label: 'It went really well' },
  { id: 'okay', label: 'Okay, nothing special' },
  { id: 'notfit', label: 'Not a great fit' },
  { id: 'again', label: 'I want to see them again' },
  { id: 'exclusive', label: 'We decided to be exclusive', gold: true },
]

export default function Feedback() {
  const navigate = useNavigate()
  const [selected, setSelected] = useState<string | null>(null)
  const [note, setNote] = useState('')

  const handleSubmit = () => {
    if (selected === 'exclusive') navigate('/exclusive')
    else navigate('/home')
  }

  return (
    <motion.div
      className="flex flex-col w-full min-h-screen bg-white px-5 pt-14 pb-28"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <h1 className="text-gray-900 font-bold text-2xl">How did it go?</h1>
      <p className="text-brand-textSub text-sm mt-1 mb-6">With Isabelle — Saturday evening</p>

      <div className="flex flex-col gap-2 mb-5">
        {OPTIONS.map((opt) => (
          <motion.button
            key={opt.id}
            onClick={() => setSelected(opt.id)}
            className="text-left p-4 rounded-2xl transition-all"
            style={{
              background: selected === opt.id ? 'rgba(13,148,136,0.06)' : 'rgba(0,0,0,0.03)',
              border: selected === opt.id
                ? '1px solid #0D9488'
                : opt.gold
                ? '1px solid rgba(13,148,136,0.4)'
                : '1px solid rgba(0,0,0,0.08)',
            }}
            animate={{ scale: selected === opt.id ? 1 : 0.98 }}
            transition={{ type: 'spring', damping: 20 }}
          >
            <span className="text-gray-900 font-medium text-sm">{opt.label}</span>
          </motion.button>
        ))}
      </div>

      <textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        rows={4}
        placeholder="Tell your coach what happened. This helps with future matches."
        className="w-full rounded-xl px-4 py-3 text-gray-900 text-sm outline-none resize-none placeholder:text-brand-textSub/50 mb-5"
        style={{ background: 'rgba(0,0,0,0.03)', border: '1px solid rgba(0,0,0,0.08)' }}
      />

      <div className="flex gap-2 overflow-x-auto scrollbar-hide mb-6 pb-1">
        {[
          { label: 'Plan another date', color: 'rgba(13,148,136,0.08)', border: 'rgba(13,148,136,0.3)' },
          { label: 'Try someone new', color: 'rgba(0,0,0,0.03)', border: 'rgba(0,0,0,0.08)' },
          { label: 'We are exclusive', color: 'rgba(13,148,136,0.06)', border: '#0D9488', tag: 'STOP BILLING' },
        ].map((card) => (
          <div
            key={card.label}
            className="shrink-0 rounded-2xl p-4 w-44"
            style={{ background: card.color, border: `1px solid ${card.border}` }}
          >
            {card.tag && (
              <p className="text-brand-lavender font-semibold uppercase tracking-widest text-xs mb-1">
                {card.tag}
              </p>
            )}
            <p className="text-gray-900 font-semibold text-sm">{card.label}</p>
          </div>
        ))}
      </div>

      <button
        onClick={handleSubmit}
        className="w-full py-4 rounded-xl font-bold text-white"
        style={{ background: '#0D9488' }}
      >
        Submit
      </button>
    </motion.div>
  )
}
