type AIResponse = {
  content: string
  contextType: string
}

type UserProfile = {
  monthly_savings: number | null
  investment_horizon: string | null
  risk_tolerance: string | null
  risk_type: string
}

const DISCLAIMER = '\n\n*以上内容仅为信息参考，不构成投资建议。*'

function contains(text: string, keywords: string[]): boolean {
  return keywords.some((k) => text.includes(k))
}

export function generateAIResponse(userMessage: string, profile: UserProfile | null): AIResponse {
  const msg = userMessage.toLowerCase().trim()

  if (contains(msg, ['你好', 'hi', '嗨', '哈喽', '在吗'])) {
    return {
      content: `嗨！我在呢～有什么想聊的吗？不管是理财的问题，还是今天市场让你开心或者焦虑，都可以跟我说。我虽然不是专家，但可以陪你一起想想。${DISCLAIMER}`,
      contextType: 'daily',
    }
  }

  if (contains(msg, ['基金是什么', '什么是基金', '基金是啥'])) {
    return {
      content: `基金其实很简单——就是把很多人的钱凑在一起，交给专业的基金经理去投资。\n\n你买基金，买的不是"一只股票"，而是一篮子资产的"份额"。就好比你凑钱请代购，代购帮你买一堆东西，你拥有一部分。\n\n基金分几种：\n• 货币基金（像余额宝）——几乎不会亏，但收益也低\n• 债券基金——比较稳，波动不大\n• 股票基金——波动大，但长期可能赚更多\n\n你不用一下子全懂，慢慢来就好。要不要我给你发一个3分钟的小科普？${DISCLAIMER}`,
      contextType: 'qa',
    }
  }

  if (contains(msg, ['最大回撤', '回撤'])) {
    return {
      content: `最大回撤，说白了就是"最坏的时候你亏了多少"。\n\n打个比方：你花100块买了一只基金，它先涨到150块，然后跌到120块。那最大回撤就是从150到120，跌了20%。\n\n为什么这个指标重要？因为它告诉你：在最倒霉的时候，你要能扛得住。如果一只基金最大回撤40%，你买了1万块，最坏的时候账面上只剩6千——你能接受吗？\n\n所以选基金的时候，别只看"赚了多少"，先看"最多能亏多少"。亏得少，你才拿得住。${DISCLAIMER}`,
      contextType: 'qa',
    }
  }

  if (contains(msg, ['定投', '定期定额'])) {
    return {
      content: `定投就是"到了日子就投，不管涨跌"。\n\n就像每个月交房租一样——到了日子就交，不管你心情好不好。定投的好处是：\n\n1. 市场高的时候，你的钱买到的份额少\n2. 市场低的时候，你的钱买到的份额多\n3. 长期下来，你的平均成本会被拉低\n\n最重要的是：定投帮你克服了"择时"的焦虑。你不需要猜什么时候是低点——纪律会替你做决定。\n\n很多人定投失败，不是因为策略不对，而是因为跌的时候忍不住停了。所以定投的关键不是"买什么"，而是"能不能坚持"。${DISCLAIMER}`,
      contextType: 'qa',
    }
  }

  if (contains(msg, ['追涨', '杀跌', '现在能买吗', '还能涨吗', '要不要加仓'])) {
    return {
      content: `我理解你的心情——看到涨了就想追，看到跌了就想跑，这是人的本能。\n\n但我想先帮你冷静一下，看看数据：\n\n1. 追涨杀跌的投资者，长期收益远低于一直持有的人\n2. 每次买卖都有成本，频繁交易是在给券商打工\n3. 你觉得"还能涨"的时候，往往已经是高点附近了\n\n我的建议是：先想想你最初的投资计划是什么。如果你的计划是每月定投，那就继续按计划走。如果市场涨了你就加仓，跌了你就割肉——那不是投资，是赌博。\n\n先别急着做决定，把你的计划告诉我，我帮你看看。${DISCLAIMER}`,
      contextType: 'crisis',
    }
  }

  if (contains(msg, ['跌了', '亏了', '暴跌', '大跌', '怎么办', '恐慌', '睡不着'])) {
    return {
      content: `先别急着看账户，深呼吸。\n\n市场跌了，你焦虑是正常的。但我帮你做三件事：\n\n1. **为什么跌**：市场波动有很多原因——政策变化、外围市场、情绪恐慌。很多时候跟你买的基金本身关系不大。\n2. **看看历史**：大部分基金在3-5年周期里都能从回撤中恢复。如果你买的是宽基指数基金，历史上每次大跌后都会慢慢涨回来。\n3. **你的选择**：\n   • 如果你本来打算长期持有（3年以上），今天的波动在预期之内，可以什么都不做\n   • 如果你觉得超出了承受范围，我们可以聊聊要不要调整持仓比例\n\n无论你怎么选，我都支持。但请别在今天做决定——先睡一觉，明天再说。你的计划比市场情绪更可靠。${DISCLAIMER}`,
      contextType: 'crisis',
    }
  }

  if (contains(msg, ['能赚多少', '收益', '赚多少', '回报', '年化'])) {
    return {
      content: `收益无法承诺，投资有风险——这句话不是客套，是事实。\n\n但我可以帮你理解"合理预期"：\n\n• 货币基金：年化大约1.5-2%（几乎不亏）\n• 债券基金：年化大约3-5%（偶尔小亏）\n• 股票基金：年化大约8-15%（可能亏20-30%）\n• 宽基指数基金（如沪深300）：长期年化大约7-12%\n\n注意我说的是"长期"——10年以上的平均。短期可能好很多，也可能差很多。\n\n关键不是"能赚多少"，而是"你能接受亏多少"。先想清楚这个问题，收益自然就在合理范围内了。${DISCLAIMER}`,
      contextType: 'qa',
    }
  }

  if (contains(msg, ['分散', '配置', '篮子', '鸡蛋'])) {
    return {
      content: `分散投资就是"不把所有鸡蛋放在一个篮子里"。\n\n但很多人有个误区：以为"买10只股票基金"就是分散了。其实不是——如果10只都是新能源方向的，那还是一个篮子。\n\n真正的分散是"跨类型"：\n• 一部分买股票基金（进攻）\n• 一部分买债券基金（防守）\n• 一部分留现金（应急）\n• 如果愿意，加一点黄金（对冲）\n\n这样，股票跌的时候债券能稳住，债券平淡的时候股票可能亮眼。你的组合不会大起大落，你也能拿得住。\n\n年轻人大概可以70%权益+30%固收，但具体要看你的承受力。${DISCLAIMER}`,
      contextType: 'qa',
    }
  }

  if (contains(msg, ['新手', '小白', '入门', '怎么开始', '第一次'])) {
    return {
      content: `欢迎来到理财的世界！不用紧张，我陪你慢慢来。\n\n新手最重要的三件事：\n\n1. **先学习，再动手**：别急着买，先花几天时间了解"基金是什么"、"风险是什么"\n2. **从小额开始**：第一次投500-1000块就好，感受一下涨跌是什么感觉\n3. **选宽基指数基金**：新手别碰行业基金，先从沪深300、中证500这类宽基开始\n\n${profile?.monthly_savings ? `根据你的情况，每月能投${profile.monthly_savings}元左右，` : ''}建议从定投开始——每月固定投一笔，不用择时，不用盯盘，纪律会帮你。\n\n今天先不急。要不要我给你发一个3分钟的小科普？${DISCLAIMER}`,
      contextType: 'onboarding',
    }
  }

  if (contains(msg, ['谢谢你', '谢谢', '感谢', 'thx'])) {
    return {
      content: `不客气～能帮到你就好。记住，理财是一场马拉松，不是百米冲刺。慢慢来，我一直在。${DISCLAIMER}`,
      contextType: 'daily',
    }
  }

  if (contains(msg, ['什么是etf', 'etf是什么', 'etf'])) {
    return {
      content: `ETF就是"交易所交易基金"，你可以把它理解为"可以在股票账户里买卖的指数基金"。\n\n举个例子：沪深300ETF，就是一键买入沪深300只股票。你不用自己挑股票，买一只ETF就等于买了一大篮子。\n\nETF的好处：\n• 透明——里面装了什么一目了然\n• 便宜——管理费比主动基金低\n• 灵活——像股票一样随时买卖\n\n新手的话，宽基ETF（沪深300、中证500、创业板ETF）是比较好的起点。${DISCLAIMER}`,
      contextType: 'qa',
    }
  }

  if (contains(msg, ['夏普', 'sharpe'])) {
    return {
      content: `夏普比率，说白了就是"收益和风险的性价比"。\n\n就像买车不只看马力，还要看油耗——夏普比率衡量的是"每承担一单位风险，能获得多少超额收益"。\n\n• 夏普比率 > 1：不错\n• 夏普比率 > 2：优秀\n\n两只基金都赚了10%，但一只波动很小、一只大起大落——前者的夏普比率更高。同样的收益，更小的风险，性价比更好。${DISCLAIMER}`,
      contextType: 'qa',
    }
  }

  return {
    content: `这个问题挺好的，让我想想怎么用最简单的话回答你。\n\n${userMessage.length > 50 ? '你说的这个情况，' : '关于这个问题，'}其实没有标准答案——理财最忌讳的就是"一刀切"。但我可以帮你理一下思路：\n\n1. 先想想你的目标是什么——是保值、增值、还是博取高收益？\n2. 再看看你的承受力——你能接受亏多少？\n3. 最后才是选什么产品——产品是最后一步，不是第一步\n\n你可以把你的具体情况告诉我，我帮你一起分析。或者如果你对某个概念不太理解，直接问我，我用大白话给你解释。${DISCLAIMER}`,
    contextType: 'qa',
  }
}

export function getOnboardingResponse(step: number, profile: Partial<UserProfile>): AIResponse {
  switch (step) {
    case 0:
      return {
        content: `嗨！第一次见面，不用紧张。我也不是专家，就是比你多知道一点点～\n\n先问你三个超简单的问题，帮你找到最适合的入门方式：\n\n1. 你每个月大概能存多少钱？（不用精确，大概就行）`,
        contextType: 'onboarding',
      }
    case 1:
      return {
        content: `收到！每个月${profile.monthly_savings}元左右，记下了。\n\n第二个问题：这笔钱你打算多久之后用？几个月？几年？还是没想好？`,
        contextType: 'onboarding',
      }
    case 2:
      return {
        content: `明白了，${profile.investment_horizon}。这个很重要，时间越长，你能承受的波动就越大。\n\n最后一个问题：如果亏了10%，你会睡不着觉吗？（诚实回答就好！）`,
        contextType: 'onboarding',
      }
    case 3: {
      const riskType =
        profile.risk_tolerance === 'panic' || profile.risk_tolerance === 'anxious'
          ? 'conservative'
          : profile.risk_tolerance === 'okay'
            ? 'moderate'
            : 'aggressive'
      const typeText =
        riskType === 'conservative'
          ? '稳健型'
          : riskType === 'moderate'
            ? '均衡型'
            : '进取型'
      return {
        content: `收到！根据你的情况，我猜你适合从"${typeText}"开始——就是那种${riskType === 'conservative' ? '涨跌不太刺激、但长期来看能跑赢存款' : riskType === 'moderate' ? '兼顾稳健和收益、不会让你睡不着觉' : '波动大但长期收益可能更高'}的产品。\n\n今天先不急着买任何东西。我先给你发一个3分钟的小科普：《基金到底是什么？》看完你就知道自己在买什么了。\n明天我再告诉你，为什么"不把所有钱买同一只基金"很重要。\n\n慢慢来，我陪你。💚${DISCLAIMER}`,
        contextType: 'onboarding',
      }
    }
    default:
      return { content: '有什么想聊的吗？', contextType: 'daily' }
  }
}
