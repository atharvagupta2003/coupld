import { useNavigate } from 'react-router-dom'

export default function SkipButton() {
  const navigate = useNavigate()
  return (
    <button
      onClick={() => navigate('/home')}
      className="fixed top-4 right-4 z-50 px-3 py-1.5 rounded-full text-gray-700 font-medium"
      style={{
        fontSize: 12,
        background: 'rgba(0,0,0,0.05)',
        border: '1px solid rgba(0,0,0,0.1)',
      }}
    >
      Skip to app
    </button>
  )
}
