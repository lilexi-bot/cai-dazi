import { useEffect, useState, useCallback } from 'react'
import { supabase, type Profile } from './lib/supabase'
import Onboarding from './pages/Onboarding'
import MainApp from './MainApp'

export default function App() {
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)

  const loadProfile = useCallback(async () => {
    const { data, error } = await supabase.from('profiles').select('*').maybeSingle()
    if (error) {
      console.error('Failed to load profile:', error)
    }
    setProfile(data as Profile | null)
    setLoading(false)
  }, [])

  useEffect(() => {
    loadProfile()
  }, [loadProfile])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-50">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary-500 flex items-center justify-center animate-pulse-soft">
            <span className="text-3xl">💰</span>
          </div>
          <p className="text-neutral-500 text-sm">财搭子正在准备中...</p>
        </div>
      </div>
    )
  }

  if (!profile) {
    return <Onboarding onComplete={loadProfile} />
  }

  return <MainApp profile={profile} onProfileUpdate={loadProfile} />
}
