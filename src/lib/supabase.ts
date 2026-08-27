import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: false,
  },
})

export type Profile = {
  id: string
  monthly_savings: number | null
  investment_horizon: string | null
  risk_tolerance: string | null
  risk_type: string
  companion_density: string
  created_at: string
}

export type ChatMessage = {
  id: string
  role: 'user' | 'assistant'
  content: string
  context_type: string
  created_at: string
}

export type DailyBriefing = {
  id: string
  briefing_date: string
  type: 'pre_market' | 'post_market' | 'weekly'
  title: string
  content: string
  is_read: boolean
  created_at: string
}

export type LearningLesson = {
  id: string
  title: string
  concept: string
  analogy: string
  content: string
  difficulty: string
  created_at: string
}

export type LearningProgress = {
  id: string
  lesson_id: string
  is_completed: boolean
  completed_at: string | null
  created_at: string
}

export type DiaryEntry = {
  id: string
  action_type: string
  product_name: string | null
  amount: number | null
  reason: string | null
  market_context: string | null
  emotion: string | null
  created_at: string
}

export type Milestone = {
  id: string
  title: string
  description: string | null
  icon: string
  is_achieved: boolean
  achieved_at: string | null
  created_at: string
}
