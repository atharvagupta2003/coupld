import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { ChevronLeft, Tag, CheckCircle, Sparkles } from 'lucide-react'
import CupidCharacter from '../components/CupidCharacter'

interface Gift {
  id: string
  category: string
  name: string
  description: string
  originalPrice: number
  discount: number
  photo: string
  tag?: string
  cupidNote: string
  emoji: string
}

const CATEGORIES = ['All', 'Flowers', 'Chocolates', 'Fragrance', 'Experience', 'Dinner', 'Champagne']

const GIFTS: Gift[] = [
  {
    id: 'g1',
    category: 'Flowers',
    name: 'Wildflower Bouquet',
    description: 'Hand-arranged wildflowers from Bloom & Wild. Delivered to their door with a handwritten note from you.',
    originalPrice: 45,
    discount: 15,
    photo: 'https://images.pexels.com/photos/931177/pexels-photo-931177.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    tag: 'Cupid favourite',
    emoji: '💐',
    cupidNote: "This is the gift that landed perfectly with Isabelle. Wildflowers feel personal — not a default dozen roses.",
  },
  {
    id: 'g2',
    category: 'Flowers',
    name: 'Classic Red Roses',
    description: '12 long-stem red roses, premium grade. Simple, timeless, unambiguous.',
    originalPrice: 55,
    discount: 15,
    photo: 'https://images.pexels.com/photos/931177/pexels-photo-931177.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    emoji: '🌹',
    cupidNote: "Best for a later stage — roses signal clear romantic intent. Strong message, use it when the timing is right.",
  },
  {
    id: 'g3',
    category: 'Chocolates',
    name: 'Artisan Chocolate Box',
    description: 'Curated box of 16 single-origin truffles from Paul A. Young. The kind of chocolates that make a point.',
    originalPrice: 28,
    discount: 15,
    photo: 'https://images.pexels.com/photos/65882/chocolate-dark-coffee-confiserie-65882.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    emoji: '🍫',
    cupidNote: "Low-stakes, high-quality. A great add-on to flowers or as a standalone gesture after a good date.",
  },
  {
    id: 'g4',
    category: 'Chocolates',
    name: 'Gold-Foil Champagne Truffles',
    description: 'Moët & Chandon-infused truffles in a premium gift box. Celebratory without being over the top.',
    originalPrice: 42,
    discount: 20,
    photo: 'https://images.pexels.com/photos/65882/chocolate-dark-coffee-confiserie-65882.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    tag: '20% off',
    emoji: '🥂',
    cupidNote: "Excellent pairing gift to send on the morning of a first date. Sets a tone.",
  },
  {
    id: 'g5',
    category: 'Fragrance',
    name: 'Diptyque Baies Candle',
    description: "London's most gifted luxury candle. Black currant and Bulgarian rose. A gift that makes their apartment smell incredible for weeks.",
    originalPrice: 65,
    discount: 15,
    photo: 'https://images.pexels.com/photos/3270223/pexels-photo-3270223.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    emoji: '🕯️',
    cupidNote: "Isabelle's aesthetic score is high — she'll notice the choice of brand. This lands particularly well with design-conscious people.",
  },
  {
    id: 'g6',
    category: 'Experience',
    name: 'Pottery Class for Two',
    description: '2-hour evening pottery session at Studio Roca, Hackney. Hands in clay, something to keep. A date and a gift in one.',
    originalPrice: 95,
    discount: 15,
    photo: 'https://images.pexels.com/photos/3094218/pexels-photo-3094218.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    tag: 'Date + gift',
    emoji: '🏺',
    cupidNote: "Experiences outlast objects. If you've already had one successful date, this scales beautifully into the second.",
  },
  {
    id: 'g7',
    category: 'Experience',
    name: 'Private Wine Tasting',
    description: 'Guided tasting for two at Humble Grape, London Bridge. Six wines, expert host, two hours of good conversation.',
    originalPrice: 120,
    discount: 15,
    photo: 'https://images.pexels.com/photos/3393152/pexels-photo-3393152.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    emoji: '🍷',
    cupidNote: "High compatibility people tend to bond well over structured experiences — the tasting gives you built-in things to talk about.",
  },
  {
    id: 'g8',
    category: 'Dinner',
    name: "Chef's Table Dinner",
    description: "7-course tasting menu at ~Shibui, Mayfair. Intimate counter dining — Japan meets London. Unforgettable.",
    originalPrice: 185,
    discount: 10,
    photo: 'https://images.pexels.com/photos/2291594/pexels-photo-2291594.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    tag: 'Premium',
    emoji: '🍽️',
    cupidNote: "Reserve this for a milestone — third date or after the exclusivity conversation. This isn't an opener.",
  },
  {
    id: 'g9',
    category: 'Champagne',
    name: 'Laurent-Perrier Rosé',
    description: 'A magnum of Laurent-Perrier Cuvée Rosé with two crystal flutes. Chilled delivery, morning of your date.',
    originalPrice: 85,
    discount: 15,
    photo: 'https://images.pexels.com/photos/1123260/pexels-photo-1123260.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    emoji: '🍾',
    cupidNote: "If they mentioned champagne at any point, this is the obvious choice. Makes the evening feel like a proper occasion.",
  },
]

export default function GiftIdeas() {
  const navigate = useNavigate()
  const [activeCategory, setActiveCategory] = useState('All')
  const [sentGift, setSentGift] = useState<string | null>(null)
  const [pendingGift, setPendingGift] = useState<string | null>(null)

  const filtered = activeCategory === 'All' ? GIFTS : GIFTS.filter(g => g.category === activeCategory)

  const discountedPrice = (original: number, discount: number) =>
    Math.round(original * (1 - discount / 100))

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
          <h1 className="text-gray-900 font-bold text-lg">Gift Ideas</h1>
          <p className="text-brand-textSub" style={{ fontSize: 11 }}>Curated for your match · Exclusive Coupld discounts</p>
        </div>
        <Sparkles size={18} style={{ color: '#D4A843' }} />
      </div>

      {/* Cupid tip */}
      <div className="mx-4 mt-4 rounded-2xl p-4 flex items-start gap-3" style={{ background: 'rgba(13,148,136,0.06)', border: '1px solid rgba(13,148,136,0.15)' }}>
        <CupidCharacter size={36} />
        <div>
          <p className="font-semibold text-xs uppercase tracking-widest mb-1 text-brand-lavender">Cupid's Gift Guide</p>
          <p className="text-gray-900 text-sm leading-relaxed">
            The wildflower bouquet already worked for Isabelle. If you want to keep the momentum — the Diptyque candle paired with chocolates is the right next move. Understated but memorable.
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

      {/* Gift cards */}
      <div className="flex flex-col gap-3 px-4 mt-4">
        <AnimatePresence mode="popLayout">
          {filtered.map((gift, i) => {
            const discounted = discountedPrice(gift.originalPrice, gift.discount)
            const isSent = sentGift === gift.id
            const isPending = pendingGift === gift.id

            return (
              <motion.div
                key={gift.id}
                layout
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: i * 0.04 }}
                className="rounded-2xl overflow-hidden"
                style={{ background: 'rgba(0,0,0,0.02)', border: '1px solid rgba(0,0,0,0.08)' }}
              >
                {/* Photo row */}
                <div className="relative">
                  <img src={gift.photo} alt={gift.name} className="w-full object-cover" style={{ height: 130 }} />
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(0,0,0,0.35) 0%, transparent 50%)' }} />

                  {/* Emoji overlay */}
                  <div className="absolute top-3 left-4 text-3xl">{gift.emoji}</div>

                  {/* Discount */}
                  <div
                    className="absolute top-3 right-3 px-2 py-1 rounded-full font-bold flex items-center gap-1"
                    style={{ background: 'rgba(120,196,160,0.9)', color: '#0D3020', fontSize: 10 }}
                  >
                    <Tag size={9} />
                    {gift.discount}% OFF
                  </div>

                  {gift.tag && (
                    <div
                      className="absolute bottom-3 left-3 px-2.5 py-1 rounded-full font-semibold"
                      style={{ background: 'rgba(13,148,136,0.9)', color: 'white', fontSize: 10 }}
                    >
                      {gift.tag}
                    </div>
                  )}
                </div>

                <div className="p-4">
                  {/* Name + price */}
                  <div className="flex items-start justify-between mb-2">
                    <p className="text-gray-900 font-bold text-sm flex-1 pr-2">{gift.name}</p>
                    <div className="text-right shrink-0">
                      <p className="font-bold" style={{ color: '#78C4A0', fontSize: 15 }}>£{discounted}</p>
                      <p className="text-brand-textSub line-through" style={{ fontSize: 10 }}>£{gift.originalPrice}</p>
                    </div>
                  </div>

                  <p className="text-brand-textSub text-xs leading-relaxed mb-3">{gift.description}</p>

                  {/* Cupid note */}
                  <div
                    className="rounded-xl px-3 py-2 mb-3"
                    style={{ background: 'rgba(13,148,136,0.04)', border: '1px solid rgba(13,148,136,0.12)' }}
                  >
                    <p className="text-brand-textSub text-xs leading-relaxed italic">"{gift.cupidNote}"</p>
                  </div>

                  {/* CTA */}
                  {isSent ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="w-full py-2.5 rounded-xl flex items-center justify-center gap-2"
                      style={{ background: 'rgba(120,196,160,0.12)', border: '1px solid rgba(120,196,160,0.35)' }}
                    >
                      <CheckCircle size={15} style={{ color: '#78C4A0' }} />
                      <span className="font-bold text-sm" style={{ color: '#78C4A0' }}>Gift sent to Isabelle</span>
                    </motion.div>
                  ) : isPending ? (
                    <div className="flex gap-2">
                      <button
                        onClick={() => setPendingGift(null)}
                        className="flex-1 py-2.5 rounded-xl font-semibold text-xs"
                        style={{ background: 'rgba(0,0,0,0.04)', color: '#6B7280', border: '1px solid rgba(0,0,0,0.1)' }}
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => { setSentGift(gift.id); setPendingGift(null) }}
                        className="flex-1 py-2.5 rounded-xl font-bold text-sm"
                        style={{ background: '#0D9488', color: 'white' }}
                      >
                        Confirm — £{discounted}
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setPendingGift(gift.id)}
                      className="w-full py-2.5 rounded-xl font-semibold text-sm transition-all active:scale-98"
                      style={{ background: 'rgba(13,148,136,0.08)', border: '1px solid rgba(13,148,136,0.3)', color: '#0D9488' }}
                    >
                      Send as gift to Isabelle
                    </button>
                  )}
                </div>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}
