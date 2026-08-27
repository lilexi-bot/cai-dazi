import { useState, useEffect, useCallback } from 'react'
import { supabase, type Profile, type DiaryEntry, type LearningProgress } from '../lib/supabase'
import { BarChart3, TrendingUp, TrendingDown, Brain, Target, Lightbulb } from 'lucide-react'

export default function ReportPage(_: { profile: Profile }) {
  const [entries, setEntries] = useState<DiaryEntry[]>([])
  const [progress, setProgress] = useState<LearningProgress[]>([])

  const loadData = useCallback(async () => {
    const { data: diaryData } = await supabase.from('diary_entries').select('*').order('created_at', { ascending: true })
    const { data: progressData } = await supabase.from('learning_progress').select('*')
    if (diaryData) setEntries(diaryData as DiaryEntry[])
    if (progressData) setProgress(progressData as LearningProgress[])
  }, [])

  useEffect(() => {
    loadData()
  }, [loadData])

  const buyCount = entries.filter((e) => e.action_type === 'buy').length
  const sellCount = entries.filter((e) => e.action_type === 'sell').length
  const holdCount = entries.filter((e) => e.action_type === 'hold').length
  const observeCount = entries.filter((e) => e.action_type === 'observe').length
  const totalActions = entries.length

  const emotionCounts = entries.reduce((acc, e) => {
    if (e.emotion) acc[e.emotion] = (acc[e.emotion] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  const dominantEmotion = Object.entries(emotionCounts).sort((a, b) => b[1] - a[1])[0]
  const completedLessons = progress.filter((p) => p.is_completed).length

  const chaseTrend = buyCount > sellCount * 2 && buyCount > 3 ? '可能存在追涨倾向' : '暂无明显追涨倾向'

  const insights: { icon: typeof Brain; title: string; content: string; color: string }[] = [
    {
      icon: TrendingUp,
      title: '交易频率',
      content: `你记录了 ${totalActions} 次操作，其中买入 ${buyCount} 次、卖出 ${sellCount} 次。${totalActions > 5 ? '交易频率偏高，频繁操作可能增加成本，建议放慢节奏。' : '频率正常，继续保持。'}`,
      color: 'text-secondary-600',
    },
    {
      icon: Brain,
      title: '情绪分析',
      content: dominantEmotion
        ? `你最常在"${getEmotionLabel(dominantEmotion[0])}"时做决策（${dominantEmotion[1]}次）。${dominantEmotion[0] === 'anxious' || dominantEmotion[0] === 'excited' ? '情绪波动时做的决策容易后悔，下次试试先冷静一天。' : '你的决策情绪比较稳定，这很好。'}`
        : '还没有足够的记录来分析情绪模式。多记录几笔，我就能帮你发现规律了。',
      color: 'text-accent-600',
    },
    {
      icon: Target,
      title: '行为倾向',
      content: chaseTrend,
      color: 'text-primary-600',
    },
    {
      icon: Lightbulb,
      title: '学习进度',
      content: `你已完成 ${completedLessons} 堂课的学习。${completedLessons >= 5 ? '你已经具备了不少理财基础知识，可以开始尝试更进阶的内容了。' : '继续学习，每天进步一点点～'}`,
      color: 'text-success-600',
    },
  ]

  return (
    <div className="min-h-screen">
      <div className="bg-gradient-to-br from-primary-500 to-secondary-600 px-5 py-5 text-white">
        <div className="flex items-center gap-2 mb-1">
          <BarChart3 size={18} />
          <h1 className="text-lg font-bold">行为周报</h1>
        </div>
        <p className="text-white/70 text-xs">用数据帮你认识自己的投资行为</p>
      </div>

      <div className="px-4 py-4 space-y-4">
        {/* Stats cards */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white rounded-xl p-4 border border-neutral-100 shadow-sm">
            <div className="flex items-center gap-1.5 mb-2">
              <TrendingUp size={14} className="text-success-600" />
              <span className="text-xs text-neutral-500">买入</span>
            </div>
            <p className="text-2xl font-bold text-neutral-800">{buyCount}</p>
          </div>
          <div className="bg-white rounded-xl p-4 border border-neutral-100 shadow-sm">
            <div className="flex items-center gap-1.5 mb-2">
              <TrendingDown size={14} className="text-error-600" />
              <span className="text-xs text-neutral-500">卖出</span>
            </div>
            <p className="text-2xl font-bold text-neutral-800">{sellCount}</p>
          </div>
          <div className="bg-white rounded-xl p-4 border border-neutral-100 shadow-sm">
            <div className="flex items-center gap-1.5 mb-2">
              <Target size={14} className="text-neutral-500" />
              <span className="text-xs text-neutral-500">持有/观望</span>
            </div>
            <p className="text-2xl font-bold text-neutral-800">{holdCount + observeCount}</p>
          </div>
          <div className="bg-white rounded-xl p-4 border border-neutral-100 shadow-sm">
            <div className="flex items-center gap-1.5 mb-2">
              <Brain size={14} className="text-accent-600" />
              <span className="text-xs text-neutral-500">已学课程</span>
            </div>
            <p className="text-2xl font-bold text-neutral-800">{completedLessons}</p>
          </div>
        </div>

        {/* Action distribution */}
        {totalActions > 0 && (
          <div className="bg-white rounded-xl p-4 border border-neutral-100 shadow-sm">
            <h3 className="text-sm font-semibold text-neutral-700 mb-3">操作分布</h3>
            <div className="space-y-2">
              {[
                { label: '买入', count: buyCount, color: 'bg-success-500' },
                { label: '卖出', count: sellCount, color: 'bg-error-500' },
                { label: '持有', count: holdCount, color: 'bg-neutral-400' },
                { label: '观望', count: observeCount, color: 'bg-secondary-500' },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-2">
                  <span className="text-xs text-neutral-500 w-10">{item.label}</span>
                  <div className="flex-1 h-6 bg-neutral-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${item.color} rounded-full transition-all duration-500`}
                      style={{ width: `${totalActions > 0 ? (item.count / totalActions) * 100 : 0}%` }}
                    />
                  </div>
                  <span className="text-xs text-neutral-600 w-6 text-right">{item.count}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Insights */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-neutral-700 px-1">行为洞察</h3>
          {insights.map((insight, i) => {
            const Icon = insight.icon
            return (
              <div key={i} className="bg-white rounded-xl p-4 border border-neutral-100 shadow-sm animate-fade-in-up">
                <div className="flex items-start gap-3">
                  <div className={`w-8 h-8 rounded-lg bg-neutral-50 flex items-center justify-center flex-shrink-0 ${insight.color}`}>
                    <Icon size={16} />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-neutral-800 mb-1">{insight.title}</h4>
                    <p className="text-xs text-neutral-600 leading-relaxed">{insight.content}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Companion note */}
        <div className="bg-gradient-to-br from-primary-50 to-secondary-50 rounded-xl p-4 border border-primary-100">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-400 to-secondary-500 flex items-center justify-center text-white text-sm flex-shrink-0">
              💚
            </div>
            <div>
              <p className="text-xs text-neutral-700 leading-relaxed">
                {totalActions === 0
                  ? '你还没有记录过投资决策。没关系，理财是一段旅程，什么时候开始都不晚。试着记录第一笔操作吧，哪怕只是"观望"——这也是一种决策。'
                  : `你记录了${totalActions}次操作，这说明你在认真对待自己的理财。记住，理财日记不是为了评判你，而是为了帮你看见自己。继续记录，我们一起成长。`}
              </p>
              <p className="text-[10px] text-neutral-400 mt-2">*以上内容仅为信息参考，不构成投资建议。</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function getEmotionLabel(emotion: string): string {
  const labels: Record<string, string> = {
    calm: '冷静',
    excited: '兴奋',
    anxious: '焦虑',
    confident: '自信',
    confused: '迷茫',
  }
  return labels[emotion] || emotion
}
