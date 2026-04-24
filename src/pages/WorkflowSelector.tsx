import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import {
  UserPlus, Heart, MessageCircle, User, ArrowRight,
  Sparkles, Star, ThumbsUp, Gift, Crown, LogIn,
  Eye, Coins, Calendar, ShieldAlert, ShieldOff, Award, Users,
} from 'lucide-react'
import CupidCharacter from '../components/CupidCharacter'

interface Workflow {
  id: string
  title: string
  description: string
  icon: React.ElementType
  path: string
  accent: string
  bg: string
  border: string
  tag?: string
}

const sections: { label: string; workflows: Workflow[] }[] = [
  {
    label: 'Getting Started',
    workflows: [
      {
        id: 'onboarding',
        title: 'Onboarding',
        description: 'Sign up, pick your coach, answer profiling questions & upload photos',
        icon: UserPlus,
        path: '/splash',
        accent: '#B8A0D4',
        bg: 'linear-gradient(135deg, rgba(184,160,212,0.14) 0%, rgba(45,27,78,0.4) 100%)',
        border: 'rgba(184,160,212,0.3)',
        tag: 'Start here',
      },
      {
        id: 'login',
        title: 'Returning User Login',
        description: 'Sign in as an existing user and jump straight into the app',
        icon: LogIn,
        path: '/login',
        accent: '#8890C4',
        bg: 'linear-gradient(135deg, rgba(136,144,196,0.12) 0%, rgba(45,27,78,0.35) 100%)',
        border: 'rgba(136,144,196,0.28)',
      },
    ],
  },
  {
    label: 'Matching',
    workflows: [
      {
        id: 'matching',
        title: 'Browse Matches',
        description: 'Explore 5 curated matches, replace any with credits, see a hidden-photo profile',
        icon: Heart,
        path: '/home',
        accent: '#C2547A',
        bg: 'linear-gradient(135deg, rgba(194,84,122,0.14) 0%, rgba(45,27,78,0.4) 100%)',
        border: 'rgba(194,84,122,0.3)',
      },
      {
        id: 'profile-view',
        title: 'Profile Deep-dive',
        description: "See Isabelle's full 8-dimension compatibility breakdown and coach note",
        icon: Eye,
        path: '/profile/1',
        accent: '#6BB5C4',
        bg: 'linear-gradient(135deg, rgba(107,181,196,0.12) 0%, rgba(45,27,78,0.38) 100%)',
        border: 'rgba(107,181,196,0.28)',
      },
      {
        id: 'credits',
        title: 'Premium & Credits',
        description: 'Explore pricing tiers, credit packs and what Premium unlocks',
        icon: Coins,
        path: '/upgrade',
        accent: '#D4A843',
        bg: 'linear-gradient(135deg, rgba(212,168,67,0.13) 0%, rgba(45,27,78,0.38) 100%)',
        border: 'rgba(212,168,67,0.28)',
      },
    ],
  },
  {
    label: 'Messaging & Coaching',
    workflows: [
      {
        id: 'messaging',
        title: 'Chat with Match',
        description: "Full conversation with Isabelle — Cupid coaching, flower delivery, and booking a first date",
        icon: MessageCircle,
        path: '/messages?thread=1',
        accent: '#D4A843',
        bg: 'linear-gradient(135deg, rgba(212,168,67,0.13) 0%, rgba(45,27,78,0.4) 100%)',
        border: 'rgba(212,168,67,0.28)',
      },
      {
        id: 'coach',
        title: 'Cupid Coach Chat',
        description: "Full AI coach conversation — strategy, match analysis and relationship guidance",
        icon: Sparkles,
        path: '/coach',
        accent: '#E8A0D4',
        bg: 'linear-gradient(135deg, rgba(232,160,212,0.12) 0%, rgba(45,27,78,0.38) 100%)',
        border: 'rgba(232,160,212,0.28)',
      },
    ],
  },
  {
    label: 'Dating & Gifts',
    workflows: [
      {
        id: 'date-planning',
        title: 'Plan a Date',
        description: 'Browse curated venues — coffee, bars, concerts, theatre, axe throwing — with 15% off',
        icon: Calendar,
        path: '/date-planning',
        accent: '#78C4A0',
        bg: 'linear-gradient(135deg, rgba(120,196,160,0.12) 0%, rgba(45,27,78,0.38) 100%)',
        border: 'rgba(120,196,160,0.28)',
        tag: '15% off',
      },
      {
        id: 'gifts',
        title: 'Gift Ideas',
        description: 'Roses, chocolates, candles, experiences — curated gifts with exclusive Coupld discounts',
        icon: Gift,
        path: '/gifts',
        accent: '#E8607A',
        bg: 'linear-gradient(135deg, rgba(232,96,122,0.12) 0%, rgba(45,27,78,0.38) 100%)',
        border: 'rgba(232,96,122,0.28)',
      },
    ],
  },
  {
    label: 'After the Date',
    workflows: [
      {
        id: 'post-date-feedback',
        title: 'Post-Date Feedback',
        description: 'Rate how it went, was the profile accurate, chemistry stars, and get Cupid\'s analysis',
        icon: ThumbsUp,
        path: '/post-date-feedback',
        accent: '#78C4A0',
        bg: 'linear-gradient(135deg, rgba(120,196,160,0.12) 0%, rgba(45,27,78,0.38) 100%)',
        border: 'rgba(120,196,160,0.28)',
      },
      {
        id: 'exclusive',
        title: 'Going Exclusive',
        description: "The moment you both decide to make it official — confetti and billing stops",
        icon: Heart,
        path: '/exclusive',
        accent: '#E8607A',
        bg: 'linear-gradient(135deg, rgba(232,96,122,0.13) 0%, rgba(45,27,78,0.4) 100%)',
        border: 'rgba(232,96,122,0.28)',
        tag: 'Endgame',
      },
      {
        id: 'exclusive-coach',
        title: 'Exclusive Couple Coach',
        description: "Cupid + both partners in one chat — communication tips, milestones, date ideas",
        icon: Sparkles,
        path: '/exclusive-coach',
        accent: '#C2547A',
        bg: 'linear-gradient(135deg, rgba(194,84,122,0.12) 0%, rgba(45,27,78,0.38) 100%)',
        border: 'rgba(194,84,122,0.28)',
      },
      {
        id: 'exclusive-profile',
        title: 'Couple Profile',
        description: "Exclusive status, upcoming date schedule, milestones and relationship quick-actions",
        icon: Users,
        path: '/exclusive-profile',
        accent: '#E8607A',
        bg: 'linear-gradient(135deg, rgba(232,96,122,0.12) 0%, rgba(45,27,78,0.38) 100%)',
        border: 'rgba(232,96,122,0.28)',
      },
    ],
  },
  {
    label: 'Safety & Trust',
    workflows: [
      {
        id: 'explicit-sent',
        title: 'Explicit Content — Sent',
        description: "Simulate sending an explicit photo: content is blocked, warning issued, escalation shown",
        icon: ShieldAlert,
        path: '/safety/sent',
        accent: '#C2547A',
        bg: 'linear-gradient(135deg, rgba(194,84,122,0.13) 0%, rgba(45,27,78,0.4) 100%)',
        border: 'rgba(194,84,122,0.3)',
        tag: 'Safety',
      },
      {
        id: 'explicit-received',
        title: 'Explicit Content — Received',
        description: "Message is auto-hidden with a warning. Option to view anyway, report, or block the sender",
        icon: ShieldOff,
        path: '/safety/received',
        accent: '#D4A843',
        bg: 'linear-gradient(135deg, rgba(212,168,67,0.12) 0%, rgba(45,27,78,0.38) 100%)',
        border: 'rgba(212,168,67,0.28)',
        tag: 'Safety',
      },
    ],
  },
  {
    label: 'Profile & Account',
    workflows: [
      {
        id: 'profile',
        title: 'Your Profile',
        description: 'View your verified profile, photos, Cupid suggestions and profile strength',
        icon: User,
        path: '/profile',
        accent: '#6BB5C4',
        bg: 'linear-gradient(135deg, rgba(107,181,196,0.13) 0%, rgba(45,27,78,0.38) 100%)',
        border: 'rgba(107,181,196,0.28)',
      },
      {
        id: 'badges',
        title: 'Badges & Journey',
        description: 'XP system, level progression, 18 badges across 5 categories — common to legendary',
        icon: Award,
        path: '/badges',
        accent: '#D4A843',
        bg: 'linear-gradient(135deg, rgba(212,168,67,0.12) 0%, rgba(45,27,78,0.38) 100%)',
        border: 'rgba(212,168,67,0.25)',
      },
      {
        id: 'upgrade',
        title: 'Upgrade & Billing',
        description: 'Pricing tiers, credit packs, what changes when you go exclusive',
        icon: Crown,
        path: '/upgrade',
        accent: '#B8A0D4',
        bg: 'linear-gradient(135deg, rgba(184,160,212,0.12) 0%, rgba(45,27,78,0.38) 100%)',
        border: 'rgba(184,160,212,0.25)',
      },
    ],
  },
]

export default function WorkflowSelector() {
  const navigate = useNavigate()

  const totalWorkflows = sections.reduce((sum, s) => sum + s.workflows.length, 0)

  return (
    <motion.div
      className="flex flex-col min-h-screen w-full bg-[#0D0618] px-5 pt-12 pb-12 overflow-y-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
    >
      {/* Ambient glow */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 70% 45% at 50% 0%, rgba(75,32,128,0.38) 0%, transparent 68%)',
        }}
      />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.12 }}
        className="relative z-10 flex flex-col items-center mb-8"
      >
        <motion.div
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        >
          <CupidCharacter size={60} />
        </motion.div>
        <h1 className="text-white font-bold text-2xl mt-4 mb-1">Coupld Prototype</h1>
        <p className="text-brand-textSub text-sm text-center">
          {totalWorkflows} workflows · {sections.length} sections · choose one to explore
        </p>
      </motion.div>

      {/* Sections */}
      <div className="relative z-10 flex flex-col gap-7">
        {sections.map((section, si) => (
          <div key={section.label}>
            {/* Section label */}
            <motion.p
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.18 + si * 0.06 }}
              className="text-brand-textSub font-semibold uppercase tracking-widest mb-3"
              style={{ fontSize: 10 }}
            >
              {section.label}
            </motion.p>

            <div className="flex flex-col gap-2.5">
              {section.workflows.map((wf, wi) => {
                const Icon = wf.icon
                const globalIdx = sections
                  .slice(0, si)
                  .reduce((sum, s) => sum + s.workflows.length, 0) + wi

                return (
                  <motion.button
                    key={wf.id}
                    onClick={() => navigate(wf.path)}
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + globalIdx * 0.04, type: 'spring', damping: 22 }}
                    whileTap={{ scale: 0.97 }}
                    className="w-full flex items-center gap-3.5 p-4 rounded-2xl text-left transition-all"
                    style={{ background: wf.bg, border: `1px solid ${wf.border}` }}
                  >
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                      style={{ background: `${wf.accent}20` }}
                    >
                      <Icon size={18} style={{ color: wf.accent }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <p className="text-white font-semibold text-sm">{wf.title}</p>
                        {wf.tag && (
                          <span
                            className="px-2 py-0.5 rounded-full font-semibold uppercase tracking-wider shrink-0"
                            style={{ fontSize: 9, background: `${wf.accent}28`, color: wf.accent, border: `1px solid ${wf.accent}44` }}
                          >
                            {wf.tag}
                          </span>
                        )}
                      </div>
                      <p className="text-brand-textSub leading-relaxed" style={{ fontSize: 11 }}>
                        {wf.description}
                      </p>
                    </div>
                    <ArrowRight size={15} style={{ color: wf.accent }} className="shrink-0 opacity-60" />
                  </motion.button>
                )
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="relative z-10 text-center text-brand-textSub/35 mt-10"
        style={{ fontSize: 11 }}
      >
        Project Zap — Prototype v0.3 · CONFIDENTIAL
      </motion.p>
    </motion.div>
  )
}
