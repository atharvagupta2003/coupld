import { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { ChevronLeft, CreditCard, Camera, CheckCircle } from 'lucide-react'
import SkipButton from '../components/SkipButton'

export default function AgeVerify() {
  const navigate = useNavigate()
  const [idUploaded, setIdUploaded] = useState(false)
  const [selfieUploaded, setSelfieUploaded] = useState(false)

  const handleUpload = (type: 'id' | 'selfie') => {
    setTimeout(() => {
      if (type === 'id') setIdUploaded(true)
      else setSelfieUploaded(true)
    }, 600)
  }

  return (
    <motion.div
      className="flex flex-col min-h-screen w-full bg-[#1C0B3A] px-5 pt-14 pb-8"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.35 }}
    >
      <SkipButton />
      <button onClick={() => navigate('/signup')} className="mb-6 text-white w-fit">
        <ChevronLeft size={24} />
      </button>

      <p className="text-brand-lavender font-semibold uppercase tracking-widest text-xs mb-4">
        Step 1 of 2
      </p>

      <h1 className="text-white font-bold text-2xl mb-2">Let's make sure you're you.</h1>
      <p className="text-brand-textSub text-sm leading-relaxed mb-8">
        We verify your age once to keep Coupld safe for everyone. Your ID is never stored after
        this step.
      </p>

      <div className="flex flex-col gap-3 mb-6">
        <button
          onClick={() => handleUpload('id')}
          className="glass rounded-2xl p-5 flex items-center gap-4 text-left transition-all active:scale-[0.98]"
          style={idUploaded ? { borderColor: '#22c55e', borderWidth: 1 } : {}}
        >
          {idUploaded ? (
            <CheckCircle size={24} className="text-green-400 shrink-0" />
          ) : (
            <CreditCard size={24} className="text-brand-lavender shrink-0" />
          )}
          <div>
            <p className="text-white font-semibold text-sm">
              {idUploaded ? 'ID uploaded' : 'Upload a photo ID'}
            </p>
            <p className="text-brand-textSub text-xs mt-0.5">
              Passport, driving licence, or national ID
            </p>
          </div>
        </button>

        <button
          onClick={() => handleUpload('selfie')}
          className="glass rounded-2xl p-5 flex items-center gap-4 text-left transition-all active:scale-[0.98]"
          style={selfieUploaded ? { borderColor: '#22c55e', borderWidth: 1 } : {}}
        >
          {selfieUploaded ? (
            <CheckCircle size={24} className="text-green-400 shrink-0" />
          ) : (
            <Camera size={24} className="text-brand-lavender shrink-0" />
          )}
          <div>
            <p className="text-white font-semibold text-sm">
              {selfieUploaded ? 'Selfie captured' : 'Take a quick selfie'}
            </p>
            <p className="text-brand-textSub text-xs mt-0.5">
              We match your face to your ID to confirm it is you
            </p>
          </div>
        </button>
      </div>

      <button
        onClick={() => navigate('/signup/onboarding')}
        className="w-full py-4 rounded-xl font-bold text-[#1C0B3A] transition-opacity hover:opacity-90 active:scale-[0.98]"
        style={{ backgroundColor: '#D4A843' }}
      >
        Verify and Continue
      </button>

      <p className="text-center text-brand-textSub text-xs mt-4">
        Why do we verify?{' '}
        <span className="text-brand-lavender cursor-pointer">Learn more</span>
      </p>
    </motion.div>
  )
}
