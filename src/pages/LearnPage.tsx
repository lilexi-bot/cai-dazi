import { useState, useEffect, useCallback } from 'react'
import { supabase, type LearningLesson, type LearningProgress } from '../lib/supabase'
import { BookOpen, CheckCircle2, Lock, ChevronRight, Star } from 'lucide-react'

const RANKS = [
  { name: '青铜', min: 0, icon: '🥉', color: 'text-neutral-500' },
  { name: '白银', min: 3, icon: '🥈', color: 'text-neutral-400' },
  { name: '黄金', min: 5, icon: '🥇', color: 'text-accent-500' },
  { name: '铂金', min: 7, icon: '💎', color: 'text-secondary-500' },
  { name: '王者', min: 10, icon: '👑', color: 'text-primary-500' },
]

export default function LearnPage() {
  const [lessons, setLessons] = useState<LearningLesson[]>([])
  const [progress, setProgress] = useState<LearningProgress[]>([])
  const [selectedLesson, setSelectedLesson] = useState<LearningLesson | null>(null)
  const [showComplete, setShowComplete] = useState(false)

  const loadData = useCallback(async () => {
    const { data: lessonData } = await supabase.from('learning_lessons').select('*').order('created_at', { ascending: true })
    const { data: progressData } = await supabase.from('learning_progress').select('*')
    if (lessonData) setLessons(lessonData as LearningLesson[])
    if (progressData) setProgress(progressData as LearningProgress[])
  }, [])

  useEffect(() => {
    loadData()
  }, [loadData])

  const completedCount = progress.filter((p) => p.is_completed).length
  const currentRank = [...RANKS].reverse().find((r) => completedCount >= r.min) || RANKS[0]
  const nextRank = RANKS.find((r) => r.min > completedCount)

  const isLessonCompleted = (lessonId: string) =>
    progress.some((p) => p.lesson_id === lessonId && p.is_completed)

  const handleComplete = async (lessonId: string) => {
    const existing = progress.find((p) => p.lesson_id === lessonId)
    if (existing) {
      await supabase.from('learning_progress').update({ is_completed: true, completed_at: new Date().toISOString() }).eq('id', existing.id)
    } else {
      await supabase.from('learning_progress').insert({ lesson_id: lessonId, is_completed: true, completed_at: new Date().toISOString() })
    }
    setShowComplete(true)
    setTimeout(() => {
      setShowComplete(false)
      setSelectedLesson(null)
      loadData()
    }, 2000)
  }

  const difficultyColor = (d: string) => {
    if (d === 'beginner') return 'bg-success-50 text-success-600'
    if (d === 'intermediate') return 'bg-warning-50 text-warning-600'
    return 'bg-error-50 text-error-600'
  }

  const difficultyLabel = (d: string) => {
    if (d === 'beginner') return '入门'
    if (d === 'intermediate') return '进阶'
    return '高级'
  }

  if (selectedLesson) {
    return (
      <div className="min-h-screen flex flex-col">
        <div className="bg-gradient-to-br from-primary-500 to-secondary-600 px-5 py-5 text-white">
          <button onClick={() => setSelectedLesson(null)} className="text-white/80 text-sm mb-3 flex items-center gap-1">
            <ChevronRight size={16} className="rotate-180" /> 返回
          </button>
          <div className="flex items-center gap-2 mb-1">
            <span className={`text-[10px] px-2 py-0.5 rounded-full ${difficultyColor(selectedLesson.difficulty)} bg-white/20 text-white`}>
              {difficultyLabel(selectedLesson.difficulty)}
            </span>
          </div>
          <h1 className="text-lg font-bold">{selectedLesson.title}</h1>
        </div>

        <div className="flex-1 px-5 py-4 space-y-4">
          <div className="bg-accent-50 rounded-xl p-4 border border-accent-100">
            <div className="flex items-center gap-1.5 mb-1.5">
              <Star size={14} className="text-accent-500" />
              <span className="text-xs font-semibold text-accent-700">生活类比</span>
            </div>
            <p className="text-sm text-neutral-700">{selectedLesson.analogy}</p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-neutral-800 mb-2">核心概念：{selectedLesson.concept}</h3>
            <p className="text-sm text-neutral-600 leading-relaxed whitespace-pre-line">{selectedLesson.content}</p>
          </div>

          <div className="bg-neutral-100 rounded-xl p-3 text-xs text-neutral-500">
            *以上内容仅为信息参考，不构成投资建议。
          </div>
        </div>

        <div className="px-5 py-3 border-t border-neutral-200 bg-white">
          <button
            onClick={() => handleComplete(selectedLesson.id)}
            disabled={isLessonCompleted(selectedLesson.id)}
            className={`w-full py-3 rounded-xl font-semibold text-sm transition-all ${
              isLessonCompleted(selectedLesson.id)
                ? 'bg-neutral-100 text-neutral-400'
                : 'bg-primary-500 text-white hover:bg-primary-600 active:scale-[0.98]'
            }`}
          >
            {isLessonCompleted(selectedLesson.id) ? '✓ 已完成' : '学完了，标记完成'}
          </button>
        </div>

        {showComplete && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 animate-fade-in">
            <div className="bg-white rounded-2xl p-6 mx-8 text-center animate-fade-in-up">
              <div className="text-4xl mb-2">🎉</div>
              <p className="text-base font-semibold text-neutral-800">学完啦！</p>
              <p className="text-xs text-neutral-500 mt-1">又进步了一点点～</p>
            </div>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      {/* Rank header */}
      <div className="bg-gradient-to-br from-primary-500 to-secondary-600 px-5 py-6 text-white">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-white/70 text-xs">你的理财段位</p>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-3xl">{currentRank.icon}</span>
              <span className="text-2xl font-bold">{currentRank.name}</span>
            </div>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold">{completedCount}</p>
            <p className="text-white/70 text-xs">已学 {completedCount}/{lessons.length} 课</p>
          </div>
        </div>
        {nextRank && (
          <div>
            <div className="flex items-center justify-between text-xs text-white/70 mb-1">
              <span>距{nextRank.name}还需 {nextRank.min - completedCount} 课</span>
              <span>{nextRank.icon} {nextRank.name}</span>
            </div>
            <div className="h-2 bg-white/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-white rounded-full transition-all duration-500"
                style={{ width: `${(completedCount / nextRank.min) * 100}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Lesson list */}
      <div className="px-4 py-4 space-y-2.5">
        <div className="flex items-center gap-1.5 mb-1">
          <BookOpen size={16} className="text-primary-500" />
          <h2 className="text-sm font-semibold text-neutral-700">每日一学</h2>
        </div>
        {lessons.map((lesson, i) => {
          const completed = isLessonCompleted(lesson.id)
          const locked = i > 0 && !isLessonCompleted(lessons[i - 1].id) && !completed
          return (
            <button
              key={lesson.id}
              onClick={() => !locked && setSelectedLesson(lesson)}
              disabled={locked}
              className={`w-full flex items-center gap-3 rounded-xl p-3.5 text-left transition-all ${
                locked
                  ? 'bg-neutral-50 opacity-50'
                  : completed
                    ? 'bg-white border border-neutral-200 hover:shadow-sm'
                    : 'bg-white border border-primary-200 hover:shadow-md'
              }`}
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                completed ? 'bg-success-50' : locked ? 'bg-neutral-100' : 'bg-primary-50'
              }`}>
                {completed ? (
                  <CheckCircle2 size={20} className="text-success-500" />
                ) : locked ? (
                  <Lock size={18} className="text-neutral-400" />
                ) : (
                  <span className="text-primary-600 font-bold text-sm">{i + 1}</span>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-medium text-neutral-800 truncate">{lesson.title}</h3>
                <p className="text-xs text-neutral-500 truncate mt-0.5">{lesson.analogy}</p>
              </div>
              <div className="flex items-center gap-1.5 flex-shrink-0">
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${difficultyColor(lesson.difficulty)}`}>
                  {difficultyLabel(lesson.difficulty)}
                </span>
                {!locked && <ChevronRight size={16} className="text-neutral-300" />}
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
