import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import confetti from 'canvas-confetti'
import { venues } from '../data/mockData'
import {
  Heart, Calendar, Users, Sparkles, Tag, CheckCircle,
  Instagram, X, Share2, ChevronRight, Clock, Gift,
} from 'lucide-react'

type Sheet = 'support' | 'offers' | 'share' | null

function XIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20">
      <path fill="white" d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  )
}

const PARTNER_OFFERS = [
  {
    venue: 'Brat, Shoreditch',
    offer: 'Couples Tasting Menu',
    detail: '4-course meal for two with wine pairing',
    discount: 20,
    price: '£180 → £144',
    photo: venues[0].photo,
  },
  {
    venue: 'Ronnie Scott\'s Jazz',
    offer: 'Date Night Package',
    detail: 'Reserved table + two cocktails included',
    discount: 15,
    price: '£90 → £77',
    photo: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    venue: 'Studio Roca Pottery',
    offer: 'Couples Evening Class',
    detail: '2-hour session + take home your piece',
    discount: 15,
    price: '£95 → £81',
    photo: 'https://images.pexels.com/photos/3094218/pexels-photo-3094218.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    venue: 'Humble Grape',
    offer: 'Private Wine Tasting',
    detail: 'Six wines + expert sommelier for two',
    discount: 15,
    price: '£120 → £102',
    photo: venues[2].photo,
  },
]

const SUPPORT_ITEMS = [
  {
    id: 'counseling',
    icon: Users,
    label: 'Couple Counselling',
    sub: 'Book a session with a certified relationship therapist',
    color: '#B8A0D4',
    sessions: ['Online · 50 min · £85', 'In-person · 50 min · £120', 'Intensive · 2 hrs · £200'],
  },
  {
    id: 'date-ideas',
    icon: Calendar,
    label: 'Date Ideas',
    sub: 'Curated by Cupid based on what you both enjoy',
    color: '#78C4A0',
    ideas: ['Axe throwing at Bad Axe', 'Pottery class for two', 'Box Hill sunrise hike', 'Jazz at Ronnie Scott\'s', 'Wine tasting at Humble Grape'],
  },
  {
    id: 'milestones',
    icon: Heart,
    label: 'Couple Milestones',
    sub: 'Track and celebrate your relationship journey',
    color: '#E8607A',
    milestones: [
      { label: 'First date', done: true },
      { label: 'Went exclusive', done: true },
      { label: 'Met each other\'s friends', done: false },
      { label: '1 month together', done: false },
      { label: 'Weekend trip', done: false },
      { label: '3 months together', done: false },
      { label: 'Meet the family', done: false },
    ],
  },
]

export default function Exclusive() {
  const navigate = useNavigate()
  const [show, setShow] = useState(false)
  const [openSheet, setOpenSheet] = useState<Sheet>(null)
  const [openSupport, setOpenSupport] = useState<string | null>(null)
  const [bookedOffer, setBookedOffer] = useState<string | null>(null)
  const [shared, setShared] = useState<string | null>(null)

  useEffect(() => {
    confetti({
      particleCount: 120,
      spread: 80,
      colors: ['#D4A843', '#B8A0D4', '#C2547A', '#FFFFFF'],
      origin: { y: 0.5 },
    })
    setTimeout(() => setShow(true), 100)
  }, [])

  return (
    <motion.div
      className="flex flex-col min-h-screen w-full bg-white px-6 py-16 pb-24 overflow-y-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <AnimatePresence>
        {show && (
          <div className="w-full flex flex-col items-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-gray-900 font-bold text-center"
              style={{ fontSize: 42 }}
            >
              You did it.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-brand-lavender font-medium text-center mt-2"
              style={{ fontSize: 28 }}
            >
              Billing has stopped.
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="text-brand-textSub text-center mt-4 leading-relaxed"
              style={{ fontSize: 15, maxWidth: 300 }}
            >
              You found what you came for. Coupld now supports your relationship — not your screen time.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="w-full my-6"
              style={{ height: 1, background: 'rgba(0,0,0,0.1)' }}
            />

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4 }}
              className="text-gray-900 font-semibold text-base self-start mb-4"
            >
              What happens next
            </motion.p>

            {/* Clickable cards */}
            <div className="flex flex-col gap-3 w-full">

              {/* Relationship Support */}
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5 }}
                onClick={() => setOpenSheet('support')}
                className="rounded-2xl overflow-hidden text-left w-full active:scale-97 transition-all"
                style={{ border: '1px solid rgba(0,0,0,0.08)' }}
              >
                <img src={venues[0].photo} alt="" className="w-full object-cover" style={{ height: 130 }} />
                <div
                  className="p-4 flex items-center gap-3"
                  style={{ background: 'rgba(0,0,0,0.03)' }}
                >
                  <div className="flex-1">
                    <p className="text-gray-900 font-semibold text-sm">Relationship Support</p>
                    <p className="text-brand-textSub text-xs mt-1 leading-relaxed">Couple counselling, date ideas, milestones</p>
                  </div>
                  <ChevronRight size={16} className="text-brand-textSub shrink-0" />
                </div>
              </motion.button>

              {/* Cupid still available */}
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.62 }}
                onClick={() => navigate('/exclusive-coach')}
                className="rounded-2xl p-4 text-left w-full flex items-center gap-3 active:scale-97 transition-all"
                style={{ background: 'rgba(13,148,136,0.05)', border: '1px solid rgba(13,148,136,0.15)' }}
              >
                <div className="flex-1">
                  <p className="text-gray-900 font-semibold text-sm">Cupid is still here</p>
                  <p className="text-brand-textSub text-xs mt-1 leading-relaxed">Now focused on your relationship, not finding you matches</p>
                </div>
                <div className="shrink-0 flex items-center gap-1.5 px-2.5 py-1 rounded-full" style={{ background: 'rgba(13,148,136,0.12)', border: '1px solid rgba(13,148,136,0.3)' }}>
                  <Sparkles size={11} style={{ color: '#0D9488' }} />
                  <span className="text-xs font-semibold" style={{ color: '#0D9488' }}>Chat</span>
                </div>
              </motion.button>

              {/* Exclusive Partner Offers */}
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.74 }}
                onClick={() => setOpenSheet('offers')}
                className="rounded-2xl overflow-hidden text-left w-full active:scale-97 transition-all"
                style={{ border: '1px solid rgba(212,168,67,0.25)' }}
              >
                <img src={venues[1].photo} alt="" className="w-full object-cover" style={{ height: 110 }} />
                <div
                  className="p-4 flex items-center gap-3"
                  style={{ background: 'rgba(212,168,67,0.05)' }}
                >
                  <Tag size={15} style={{ color: '#D4A843' }} className="shrink-0" />
                  <div className="flex-1">
                    <p className="text-gray-900 font-semibold text-sm">Exclusive Partner Offers</p>
                    <p className="text-brand-textSub text-xs mt-0.5 leading-relaxed">Restaurants, experiences &amp; gifts curated for couples</p>
                  </div>
                  <ChevronRight size={16} className="text-brand-textSub shrink-0" />
                </div>
              </motion.button>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2 }}
              className="flex flex-col items-center gap-3 mt-8 w-full"
            >
              <button
                onClick={() => setOpenSheet('share')}
                className="flex items-center gap-2 text-brand-lavender font-semibold text-sm"
              >
                <Share2 size={15} />
                Share your story
              </button>
              <button
                onClick={() => navigate('/exclusive-profile')}
                className="w-full py-3.5 rounded-xl font-bold text-sm"
                style={{ background: '#0D9488', color: 'white' }}
              >
                View couple profile
              </button>
              <button
                onClick={() => navigate('/home')}
                className="text-brand-textSub text-sm"
              >
                Back to home
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Backdrop */}
      <AnimatePresence>
        {openSheet && (
          <motion.div
            className="fixed inset-0 z-30 bg-black/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => { setOpenSheet(null); setOpenSupport(null) }}
          />
        )}
      </AnimatePresence>

      {/* Relationship Support Sheet */}
      <AnimatePresence>
        {openSheet === 'support' && (
          <motion.div
            className="fixed bottom-0 left-0 right-0 mx-auto max-w-[390px] z-40 rounded-t-3xl"
            style={{ background: '#FFFFFF', border: '1px solid rgba(0,0,0,0.08)', maxHeight: '85vh', overflowY: 'auto' }}
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 26 }}
          >
            <div className="p-6">
              <div className="w-10 h-1 rounded-full bg-brand-textSub/30 mx-auto mb-5" />
              <p className="text-gray-900 font-bold text-xl mb-5">Relationship Support</p>

              <div className="flex flex-col gap-3">
                {SUPPORT_ITEMS.map(item => {
                  const Icon = item.icon
                  const isOpen = openSupport === item.id
                  return (
                    <div key={item.id} className="rounded-2xl overflow-hidden" style={{ border: `1px solid ${item.color}28` }}>
                      <button
                        className="w-full p-4 text-left flex items-center gap-3"
                        style={{ background: `${item.color}08` }}
                        onClick={() => setOpenSupport(isOpen ? null : item.id)}
                      >
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: `${item.color}20` }}>
                          <Icon size={18} style={{ color: item.color }} />
                        </div>
                        <div className="flex-1">
                          <p className="text-gray-900 font-semibold text-sm">{item.label}</p>
                          <p className="text-brand-textSub text-xs mt-0.5">{item.sub}</p>
                        </div>
                        <motion.div animate={{ rotate: isOpen ? 90 : 0 }}>
                          <ChevronRight size={15} className="text-brand-textSub" />
                        </motion.div>
                      </button>

                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="px-4 pb-4 pt-2 flex flex-col gap-2">
                              {item.id === 'counseling' && item.sessions?.map(s => (
                                <button key={s} className="flex items-center justify-between px-3 py-2.5 rounded-xl text-left"
                                  style={{ background: 'rgba(0,0,0,0.03)', border: '1px solid rgba(0,0,0,0.08)' }}>
                                  <span className="text-gray-900 text-xs font-medium">{s}</span>
                                  <span className="text-xs font-semibold" style={{ color: '#B8A0D4' }}>Book</span>
                                </button>
                              ))}
                              {item.id === 'date-ideas' && item.ideas?.map(idea => (
                                <button key={idea} onClick={() => navigate('/date-planning')}
                                  className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-left"
                                  style={{ background: 'rgba(0,0,0,0.03)', border: '1px solid rgba(120,196,160,0.2)' }}>
                                  <Calendar size={12} style={{ color: '#78C4A0' }} />
                                  <span className="text-gray-900 text-xs">{idea}</span>
                                </button>
                              ))}
                              {item.id === 'milestones' && item.milestones?.map(m => (
                                <div key={m.label} className="flex items-center gap-3 px-3 py-2 rounded-xl"
                                  style={{ background: 'rgba(0,0,0,0.02)', border: `1px solid ${m.done ? 'rgba(120,196,160,0.3)' : 'rgba(0,0,0,0.08)'}` }}>
                                  <CheckCircle size={14} style={{ color: m.done ? '#78C4A0' : '#D1D5DB' }} className="shrink-0" />
                                  <span className={`text-xs ${m.done ? 'text-gray-900' : 'text-brand-textSub'}`}>{m.label}</span>
                                  {m.done && <span className="ml-auto text-xs font-semibold" style={{ color: '#78C4A0' }}>✓</span>}
                                </div>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Partner Offers Sheet */}
      <AnimatePresence>
        {openSheet === 'offers' && (
          <motion.div
            className="fixed bottom-0 left-0 right-0 mx-auto max-w-[390px] z-40 rounded-t-3xl"
            style={{ background: '#FFFFFF', border: '1px solid rgba(0,0,0,0.08)', maxHeight: '85vh', overflowY: 'auto' }}
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 26 }}
          >
            <div className="p-6">
              <div className="w-10 h-1 rounded-full bg-brand-textSub/30 mx-auto mb-5" />
              <div className="flex items-center gap-2 mb-1">
                <p className="text-gray-900 font-bold text-xl">Exclusive Offers</p>
                <div className="px-2 py-0.5 rounded-full text-xs font-bold" style={{ background: 'rgba(120,196,160,0.15)', color: '#78C4A0', border: '1px solid rgba(120,196,160,0.3)' }}>For couples</div>
              </div>
              <p className="text-brand-textSub text-xs mb-5">Curated for Alex &amp; Isabelle · Book through Coupld for instant discount</p>

              <div className="flex flex-col gap-3">
                {PARTNER_OFFERS.map(offer => {
                  const isBooked = bookedOffer === offer.venue
                  return (
                    <div key={offer.venue} className="rounded-2xl overflow-hidden" style={{ border: '1px solid rgba(212,168,67,0.2)' }}>
                      <img src={offer.photo} alt="" className="w-full object-cover" style={{ height: 110 }} />
                      <div className="p-4" style={{ background: 'rgba(212,168,67,0.04)' }}>
                        <div className="flex items-start justify-between mb-1">
                          <div className="flex-1">
                            <p className="text-gray-900 font-bold text-sm">{offer.offer}</p>
                            <p className="text-brand-textSub text-xs mt-0.5">{offer.venue}</p>
                          </div>
                          <div className="text-right shrink-0 ml-3">
                            <p className="font-bold text-sm" style={{ color: '#78C4A0' }}>{offer.price.split('→')[1]?.trim()}</p>
                            <p className="text-brand-textSub text-xs line-through">{offer.price.split('→')[0]?.trim()}</p>
                          </div>
                        </div>
                        <p className="text-brand-textSub text-xs mb-3">{offer.detail}</p>
                        <div className="flex items-center gap-2">
                          <div className="px-2 py-0.5 rounded-full font-bold flex items-center gap-1"
                            style={{ background: 'rgba(120,196,160,0.15)', color: '#78C4A0', border: '1px solid rgba(120,196,160,0.3)', fontSize: 10 }}>
                            <Tag size={9} /> {offer.discount}% OFF
                          </div>
                          <button
                            onClick={() => setBookedOffer(offer.venue)}
                            className="flex-1 py-2 rounded-xl font-bold text-xs"
                            style={isBooked
                              ? { background: 'rgba(120,196,160,0.12)', color: '#78C4A0', border: '1px solid rgba(120,196,160,0.3)' }
                              : { background: '#0D9488', color: 'white' }}
                          >
                            {isBooked ? '✓ Booked' : 'Book with Coupld'}
                          </button>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Share Sheet */}
      <AnimatePresence>
        {openSheet === 'share' && (
          <motion.div
            className="fixed bottom-0 left-0 right-0 mx-auto max-w-[390px] z-40 rounded-t-3xl p-6"
            style={{ background: '#FFFFFF', border: '1px solid rgba(0,0,0,0.08)' }}
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 26 }}
          >
            <div className="w-10 h-1 rounded-full bg-brand-textSub/30 mx-auto mb-5" />
            <p className="text-gray-900 font-bold text-xl mb-2">Share Your Story</p>
            <p className="text-brand-textSub text-sm mb-5">
              Alex &amp; Isabelle found each other on Coupld. Let the world know.
            </p>

            {/* Story card preview */}
            <div
              className="rounded-2xl p-5 mb-5 flex flex-col items-center text-center"
              style={{ background: 'linear-gradient(135deg, rgba(13,148,136,0.08), rgba(20,184,166,0.05))', border: '1px solid rgba(13,148,136,0.2)' }}
            >
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-full overflow-hidden">
                  <img src="https://images.pexels.com/photos/6200777/pexels-photo-6200777.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=200&w=200" alt="Alex" className="w-full h-full object-cover" />
                </div>
                <Heart size={14} style={{ color: '#E8607A' }} />
                <div className="w-8 h-8 rounded-full overflow-hidden">
                  <img src="https://images.pexels.com/photos/7437171/pexels-photo-7437171.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=200&w=200" alt="Isabelle" className="w-full h-full object-cover" />
                </div>
              </div>
              <p className="text-gray-900 font-bold text-base">Alex &amp; Isabelle</p>
              <p className="text-brand-textSub text-xs mt-1">Found each other on Coupld · April 2026</p>
              <p className="text-brand-lavender text-xs mt-1 font-medium">#CoupldStory</p>
            </div>

            <div className="flex flex-col gap-2.5">
              {[
                { id: 'instagram', label: 'Share to Instagram Stories', bg: 'linear-gradient(135deg, #833ab4, #fd1d1d, #fcb045)', icon: Instagram },
                { id: 'x', label: 'Post on X', bg: 'rgba(255,255,255,0.1)', isX: true },
                { id: 'whatsapp', label: 'Share via WhatsApp', bg: 'rgba(37,211,102,0.15)', color: '#25D366' },
                { id: 'copy', label: 'Copy link', bg: 'rgba(184,160,212,0.1)', color: '#B8A0D4' },
              ].map(s => {
                const isDone = shared === s.id
                return (
                  <button
                    key={s.id}
                    onClick={() => setShared(s.id)}
                    className="w-full py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2.5 text-white transition-all active:scale-97"
                    style={{ background: isDone ? 'rgba(120,196,160,0.15)' : s.bg, border: isDone ? '1px solid rgba(120,196,160,0.35)' : 'none' }}
                  >
                    {isDone ? (
                      <><CheckCircle size={15} style={{ color: '#78C4A0' }} /><span style={{ color: '#78C4A0' }}>Shared!</span></>
                    ) : (
                      <>
                        {s.id === 'x' ? <XIcon /> : s.icon ? <s.icon size={16} /> : <Share2 size={16} />}
                        {s.label}
                      </>
                    )}
                  </button>
                )
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
