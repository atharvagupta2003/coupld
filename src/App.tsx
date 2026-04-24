import { HashRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import BottomNav from './components/BottomNav'
import WorkflowSelectorButton from './components/WorkflowSelectorButton'
import WorkflowSelector from './pages/WorkflowSelector'
import Splash from './pages/Splash'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import AgeVerify from './pages/AgeVerify'
import Onboarding from './pages/Onboarding'
import HowCoupldWorks from './pages/HowCoupldWorks'
import ChooseCoach from './pages/ChooseCoach'
import Home from './pages/Home'
import ProfileView from './pages/ProfileView'
import Messages from './pages/Messages'
import Feedback from './pages/Feedback'
import Exclusive from './pages/Exclusive'
import Badges from './pages/Badges'
import Upgrade from './pages/Upgrade'
import UserProfile from './pages/UserProfile'
import CoachPage from './pages/CoachPage'
import DatePlanning from './pages/DatePlanning'
import GiftIdeas from './pages/GiftIdeas'
import PostDateFeedback from './pages/PostDateFeedback'
import ExclusiveCoach from './pages/ExclusiveCoach'
import ExplicitSentWarning from './pages/ExplicitSentWarning'
import ExplicitReceivedWarning from './pages/ExplicitReceivedWarning'
import ExclusiveProfile from './pages/ExclusiveProfile'

const NO_NAV_ROUTES = [
  '/',
  '/splash',
  '/login',
  '/signup',
  '/signup/verify',
  '/signup/onboarding',
  '/how-coupld-works',
  '/choose-coach',
  '/exclusive',
  '/exclusive-coach',
  '/safety/sent',
  '/safety/received',
]

function AppInner() {
  const location = useLocation()
  const showNav = !NO_NAV_ROUTES.includes(location.pathname)

  return (
    <div className="relative w-full max-w-[390px] min-h-screen bg-brand-bg flex flex-col overflow-hidden">
      {location.pathname !== '/' && <WorkflowSelectorButton />}
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<WorkflowSelector />} />
          <Route path="/splash" element={<Splash />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signup/verify" element={<AgeVerify />} />
          <Route path="/signup/onboarding" element={<Onboarding />} />
          <Route path="/how-coupld-works" element={<HowCoupldWorks />} />
          <Route path="/choose-coach" element={<ChooseCoach />} />
          <Route path="/home" element={<Home />} />
          <Route path="/profile/:id" element={<ProfileView />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/exclusive" element={<Exclusive />} />
          <Route path="/badges" element={<Badges />} />
          <Route path="/upgrade" element={<Upgrade />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/coach" element={<CoachPage />} />
          <Route path="/date-planning" element={<DatePlanning />} />
          <Route path="/gifts" element={<GiftIdeas />} />
          <Route path="/post-date-feedback" element={<PostDateFeedback />} />
          <Route path="/exclusive-coach" element={<ExclusiveCoach />} />
          <Route path="/safety/sent" element={<ExplicitSentWarning />} />
          <Route path="/safety/received" element={<ExplicitReceivedWarning />} />
          <Route path="/exclusive-profile" element={<ExclusiveProfile />} />
        </Routes>
      </AnimatePresence>
      {showNav && <BottomNav />}
    </div>
  )
}

export default function App() {
  return (
    <HashRouter>
      <AppInner />
    </HashRouter>
  )
}
