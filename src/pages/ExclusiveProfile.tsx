import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import {
  ChevronLeft, Heart, CheckCircle, Calendar, MapPin,
  Users, Sparkles, Clock, Coffee,
} from 'lucide-react'
import { profiles, alexPhotos } from '../data/mockData'

const isabelle = profiles[0]

interface ScheduleItem {
  id: string
  type: 'date' | 'outing' | 'counseling' | 'coaching'
  title: string
  venue: string
  date: string
  time: string
  confirmed: boolean
  color: string
}

const SCHEDULE: ScheduleItem[] = [
  {
    id: 's1', type: 'outing',
    title: 'Box Hill Sunrise Hike',
    venue: 'Box Hill, Surrey',
    date: 'Sat 26 Apr', time: '8:00 AM',
    confirmed: true, color: '#78C4A0',
  },
  {
    id: 's2', type: 'coaching',
    title: 'Cupid Check-In Session',
    venue: 'In-app · with Cupid',
    date: 'Sun 27 Apr', time: '7:00 PM',
    confirmed: true, color: '#D4A843',
  },
  {
    id: 's3', type: 'date',
    title: "Ronnie Scott's Jazz Night",
    venue: "Ronnie Scott's, Soho",
    date: 'Fri 2 May', time: '9:00 PM',
    confirmed: true, color: '#B8A0D4',
  },
  {
    id: 's4', type: 'outing',
    title: 'Pottery Class for Two',
    venue: 'Studio Roca, Hackney',
    date: 'Sat 10 May', time: '6:00 PM',
    confirmed: false, color: '#6BB5C4',
  },
  {
    id: 's5', type: 'counseling',
    title: 'Couple Counselling — Session 1',
    venue: 'Online · Dr. Sarah Lim',
    date: 'Tue 13 May', time: '7:00 PM',
    confirmed: false, color: '#C2547A',
  },
  {
    id: 's6', type: 'date',
    title: 'Private Wine Tasting',
    venue: 'Humble Grape, London Bridge',
    date: 'Sat 17 May', time: '6:30 PM',
    confirmed: false, color: '#D4A843',
  },
]

const TYPE_ICONS = {
  date: Calendar,
  outing: MapPin,
  counseling: Users,
  coaching: Sparkles,
}

const TYPE_LABELS = {
  date: 'Date',
  outing: 'Outing',
  counseling: 'Counselling',
  coaching: 'Coaching',
}

const MILESTONES = [
  { label: 'First message', done: true, date: '21 Apr' },
  { label: 'First date', done: true, date: '22 Apr' },
  { label: 'Went exclusive', done: true, date: '24 Apr' },
  { label: 'First trip together', done: false },
  { label: 'Meet the friends', done: false },
  { label: '1 month', done: false },
]

export default function ExclusiveProfile() {
  const navigate = useNavigate()

  return (
    <motion.div
      className="flex flex-col w-full min-h-screen bg-[#1C0B3A] pb-10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
    >
      {/* Header */}
      <div
        className="sticky top-0 z-10 flex items-center gap-3 px-4 py-4"
        style={{ background: 'rgba(28,11,58,0.97)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(184,160,212,0.08)' }}
      >
        <button onClick={() => navigate(-1)} className="pl-8">
          <ChevronLeft size={22} className="text-white" />
        </button>
        <h1 className="text-white font-bold text-lg flex-1">Couple Profile</h1>
        <div
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full"
          style={{ background: 'rgba(232,96,122,0.12)', border: '1px solid rgba(232,96,122,0.35)' }}
        >
          <Heart size={11} style={{ color: '#E8607A' }} />
          <span className="text-xs font-bold" style={{ color: '#E8607A' }}>Exclusive</span>
        </div>
      </div>

      {/* Couple hero */}
      <div className="flex flex-col items-center px-5 pt-8 pb-6">
        {/* Photos */}
        <div className="flex items-center gap-0 mb-4">
          <div
            className="w-20 h-20 rounded-full overflow-hidden"
            style={{ border: '3px solid rgba(184,160,212,0.5)', boxShadow: '0 0 24px rgba(184,160,212,0.25)' }}
          >
            <img src={alexPhotos[0]} alt="Alex" className="w-full h-full object-cover" />
          </div>
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center z-10 -mx-2"
            style={{ background: 'linear-gradient(135deg, #E8607A, #C2547A)', border: '3px solid #1C0B3A', boxShadow: '0 0 16px rgba(232,96,122,0.5)' }}
          >
            <Heart size={16} fill="white" className="text-white" />
          </div>
          <div
            className="w-20 h-20 rounded-full overflow-hidden"
            style={{ border: '3px solid rgba(194,84,122,0.5)', boxShadow: '0 0 24px rgba(194,84,122,0.25)' }}
          >
            <img src={isabelle.photos[0]} alt="Isabelle" className="w-full h-full object-cover" />
          </div>
        </div>

        <h2 className="text-white font-bold text-2xl">Alex &amp; Isabelle</h2>
        <p className="text-brand-textSub text-sm mt-1">Found each other on Coupld · April 2026</p>

        {/* Stats */}
        <div className="flex gap-6 mt-5">
          {[
            { label: 'Together', value: '3 days' },
            { label: 'Dates planned', value: '4' },
            { label: 'Compatibility', value: '94%' },
          ].map(s => (
            <div key={s.label} className="text-center">
              <p className="text-white font-bold text-lg">{s.value}</p>
              <p className="text-brand-textSub text-xs">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Exclusive badge */}
        <div
          className="mt-4 flex items-center gap-2 px-4 py-2.5 rounded-full"
          style={{ background: 'rgba(232,96,122,0.1)', border: '1px solid rgba(232,96,122,0.35)' }}
        >
          <Heart size={13} style={{ color: '#E8607A' }} />
          <p className="text-sm font-semibold" style={{ color: '#E8607A' }}>
            Exclusive since Saturday 24 Apr · Billing stopped
          </p>
        </div>
      </div>

      <div className="px-5 flex flex-col gap-6">
        {/* Upcoming schedule */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <p className="text-white font-semibold text-sm">Upcoming Schedule</p>
            <button
              onClick={() => navigate('/date-planning')}
              className="text-xs font-semibold"
              style={{ color: '#B8A0D4' }}
            >
              + Add
            </button>
          </div>

          <div className="flex flex-col gap-2.5">
            {SCHEDULE.map((item, i) => {
              const Icon = TYPE_ICONS[item.type]
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i }}
                  className="flex items-center gap-3 rounded-2xl p-4"
                  style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: `1px solid ${item.confirmed ? `${item.color}35` : 'rgba(184,160,212,0.12)'}`,
                  }}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: `${item.color}18` }}
                  >
                    <Icon size={16} style={{ color: item.color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-white font-semibold text-sm truncate">{item.title}</p>
                      <span
                        className="shrink-0 px-1.5 py-0.5 rounded-full font-semibold uppercase"
                        style={{ fontSize: 8, background: `${item.color}18`, color: item.color }}
                      >
                        {TYPE_LABELS[item.type]}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mt-0.5">
                      <MapPin size={10} className="text-brand-textSub shrink-0" />
                      <p className="text-brand-textSub text-xs truncate">{item.venue}</p>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-white font-semibold text-xs">{item.date}</p>
                    <div className="flex items-center gap-1 mt-0.5 justify-end">
                      <Clock size={10} className="text-brand-textSub" />
                      <p className="text-brand-textSub" style={{ fontSize: 10 }}>{item.time}</p>
                    </div>
                    {item.confirmed ? (
                      <CheckCircle size={12} style={{ color: '#78C4A0' }} className="mt-1 ml-auto" />
                    ) : (
                      <p className="text-xs mt-1" style={{ color: '#9B8FB0', fontSize: 9 }}>Pending</p>
                    )}
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Milestones */}
        <div>
          <p className="text-white font-semibold text-sm mb-3">Relationship Milestones</p>
          <div className="flex flex-col gap-2">
            {MILESTONES.map((m, i) => (
              <div
                key={m.label}
                className="flex items-center gap-3 px-4 py-3 rounded-xl"
                style={{
                  background: m.done ? 'rgba(120,196,160,0.07)' : 'rgba(255,255,255,0.03)',
                  border: m.done ? '1px solid rgba(120,196,160,0.25)' : '1px solid rgba(184,160,212,0.1)',
                }}
              >
                <CheckCircle size={15} style={{ color: m.done ? '#78C4A0' : '#4A3866' }} className="shrink-0" />
                <p className={`text-sm flex-1 ${m.done ? 'text-white' : 'text-brand-textSub'}`}>{m.label}</p>
                {m.date && <p className="text-brand-textSub shrink-0" style={{ fontSize: 10 }}>{m.date}</p>}
                {!m.done && <p className="text-xs shrink-0" style={{ color: '#4A3866', fontSize: 10 }}>Upcoming</p>}
              </div>
            ))}
          </div>
        </div>

        {/* Quick actions */}
        <div className="grid grid-cols-2 gap-3">
          {[
            { label: 'Plan a date', icon: Calendar, path: '/date-planning', color: '#78C4A0' },
            { label: 'Ask Cupid', icon: Sparkles, path: '/exclusive-coach', color: '#D4A843' },
            { label: 'Gift ideas', icon: Coffee, path: '/gifts', color: '#C2547A' },
            { label: 'View counselling', icon: Users, path: '/exclusive', color: '#B8A0D4' },
          ].map(action => {
            const Icon = action.icon
            return (
              <button
                key={action.label}
                onClick={() => navigate(action.path)}
                className="rounded-2xl p-4 flex flex-col items-center gap-2 transition-all active:scale-97"
                style={{ background: `${action.color}10`, border: `1px solid ${action.color}28` }}
              >
                <Icon size={20} style={{ color: action.color }} />
                <p className="text-white text-xs font-semibold">{action.label}</p>
              </button>
            )
          })}
        </div>
      </div>
    </motion.div>
  )
}
