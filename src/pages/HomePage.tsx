import { useState, useEffect, useRef, useCallback } from 'react'
import { supabase, type Profile, type DailyBriefing, type Milestone } from '../lib/supabase'
import { generateAIResponse } from '../lib/aiEngine'
import { Send, Sun, Moon, Calendar, Sparkles, Trophy } from 'lucide-react'

type Props = {
  profile: Profile
}

type DisplayMsg = {
  id?: string
  role: 'user' | 'assistant'
  content: string
}

export default function HomePage({ profile }: Props) {
  const [messages, setMessages] = useState<DisplayMsg[]>([])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const [briefings, setBriefings] = useState<DailyBriefing[]>([])
  const [milestones, setMilestones] = useState<Milestone[]>([])
  const scrollRef = useRef<HTMLDivElement>(null)

  const loadMessages = useCallback(async () => {
    const { data } = await supabase
      .from('chat_messages')
      .select('*')
      .order('created_at', { ascending: true })
      .limit(50)
    if (data && data.length > 0) {
      setMessages(data as DisplayMsg[])
    } else {
      const greeting: DisplayMsg = {
        role: 'assistant',
        content: `嗨！又见面啦～我是财小搭，你的理财搭子。\n\n今天市场怎么样？有什么想聊的吗？不管是理财的问题，还是今天的心情，都可以跟我说。`,
      }
      setMessages([greeting])
    }
  }, [])

  const loadBriefings = useCallback(async () => {
    const { data } = await supabase
      .from('daily_briefings')
      .select('*')
      .order('briefing_date', { ascending: false })
      .limit(5)
    if (data) setBriefings(data as DailyBriefing[])
  }, [])

  const loadMilestones = useCallback(async () => {
    const { data } = await supabase.from('milestones').select('*').order('created_at', { ascending: true })
    if (data) setMilestones(data as Milestone[])
  }, [])

  useEffect(() => {
    loadMessages()
    loadBriefings()
    loadMilestones()
  }, [loadMessages, loadBriefings, loadMilestones])

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages, typing])

  const handleSend = async () => {
    if (!input.trim() || typing) return
    const userMsg = input.trim()
    setInput('')
    setMessages((prev) => [...prev, { role: 'user', content: userMsg }])
    setTyping(true)

    await supabase.from('chat_messages').insert({ role: 'user', content: userMsg, context_type: 'daily' })

    setTimeout(async () => {
      const response = generateAIResponse(userMsg, profile)
      setMessages((prev) => [...prev, { role: 'assistant', content: response.content }])
      setTyping(false)
      await supabase.from('chat_messages').insert({
        role: 'assistant',
        content: response.content,
        context_type: response.contextType,
      })
    }, 1000 + Math.random() * 800)
  }

  const markBriefingRead = async (id: string) => {
    await supabase.from('daily_briefings').update({ is_read: true }).eq('id', id)
    setBriefings((prev) => prev.map((b) => (b.id === id ? { ...b, is_read: true } : b)))
  }

  const briefingIcon = (type: string) => {
    if (type === 'pre_market') return <Sun size={16} className="text-accent-500" />
    if (type === 'post_market') return <Moon size={16} className="secondary-500 text-secondary-600" />
    return <Calendar size={16} className="text-primary-500" />
  }

  const briefingLabel = (type: string) => {
    if (type === 'pre_market') return '盘前'
    if (type === 'post_market') return '盘后'
    return '周末回顾'
  }

  const achievedCount = milestones.filter((m) => m.is_achieved).length
  const riskTypeText =
    profile.risk_type === 'conservative'
      ? '稳健型'
      : profile.risk_type === 'moderate'
        ? '均衡型'
        : '进取型'

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-br from-primary-500 to-secondary-600 px-5 pt-6 pb-4 text-white">
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-white/70 text-xs">{new Date().toLocaleDateString('zh-CN', { weekday: 'long', month: 'long', day: 'numeric' })}</p>
            <h1 className="text-xl font-bold mt-0.5">你好呀，理财搭子</h1>
          </div>
          <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-2xl">
            💚
          </div>
        </div>
        <div className="flex gap-2">
          <div className="bg-white/15 backdrop-blur-sm rounded-xl px-3 py-1.5 text-xs">
            <span className="text-white/70">风险偏好 </span>
            <span className="font-semibold">{riskTypeText}</span>
          </div>
          {profile.monthly_savings && (
            <div className="bg-white/15 backdrop-blur-sm rounded-xl px-3 py-1.5 text-xs">
              <span className="text-white/70">月投 </span>
              <span className="font-semibold">¥{profile.monthly_savings}</span>
            </div>
          )}
          <div className="bg-white/15 backdrop-blur-sm rounded-xl px-3 py-1.5 text-xs">
            <span className="text-white/70">里程碑 </span>
            <span className="font-semibold">{achievedCount}/{milestones.length}</span>
          </div>
        </div>
      </div>

      {/* Briefings */}
      {briefings.length > 0 && (
        <div className="px-4 py-3">
          <div className="flex items-center gap-1.5 mb-2">
            <Sparkles size={14} className="text-accent-500" />
            <h2 className="text-sm font-semibold text-neutral-700">今日简评</h2>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1">
            {briefings.map((b) => (
              <button
                key={b.id}
                onClick={() => markBriefingRead(b.id)}
                className={`flex-shrink-0 w-56 rounded-xl p-3 text-left transition-all ${
                  b.is_read
                    ? 'bg-white border border-neutral-200'
                    : 'bg-gradient-to-br from-white to-primary-50 border border-primary-200 shadow-sm'
                }`}
              >
                <div className="flex items-center gap-1.5 mb-1.5">
                  {briefingIcon(b.type)}
                  <span className="text-[10px] text-neutral-500">{briefingLabel(b.type)}</span>
                  {!b.is_read && <span className="w-1.5 h-1.5 rounded-full bg-primary-500 ml-auto"></span>}
                </div>
                <h3 className="text-xs font-semibold text-neutral-800 mb-1 line-clamp-1">{b.title}</h3>
                <p className="text-[11px] text-neutral-500 line-clamp-3 whitespace-pre-line">{b.content}</p>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Milestones preview */}
      {milestones.length > 0 && (
        <div className="px-4 py-2">
          <div className="flex items-center gap-1.5 mb-2">
            <Trophy size={14} className="text-accent-500" />
            <h2 className="text-sm font-semibold text-neutral-700">成长里程碑</h2>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1">
            {milestones.slice(0, 6).map((m) => (
              <div
                key={m.id}
                className={`flex-shrink-0 w-20 rounded-xl p-2.5 text-center ${
                  m.is_achieved ? 'bg-accent-50 border border-accent-200' : 'bg-neutral-100 border border-neutral-200'
                }`}
              >
                <div className={`text-2xl mb-1 ${m.is_achieved ? '' : 'grayscale opacity-40'}`}>{m.icon}</div>
                <p className={`text-[10px] leading-tight ${m.is_achieved ? 'text-neutral-700 font-medium' : 'text-neutral-400'}`}>
                  {m.title}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Chat */}
      <div className="flex-1 flex flex-col px-4 pb-2">
        <div className="flex items-center gap-1.5 mb-2 mt-2">
          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-primary-400 to-secondary-500 flex items-center justify-center text-white text-xs">
            💚
          </div>
          <h2 className="text-sm font-semibold text-neutral-700">和财小搭聊聊</h2>
        </div>

        <div ref={scrollRef} className="flex-1 overflow-y-auto space-y-2.5 min-h-[200px]">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in-up`}
            >
              {msg.role === 'assistant' && (
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-primary-400 to-secondary-500 flex items-center justify-center text-white text-xs mr-2 flex-shrink-0 mt-0.5">
                  💚
                </div>
              )}
              <div
                className={`max-w-[80%] rounded-2xl px-3.5 py-2 text-[13px] leading-relaxed whitespace-pre-line ${
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
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-primary-400 to-secondary-500 flex items-center justify-center text-white text-xs mr-2">
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
      </div>

      {/* Input */}
      <div className="px-4 py-2.5 border-t border-neutral-200 bg-white">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="问问财小搭..."
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
