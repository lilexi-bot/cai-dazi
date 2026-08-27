import { useState } from 'react'
import { Home, BookOpen, NotebookPen, BarChart3, Settings } from 'lucide-react'
import type { Profile } from './lib/supabase'
import HomePage from './pages/HomePage'
import LearnPage from './pages/LearnPage'
import DiaryPage from './pages/DiaryPage'
import ReportPage from './pages/ReportPage'
import SettingsPage from './pages/SettingsPage'

type Props = {
  profile: Profile
  onProfileUpdate: () => void
}

type Tab = 'home' | 'learn' | 'diary' | 'report' | 'settings'

export default function MainApp({ profile, onProfileUpdate }: Props) {
  const [tab, setTab] = useState<Tab>('home')

  const tabs: { id: Tab; label: string; icon: typeof Home }[] = [
    { id: 'home', label: '首页', icon: Home },
    { id: 'learn', label: '学习', icon: BookOpen },
    { id: 'diary', label: '理财日记', icon: NotebookPen },
    { id: 'report', label: '行为周报', icon: BarChart3 },
    { id: 'settings', label: '设置', icon: Settings },
  ]

  return (
    <div className="min-h-screen bg-neutral-50 max-w-md mx-auto flex flex-col">
      <div className="flex-1 overflow-y-auto pb-20">
        {tab === 'home' && <HomePage profile={profile} />}
        {tab === 'learn' && <LearnPage />}
        {tab === 'diary' && <DiaryPage />}
        {tab === 'report' && <ReportPage profile={profile} />}
        {tab === 'settings' && <SettingsPage profile={profile} onProfileUpdate={onProfileUpdate} />}
      </div>

      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t border-neutral-200 px-2 py-1.5 flex items-center justify-around z-50">
        {tabs.map((t) => {
          const Icon = t.icon
          const active = tab === t.id
          return (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-lg transition-all ${
                active ? 'text-primary-600' : 'text-neutral-400'
              }`}
            >
              <Icon size={22} strokeWidth={active ? 2.5 : 2} />
              <span className={`text-[10px] ${active ? 'font-semibold' : 'font-normal'}`}>{t.label}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
