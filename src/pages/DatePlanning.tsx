import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { ChevronLeft, MapPin, Tag, Clock, Star, CheckCircle, Calendar } from 'lucide-react'
import CupidCharacter from '../components/CupidCharacter'

interface Venue {
  id: string
  name: string
  neighborhood: string
  category: string
  description: string
  price: string
  rating: number
  duration: string
  photo: string
  discount: number
  tag?: string
  cupidNote: string
  slots: string[]
}

const CATEGORIES = ['All', 'Coffee', 'Bar', 'Restaurant', 'Concert', 'Theatre', 'Axe Throwing', 'Outdoor']

const VENUES: Venue[] = [
  {
    id: 'v1',
    category: 'Coffee',
    name: 'Monmouth Coffee',
    neighborhood: 'Borough Market',
    description: 'Specialty coffee in a cosy, conversation-first setting. No laptops, no rush — perfect for a first meet.',
    price: '££',
    rating: 4.9,
    duration: '1–2 hrs',
    photo: 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    discount: 15,
    tag: 'Low pressure',
    cupidNote: "Isabelle mentioned she's a slow-morning person. A coffee date gives her space to warm up — she'll be at her best.",
    slots: ['Sat 10:00 AM', 'Sat 11:30 AM', 'Sun 10:00 AM'],
  },
  {
    id: 'v2',
    category: 'Bar',
    name: 'Nightjar',
    neighborhood: 'Old Street',
    description: 'Underground cocktail bar with live jazz, Prohibition-era atmosphere, and cocktails that start conversations.',
    price: '£££',
    rating: 4.8,
    duration: '2–3 hrs',
    photo: 'https://images.pexels.com/photos/1850595/pexels-photo-1850595.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    discount: 15,
    cupidNote: "You both scored high on aesthetic alignment. Nightjar's atmosphere will make a strong impression — book in advance.",
    slots: ['Fri 8:00 PM', 'Sat 8:00 PM', 'Sat 9:30 PM'],
  },
  {
    id: 'v3',
    category: 'Restaurant',
    name: 'Brat, Shoreditch',
    neighborhood: 'Shoreditch',
    description: 'Basque-inspired open-fire cooking. A Michelin-starred experience that feels relaxed, not stuffy.',
    price: '£££',
    rating: 4.9,
    duration: '2–3 hrs',
    photo: 'https://images.pexels.com/photos/2291594/pexels-photo-2291594.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    discount: 15,
    tag: 'Cupid pick',
    cupidNote: "Already matched to both your taste profiles. This was the venue I chose for your first date — it delivered.",
    slots: ['Sat 7:00 PM', 'Sat 7:30 PM', 'Sun 7:00 PM'],
  },
  {
    id: 'v4',
    category: 'Concert',
    name: "Ronnie Scott's Jazz Club",
    neighborhood: 'Soho',
    description: "London's most famous jazz club. Intimate, atmospheric, and always a story worth telling after.",
    price: '£££',
    rating: 4.8,
    duration: '2–3 hrs',
    photo: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    discount: 15,
    cupidNote: "Shared music interests came up in both profiles. This takes care of the activity so you can focus on each other.",
    slots: ['Fri 9:00 PM', 'Sat 7:00 PM', 'Sat 9:30 PM'],
  },
  {
    id: 'v5',
    category: 'Theatre',
    name: 'Young Vic',
    neighborhood: 'Waterloo',
    description: "Intimate theatre with bold, thoughtful productions. The bar before and after is half the date.",
    price: '££',
    rating: 4.7,
    duration: '3–4 hrs',
    photo: 'https://images.pexels.com/photos/713149/pexels-photo-713149.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    discount: 15,
    cupidNote: "Theatre gives you built-in conversation for the whole evening. Worth it if the chemistry is already strong.",
    slots: ['Thu 7:30 PM', 'Fri 7:30 PM', 'Sat 2:00 PM'],
  },
  {
    id: 'v6',
    category: 'Axe Throwing',
    name: 'Bad Axe Throwing',
    neighborhood: 'Shoreditch',
    description: "Throw axes. Compete. Laugh. One of the most effective ways to break down first-date nerves.",
    price: '££',
    rating: 4.6,
    duration: '1.5–2 hrs',
    photo: 'https://images.pexels.com/photos/3609817/pexels-photo-3609817.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    discount: 15,
    tag: 'High energy',
    cupidNote: "Isabelle's adventurous trait is strong. Competitive activities accelerate bonding — this one does both.",
    slots: ['Sat 2:00 PM', 'Sat 4:00 PM', 'Sun 1:00 PM'],
  },
  {
    id: 'v7',
    category: 'Outdoor',
    name: 'Hampstead Heath',
    neighborhood: 'North London',
    description: "Morning walk with panoramic city views. Pack a flask, take the east path. Effortlessly romantic.",
    price: '£',
    rating: 4.9,
    duration: '2–3 hrs',
    photo: 'https://images.pexels.com/photos/6409229/pexels-photo-6409229.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    discount: 10,
    tag: 'Free to book',
    cupidNote: "You both hike. Starting a second date the same way you bonded in conversation is a subtle but effective move.",
    slots: ['Sat 9:00 AM', 'Sat 10:30 AM', 'Sun 9:00 AM'],
  },
]

export default function DatePlanning() {
  const navigate = useNavigate()
  const [activeCategory, setActiveCategory] = useState('All')
  const [selected, setSelected] = useState<string | null>(null)
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null)
  const [booked, setBooked] = useState(false)

  const filtered = activeCategory === 'All' ? VENUES : VENUES.filter(v => v.category === activeCategory)
  const selectedVenue = VENUES.find(v => v.id === selected)

  const handleBook = () => {
    if (!selectedSlot) return
    setBooked(true)
  }

  return (
    <motion.div
      className="flex flex-col w-full min-h-screen bg-white pb-8"
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
          <h1 className="text-gray-900 font-bold text-lg">Plan a Date</h1>
          <p className="text-brand-textSub" style={{ fontSize: 11 }}>15% off when you book through Coupld</p>
        </div>
        <div
          className="px-2.5 py-1 rounded-full font-bold"
          style={{ background: 'rgba(120,196,160,0.15)', border: '1px solid rgba(120,196,160,0.4)', color: '#78C4A0', fontSize: 11 }}
        >
          15% OFF
        </div>
      </div>

      {/* Cupid suggestion */}
      <div className="mx-4 mt-4 rounded-2xl p-4 flex items-start gap-3" style={{ background: 'rgba(13,148,136,0.05)', border: '1px solid rgba(13,148,136,0.15)' }}>
        <CupidCharacter size={36} />
        <div>
          <p className="text-brand-lavender font-semibold text-xs uppercase tracking-widest mb-1">Cupid Recommends</p>
          <p className="text-gray-900 text-sm leading-relaxed">
            Based on both profiles, I'd suggest Nightjar (bar) for a second date or Bad Axe if you want energy. Coffee at Monmouth keeps it easy if you haven't met yet.
          </p>
        </div>
      </div>

      {/* Category tabs */}
      <div className="flex gap-2 px-4 mt-4 overflow-x-auto scrollbar-hide pb-1">
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

      {/* Venue cards */}
      <div className="flex flex-col gap-4 px-4 mt-4">
        <AnimatePresence mode="popLayout">
          {filtered.map((venue, i) => (
            <motion.div
              key={venue.id}
              layout
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ delay: i * 0.05 }}
              onClick={() => setSelected(selected === venue.id ? null : venue.id)}
              className="rounded-2xl overflow-hidden cursor-pointer"
              style={{
                border: selected === venue.id ? '1px solid #0D9488' : '1px solid rgba(0,0,0,0.08)',
                background: selected === venue.id ? 'rgba(13,148,136,0.03)' : 'rgba(0,0,0,0.02)',
              }}
            >
              {/* Photo */}
              <div className="relative">
                <img src={venue.photo} alt={venue.name} className="w-full object-cover" style={{ height: 160 }} />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.75) 100%)' }} />

                {/* Discount badge */}
                <div
                  className="absolute top-3 left-3 px-2.5 py-1 rounded-full font-bold flex items-center gap-1"
                  style={{ background: 'rgba(120,196,160,0.9)', color: '#0D3020', fontSize: 11 }}
                >
                  <Tag size={10} />
                  {venue.discount}% OFF
                </div>

                {venue.tag && (
                  <div
                    className="absolute top-3 right-3 px-2.5 py-1 rounded-full font-semibold"
                    style={{ background: 'rgba(13,148,136,0.9)', color: 'white', fontSize: 11 }}
                  >
                    {venue.tag}
                  </div>
                )}

                {/* Name overlay */}
                <div className="absolute bottom-3 left-4 right-4">
                  <p className="text-white font-bold text-base">{venue.name}</p>
                  <div className="flex items-center gap-3 mt-0.5">
                    <div className="flex items-center gap-1">
                      <MapPin size={10} className="text-brand-textSub" />
                      <span className="text-brand-textSub" style={{ fontSize: 11 }}>{venue.neighborhood}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star size={10} style={{ color: '#0D9488' }} />
                      <span style={{ color: '#0D9488', fontSize: 11, fontWeight: 600 }}>{venue.rating}</span>
                    </div>
                    <span className="text-brand-textSub" style={{ fontSize: 11 }}>{venue.price}</span>
                    <span className="text-brand-textSub" style={{ fontSize: 11 }}>{venue.duration}</span>
                  </div>
                </div>
              </div>

              {/* Body */}
              <div className="p-4">
                <p className="text-brand-textSub text-xs leading-relaxed mb-3">{venue.description}</p>

                {/* Cupid note */}
                <div
                  className="rounded-xl px-3 py-2.5 mb-3"
                  style={{ background: 'rgba(13,148,136,0.05)', border: '1px solid rgba(13,148,136,0.15)' }}
                >
                  <p className="text-gray-500 text-xs leading-relaxed italic">"{venue.cupidNote}"</p>
                </div>

                {/* Expanded slot selector */}
                <AnimatePresence>
                  {selected === venue.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                    >
                      <p className="text-gray-900 font-semibold text-xs mb-2">Available slots</p>
                      <div className="flex gap-2 flex-wrap mb-3">
                        {venue.slots.map(slot => (
                          <button
                            key={slot}
                            onClick={(e) => { e.stopPropagation(); setSelectedSlot(slot) }}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all"
                            style={
                              selectedSlot === slot
                                ? { background: '#0D9488', color: 'white' }
                                : { background: 'rgba(0,0,0,0.04)', color: '#0D9488', border: '1px solid rgba(13,148,136,0.3)' }
                            }
                          >
                            <Clock size={10} />
                            {slot}
                          </button>
                        ))}
                      </div>

                      {!booked ? (
                        <button
                          onClick={(e) => { e.stopPropagation(); handleBook() }}
                          disabled={!selectedSlot}
                          className="w-full py-3 rounded-xl font-bold text-sm transition-all disabled:opacity-40"
                          style={{ background: selectedSlot ? '#0D9488' : 'rgba(13,148,136,0.3)', color: 'white' }}
                        >
                          Book with Coupld — {venue.discount}% off
                        </button>
                      ) : (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="w-full py-3 rounded-xl flex items-center justify-center gap-2"
                          style={{ background: 'rgba(120,196,160,0.15)', border: '1px solid rgba(120,196,160,0.4)' }}
                        >
                          <CheckCircle size={16} style={{ color: '#78C4A0' }} />
                          <span className="font-bold text-sm" style={{ color: '#78C4A0' }}>
                            Date booked — {selectedSlot}
                          </span>
                        </motion.div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>

                {selected !== venue.id && (
                  <button
                    onClick={(e) => { e.stopPropagation(); setSelected(venue.id) }}
                    className="w-full py-2.5 rounded-xl font-semibold text-sm"
                    style={{ background: 'rgba(13,148,136,0.06)', border: '1px solid rgba(13,148,136,0.2)', color: '#0D9488' }}
                  >
                    <span className="flex items-center justify-center gap-2">
                      <Calendar size={14} />
                      See availability
                    </span>
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Discount info */}
      <div
        className="mx-4 mt-5 rounded-2xl p-4"
        style={{ background: 'rgba(120,196,160,0.07)', border: '1px solid rgba(120,196,160,0.2)' }}
      >
        <p className="font-semibold text-sm mb-1" style={{ color: '#78C4A0' }}>How the discount works</p>
        <p className="text-brand-textSub text-xs leading-relaxed">
          Coupld has partnerships with curated London venues. Your 15% discount is applied automatically at checkout — no codes needed. Just book, show up, enjoy.
        </p>
      </div>
    </motion.div>
  )
}
