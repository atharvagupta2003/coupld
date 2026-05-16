import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useNavigate, useLocation } from 'react-router-dom'
import { Home, MessageCircle, Trophy, User } from 'lucide-react'
import CupidCharacter from './CupidCharacter'
import CupidChat from '../pages/CupidChat'

const TABS = [
  { icon: Home,          label: 'Home',     path: '/home' },
  { icon: MessageCircle, label: 'Messages', path: '/messages' },
  { icon: null,          label: 'Cupid',    path: null },
  { icon: Trophy,        label: 'Badges',   path: '/badges' },
  { icon: User,          label: 'Profile',  path: '/profile' },
]

export default function BottomNav() {
  const navigate = useNavigate()
  const location = useLocation()
  const [showCupid, setShowCupid] = useState(false)

  return (
    <>
      <div
        className="fixed bottom-0 left-0 right-0 mx-auto max-w-[390px] flex items-end justify-around z-30"
        style={{
          background: 'rgba(255,255,255,0.96)',
          backdropFilter: 'blur(20px)',
          borderTop: '1px solid rgba(0,0,0,0.08)',
          height: 68,
          paddingBottom: 'env(safe-area-inset-bottom)',
        }}
      >
        {TABS.map(({ icon: Icon, label, path }) => {
          const isActive = path && location.pathname === path
          const isCupid = label === 'Cupid'

          return (
            <button
              key={label}
              onClick={() => {
                if (isCupid) { setShowCupid(true); return }
                if (path) navigate(path)
              }}
              className="flex flex-col items-center justify-end flex-1 pb-3"
              style={{ height: '100%' }}
            >
              {isCupid ? (
                /* Cupid character sits on top of the nav bar */
                <motion.div
                  className="mb-0"
                  style={{ marginBottom: -2, marginTop: -20 }}
                  animate={{ y: [0, -3, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                  whileTap={{ scale: 0.9 }}
                >
                  <CupidCharacter size={44} />
                </motion.div>
              ) : (
                <>
                  <motion.div animate={{ scale: isActive ? 1.12 : 1 }} transition={{ duration: 0.15 }}>
                    {Icon && <Icon size={22} style={{ color: isActive ? '#0D9488' : '#6B7280' }} />}
                  </motion.div>
                  {isActive && (
                    <span className="font-semibold mt-0.5" style={{ color: '#0D9488', fontSize: 10 }}>
                      {label}
                    </span>
                  )}
                </>
              )}
            </button>
          )
        })}
      </div>

      <AnimatePresence>
        {showCupid && <CupidChat onClose={() => setShowCupid(false)} />}
      </AnimatePresence>
    </>
  )
}
