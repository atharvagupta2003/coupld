import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, Crown, Star, X, AlertTriangle, CheckCircle } from 'lucide-react'

const TIERS = [
  {
    id: 'free',
    label: 'FREE',
    price: '0',
    labelColor: '#9B8FB0',
    features: [
      '3 curated matches',
      'Basic coach nudges',
      '1 match swap',
      'Compatibility score hidden',
      '10 matching credits to start',
    ],
    cta: null,
  },
  {
    id: 'premium',
    label: 'PREMIUM',
    price: '19.99',
    labelColor: '#0D9488',
    popular: true,
    features: [
      '5 curated matches',
      'Full coach — icebreakers and date suggestions',
      '3 match swaps',
      'Compatibility score visible',
      '50 credits per month included',
      '2 profile boosts per month',
    ],
    cta: 'Start Free Trial',
    ctaStyle: { background: '#0D9488', color: 'white' },
    badge: { label: 'Premium', color: '#0D9488', icon: Star },
  },
  {
    id: 'platinum',
    label: 'PLATINUM',
    price: '34.99',
    labelColor: '#B8A0D4',
    features: [
      '10 curated matches + priority',
      'Unlimited coach — weekly sessions',
      'Unlimited match swaps',
      'Full compatibility breakdown',
      '150 credits per month included',
      '5 profile boosts per month',
      'Relationship support + counsellor referral',
    ],
    cta: 'Go Platinum',
    ctaStyle: { background: 'rgba(13,148,136,0.08)', border: '1px solid #0D9488', color: '#0D9488' },
    badge: { label: 'Platinum', color: '#B8A0D4', icon: Crown },
  },
]

export default function Upgrade() {
  const [activePlan, setActivePlan] = useState<string | null>(null)
  const [showCancel, setShowCancel] = useState(false)
  const [cancelled, setCancelled] = useState(false)

  const handleActivate = (tierId: string) => {
    setActivePlan(tierId)
    setCancelled(false)
  }

  const handleCancelConfirm = () => {
    setActivePlan(null)
    setCancelled(true)
    setShowCancel(false)
  }

  const activeTier = TIERS.find(t => t.id === activePlan)

  return (
    <motion.div
      className="flex flex-col w-full min-h-screen bg-white px-5 pt-14 pb-28"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <h1 className="text-gray-900 font-bold text-xl">Choose Your Plan</h1>
      <p className="text-brand-textSub text-xs mt-1 mb-6 leading-relaxed">
        Your billing stops the moment you go exclusive. No questions asked.
      </p>

      {/* Active plan badge */}
      <AnimatePresence>
        {activePlan && activeTier && (() => {
          const BadgeIcon = activeTier.badge!.icon
          return (
            <motion.div
              key="badge"
              initial={{ opacity: 0, scale: 0.9, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="mb-4 rounded-2xl p-4 flex items-center gap-3"
              style={{
                background: `${activeTier.badge!.color}12`,
                border: `1px solid ${activeTier.badge!.color}40`,
              }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: `${activeTier.badge!.color}20`, boxShadow: `0 0 20px ${activeTier.badge!.color}30` }}
              >
                <BadgeIcon size={24} style={{ color: activeTier.badge!.color }} />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-0.5">
                  <CheckCircle size={13} style={{ color: '#78C4A0' }} />
                  <p className="text-gray-900 font-bold text-sm">{activeTier.badge!.label} Active</p>
                </div>
                <p className="text-brand-textSub text-xs">£{activeTier.price}/month · Renews automatically</p>
              </div>
              <button
                onClick={() => setShowCancel(true)}
                className="shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold"
                style={{ background: 'rgba(194,84,122,0.1)', border: '1px solid rgba(194,84,122,0.3)', color: '#C2547A' }}
              >
                Cancel
              </button>
            </motion.div>
          )
        })()}
      </AnimatePresence>

      {/* Cancelled notice */}
      <AnimatePresence>
        {cancelled && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mb-4 rounded-xl px-4 py-3 text-sm"
            style={{ background: 'rgba(120,196,160,0.08)', border: '1px solid rgba(120,196,160,0.3)', color: '#78C4A0' }}
          >
            ✓ Plan cancelled — you'll retain access until the end of this billing cycle.
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-col gap-3">
        {TIERS.map((tier, i) => {
          const isActive = activePlan === tier.id
          return (
            <motion.div
              key={tier.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="rounded-2xl p-5 relative overflow-hidden"
              style={{
                background: isActive ? `${tier.labelColor}08` : 'rgba(0,0,0,0.02)',
                backdropFilter: 'blur(12px)',
                border: isActive
                  ? `1.5px solid ${tier.labelColor}`
                  : tier.popular
                  ? '1px solid #D4A843'
                  : tier.id === 'platinum'
                  ? '1px solid rgba(184,160,212,0.4)'
                  : '1px solid rgba(0,0,0,0.08)',
                boxShadow: isActive ? `0 0 28px ${tier.labelColor}18` : tier.popular ? '0 0 24px rgba(13,148,136,0.12)' : 'none',
              }}
            >
              {tier.popular && !isActive && (
                <div
                  className="absolute top-0 left-0 right-0 py-2 text-center text-xs font-bold uppercase tracking-wider"
                  style={{ background: '#0D9488', color: 'white' }}
                >
                  Most Popular
                </div>
              )}

              {isActive && (
                <div
                  className="absolute top-0 left-0 right-0 py-2 text-center text-xs font-bold uppercase tracking-wider"
                  style={{ background: tier.labelColor, color: 'white' }}
                >
                  ✓ Active Plan
                </div>
              )}

              <div className={tier.popular || isActive ? 'mt-8' : ''}>
                <p className="font-semibold uppercase tracking-widest text-xs mb-2" style={{ color: tier.labelColor }}>
                  {tier.label}
                </p>
                <div className="flex items-baseline gap-1 mb-4">
                  <span className="text-gray-900 font-bold text-4xl">{tier.price === '0' ? 'Free' : `£${tier.price}`}</span>
                  {tier.price !== '0' && <span className="text-brand-textSub text-sm">/month</span>}
                </div>

                <div className="flex flex-col gap-2.5 mb-5">
                  {tier.features.map((f) => (
                    <div key={f} className="flex items-start gap-2.5">
                      <Check size={14} className="shrink-0 mt-0.5" style={{ color: tier.labelColor }} />
                      <span className="text-gray-900 text-sm leading-snug">{f}</span>
                    </div>
                  ))}
                </div>

                {tier.cta && !isActive && (
                  <button
                    onClick={() => handleActivate(tier.id)}
                    className="w-full py-3.5 rounded-xl font-bold text-sm transition-all active:scale-97"
                    style={tier.ctaStyle as React.CSSProperties}
                  >
                    {tier.cta}
                  </button>
                )}

                {isActive && (
                  <button
                    onClick={() => setShowCancel(true)}
                    className="w-full py-3.5 rounded-xl font-semibold text-sm"
                    style={{ background: 'rgba(194,84,122,0.1)', border: '1px solid rgba(194,84,122,0.3)', color: '#C2547A' }}
                  >
                    Cancel plan
                  </button>
                )}
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Cancel confirmation modal */}
      <AnimatePresence>
        {showCancel && (
          <>
            <motion.div
              className="fixed inset-0 z-30 bg-black/50"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setShowCancel(false)}
            />
            <motion.div
              className="fixed inset-x-4 z-40 rounded-3xl p-6"
              style={{ top: '50%', transform: 'translateY(-50%)', maxWidth: 358, margin: '0 auto', background: '#FFFFFF', border: '1px solid rgba(194,84,122,0.3)' }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: 'spring', damping: 22 }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <AlertTriangle size={18} style={{ color: '#D97706' }} />
                  <p className="text-gray-900 font-bold text-base">Cancel {activeTier?.badge?.label}?</p>
                </div>
                <button onClick={() => setShowCancel(false)}><X size={18} className="text-brand-textSub" /></button>
              </div>
              <p className="text-gray-500 text-sm leading-relaxed mb-2">
                You'll keep access until <span className="text-gray-900 font-semibold">May 24, 2026</span> (end of billing cycle). After that you'll move to the free plan.
              </p>
              <div
                className="rounded-xl px-3 py-2.5 mb-5 text-xs leading-relaxed"
                style={{ background: 'rgba(13,148,136,0.06)', border: '1px solid rgba(13,148,136,0.2)', color: '#0D9488' }}
              >
                Note: If you go exclusive before then, billing already stops regardless.
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setShowCancel(false)}
                  className="flex-1 py-3 rounded-xl font-semibold text-sm"
                  style={{ background: 'rgba(0,0,0,0.04)', color: '#6B7280', border: '1px solid rgba(0,0,0,0.08)' }}
                >
                  Keep plan
                </button>
                <button
                  onClick={handleCancelConfirm}
                  className="flex-1 py-3 rounded-xl font-bold text-sm"
                  style={{ background: 'rgba(194,84,122,0.15)', border: '1px solid rgba(194,84,122,0.4)', color: '#C2547A' }}
                >
                  Yes, cancel
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
