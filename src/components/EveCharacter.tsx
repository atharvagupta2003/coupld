import { motion } from 'framer-motion'

interface Props {
  size?: number
  speaking?: boolean
}

const EVE_PHOTO = 'https://images.pexels.com/photos/16961133/pexels-photo-16961133.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800'

export default function EveCharacter({ size = 120, speaking = false }: Props) {
  const w = size
  const h = Math.round(size * 1.35)

  return (
    <div className="relative inline-flex items-end justify-center">
      <motion.div
        animate={{ y: speaking ? [0, -3, 0] : [0, -4, 0] }}
        transition={{ duration: speaking ? 0.45 : 4.2, repeat: Infinity, ease: 'easeInOut' }}
        style={{ width: w, height: h }}
      >
        <div
          className="relative w-full h-full overflow-hidden"
          style={{
            borderRadius: 16,
            boxShadow: speaking
              ? '0 0 20px rgba(194,84,122,0.5), 0 8px 32px rgba(0,0,0,0.5)'
              : '0 8px 32px rgba(0,0,0,0.4)',
            border: speaking ? '2px solid rgba(194,84,122,0.6)' : '2px solid rgba(194,84,122,0.2)',
          }}
        >
          <img
            src={EVE_PHOTO}
            alt="Eve"
            className="w-full h-full object-cover object-top"
            draggable={false}
          />
          {/* Subtle gradient overlay at bottom */}
          <div
            className="absolute inset-x-0 bottom-0 h-1/3"
            style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.3), transparent)' }}
          />
        </div>
      </motion.div>

      {/* Speaking sound bars */}
      {speaking && (
        <div className="absolute flex items-end gap-0.5" style={{ right: -12, top: '15%' }}>
          {[0, 1, 2, 3].map((i) => (
            <motion.div
              key={i}
              className="w-1 rounded-full"
              style={{ background: '#C2547A' }}
              animate={{ height: ['4px', `${7 + i * 4}px`, '4px'] }}
              transition={{ duration: 0.48, delay: i * 0.11, repeat: Infinity }}
            />
          ))}
        </div>
      )}
    </div>
  )
}
