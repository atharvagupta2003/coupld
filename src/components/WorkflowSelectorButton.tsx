import { useNavigate } from 'react-router-dom'
import { LayoutGrid } from 'lucide-react'

export default function WorkflowSelectorButton() {
  const navigate = useNavigate()
  return (
    <button
      onClick={() => navigate('/')}
      className="fixed top-4 left-4 z-50 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-gray-700 font-medium transition-all active:scale-95"
      style={{
        fontSize: 12,
        background: 'rgba(0,0,0,0.05)',
        border: '1px solid rgba(0,0,0,0.1)',
        backdropFilter: 'blur(8px)',
      }}
    >
      <LayoutGrid size={11} />
      Workflows
    </button>
  )
}
