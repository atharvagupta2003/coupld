import { useNavigate } from 'react-router-dom'
import { LayoutGrid } from 'lucide-react'

export default function WorkflowSelectorButton() {
  const navigate = useNavigate()
  return (
    <button
      onClick={() => navigate('/')}
      className="fixed top-4 left-4 z-50 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-white font-medium transition-all active:scale-95"
      style={{
        fontSize: 12,
        background: 'rgba(255,255,255,0.08)',
        border: '1px solid rgba(255,255,255,0.12)',
        backdropFilter: 'blur(8px)',
      }}
    >
      <LayoutGrid size={11} />
      Workflows
    </button>
  )
}
