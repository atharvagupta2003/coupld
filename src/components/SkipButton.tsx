import { useNavigate } from 'react-router-dom'

export default function SkipButton() {
  const navigate = useNavigate()
  return (
    <button
      onClick={() => navigate('/home')}
      className="fixed top-4 right-4 z-50 px-3 py-1.5 rounded-full text-white font-medium"
      style={{
        fontSize: 12,
        background: 'rgba(255,255,255,0.08)',
        border: '1px solid rgba(255,255,255,0.12)',
      }}
    >
      Skip to app
    </button>
  )
}
