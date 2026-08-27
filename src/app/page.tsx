'use client';

import { useEffect, useState, useRef } from 'react';

/* ─── Scroll Animation Hook ─── */
function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, visible };
}

function Section({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const { ref, visible } = useScrollReveal();
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} ${className}`}
    >
      {children}
    </div>
  );
}

/* ─── Icons (inline SVG) ─── */
function LeafIcon({ className = 'w-6 h-6' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 20A7 7 0 0 1 9.8 6.9C15.5 4.9 17 3.5 19 2c1 2 2 4.5 2 8 0 5.5-4.78 10-10 10Z" />
      <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
    </svg>
  );
}

function HeartIcon({ className = 'w-6 h-6' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
  );
}

function ShieldIcon({ className = 'w-6 h-6' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

function BrainIcon({ className = 'w-6 h-6' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z" />
      <path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z" />
      <path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4" />
      <path d="M17.599 6.5a3 3 0 0 0 .399-1.375" />
      <path d="M6.003 5.125A3 3 0 0 0 6.401 6.5" />
      <path d="M3.477 10.896a4 4 0 0 1 .585-.396" />
      <path d="M19.938 10.5a4 4 0 0 1 .585.396" />
      <path d="M6 18a4 4 0 0 1-1.967-.516" />
      <path d="M19.967 17.484A4 4 0 0 1 18 18" />
    </svg>
  );
}

function ChatIcon({ className = 'w-6 h-6' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      <path d="M8 10h.01" /><path d="M12 10h.01" /><path d="M16 10h.01" />
    </svg>
  );
}

function TrendUpIcon({ className = 'w-6 h-6' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
      <polyline points="16 7 22 7 22 13" />
    </svg>
  );
}

function EyeIcon({ className = 'w-6 h-6' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function BookIcon({ className = 'w-6 h-6' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20" />
    </svg>
  );
}

function UsersIcon({ className = 'w-6 h-6' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function TargetIcon({ className = 'w-6 h-6' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" />
    </svg>
  );
}

/* ─── Navigation ─── */
function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const links = [
    { href: '#insights', label: '用户洞察' },
    { href: '#solution', label: 'AI方案' },
    { href: '#product', label: '产品定义' },
    { href: '#architecture', label: '技术架构' },
    { href: '#interaction', label: '互动设计' },
    { href: '#compliance', label: '合规风控' },
    { href: '#scenarios', label: '情景样例' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-cream/90 backdrop-blur-md shadow-sm' : 'bg-transparent'}`}>
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2 text-sage font-bold text-lg">
          <LeafIcon className="w-5 h-5" />
          <span>财搭子</span>
        </a>
        <div className="hidden md:flex items-center gap-6">
          {links.map(l => (
            <a key={l.href} href={l.href} className="text-sm text-gray-text hover:text-sage transition-colors duration-200">
              {l.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}

/* ─── Hero ─── */
function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-sage/5 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-apricot/5 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-sage-light/30 blur-3xl" />
      </div>

      <div className="relative max-w-4xl mx-auto px-6 text-center">
        <div className="animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sage-light/60 text-sage text-sm font-medium mb-8">
            <LeafIcon className="w-4 h-4" />
            <span>AI 理财陪伴应用设计方案</span>
          </div>
        </div>

        <h1 className="animate-fade-in-up animation-delay-100 text-5xl md:text-7xl font-bold text-ink leading-tight mb-6">
          当 AI 成为你的
          <br />
          <span className="text-sage">理财搭子</span>
        </h1>

        <p className="animate-fade-in-up animation-delay-200 text-lg md:text-xl text-gray-text max-w-2xl mx-auto mb-10 leading-relaxed">
          一个懂金融、懂年轻人、更懂闭嘴的 AI 理财陪伴伙伴
          <br />
          <span className="text-sage font-medium">不替代判断，只陪伴成长</span>
        </p>

        <div className="animate-fade-in-up animation-delay-300 flex flex-wrap justify-center gap-4 mb-16">
          <div className="px-5 py-3 rounded-2xl bg-card shadow-sm border border-border-warm">
            <span className="text-2xl font-bold text-sage">80%</span>
            <p className="text-xs text-gray-text mt-1">Z世代愿尝试AI理财</p>
          </div>
          <div className="px-5 py-3 rounded-2xl bg-card shadow-sm border border-border-warm">
            <span className="text-2xl font-bold text-apricot">72%</span>
            <p className="text-xs text-gray-text mt-1">接触投资仅一年</p>
          </div>
          <div className="px-5 py-3 rounded-2xl bg-card shadow-sm border border-border-warm">
            <span className="text-2xl font-bold text-sage">2.5x</span>
            <p className="text-xs text-gray-text mt-1">损失痛苦 &gt; 收益快感</p>
          </div>
        </div>

        <div className="animate-fade-in-up animation-delay-400">
          <a href="#insights" className="inline-flex items-center gap-2 text-sage hover:text-sage/80 transition-colors">
            <span className="text-sm">向下探索方案</span>
            <svg className="w-4 h-4 animate-bounce" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 5v14M5 12l7 7 7-7" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}

/* ─── User Insights ─── */
function UserInsights() {
  const contradictions = [
    {
      title: '渴望掌控感 vs 缺乏认知力',
      desc: '57%的年轻人把"被动收入覆盖开支"视为安全感首要标准，高于"铁饭碗"工作(48%)。极度渴望通过理财获得人生掌控感，但金融素养的匮乏让他们手足无措。',
      icon: <TargetIcon className="w-6 h-6" />,
    },
    {
      title: '追求"求稳" vs 行为"追涨"',
      desc: '调研显示年轻人偏好债基、银行理财、黄金等稳健产品。但实际操作中又容易被社交平台的"财富神话"误导，跟风追涨热点。嘴上说求稳，手上在追涨。',
      icon: <TrendUpIcon className="w-6 h-6" />,
    },
    {
      title: '需要陪伴 vs 抗拒说教',
      desc: '年轻人渴望被理解、被陪伴，但抗拒说教式沟通，追求平等化对话。传统投教那种"你应该这样那样"的姿态，他们天然排斥。',
      icon: <HeartIcon className="w-6 h-6" />,
    },
  ];

  const painPoints = [
    { label: '看不懂', desc: '面对1595只ETF产品、复杂的基金名称和术语，无从下手' },
    { label: '不敢买', desc: '超三成投资者仍存在"保本保收益"的刚兑思维' },
    { label: '拿不住', desc: '市场一跌就慌、一涨就追，损失厌恶是收益快感的2.5倍' },
    { label: '被裹挟', desc: '社交媒体"日赚XX"截图放大幸存者偏差' },
  ];

  return (
    <section id="insights" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <Section>
          <div className="text-center mb-16">
            <span className="text-sage text-sm font-medium tracking-wider uppercase">User Insights</span>
            <h2 className="text-3xl md:text-4xl font-bold text-ink mt-3 mb-4">用户洞察</h2>
            <p className="text-gray-text max-w-xl mx-auto">他们想理财，但迟迟没有开始。72%的年轻人接触投资仅有一年左右的时间。</p>
          </div>
        </Section>

        {/* Pain Points */}
        <Section>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
            {painPoints.map((p, i) => (
              <div key={i} className="bg-card rounded-2xl p-6 border border-border-warm shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="w-10 h-10 rounded-xl bg-apricot-light flex items-center justify-center text-apricot font-bold text-lg mb-4">
                  {String(i + 1).padStart(2, '0')}
                </div>
                <h3 className="font-bold text-ink text-lg mb-2">&ldquo;{p.label}&rdquo;</h3>
                <p className="text-sm text-gray-text leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* Core Contradictions */}
        <Section>
          <h3 className="text-xl font-bold text-ink mb-8 text-center">三组核心矛盾</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {contradictions.map((c, i) => (
              <div key={i} className="bg-card rounded-2xl p-8 border border-border-warm shadow-sm hover:shadow-md transition-all duration-300 group">
                <div className="w-12 h-12 rounded-2xl bg-sage-light flex items-center justify-center text-sage mb-5 group-hover:scale-110 transition-transform duration-300">
                  {c.icon}
                </div>
                <h4 className="font-bold text-ink mb-3">{c.title}</h4>
                <p className="text-sm text-gray-text leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* What AI should do */}
        <Section className="mt-16">
          <div className="bg-sage-light/40 rounded-3xl p-8 md:p-12">
            <h3 className="text-xl font-bold text-ink mb-6">AI 应该做什么？</h3>
            <p className="text-gray-text mb-8">AI不应该替年轻人"做决策"，而应该帮他们：</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { title: '理解风险', desc: '把复杂金融概念翻译成听得懂的话' },
                { title: '建立认知', desc: '在碎片化时间中积累投资常识' },
                { title: '形成纪律', desc: '用机制对抗人性弱点（追涨杀跌）' },
                { title: '情绪陪伴', desc: '在市场波动时提供理性的安抚，而非煽动' },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3 bg-card/60 rounded-xl p-4">
                  <span className="w-8 h-8 rounded-lg bg-sage text-white flex items-center justify-center text-sm font-bold shrink-0">{i + 1}</span>
                  <div>
                    <h4 className="font-semibold text-ink">{item.title}</h4>
                    <p className="text-sm text-gray-text">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Section>
      </div>
    </section>
  );
}

/* ─── AI Solution ─── */
function AISolution() {
  const solutions = [
    { icon: <ChatIcon className="w-6 h-6" />, title: '"翻译"', desc: '把专业术语变成生活语言（比如把"最大回撤"翻译成"最坏情况下可能亏多少"）' },
    { icon: <EyeIcon className="w-6 h-6" />, title: '"提醒"', desc: '在市场过热或过冷时，用数据而不是情绪说话' },
    { icon: <BookIcon className="w-6 h-6" />, title: '"记录"', desc: '帮用户记录每一次决策和结果，形成可复盘的投资日记' },
    { icon: <HeartIcon className="w-6 h-6" />, title: '"陪伴"', desc: '在市场波动时出现，在平静时安静，不打扰但一直都在' },
  ];

  return (
    <section id="solution" className="py-24 px-6 bg-muted/50">
      <div className="max-w-6xl mx-auto">
        <Section>
          <div className="text-center mb-16">
            <span className="text-sage text-sm font-medium tracking-wider uppercase">AI Solution</span>
            <h2 className="text-3xl md:text-4xl font-bold text-ink mt-3 mb-4">AI 方案与陪伴体验</h2>
            <p className="text-gray-text max-w-xl mx-auto">核心命题：AI不是"帮你赚钱的工具"，而是"陪你成长的搭子"</p>
          </div>
        </Section>

        <Section>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {solutions.map((s, i) => (
              <div key={i} className="bg-card rounded-2xl p-8 border border-border-warm shadow-sm hover:shadow-md transition-all duration-300 flex items-start gap-5">
                <div className="w-14 h-14 rounded-2xl bg-sage-light flex items-center justify-center text-sage shrink-0">
                  {s.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-ink mb-2">{s.title}</h3>
                  <p className="text-gray-text leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </Section>
      </div>
    </section>
  );
}

/* ─── Product Definition ─── */
function ProductDefinition() {
  return (
    <section id="product" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <Section>
          <div className="text-center mb-16">
            <span className="text-sage text-sm font-medium tracking-wider uppercase">Product</span>
            <h2 className="text-3xl md:text-4xl font-bold text-ink mt-3 mb-4">产品定义：&ldquo;财搭子&rdquo;</h2>
            <p className="text-gray-text max-w-xl mx-auto">取"理财搭子"之意，亲切、无距离感</p>
          </div>
        </Section>

        {/* Target User */}
        <Section>
          <div className="bg-card rounded-3xl p-8 md:p-10 border border-border-warm shadow-sm mb-8">
            <div className="flex items-center gap-3 mb-6">
              <UsersIcon className="w-6 h-6 text-sage" />
              <h3 className="text-xl font-bold text-ink">目标用户：&ldquo;避险青年&rdquo;</h3>
            </div>
            <p className="text-gray-text mb-6">蚂蚁财富与小红书联合调研定义的群体：重视现金流、理财不all in、求职不冒进的年轻人。</p>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {[
                { label: '年龄', value: '22-30岁' },
                { label: '特征', value: '数字原住民' },
                { label: '资金', value: '1K-1W/月' },
                { label: '痛点', value: '看不懂/不敢买' },
                { label: '需求', value: '有温度的陪伴' },
              ].map((item, i) => (
                <div key={i} className="bg-cream rounded-xl p-4 text-center">
                  <p className="text-xs text-gray-text mb-1">{item.label}</p>
                  <p className="text-sm font-semibold text-ink">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* Core Differentiation */}
        <Section>
          <div className="bg-warm-bg rounded-3xl p-8 md:p-10 border border-apricot/20">
            <div className="flex items-center gap-3 mb-6">
              <LeafIcon className="w-6 h-6 text-apricot" />
              <h3 className="text-xl font-bold text-ink">核心差异</h3>
            </div>
            <p className="text-gray-text leading-relaxed mb-6">
              市面上已有"长小牛""灵犀""京小贝"等AI投顾产品。"财搭子"的差异化在于——<span className="text-sage font-semibold">不替代判断，只陪伴成长</span>。它不是"给你答案"的投顾，而是"陪你思考"的伙伴。
            </p>
            <div className="bg-card/80 rounded-2xl p-6">
              <p className="text-sm font-medium text-ink mb-3">竞品使用体验问题（灵犀）：</p>
              <div className="space-y-2">
                {['AI形象选择', '使用新手教程', '放一堆市场行情，不知道从何下手', '没有主动引导，不等用户自己问'].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-gray-text">
                    <span className="w-5 h-5 rounded-full bg-apricot/20 text-apricot flex items-center justify-center text-xs font-bold">{i + 1}</span>
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Section>
      </div>
    </section>
  );
}

/* ─── Tech Architecture ─── */
function TechArchitecture() {
  const layers = [
    {
      name: '感知层',
      color: 'bg-sage-light text-sage',
      items: [
        { title: '用户画像引擎', desc: '基于问卷、行为数据、持仓信息构建动态用户画像' },
        { title: '情绪感知模块', desc: '通过对话语义分析识别用户情绪状态（焦虑/兴奋/迷茫）' },
        { title: '市场信号监测', desc: '实时跟踪市场波动、板块轮动、政策变化' },
      ],
    },
    {
      name: '决策层',
      color: 'bg-apricot-light text-apricot',
      items: [
        { title: '知识库（RAG）', desc: '接入基金公司专业投研数据、合规审核后的观点库' },
        { title: '行为分析引擎', desc: '识别用户的非理性行为倾向（追涨、杀跌、频繁交易）' },
        { title: '陪伴策略生成', desc: '根据用户状态+市场环境，生成个性化陪伴内容' },
      ],
    },
    {
      name: '表达层',
      color: 'bg-blue-50 text-blue-600',
      items: [
        { title: '人格化对话', desc: '统一IP人设，风格一致、有记忆、有成长' },
        { title: '多模态输出', desc: '文字、语音（AI播客）、图文卡片' },
        { title: '主动触达', desc: '关键时点主动出现，而非被动等待提问' },
      ],
    },
  ];

  return (
    <section id="architecture" className="py-24 px-6 bg-muted/50">
      <div className="max-w-6xl mx-auto">
        <Section>
          <div className="text-center mb-16">
            <span className="text-sage text-sm font-medium tracking-wider uppercase">Architecture</span>
            <h2 className="text-3xl md:text-4xl font-bold text-ink mt-3 mb-4">AI 技术架构</h2>
            <p className="text-gray-text max-w-xl mx-auto">三层架构：感知 → 决策 → 表达</p>
          </div>
        </Section>

        <Section>
          <div className="space-y-6">
            {layers.map((layer, li) => (
              <div key={li} className="bg-card rounded-2xl p-8 border border-border-warm shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <span className={`px-3 py-1 rounded-lg text-sm font-bold ${layer.color}`}>
                    第{li + 1}层
                  </span>
                  <h3 className="text-xl font-bold text-ink">{layer.name}</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {layer.items.map((item, ii) => (
                    <div key={ii} className="bg-cream rounded-xl p-5">
                      <h4 className="font-semibold text-ink mb-2">{item.title}</h4>
                      <p className="text-sm text-gray-text leading-relaxed">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Section>
      </div>
    </section>
  );
}

/* ─── Interaction Design ─── */
function InteractionDesign() {
  const modes = [
    {
      title: '日常陪伴',
      subtitle: '被动 + 主动',
      desc: '用户可以不主动提问，AI会根据市场变化和用户持仓，主动推送"今日简评"——不超过3句话，说清今天发生了什么、对用户意味着什么。',
      icon: <LeafIcon className="w-6 h-6" />,
    },
    {
      title: '随时问答',
      subtitle: '主动',
      desc: '用户随时可以问任何理财问题。AI的回复遵循"三明治结构"：直接回答 → 为什么 → 你可以怎么做。',
      icon: <ChatIcon className="w-6 h-6" />,
    },
    {
      title: '关键时刻介入',
      subtitle: '主动',
      desc: '当检测到用户可能做出非理性决策时（如市场大跌时频繁查看账户），AI主动介入，用数据和逻辑帮用户冷静下来。',
      icon: <ShieldIcon className="w-6 h-6" />,
    },
  ];

  return (
    <section id="interaction" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <Section>
          <div className="text-center mb-16">
            <span className="text-sage text-sm font-medium tracking-wider uppercase">Interaction</span>
            <h2 className="text-3xl md:text-4xl font-bold text-ink mt-3 mb-4">用户与 AI 的互动设计</h2>
          </div>
        </Section>

        <Section>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {modes.map((m, i) => (
              <div key={i} className="bg-card rounded-2xl p-8 border border-border-warm shadow-sm hover:shadow-md transition-all duration-300">
                <div className="w-12 h-12 rounded-2xl bg-sage-light flex items-center justify-center text-sage mb-5">
                  {m.icon}
                </div>
                <h3 className="text-lg font-bold text-ink mb-1">{m.title}</h3>
                <span className="text-xs text-sage font-medium bg-sage-light px-2 py-0.5 rounded-full">{m.subtitle}</span>
                <p className="text-sm text-gray-text leading-relaxed mt-4">{m.desc}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* Content Types */}
        <Section>
          <h3 className="text-xl font-bold text-ink mb-8">AI 输出内容设计</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-card rounded-2xl p-6 border border-border-warm">
              <h4 className="font-bold text-ink mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-sage" />
                日常陪伴内容
              </h4>
              <div className="space-y-3">
                {[
                  { scene: '盘前', content: '"今日三件事"——3条与用户持仓相关的重要信息', freq: '每日' },
                  { scene: '盘后', content: '"今日复盘"——1段话总结+1个知识点', freq: '每日' },
                  { scene: '周末', content: '"一周回顾"——1个理财小知识+1个行动建议', freq: '每周' },
                ].map((item, i) => (
                  <div key={i} className="bg-cream rounded-xl p-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-sage">{item.scene}</span>
                      <span className="text-xs text-gray-text">{item.freq}</span>
                    </div>
                    <p className="text-xs text-gray-text">{item.content}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-card rounded-2xl p-6 border border-border-warm">
              <h4 className="font-bold text-ink mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-apricot" />
                深度陪伴内容
              </h4>
              <div className="space-y-3">
                {[
                  { title: '理财日记', desc: '自动记录每一次买卖决策和当时的市场环境' },
                  { title: '行为周报', desc: '每周总结投资行为（交易频率、持仓变化、情绪波动）' },
                  { title: '波动陪伴', desc: '市场大幅波动时自动生成安抚内容' },
                ].map((item, i) => (
                  <div key={i} className="bg-cream rounded-xl p-3">
                    <p className="text-xs font-bold text-apricot mb-1">{item.title}</p>
                    <p className="text-xs text-gray-text">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-card rounded-2xl p-6 border border-border-warm">
              <h4 className="font-bold text-ink mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-500" />
                投教内容（游戏化）
              </h4>
              <div className="space-y-3">
                {[
                  { title: '每日一学', desc: '每天1个概念，3分钟读完' },
                  { title: '生活类比', desc: '用生活场景类比金融概念' },
                  { title: '段位成长', desc: '从"青铜"到"王者"，解锁不同知识' },
                ].map((item, i) => (
                  <div key={i} className="bg-cream rounded-xl p-3">
                    <p className="text-xs font-bold text-blue-600 mb-1">{item.title}</p>
                    <p className="text-xs text-gray-text">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Section>

        {/* Temperature */}
        <Section className="mt-12">
          <div className="bg-sage-light/30 rounded-3xl p-8 md:p-10">
            <h3 className="text-xl font-bold text-ink mb-6">让陪伴有温度、可持续</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h4 className="font-semibold text-ink mb-3">人格化 IP：&ldquo;财小搭&rdquo;</h4>
                <ul className="space-y-2 text-sm text-gray-text">
                  <li>- 不是专家，是"比你懂一点但还在学习的伙伴"</li>
                  <li>- 说话方式像朋友（不用"您"，用"你"）</li>
                  <li>- 有记忆：记得你上次问过什么</li>
                  <li>- 会承认自己不懂</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-ink mb-3">不打扰的陪伴</h4>
                <ul className="space-y-2 text-sm text-gray-text">
                  <li>- 平时安静，关键时刻出现</li>
                  <li>- 可设置"陪伴密度"</li>
                  <li>- 尊重用户的沉默</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-ink mb-3">共同成长感</h4>
                <ul className="space-y-2 text-sm text-gray-text">
                  <li>- AI也会"成长"，内容逐渐深入</li>
                  <li>- 记录用户的"理财成长史"</li>
                  <li>- 里程碑庆祝</li>
                </ul>
              </div>
            </div>
          </div>
        </Section>
      </div>
    </section>
  );
}

/* ─── Compliance ─── */
function Compliance() {
  const risks = [
    {
      title: 'AI 乱推荐',
      solutions: [
        'AI不提供具体的"买入/卖出"指令，只提供信息、逻辑和选项',
        '所有涉及产品的输出必须标注"产品代码+风险等级+历史业绩不代表未来"',
        '建立"观点库"机制：AI输出均来自审核过的知识库',
      ],
    },
    {
      title: '过度承诺收益',
      solutions: [
        '每次涉及收益的对话自动附带风险提示',
        '"收益预期"关键词过滤——先回应"收益无法承诺，投资有风险"',
        '所有历史业绩数据必须附带"过往业绩不代表未来表现"',
      ],
    },
    {
      title: '投资建议不合规',
      solutions: [
        '明确AI边界：不做投资决策，不做产品推荐排序，不预测市场',
        '每次对话末尾自动生成免责声明',
        '参照《证券基金投资咨询业务管理办法》要求',
      ],
    },
    {
      title: '用户隐私与数据安全',
      solutions: [
        '用户行为数据本地存储，不上传云端',
        '明确告知数据使用范围，获取用户授权',
        '不将用户数据用于模型训练',
      ],
    },
  ];

  return (
    <section id="compliance" className="py-24 px-6 bg-muted/50">
      <div className="max-w-6xl mx-auto">
        <Section>
          <div className="text-center mb-16">
            <span className="text-sage text-sm font-medium tracking-wider uppercase">Compliance</span>
            <h2 className="text-3xl md:text-4xl font-bold text-ink mt-3 mb-4">合规与风控设计</h2>
            <p className="text-gray-text max-w-xl mx-auto">方案的重中之重</p>
          </div>
        </Section>

        <Section>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {risks.map((r, i) => (
              <div key={i} className="bg-card rounded-2xl p-8 border border-border-warm shadow-sm">
                <div className="flex items-center gap-3 mb-5">
                  <ShieldIcon className="w-5 h-5 text-apricot" />
                  <h3 className="font-bold text-ink">风险{i + 1}：{r.title}</h3>
                </div>
                <div className="space-y-3">
                  {r.solutions.map((s, si) => (
                    <div key={si} className="flex items-start gap-2">
                      <span className="w-5 h-5 rounded-full bg-sage-light text-sage flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">{si + 1}</span>
                      <p className="text-sm text-gray-text leading-relaxed">{s}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Section>

        <Section className="mt-8">
          <div className="bg-card rounded-2xl p-8 border border-sage/20">
            <h3 className="font-bold text-ink mb-4 flex items-center gap-2">
              <BrainIcon className="w-5 h-5 text-sage" />
              体现专业性与可信度
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                '所有AI输出的信息均可溯源至基金公司官方投研报告',
                'App中设置"信息来源"按钮，可查看原始研报',
                '定期邀请基金经理进行"AI+人工"联合问答直播',
                '首次使用时清晰告知出品方与监管信息',
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-2 text-sm text-gray-text">
                  <span className="text-sage mt-0.5">✓</span>
                  {item}
                </div>
              ))}
            </div>
          </div>
        </Section>
      </div>
    </section>
  );
}

/* ─── Scenarios ─── */
function Scenarios() {
  return (
    <section id="scenarios" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <Section>
          <div className="text-center mb-16">
            <span className="text-sage text-sm font-medium tracking-wider uppercase">Scenarios</span>
            <h2 className="text-3xl md:text-4xl font-bold text-ink mt-3 mb-4">情景化内容样例</h2>
          </div>
        </Section>

        {/* Scenario 1 */}
        <Section className="mb-8">
          <div className="bg-card rounded-3xl p-8 md:p-10 border border-border-warm shadow-sm">
            <h3 className="text-lg font-bold text-ink mb-6 flex items-center gap-2">
              <span className="w-8 h-8 rounded-xl bg-sage-light text-sage flex items-center justify-center text-sm font-bold">1</span>
              新人 Onboarding 对话
            </h3>
            <div className="space-y-4 max-w-2xl">
              <div className="flex justify-end">
                <div className="bg-muted rounded-2xl rounded-tr-sm px-4 py-3 max-w-md">
                  <p className="text-sm text-ink">你好，我想理财但完全不懂。</p>
                  <p className="text-xs text-gray-text mt-1 text-right">用户</p>
                </div>
              </div>
              <div className="flex justify-start">
                <div className="bg-sage-light/50 rounded-2xl rounded-tl-sm px-4 py-3 max-w-md">
                  <p className="text-sm text-ink leading-relaxed">
                    嗨！第一次见面，不用紧张。我也不是专家，就是比你多知道一点点~
                  </p>
                  <p className="text-sm text-ink leading-relaxed mt-2">
                    先问你三个超简单的问题，帮你找到最适合的入门方式：
                  </p>
                  <ol className="text-sm text-ink leading-relaxed mt-2 space-y-1 list-decimal list-inside">
                    <li>你每个月大概能存多少钱？</li>
                    <li>这笔钱你打算多久之后用？</li>
                    <li>如果亏了10%，你会睡不着觉吗？</li>
                  </ol>
                  <p className="text-xs text-gray-text mt-2">财小搭</p>
                </div>
              </div>
              <div className="flex justify-end">
                <div className="bg-muted rounded-2xl rounded-tr-sm px-4 py-3 max-w-md">
                  <p className="text-sm text-ink">每个月能存2000左右吧，三五年内应该用不上。亏10%......可能会有点慌。</p>
                  <p className="text-xs text-gray-text mt-1 text-right">用户</p>
                </div>
              </div>
              <div className="flex justify-start">
                <div className="bg-sage-light/50 rounded-2xl rounded-tl-sm px-4 py-3 max-w-md">
                  <p className="text-sm text-ink leading-relaxed">
                    收到！根据你的情况，我猜你适合从"稳健型"开始——就是那种涨跌不太刺激、但长期来看能跑赢存款的产品。
                  </p>
                  <p className="text-sm text-ink leading-relaxed mt-2">
                    今天先不急着买任何东西。我先给你发一个3分钟的小科普：《基金到底是什么？》
                  </p>
                  <p className="text-sm text-sage font-medium mt-2">慢慢来，我陪你。</p>
                  <p className="text-xs text-gray-text mt-2">财小搭</p>
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* Scenario 2 */}
        <Section className="mb-8">
          <div className="bg-card rounded-3xl p-8 md:p-10 border border-border-warm shadow-sm">
            <h3 className="text-lg font-bold text-ink mb-6 flex items-center gap-2">
              <span className="w-8 h-8 rounded-xl bg-apricot-light text-apricot flex items-center justify-center text-sm font-bold">2</span>
              市场大跌时的陪伴
            </h3>
            <div className="bg-warm-bg rounded-2xl p-6 max-w-2xl">
              <p className="text-xs text-apricot font-medium mb-3">财小搭（主动推送）</p>
              <p className="text-sm text-ink leading-relaxed mb-3">
                今天市场跌了不少，我看到你持有的XX基金跌了4.2%。先别急着看账户。我来帮你做三件事：
              </p>
              <div className="space-y-2 mb-4">
                <div className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-apricot/20 text-apricot flex items-center justify-center text-xs font-bold shrink-0">1</span>
                  <p className="text-sm text-ink"><strong>告诉你为什么跌：</strong>今天主要是因为[具体原因]，和你买的这只基金本身关系不大。</p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-apricot/20 text-apricot flex items-center justify-center text-xs font-bold shrink-0">2</span>
                  <p className="text-sm text-ink"><strong>帮你看看历史：</strong>这只基金过去3年最大回撤是18%，今天这种跌幅出现过多次，之后平均反弹。</p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-apricot/20 text-apricot flex items-center justify-center text-xs font-bold shrink-0">3</span>
                  <p className="text-sm text-ink"><strong>给你一个选择：</strong>如果打算长期持有（3年以上），今天的波动在预期之内；如果觉得超出承受范围，我们可以聊聊调整。</p>
                </div>
              </div>
              <p className="text-sm text-sage font-medium">无论你怎么选，我都支持。但请别在今天做决定——先睡一觉，明天再说。</p>
              <p className="text-xs text-gray-text mt-3 italic">以上内容仅为信息参考，不构成投资建议。</p>
            </div>
          </div>
        </Section>

        {/* User Journey */}
        <Section>
          <div className="bg-card rounded-3xl p-8 md:p-10 border border-border-warm shadow-sm">
            <h3 className="text-lg font-bold text-ink mb-8 flex items-center gap-2">
              <span className="w-8 h-8 rounded-xl bg-sage-light text-sage flex items-center justify-center text-sm font-bold">3</span>
              用户旅程图
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {[
                { phase: '相遇', time: '第1周', goal: '让用户觉得"这个AI不烦人"', items: ['3分钟onboarding对话', '收到第一个每日一学'] },
                { phase: '试探', time: '第1-4周', goal: '让用户觉得"它真的懂我"', items: ['小额试水定投', '每日推送今日三件事'] },
                { phase: '信任', time: '第2-6个月', goal: '让用户觉得"有它在，我安心"', items: ['经历第一次波动陪伴', '开始查看行为周报'] },
                { phase: '成长', time: '6个月以上', goal: '不再需要AI替自己做决策', items: ['内容从"是什么"到"为什么"', '主动学习更深知识'] },
              ].map((stage, i) => (
                <div key={i} className="relative">
                  <div className="bg-cream rounded-2xl p-5 h-full">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="w-8 h-8 rounded-full bg-sage text-white flex items-center justify-center text-sm font-bold">{i + 1}</span>
                      <div>
                        <p className="font-bold text-ink text-sm">{stage.phase}</p>
                        <p className="text-xs text-gray-text">{stage.time}</p>
                      </div>
                    </div>
                    <p className="text-xs text-sage font-medium mb-3">{stage.goal}</p>
                    <ul className="space-y-1">
                      {stage.items.map((item, ii) => (
                        <li key={ii} className="text-xs text-gray-text flex items-start gap-1">
                          <span className="text-sage mt-0.5">-</span> {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  {i < 3 && (
                    <div className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2 text-sage/30">
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </Section>
      </div>
    </section>
  );
}

/* ─── Summary / Footer ─── */
function Summary() {
  return (
    <section className="py-24 px-6 bg-sage-light/20">
      <div className="max-w-4xl mx-auto text-center">
        <Section>
          <LeafIcon className="w-10 h-10 text-sage mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold text-ink mb-6">
            让 AI 成为年轻人理解投资的入口
            <br />
            <span className="text-sage">而不是替代独立判断的工具</span>
          </h2>
          <p className="text-gray-text max-w-2xl mx-auto leading-relaxed mb-8">
            "财搭子"的核心逻辑是：AI不应该成为年轻人的"理财替身"，而应该成为他们的"理财陪练"——不替他们上场打球，但在场边陪他们练习、帮他们分析、在他们失误时喊一声"没事，再来"。
          </p>
          <p className="text-gray-text max-w-2xl mx-auto leading-relaxed mb-8">
            约八成Z世代愿尝试AI理财助手，但超六成实际收益低于4%。差距不在"AI不够聪明"，而在"用户没有真正理解自己在做什么"。"财搭子"要弥合的，正是这个"知识-行动"的差距——不是用AI替代人的判断，而是用陪伴帮人长出判断力。
          </p>
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-sage text-white font-medium">
            <LeafIcon className="w-5 h-5" />
            <span>财搭子 —— 陪你成长的理财伙伴</span>
          </div>
        </Section>
      </div>
    </section>
  );
}

/* ─── Main Page ─── */
export default function Home() {
  return (
    <main className="min-h-screen">
      <Nav />
      <Hero />
      <UserInsights />
      <AISolution />
      <ProductDefinition />
      <TechArchitecture />
      <InteractionDesign />
      <Compliance />
      <Scenarios />
      <Summary />
      <footer className="py-8 px-6 text-center border-t border-border-warm">
        <p className="text-sm text-gray-text">
          @scene:22 | 当 AI 成为你的理财搭子 | 面向年轻人的AI理财陪伴应用设计方案
        </p>
      </footer>
    </main>
  );
}
