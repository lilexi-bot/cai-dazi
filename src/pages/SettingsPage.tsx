import { useState } from 'react'
import { supabase, type Profile } from '../lib/supabase'
import { Settings, Bell, Shield, Heart, Info, Check } from 'lucide-react'

type Props = {
  profile: Profile
  onProfileUpdate: () => void
}

const DENSITY_OPTIONS = [
  { value: 'high', label: '高频', desc: '每天推送，不错过任何市场变化' },
  { value: 'medium', label: '适中', desc: '重要时点推送，平衡陪伴与安静' },
  { value: 'low', label: '低频', desc: '只在关键时刻出现，平时不打扰' },
]

export default function SettingsPage({ profile, onProfileUpdate }: Props) {
  const [density, setDensity] = useState(profile.companion_density || 'medium')
  const [saving, setSaving] = useState(false)

  const handleDensityChange = async (value: string) => {
    setDensity(value)
    setSaving(true)
    await supabase.from('profiles').update({ companion_density: value }).eq('id', profile.id)
    setSaving(false)
    onProfileUpdate()
  }

  const riskTypeText =
    profile.risk_type === 'conservative'
      ? '稳健型'
      : profile.risk_type === 'moderate'
        ? '均衡型'
        : '进取型'

  return (
    <div className="min-h-screen">
      <div className="bg-gradient-to-br from-primary-500 to-secondary-600 px-5 py-5 text-white">
        <div className="flex items-center gap-2 mb-1">
          <Settings size={18} />
          <h1 className="text-lg font-bold">设置</h1>
        </div>
        <p className="text-white/70 text-xs">管理你的理财搭子偏好</p>
      </div>

      <div className="px-4 py-4 space-y-5">
        {/* Profile card */}
        <div className="bg-white rounded-xl p-4 border border-neutral-100 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary-400 to-secondary-500 flex items-center justify-center text-white text-2xl">
              💚
            </div>
            <div>
              <p className="text-sm font-semibold text-neutral-800">理财搭子</p>
              <p className="text-xs text-neutral-500">{riskTypeText}投资者</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 pt-3 border-t border-neutral-100">
            <div>
              <p className="text-[10px] text-neutral-400">每月可投资金额</p>
              <p className="text-sm font-semibold text-neutral-700">{profile.monthly_savings ? `¥${profile.monthly_savings}` : '未设置'}</p>
            </div>
            <div>
              <p className="text-[10px] text-neutral-400">投资期限</p>
              <p className="text-sm font-semibold text-neutral-700">{profile.investment_horizon || '未设置'}</p>
            </div>
          </div>
        </div>

        {/* Companion density */}
        <div>
          <div className="flex items-center gap-1.5 mb-2 px-1">
            <Bell size={14} className="text-primary-500" />
            <h2 className="text-sm font-semibold text-neutral-700">陪伴密度</h2>
          </div>
          <div className="bg-white rounded-xl border border-neutral-100 shadow-sm overflow-hidden">
            {DENSITY_OPTIONS.map((opt, i) => (
              <button
                key={opt.value}
                onClick={() => handleDensityChange(opt.value)}
                className={`w-full flex items-center justify-between px-4 py-3.5 text-left transition-colors ${
                  i > 0 ? 'border-t border-neutral-100' : ''
                } ${density === opt.value ? 'bg-primary-50' : 'hover:bg-neutral-50'}`}
              >
                <div>
                  <p className={`text-sm font-medium ${density === opt.value ? 'text-primary-700' : 'text-neutral-700'}`}>{opt.label}</p>
                  <p className="text-xs text-neutral-400 mt-0.5">{opt.desc}</p>
                </div>
                {density === opt.value && <Check size={18} className="text-primary-500" />}
              </button>
            ))}
          </div>
          {saving && <p className="text-[10px] text-neutral-400 mt-1 px-1">保存中...</p>}
        </div>

        {/* Compliance info */}
        <div>
          <div className="flex items-center gap-1.5 mb-2 px-1">
            <Shield size={14} className="text-secondary-500" />
            <h2 className="text-sm font-semibold text-neutral-700">合规与安全</h2>
          </div>
          <div className="bg-white rounded-xl border border-neutral-100 shadow-sm overflow-hidden">
            <div className="px-4 py-3.5 border-b border-neutral-100">
              <div className="flex items-start gap-2.5">
                <Shield size={16} className="text-secondary-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs font-medium text-neutral-700">不提供投资建议</p>
                  <p className="text-[11px] text-neutral-500 mt-0.5">财搭子只提供信息参考，不构成投资建议。所有决策由你自己做出。</p>
                </div>
              </div>
            </div>
            <div className="px-4 py-3.5 border-b border-neutral-100">
              <div className="flex items-start gap-2.5">
                <Heart size={16} className="text-accent-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs font-medium text-neutral-700">数据隐私保护</p>
                  <p className="text-[11px] text-neutral-500 mt-0.5">你的行为数据不会用于模型训练，仅用于提供个性化陪伴服务。</p>
                </div>
              </div>
            </div>
            <div className="px-4 py-3.5">
              <div className="flex items-start gap-2.5">
                <Info size={16} className="text-neutral-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs font-medium text-neutral-700">信息来源可溯源</p>
                  <p className="text-[11px] text-neutral-500 mt-0.5">所有AI输出的信息均可溯源至基金公司官方投研报告，点击"信息来源"可查看原始研报。</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* About */}
        <div>
          <div className="flex items-center gap-1.5 mb-2 px-1">
            <Info size={14} className="text-neutral-500" />
            <h2 className="text-sm font-semibold text-neutral-700">关于财搭子</h2>
          </div>
          <div className="bg-white rounded-xl border border-neutral-100 shadow-sm overflow-hidden">
            <div className="px-4 py-3.5 flex items-center justify-between">
              <span className="text-xs text-neutral-600">产品定位</span>
              <span className="text-xs text-neutral-400">不替代判断，只陪伴成长</span>
            </div>
            <div className="px-4 py-3.5 flex items-center justify-between border-t border-neutral-100">
              <span className="text-xs text-neutral-600">AI人格</span>
              <span className="text-xs text-neutral-400">财小搭 💚</span>
            </div>
            <div className="px-4 py-3.5 flex items-center justify-between border-t border-neutral-100">
              <span className="text-xs text-neutral-600">版本</span>
              <span className="text-xs text-neutral-400">v1.0.0</span>
            </div>
          </div>
        </div>

        <div className="text-center pb-4">
          <p className="text-[10px] text-neutral-400">让AI成为年轻人理解投资的入口</p>
          <p className="text-[10px] text-neutral-400 mt-0.5">而不是替代独立判断的工具</p>
        </div>
      </div>
    </div>
  )
}
