import { useState, useEffect, useCallback } from 'react'
import { supabase, type DiaryEntry } from '../lib/supabase'
import { NotebookPen, Plus, TrendingUp, TrendingDown, Pause, Eye, X } from 'lucide-react'

const ACTION_TYPES = [
  { value: 'buy', label: '买入', icon: TrendingUp, color: 'text-success-600', bg: 'bg-success-50' },
  { value: 'sell', label: '卖出', icon: TrendingDown, color: 'text-error-600', bg: 'bg-error-50' },
  { value: 'hold', label: '持有', icon: Pause, color: 'text-neutral-500', bg: 'bg-neutral-100' },
  { value: 'observe', label: '观望', icon: Eye, color: 'text-secondary-500', bg: 'bg-secondary-50' },
]

const EMOTIONS = [
  { value: 'calm', label: '冷静', icon: '😌' },
  { value: 'excited', label: '兴奋', icon: '🤩' },
  { value: 'anxious', label: '焦虑', icon: '😰' },
  { value: 'confident', label: '自信', icon: '😎' },
  { value: 'confused', label: '迷茫', icon: '🤔' },
]

export default function DiaryPage() {
  const [entries, setEntries] = useState<DiaryEntry[]>([])
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    action_type: 'buy',
    product_name: '',
    amount: '',
    reason: '',
    market_context: '',
    emotion: 'calm',
  })

  const loadEntries = useCallback(async () => {
    const { data } = await supabase.from('diary_entries').select('*').order('created_at', { ascending: false })
    if (data) setEntries(data as DiaryEntry[])
  }, [])

  useEffect(() => {
    loadEntries()
  }, [loadEntries])

  const handleSubmit = async () => {
    if (!formData.product_name.trim()) return
    await supabase.from('diary_entries').insert({
      action_type: formData.action_type,
      product_name: formData.product_name,
      amount: formData.amount ? parseFloat(formData.amount) : null,
      reason: formData.reason,
      market_context: formData.market_context,
      emotion: formData.emotion,
    })
    setFormData({ action_type: 'buy', product_name: '', amount: '', reason: '', market_context: '', emotion: 'calm' })
    setShowForm(false)
    loadEntries()
  }

  const getActionInfo = (type: string) => ACTION_TYPES.find((a) => a.value === type) || ACTION_TYPES[0]
  const getEmotionIcon = (emotion: string | null) => EMOTIONS.find((e) => e.value === emotion)?.icon || '📝'

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr)
    return `${d.getMonth() + 1}月${d.getDate()}日 ${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}`
  }

  return (
    <div className="min-h-screen">
      <div className="bg-gradient-to-br from-primary-500 to-secondary-600 px-5 py-5 text-white">
        <div className="flex items-center gap-2 mb-1">
          <NotebookPen size={18} />
          <h1 className="text-lg font-bold">理财日记</h1>
        </div>
        <p className="text-white/70 text-xs">记录每一次决策，看见自己的成长轨迹</p>
        <div className="flex gap-4 mt-3">
          <div className="bg-white/15 backdrop-blur-sm rounded-xl px-3 py-1.5">
            <p className="text-lg font-bold">{entries.length}</p>
            <p className="text-white/70 text-[10px]">总记录</p>
          </div>
          <div className="bg-white/15 backdrop-blur-sm rounded-xl px-3 py-1.5">
            <p className="text-lg font-bold">{entries.filter((e) => e.action_type === 'buy').length}</p>
            <p className="text-white/70 text-[10px]">买入</p>
          </div>
          <div className="bg-white/15 backdrop-blur-sm rounded-xl px-3 py-1.5">
            <p className="text-lg font-bold">{entries.filter((e) => e.action_type === 'sell').length}</p>
            <p className="text-white/70 text-[10px]">卖出</p>
          </div>
        </div>
      </div>

      <div className="px-4 py-4 space-y-3">
        {entries.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-4xl mb-3 opacity-30">📔</div>
            <p className="text-sm text-neutral-400">还没有记录</p>
            <p className="text-xs text-neutral-400 mt-1">点击右下角记录你的第一笔投资决策</p>
          </div>
        ) : (
          entries.map((entry) => {
            const info = getActionInfo(entry.action_type)
            const Icon = info.icon
            return (
              <div key={entry.id} className="bg-white rounded-xl p-4 border border-neutral-100 shadow-sm animate-fade-in-up">
                <div className="flex items-start gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${info.bg}`}>
                    <Icon size={18} className={info.color} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <span className={`text-xs font-semibold ${info.color}`}>{info.label}</span>
                        <span className="text-sm font-medium text-neutral-800">{entry.product_name}</span>
                      </div>
                      <span className="text-[10px] text-neutral-400">{formatDate(entry.created_at)}</span>
                    </div>
                    {entry.amount && (
                      <p className="text-xs text-neutral-500 mb-1">金额：¥{entry.amount.toLocaleString()}</p>
                    )}
                    {entry.reason && (
                      <p className="text-xs text-neutral-600 mt-1.5">
                        <span className="text-neutral-400">理由：</span>{entry.reason}
                      </p>
                    )}
                    {entry.market_context && (
                      <p className="text-xs text-neutral-600 mt-1">
                        <span className="text-neutral-400">市场环境：</span>{entry.market_context}
                      </p>
                    )}
                    <div className="flex items-center gap-1 mt-2">
                      <span className="text-base">{getEmotionIcon(entry.emotion)}</span>
                      <span className="text-[10px] text-neutral-400">
                        {EMOTIONS.find((e) => e.value === entry.emotion)?.label || ''}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )
          })
        )}
      </div>

      {/* FAB */}
      <button
        onClick={() => setShowForm(true)}
        className="fixed bottom-24 right-4 max-w-md mx-auto w-12 h-12 rounded-full bg-primary-500 text-white flex items-center justify-center shadow-lg hover:bg-primary-600 transition-all active:scale-95 z-40"
        style={{ right: 'calc(50% - 9rem + 1rem)' }}
      >
        <Plus size={24} />
      </button>

      {/* Form modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/40 flex items-end justify-center z-50 animate-fade-in" onClick={() => setShowForm(false)}>
          <div
            className="bg-white rounded-t-2xl w-full max-w-md p-5 animate-fade-in-up max-h-[85vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-semibold text-neutral-800">记录一笔决策</h2>
              <button onClick={() => setShowForm(false)} className="text-neutral-400">
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-medium text-neutral-600 mb-1.5 block">操作类型</label>
                <div className="flex gap-2">
                  {ACTION_TYPES.map((a) => {
                    const Icon = a.icon
                    return (
                      <button
                        key={a.value}
                        onClick={() => setFormData({ ...formData, action_type: a.value })}
                        className={`flex-1 py-2.5 rounded-xl text-xs font-medium transition-all ${
                          formData.action_type === a.value
                            ? `${a.bg} ${a.color} border-2 border-current`
                            : 'bg-neutral-50 text-neutral-400 border-2 border-transparent'
                        }`}
                      >
                        <Icon size={16} className="mx-auto mb-1" />
                        {a.label}
                      </button>
                    )
                  })}
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-neutral-600 mb-1.5 block">产品名称</label>
                <input
                  type="text"
                  value={formData.product_name}
                  onChange={(e) => setFormData({ ...formData, product_name: e.target.value })}
                  placeholder="如：沪深300ETF"
                  className="w-full px-3 py-2.5 rounded-xl bg-neutral-100 text-sm focus:outline-none focus:ring-2 focus:ring-primary-400"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-neutral-600 mb-1.5 block">金额（可选）</label>
                <input
                  type="number"
                  value={formData.amount}
                  onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                  placeholder="如：2000"
                  className="w-full px-3 py-2.5 rounded-xl bg-neutral-100 text-sm focus:outline-none focus:ring-2 focus:ring-primary-400"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-neutral-600 mb-1.5 block">为什么做这个决定？</label>
                <textarea
                  value={formData.reason}
                  onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                  placeholder="记录你当时的心路历程..."
                  rows={2}
                  className="w-full px-3 py-2.5 rounded-xl bg-neutral-100 text-sm focus:outline-none focus:ring-2 focus:ring-primary-400 resize-none"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-neutral-600 mb-1.5 block">当时的市场环境</label>
                <input
                  type="text"
                  value={formData.market_context}
                  onChange={(e) => setFormData({ ...formData, market_context: e.target.value })}
                  placeholder="如：市场连涨3天，情绪偏热"
                  className="w-full px-3 py-2.5 rounded-xl bg-neutral-100 text-sm focus:outline-none focus:ring-2 focus:ring-primary-400"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-neutral-600 mb-1.5 block">当时的心情</label>
                <div className="flex gap-2">
                  {EMOTIONS.map((e) => (
                    <button
                      key={e.value}
                      onClick={() => setFormData({ ...formData, emotion: e.value })}
                      className={`flex-1 py-2 rounded-xl text-xs transition-all ${
                        formData.emotion === e.value
                          ? 'bg-primary-50 text-primary-600 border-2 border-primary-300'
                          : 'bg-neutral-50 text-neutral-400 border-2 border-transparent'
                      }`}
                    >
                      <span className="text-lg block mb-0.5">{e.icon}</span>
                      {e.label}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={handleSubmit}
                disabled={!formData.product_name.trim()}
                className="w-full py-3 rounded-xl bg-primary-500 text-white font-semibold text-sm disabled:opacity-40 hover:bg-primary-600 transition-all"
              >
                保存记录
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
