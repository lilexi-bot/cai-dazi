import { useState } from 'react'
import { supabase } from '../lib/supabase'
import { getOnboardingResponse } from '../lib/aiEngine'
import { Send } from 'lucide-react'

type Props = {
  onComplete: () => void
}

type ChatMsg = {
  role: 'user' | 'assistant'
  content: string
}

export default function Onboarding({ onComplete }: Props) {
  const [messages, setMessages] = useState<ChatMsg[]>([
    {
      role: 'assistant',
      content: `嗨！第一次见面，不用紧张。我也不是专家，就是比你多知道一点点～\n\n先问你三个超简单的问题，帮你找到最适合的入门方式：\n\n1. 你每个月大概能存多少钱？（不用精确，大概就行）`,
    },
  ])
  const [input, setInput] = useState('')
  const [step, setStep] = useState(0)
  const [typing, setTyping] = useState(false)
  const [monthlySavings, setMonthlySavings] = useState<number | null>(null)
  const [horizon, setHorizon] = useState<string | null>(null)
  const [riskTolerance, setRiskTolerance] = useState<string | null>(null)

  const handleSend = async () => {
    if (!input.trim() || typing) return
    const userMsg = input.trim()
    setMessages((prev) => [...prev, { role: 'user', content: userMsg }])
    setInput('')

    if (step === 0) {
      const num = parseInt(userMsg.replace(/[^0-9]/g, ''), 10)
      setMonthlySavings(isNaN(num) ? null : num)
    } else if (step === 1) {
      setHorizon(userMsg)
    } else if (step === 2) {
      const lower = userMsg.toLowerCase()
      if (lower.includes('睡不') || lower.includes('会') || lower.includes('慌') || lower.includes('怕')) {
        setRiskTolerance('panic')
      } else if (lower.includes('还行') || lower.includes('还好') || lower.includes('能接受')) {
        setRiskTolerance('okay')
      } else {
        setRiskTolerance('calm')
      }
    }

    setTyping(true)
    const nextStep = step + 1
    setTimeout(async () => {
      const profile = {
        monthly_savings: step === 0 ? (parseInt(userMsg.replace(/[^0-9]/g, ''), 10) || null) : monthlySavings,
        investment_horizon: step === 1 ? userMsg : horizon,
        risk_tolerance: step === 2 ? riskTolerance : riskTolerance,
      }
      const response = getOnboardingResponse(nextStep, profile)
      setMessages((prev) => [...prev, { role: 'assistant', content: response.content }])
      setTyping(false)
      setStep(nextStep)

      if (nextStep >= 3) {
        const riskType =
          profile.risk_tolerance === 'panic' || profile.risk_tolerance === 'anxious'
            ? 'conservative'
            : profile.risk_tolerance === 'okay'
              ? 'moderate'
              : 'aggressive'
        await supabase.from('profiles').insert({
          monthly_savings: profile.monthly_savings,
          investment_horizon: profile.investment_horizon,
          risk_tolerance: profile.risk_tolerance,
          risk_type: riskType,
          companion_density: 'medium',
        })
        setTimeout(() => onComplete(), 4000)
      }
    }, 1200)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 via-neutral-50 to-secondary-50 flex flex-col max-w-md mx-auto">
      <div className="flex items-center gap-3 px-5 py-4 border-b border-neutral-200 bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-400 to-secondary-500 flex items-center justify-center text-white text-lg">
          💚
        </div>
        <div>
          <h1 className="text-base font-semibold text-neutral-900">财小搭</h1>
          <p className="text-xs text-primary-600">你的理财搭子 · 在线</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in-up`}
          >
            {msg.role === 'assistant' && (
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-400 to-secondary-500 flex items-center justify-center text-white text-sm mr-2 flex-shrink-0 mt-1">
                💚
              </div>
            )}
            <div
              className={`max-w-[78%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed whitespace-pre-line ${
                msg.role === 'user'
                  ? 'bg-secondary-500 text-white rounded-tr-sm'
                  : 'bg-white text-neutral-800 rounded-tl-sm shadow-sm border border-neutral-100'
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}
        {typing && (
          <div className="flex justify-start animate-fade-in">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-400 to-secondary-500 flex items-center justify-center text-white text-sm mr-2 mt-1">
              💚
            </div>
            <div className="bg-white rounded-2xl rounded-tl-sm shadow-sm border border-neutral-100 px-4 py-3 flex gap-1">
              <span className="typing-dot w-2 h-2 rounded-full bg-neutral-400"></span>
              <span className="typing-dot w-2 h-2 rounded-full bg-neutral-400"></span>
              <span className="typing-dot w-2 h-2 rounded-full bg-neutral-400"></span>
            </div>
          </div>
        )}
      </div>

      <div className="px-4 py-3 border-t border-neutral-200 bg-white">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="在这里输入..."
            className="flex-1 px-4 py-2.5 rounded-full bg-neutral-100 text-sm text-neutral-800 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-400 transition-all"
            disabled={typing}
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || typing}
            className="w-10 h-10 rounded-full bg-primary-500 text-white flex items-center justify-center disabled:opacity-40 hover:bg-primary-600 transition-colors flex-shrink-0"
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  )
}
