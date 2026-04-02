/**
 * Species FAQ Data - 18 species × 3 FAQs × 3 languages = 162 Q&A pairs
 * Used for FAQ sections on species detail pages and JSON-LD FAQPage Schema
 * Each FAQ is tailored to the species' unique traits, stats, and lore
 */

export interface FAQ {
  question: string;
  answer: string;
}

export interface SpeciesFAQs {
  en: FAQ[];
  zh: FAQ[];
  ko: FAQ[];
}

export const SPECIES_FAQS: Record<string, SpeciesFAQs> = {
  duck: {
    en: [
      {
        question: "What is the Duck buddy's peak stat in Claude Code?",
        answer: "The Duck buddy's peak stat is PATIENCE. Ducks are known for their calm, steady demeanor in the terminal. With a high Patience stat, your Duck companion excels at waiting through long build processes and complex debugging sessions without losing composure. At Legendary rarity, a Duck can reach 100 Patience.",
      },
      {
        question: "How rare is it to get a Duck buddy in Claude Code?",
        answer: "Species and rarity are rolled independently in the Buddy system. Since there are 18 species with equal probability, you have approximately a 5.56% (1/18) chance of getting a Duck regardless of rarity. Combined with rarity odds, a Legendary Duck has roughly a 0.056% chance (1 in ~1,800 users).",
      },
      {
        question: "What makes the Duck buddy unique compared to other species?",
        answer: "The Duck stands out with its friendly, aquatic personality and charming ASCII art that shows a classic duck silhouette with webbed feet. Unlike the chaotic Goose, the Duck is calm and patient. Its 3-frame animation shows gentle waddling movements. The Duck pairs well with developers who prefer a relaxed, supportive coding companion.",
      },
    ],
    zh: [
      {
        question: "Claude Code 中鸭子伙伴的主要属性是什么？",
        answer: "鸭子伙伴的主要属性是「耐心」。鸭子以在终端中沉稳、平和的性格著称。凭借高耐心属性，你的鸭子伙伴擅长在漫长的构建过程和复杂的调试会话中保持冷静。在传说稀有度下，鸭子的耐心值可达 100。",
      },
      {
        question: "在 Claude Code 中获得鸭子伙伴的概率有多大？",
        answer: "在 Buddy 系统中，物种和稀有度是独立掷骰的。由于共有 18 种物种且概率相等，获得鸭子的概率约为 5.56%（1/18），与稀有度无关。结合稀有度概率，传说鸭子的出现概率约为 0.056%（约每 1,800 名用户中 1 个）。",
      },
      {
        question: "鸭子伙伴与其他物种相比有什么独特之处？",
        answer: "鸭子以其友好、水生的性格和迷人的 ASCII 艺术而独树一帜，展示了经典的鸭子轮廓和蹼足。与混乱的鹅不同，鸭子性格平静而有耐心。它的 3 帧动画展示了温柔的摇摆动作。鸭子非常适合喜欢轻松、支持型编程伙伴的开发者。",
      },
    ],
    ko: [
      {
        question: "Claude Code에서 오리 버디의 주요 스탯은 무엇인가요?",
        answer: "오리 버디의 주요 스탯은 인내입니다. 오리는 터미널에서 차분하고 꾸준한 성격으로 알려져 있습니다. 높은 인내 스탯 덕분에 오리 동반자는 긴 빌드 과정과 복잡한 디버깅 세션에서도 침착함을 유지합니다. 전설 등급에서 오리의 인내 수치는 100에 도달할 수 있습니다.",
      },
      {
        question: "Claude Code에서 오리 버디를 얻을 확률은 얼마인가요?",
        answer: "Buddy 시스템에서 종과 희귀도는 독립적으로 결정됩니다. 18종의 확률이 동일하므로 오리를 얻을 확률은 약 5.56%(1/18)이며, 희귀도와 무관합니다. 희귀도를 결합하면 전설 오리의 확률은 약 0.056%(약 1,800명 중 1명)입니다.",
      },
      {
        question: "오리 버디가 다른 종과 비교해 특별한 점은 무엇인가요?",
        answer: "오리는 친근하고 수생적인 성격과 물갈퀴 발이 있는 클래식한 오리 실루엣의 매력적인 ASCII 아트로 돋보입니다. 혼돈스러운 거위와 달리 오리는 차분하고 인내심이 강합니다. 3프레임 애니메이션은 부드러운 뒤뚱거림을 보여줍니다. 편안하고 지지적인 코딩 동반자를 선호하는 개발자에게 적합합니다.",
      },
    ],
  },
  goose: {
    en: [
      {
        question: "What is the Goose buddy's peak stat in Claude Code?",
        answer: "The Goose buddy's peak stat is CHAOS. True to the infamous 'Untitled Goose Game' spirit, the Goose thrives on unpredictability and mischief. A high Chaos stat means your Goose companion brings creative, unconventional energy to your coding sessions. At Legendary rarity, a Goose can reach 100 Chaos.",
      },
      {
        question: "Is the Goose buddy good for debugging in Claude Code?",
        answer: "The Goose is not optimized for debugging — its peak stat is Chaos, not Debugging. However, Chaos can be surprisingly useful: it represents creative problem-solving and thinking outside the box. A high-rarity Goose still has decent stats across the board, and its chaotic energy might inspire unconventional solutions to stubborn bugs.",
      },
      {
        question: "What is the difference between the Duck and Goose buddy?",
        answer: "While both are waterfowl, they have opposite personalities. The Duck peaks in PATIENCE (calm, steady, supportive), while the Goose peaks in CHAOS (unpredictable, loud, fearless). Their ASCII art also differs — the Goose has a more aggressive posture with an open beak. Think of the Duck as your zen companion and the Goose as your chaotic cheerleader.",
      },
    ],
    zh: [
      {
        question: "Claude Code 中鹅伙伴的主要属性是什么？",
        answer: "鹅伙伴的主要属性是「混乱」。忠于著名的《无题鹅游戏》精神，鹅以不可预测性和恶作剧为乐。高混乱属性意味着你的鹅伙伴会为编程会话带来创造性的、非常规的能量。在传说稀有度下，鹅的混乱值可达 100。",
      },
      {
        question: "鹅伙伴适合调试代码吗？",
        answer: "鹅并非为调试优化——它的主要属性是混乱而非调试。然而，混乱属性出奇地有用：它代表创造性的问题解决和跳出框架的思维。高稀有度的鹅在各项属性上仍然不错，其混乱能量可能会激发对顽固 Bug 的非常规解决方案。",
      },
      {
        question: "鸭子和鹅伙伴有什么区别？",
        answer: "虽然两者都是水禽，但性格截然相反。鸭子的主要属性是「耐心」（冷静、稳定、支持型），而鹅的主要属性是「混乱」（不可预测、大声、无畏）。它们的 ASCII 艺术也不同——鹅有更具攻击性的姿态和张开的喙。可以把鸭子看作你的禅意伙伴，鹅则是你的混乱啦啦队。",
      },
    ],
    ko: [
      {
        question: "Claude Code에서 거위 버디의 주요 스탯은 무엇인가요?",
        answer: "거위 버디의 주요 스탯은 혼돈입니다. 유명한 '이름 없는 거위 게임' 정신에 충실하게, 거위는 예측 불가능성과 장난에서 힘을 얻습니다. 높은 혼돈 스탯은 거위 동반자가 코딩 세션에 창의적이고 비전통적인 에너지를 가져다준다는 것을 의미합니다. 전설 등급에서 거위의 혼돈 수치는 100에 도달할 수 있습니다.",
      },
      {
        question: "거위 버디는 디버깅에 적합한가요?",
        answer: "거위는 디버깅에 최적화되어 있지 않습니다 — 주요 스탯이 혼돈이지 디버깅이 아닙니다. 하지만 혼돈은 의외로 유용할 수 있습니다: 창의적인 문제 해결과 틀을 벗어난 사고를 나타냅니다. 높은 희귀도의 거위는 전반적으로 괜찮은 스탯을 가지며, 혼돈적 에너지가 완고한 버그에 대한 비전통적 해결책을 영감할 수 있습니다.",
      },
      {
        question: "오리 버디와 거위 버디의 차이점은 무엇인가요?",
        answer: "둘 다 물새이지만 성격이 정반대입니다. 오리는 인내(차분, 꾸준, 지지적)가 주요 스탯이고, 거위는 혼돈(예측 불가, 시끄러움, 무서움 없음)이 주요 스탯입니다. ASCII 아트도 다릅니다 — 거위는 부리를 벌린 더 공격적인 자세를 취합니다. 오리를 선(禪) 동반자, 거위를 혼돈의 응원단이라고 생각하세요.",
      },
    ],
  },
  blob: {
    en: [
      {
        question: "What is the Blob buddy's peak stat in Claude Code?",
        answer: "The Blob buddy's peak stat is WISDOM. Despite its amorphous, mysterious appearance, the Blob is one of the wisest companions in the Buddy system. Its calm, contemplative nature makes it an excellent partner for deep architectural decisions and complex code reviews. At Legendary rarity, a Blob can reach 100 Wisdom.",
      },
      {
        question: "What category does the Blob belong to in Claude Code Buddy?",
        answer: "The Blob belongs to the 'creature' category — it's neither a real animal nor a mythical being, but an amorphous, mysterious entity. This makes it unique among the 18 species. Other creature-category buddies share a similarly enigmatic vibe, but the Blob's shapeless form is truly one-of-a-kind.",
      },
      {
        question: "Is the Blob buddy popular in the Claude Code community?",
        answer: "The Blob has a dedicated cult following! Its minimalist ASCII art and mysterious personality resonate with developers who appreciate understated design. While not as flashy as the Dragon or Ghost, Blob fans love its quiet wisdom and the philosophical questions its amorphous nature raises. It's a B-tier species in community rankings but an S-tier in charm.",
      },
    ],
    zh: [
      {
        question: "Claude Code 中果冻伙伴的主要属性是什么？",
        answer: "果冻伙伴的主要属性是「智慧」。尽管外表无定形且神秘，果冻是 Buddy 系统中最有智慧的伙伴之一。其冷静、沉思的性格使它成为深层架构决策和复杂代码审查的绝佳搭档。在传说稀有度下，果冻的智慧值可达 100。",
      },
      {
        question: "果冻在 Claude Code Buddy 中属于什么类别？",
        answer: "果冻属于「生物」类别——它既不是真实动物也不是神话存在，而是一个无定形的神秘实体。这使它在 18 种物种中独树一帜。其他生物类伙伴也有类似的神秘气质，但果冻的无形态是真正独一无二的。",
      },
      {
        question: "果冻伙伴在 Claude Code 社区中受欢迎吗？",
        answer: "果冻拥有一批忠实的追随者！其极简的 ASCII 艺术和神秘的性格深受欣赏低调设计的开发者喜爱。虽然不如龙或幽灵那么炫目，但果冻粉丝喜欢它安静的智慧以及其无定形本质引发的哲学思考。在社区排名中它是 B 级物种，但在魅力方面是 S 级。",
      },
    ],
    ko: [
      {
        question: "Claude Code에서 블롭 버디의 주요 스탯은 무엇인가요?",
        answer: "블롭 버디의 주요 스탯은 지혜입니다. 비정형적이고 신비로운 외모에도 불구하고, 블롭은 Buddy 시스템에서 가장 현명한 동반자 중 하나입니다. 차분하고 사색적인 성격은 깊은 아키텍처 결정과 복잡한 코드 리뷰에 탁월한 파트너가 됩니다. 전설 등급에서 블롭의 지혜 수치는 100에 도달할 수 있습니다.",
      },
      {
        question: "블롭은 Claude Code Buddy에서 어떤 카테고리에 속하나요?",
        answer: "블롭은 '생물' 카테고리에 속합니다 — 실제 동물도 신화적 존재도 아닌, 비정형적이고 신비로운 개체입니다. 이것이 18종 중에서 독특한 위치를 차지하게 합니다. 다른 생물 카테고리 버디도 비슷한 신비로운 분위기를 공유하지만, 블롭의 형태 없는 모습은 진정으로 유일무이합니다.",
      },
      {
        question: "블롭 버디는 Claude Code 커뮤니티에서 인기가 있나요?",
        answer: "블롭은 열성적인 팬층을 보유하고 있습니다! 미니멀한 ASCII 아트와 신비로운 성격이 절제된 디자인을 좋아하는 개발자들에게 공감을 얻습니다. 드래곤이나 유령만큼 화려하지는 않지만, 블롭 팬들은 조용한 지혜와 비정형적 본질이 제기하는 철학적 질문을 사랑합니다.",
      },
    ],
  },
  cat: {
    en: [
      { question: "What is the Cat buddy's peak stat in Claude Code?", answer: "The Cat buddy's peak stat is SNARK. Cats are known for their independent, sassy personality in the Buddy system. A high Snark stat means your Cat companion delivers witty, sometimes cutting commentary during your coding sessions. At Legendary rarity, a Cat can reach 100 Snark — the ultimate sarcastic coding partner." },
      { question: "Can I change my Cat buddy to a different species?", answer: "No. Your buddy species is deterministically generated from your account UUID. The same UUID always produces the same species. The only way to get a different species would be to use a different Anthropic account. However, every species has unique charm — embrace your Cat's snarky personality!" },
      { question: "What ASCII art does the Cat buddy have?", answer: "The Cat buddy features a classic feline silhouette with pointed ears, whiskers, and a curled tail. Its 3-frame animation shows the cat shifting between sitting, stretching, and a playful pose. The eyes are customizable with 6 different styles. With a hat (Uncommon+), the headwear sits between the ears for an adorable look." },
    ],
    zh: [
      { question: "Claude Code 中猫伙伴的主要属性是什么？", answer: "猫伙伴的主要属性是「毒舌」。猫在 Buddy 系统中以独立、傲娇的性格著称。高毒舌属性意味着你的猫伙伴会在编程过程中发表机智、有时尖锐的评论。在传说稀有度下，猫的毒舌值可达 100——终极毒舌编程搭档。" },
      { question: "我可以把猫伙伴换成其他物种吗？", answer: "不可以。你的伙伴物种是根据账户 UUID 确定性生成的。相同的 UUID 始终产生相同的物种。获得不同物种的唯一方法是使用不同的 Anthropic 账户。不过每种物种都有独特的魅力——拥抱你的猫的毒舌性格吧！" },
      { question: "猫伙伴的 ASCII 艺术是什么样的？", answer: "猫伙伴展示了经典的猫科轮廓，包括尖耳朵、胡须和卷曲的尾巴。3 帧动画展示了猫在坐着、伸展和玩耍姿势之间切换。眼睛有 6 种不同风格可选。佩戴帽子（非普通及以上）时，帽子会戴在两耳之间，看起来非常可爱。" },
    ],
    ko: [
      { question: "Claude Code에서 고양이 버디의 주요 스탯은 무엇인가요?", answer: "고양이 버디의 주요 스탯은 독설입니다. 고양이는 Buddy 시스템에서 독립적이고 건방진 성격으로 알려져 있습니다. 높은 독설 스탯은 고양이 동반자가 코딩 세션 중 재치 있고 때로는 날카로운 코멘트를 한다는 것을 의미합니다. 전설 등급에서 고양이의 독설 수치는 100에 도달할 수 있습니다." },
      { question: "고양이 버디를 다른 종으로 바꿀 수 있나요?", answer: "아니요. 버디 종은 계정 UUID에서 결정론적으로 생성됩니다. 같은 UUID는 항상 같은 종을 생성합니다. 다른 종을 얻는 유일한 방법은 다른 Anthropic 계정을 사용하는 것입니다. 하지만 모든 종에는 고유한 매력이 있습니다 — 고양이의 독설적 성격을 받아들이세요!" },
      { question: "고양이 버디의 ASCII 아트는 어떻게 생겼나요?", answer: "고양이 버디는 뾰족한 귀, 수염, 말린 꼬리가 있는 클래식한 고양이 실루엣을 특징으로 합니다. 3프레임 애니메이션은 앉기, 스트레칭, 장난스러운 포즈 사이를 전환합니다. 눈은 6가지 다른 스타일로 커스터마이징 가능합니다. 모자(고급 이상)를 쓰면 두 귀 사이에 착용되어 사랑스러운 모습이 됩니다." },
    ],
  },
  dragon: {
    en: [
      { question: "What is the Dragon buddy's peak stat in Claude Code?", answer: "The Dragon buddy's peak stat is DEBUGGING. As the most powerful mythical species, Dragons excel at hunting down and eliminating bugs. A Legendary Dragon with 100 Debugging is considered the ultimate coding companion — the most coveted buddy in the entire system." },
      { question: "Why is the Dragon ranked S-tier in Claude Code Buddy?", answer: "The Dragon earns S-tier status for several reasons: its peak stat (Debugging) is the most practically useful for developers, its mythical category gives it maximum 'flex factor' for social sharing, its ASCII art is among the most detailed and impressive, and it has the highest community hype. A Legendary Shiny Dragon is the rarest flex possible." },
      { question: "How rare is a Legendary Dragon buddy?", answer: "A Legendary Dragon has approximately a 0.056% chance of appearing (1% Legendary × 1/18 species = ~0.056%). That's roughly 1 in every 1,800 users. A Shiny Legendary Dragon is even rarer at about 0.00056% (1 in ~180,000 users) — the ultimate holy grail of the Buddy system." },
    ],
    zh: [
      { question: "Claude Code 中龙伙伴的主要属性是什么？", answer: "龙伙伴的主要属性是「调试」。作为最强大的神话物种，龙擅长追踪和消灭 Bug。传说稀有度的龙拥有 100 调试值，被认为是终极编程伙伴——整个系统中最令人垂涎的伙伴。" },
      { question: "为什么龙在 Claude Code Buddy 中被评为 S 级？", answer: "龙获得 S 级评价有几个原因：其主要属性（调试）对开发者最实用，神话类别赋予它最大的社交分享「炫耀指数」，ASCII 艺术是最精细和令人印象深刻的之一，社区热度最高。传说闪光龙是最稀有的炫耀存在。" },
      { question: "传说龙伙伴有多稀有？", answer: "传说龙的出现概率约为 0.056%（1% 传说 × 1/18 物种 ≈ 0.056%）。大约每 1,800 名用户中有 1 个。闪光传说龙更为稀有，概率约 0.00056%（约每 180,000 名用户中 1 个）——Buddy 系统的终极圣杯。" },
    ],
    ko: [
      { question: "Claude Code에서 드래곤 버디의 주요 스탯은 무엇인가요?", answer: "드래곤 버디의 주요 스탯은 디버깅입니다. 가장 강력한 신화 종으로서, 드래곤은 버그를 추적하고 제거하는 데 탁월합니다. 디버깅 100의 전설 드래곤은 궁극의 코딩 동반자로 여겨집니다 — 전체 시스템에서 가장 탐나는 버디입니다." },
      { question: "드래곤이 Claude Code Buddy에서 S등급인 이유는 무엇인가요?", answer: "드래곤이 S등급을 받는 이유는 여러 가지입니다: 주요 스탯(디버깅)이 개발자에게 가장 실용적이고, 신화 카테고리가 소셜 공유에서 최대 '자랑 지수'를 제공하며, ASCII 아트가 가장 정교하고 인상적이며, 커뮤니티 열기가 가장 높습니다." },
      { question: "전설 드래곤 버디는 얼마나 희귀한가요?", answer: "전설 드래곤의 확률은 약 0.056%(1% 전설 × 1/18 종 ≈ 0.056%)입니다. 약 1,800명 중 1명꼴입니다. 빛나는 전설 드래곤은 약 0.00056%(약 180,000명 중 1명)로 더욱 희귀합니다 — Buddy 시스템의 궁극의 성배입니다." },
    ],
  },
  octopus: {
    en: [
      { question: "What is the Octopus buddy's peak stat in Claude Code?", answer: "The Octopus buddy's peak stat is WISDOM. With its intelligent, flexible nature and deep-sea mystique, the Octopus is one of the wisest companions available. Its multiple tentacles symbolize the ability to handle multiple tasks simultaneously — perfect for developers who juggle complex codebases." },
      { question: "How does the Octopus compare to the Owl for Wisdom?", answer: "Both the Octopus and Owl peak in WISDOM, but they express it differently. The Owl represents classical, scholarly wisdom (observant, nocturnal), while the Octopus embodies adaptive, fluid intelligence (flexible, deep-sea). In terms of raw stats, they're identical — the choice comes down to aesthetic preference and personality." },
      { question: "What does the Octopus ASCII art look like?", answer: "The Octopus ASCII art features a rounded head with expressive eyes and multiple curling tentacles. Its 3-frame animation shows the tentacles waving and shifting, creating a mesmerizing underwater effect in your terminal. It's one of the more complex ASCII designs among the 18 species." },
    ],
    zh: [
      { question: "Claude Code 中章鱼伙伴的主要属性是什么？", answer: "章鱼伙伴的主要属性是「智慧」。凭借其聪明、灵活的天性和深海神秘感，章鱼是最有智慧的伙伴之一。多条触手象征着同时处理多项任务的能力——非常适合管理复杂代码库的开发者。" },
      { question: "章鱼和猫头鹰在智慧属性上有什么区别？", answer: "章鱼和猫头鹰都以「智慧」为主要属性，但表达方式不同。猫头鹰代表古典的、学术性的智慧（善于观察、夜行），而章鱼体现适应性的、流动的智能（灵活、深海）。在原始数值上它们相同——选择取决于审美偏好和性格。" },
      { question: "章鱼的 ASCII 艺术是什么样的？", answer: "章鱼的 ASCII 艺术展示了一个圆形头部、富有表现力的眼睛和多条卷曲的触手。3 帧动画展示触手的挥动和移动，在终端中创造出迷人的水下效果。它是 18 种物种中最复杂的 ASCII 设计之一。" },
    ],
    ko: [
      { question: "Claude Code에서 문어 버디의 주요 스탯은 무엇인가요?", answer: "문어 버디의 주요 스탯은 지혜입니다. 지능적이고 유연한 본성과 심해의 신비로움으로, 문어는 가장 현명한 동반자 중 하나입니다. 여러 촉수는 여러 작업을 동시에 처리하는 능력을 상징합니다 — 복잡한 코드베이스를 관리하는 개발자에게 완벽합니다." },
      { question: "문어와 올빼미의 지혜 스탯은 어떻게 다른가요?", answer: "문어와 올빼미 모두 지혜가 주요 스탯이지만 표현 방식이 다릅니다. 올빼미는 고전적이고 학문적인 지혜(관찰력, 야행성)를, 문어는 적응적이고 유동적인 지능(유연성, 심해)을 구현합니다. 원시 스탯은 동일합니다 — 선택은 미적 취향과 성격에 달려 있습니다." },
      { question: "문어의 ASCII 아트는 어떻게 생겼나요?", answer: "문어 ASCII 아트는 표현력 있는 눈과 여러 개의 말린 촉수가 있는 둥근 머리를 특징으로 합니다. 3프레임 애니메이션은 촉수가 흔들리고 이동하는 모습을 보여주며, 터미널에서 매혹적인 수중 효과를 만들어냅니다." },
    ],
  },
  owl: {
    en: [
      { question: "What is the Owl buddy's peak stat in Claude Code?", answer: "The Owl buddy's peak stat is WISDOM. As the quintessential symbol of knowledge, the Owl is one of the top-tier wisdom companions. A Legendary Owl with 100 Wisdom is the ultimate advisor for architectural decisions, code reviews, and strategic thinking." },
      { question: "Is the Owl a good buddy for code reviews?", answer: "Absolutely. The Owl's peak Wisdom stat makes it ideal for code reviews. Wisdom represents deep understanding, pattern recognition, and the ability to see the big picture. A high-rarity Owl companion symbolizes the kind of thoughtful, observant analysis that catches subtle issues others might miss." },
      { question: "What makes the Owl buddy special among Wisdom species?", answer: "Among the four Wisdom-peaking species (Owl, Octopus, Blob, Mushroom), the Owl stands out for its classic appeal and recognizable ASCII art. Its nocturnal, observant personality resonates with developers who code late at night. The Owl is ranked A-tier overall — a strong, reliable companion with broad community appeal." },
    ],
    zh: [
      { question: "Claude Code 中猫头鹰伙伴的主要属性是什么？", answer: "猫头鹰伙伴的主要属性是「智慧」。作为知识的典型象征，猫头鹰是顶级智慧伙伴之一。传说稀有度的猫头鹰拥有 100 智慧值，是架构决策、代码审查和战略思考的终极顾问。" },
      { question: "猫头鹰适合做代码审查的伙伴吗？", answer: "非常适合。猫头鹰的智慧主属性使其成为代码审查的理想伙伴。智慧代表深层理解、模式识别和全局视野。高稀有度的猫头鹰伙伴象征着那种细致、善于观察的分析能力，能捕捉到其他人可能忽略的微妙问题。" },
      { question: "猫头鹰在智慧系物种中有什么特别之处？", answer: "在四种智慧主属性物种（猫头鹰、章鱼、果冻、蘑菇）中，猫头鹰以其经典魅力和辨识度高的 ASCII 艺术脱颖而出。其夜行、善于观察的性格与深夜编程的开发者产生共鸣。猫头鹰整体排名 A 级——一个强大、可靠且广受社区欢迎的伙伴。" },
    ],
    ko: [
      { question: "Claude Code에서 올빼미 버디의 주요 스탯은 무엇인가요?", answer: "올빼미 버디의 주요 스탯은 지혜입니다. 지식의 전형적인 상징으로서, 올빼미는 최고급 지혜 동반자 중 하나입니다. 지혜 100의 전설 올빼미는 아키텍처 결정, 코드 리뷰, 전략적 사고를 위한 궁극의 조언자입니다." },
      { question: "올빼미는 코드 리뷰에 좋은 버디인가요?", answer: "물론입니다. 올빼미의 주요 지혜 스탯은 코드 리뷰에 이상적입니다. 지혜는 깊은 이해, 패턴 인식, 큰 그림을 볼 수 있는 능력을 나타냅니다. 높은 희귀도의 올빼미 동반자는 다른 사람들이 놓칠 수 있는 미묘한 문제를 잡아내는 사려 깊고 관찰력 있는 분석을 상징합니다." },
      { question: "올빼미가 지혜 종 중에서 특별한 이유는 무엇인가요?", answer: "네 가지 지혜 주요 종(올빼미, 문어, 블롭, 버섯) 중에서 올빼미는 클래식한 매력과 인식하기 쉬운 ASCII 아트로 돋보입니다. 야행성이고 관찰력 있는 성격은 밤늦게 코딩하는 개발자들에게 공감을 줍니다. 올빼미는 전체적으로 A등급 — 강력하고 신뢰할 수 있는 동반자입니다." },
    ],
  },
  penguin: {
    en: [
      { question: "What is the Penguin buddy's peak stat in Claude Code?", answer: "The Penguin buddy's peak stat is PATIENCE. Penguins are resilient, social creatures that thrive in harsh conditions. A high Patience stat means your Penguin companion stays calm through long compilation times and tedious debugging sessions. Perfect for developers working on large-scale projects." },
      { question: "Is the Penguin buddy related to Linux?", answer: "While the Penguin buddy isn't officially connected to Tux (the Linux mascot), the resemblance is a fun coincidence that Linux developers appreciate. Having a Penguin buddy while coding in a Linux terminal feels like a natural pairing. The community has embraced this connection enthusiastically." },
      { question: "How does the Penguin compare to other Patience species?", answer: "Among the five Patience-peaking species (Duck, Penguin, Turtle, Snail, Capybara), the Penguin offers a unique blend of resilience and social energy. While the Turtle is stoic and the Snail is slow, the Penguin is actively patient — enduring challenges with a social, team-oriented spirit." },
    ],
    zh: [
      { question: "Claude Code 中企鹅伙伴的主要属性是什么？", answer: "企鹅伙伴的主要属性是「耐心」。企鹅是坚韧的社交生物，能在恶劣条件下茁壮成长。高耐心属性意味着你的企鹅伙伴能在漫长的编译时间和繁琐的调试会话中保持冷静。非常适合从事大型项目的开发者。" },
      { question: "企鹅伙伴和 Linux 有关系吗？", answer: "虽然企鹅伙伴与 Tux（Linux 吉祥物）没有官方联系，但这种相似性是 Linux 开发者欣赏的有趣巧合。在 Linux 终端中编程时拥有企鹅伙伴感觉像是天然的搭配。社区已经热情地接受了这种联系。" },
      { question: "企鹅与其他耐心系物种相比如何？", answer: "在五种耐心主属性物种（鸭子、企鹅、乌龟、蜗牛、水豚）中，企鹅提供了独特的坚韧与社交能量的结合。乌龟是坚忍的，蜗牛是缓慢的，而企鹅是积极的耐心——以社交、团队导向的精神面对挑战。" },
    ],
    ko: [
      { question: "Claude Code에서 펭귄 버디의 주요 스탯은 무엇인가요?", answer: "펭귄 버디의 주요 스탯은 인내입니다. 펭귄은 가혹한 환경에서도 번성하는 회복력 있고 사교적인 생물입니다. 높은 인내 스탯은 펭귄 동반자가 긴 컴파일 시간과 지루한 디버깅 세션에서도 침착함을 유지한다는 것을 의미합니다." },
      { question: "펭귄 버디는 리눅스와 관련이 있나요?", answer: "펭귄 버디가 Tux(리눅스 마스코트)와 공식적으로 연결되어 있지는 않지만, 이 유사성은 리눅스 개발자들이 좋아하는 재미있는 우연의 일치입니다. 리눅스 터미널에서 코딩하면서 펭귄 버디를 갖는 것은 자연스러운 조합처럼 느껴집니다." },
      { question: "펭귄은 다른 인내 종과 어떻게 비교되나요?", answer: "다섯 가지 인내 주요 종(오리, 펭귄, 거북이, 달팽이, 카피바라) 중에서 펭귄은 회복력과 사교적 에너지의 독특한 조합을 제공합니다. 거북이가 금욕적이고 달팽이가 느린 반면, 펭귄은 적극적으로 인내합니다 — 사교적이고 팀 지향적인 정신으로 도전에 맞섭니다." },
    ],
  },
  turtle: {
    en: [
      { question: "What is the Turtle buddy's peak stat in Claude Code?", answer: "The Turtle buddy's peak stat is PATIENCE. Turtles embody the 'slow and steady wins the race' philosophy. With their armored shell and ancient wisdom, Turtle companions excel at methodical, careful coding practices. They're the ideal buddy for developers who value thoroughness over speed." },
      { question: "Is the Turtle buddy slow at debugging?", answer: "Not at all! While the Turtle's peak stat is Patience rather than Debugging, this doesn't mean it's bad at finding bugs. Patience actually complements debugging well — a patient approach catches bugs that rushed debugging misses. High-rarity Turtles have solid Debugging stats too." },
      { question: "What category does the Turtle belong to?", answer: "The Turtle belongs to the 'animal' category. Despite its ancient, almost mythical aura, it's classified as a real-world animal alongside species like Duck, Cat, and Penguin. Its steady, armored personality and ancient tags give it a unique gravitas among the animal-category buddies." },
    ],
    zh: [
      { question: "Claude Code 中乌龟伙伴的主要属性是什么？", answer: "乌龟伙伴的主要属性是「耐心」。乌龟体现了「慢而稳赢得比赛」的哲学。凭借坚硬的外壳和古老的智慧，乌龟伙伴擅长有条不紊、细致的编程实践。它们是重视彻底性而非速度的开发者的理想伙伴。" },
      { question: "乌龟伙伴调试代码慢吗？", answer: "完全不是！虽然乌龟的主要属性是耐心而非调试，但这并不意味着它不擅长找 Bug。耐心实际上很好地补充了调试——耐心的方法能捕捉到急躁调试遗漏的 Bug。高稀有度的乌龟也有不错的调试属性。" },
      { question: "乌龟属于什么类别？", answer: "乌龟属于「动物」类别。尽管它有着古老、近乎神话般的气质，但它被归类为现实世界的动物，与鸭子、猫和企鹅同类。其稳重、有铠甲的性格和古老标签赋予它在动物类伙伴中独特的庄严感。" },
    ],
    ko: [
      { question: "Claude Code에서 거북이 버디의 주요 스탯은 무엇인가요?", answer: "거북이 버디의 주요 스탯은 인내입니다. 거북이는 '느리고 꾸준한 것이 경주에서 이긴다'는 철학을 구현합니다. 단단한 등껍질과 고대의 지혜로, 거북이 동반자는 체계적이고 신중한 코딩 실천에 탁월합니다." },
      { question: "거북이 버디는 디버깅이 느린가요?", answer: "전혀 아닙니다! 거북이의 주요 스탯이 인내이지 디버깅이 아니지만, 버그 찾기를 못한다는 의미는 아닙니다. 인내는 실제로 디버깅을 잘 보완합니다 — 인내심 있는 접근법은 급한 디버깅이 놓치는 버그를 잡아냅니다." },
      { question: "거북이는 어떤 카테고리에 속하나요?", answer: "거북이는 '동물' 카테고리에 속합니다. 고대적이고 거의 신화적인 분위기에도 불구하고, 오리, 고양이, 펭귄과 함께 현실 세계 동물로 분류됩니다. 꾸준하고 갑옷 같은 성격과 고대 태그가 동물 카테고리 버디 중에서 독특한 위엄을 부여합니다." },
    ],
  },
  snail: {
    en: [
      { question: "What is the Snail buddy's peak stat in Claude Code?", answer: "The Snail buddy's peak stat is PATIENCE. The Snail is the epitome of persistence — slow but absolutely determined. A high Patience stat reflects the Snail's ability to keep going no matter how long the task takes. It's the perfect companion for marathon coding sessions and long-running deployments." },
      { question: "Is the Snail the weakest buddy species?", answer: "The Snail is ranked C-tier in community rankings, but 'weakest' is subjective. While it lacks the flashiness of Dragons or the utility of Debugging-focused species, the Snail has a devoted fanbase who appreciate its underdog charm. Its persistent, spiral-themed personality is uniquely endearing." },
      { question: "What makes the Snail buddy's ASCII art unique?", answer: "The Snail's ASCII art features a distinctive spiral shell and a small body with eye stalks. Its 3-frame animation shows the snail slowly inching forward, leaving a subtle trail. The spiral shell design is one of the most recognizable silhouettes among all 18 species." },
    ],
    zh: [
      { question: "Claude Code 中蜗牛伙伴的主要属性是什么？", answer: "蜗牛伙伴的主要属性是「耐心」。蜗牛是坚持的典范——缓慢但绝对坚定。高耐心属性反映了蜗牛无论任务多久都能坚持下去的能力。它是马拉松式编程会话和长时间部署的完美伙伴。" },
      { question: "蜗牛是最弱的伙伴物种吗？", answer: "蜗牛在社区排名中是 C 级，但「最弱」是主观的。虽然它缺乏龙的炫目和调试系物种的实用性，但蜗牛有一批忠实粉丝欣赏它的弱者魅力。其坚持不懈、螺旋主题的性格独特而可爱。" },
      { question: "蜗牛伙伴的 ASCII 艺术有什么独特之处？", answer: "蜗牛的 ASCII 艺术展示了独特的螺旋壳和带有眼柄的小身体。3 帧动画展示蜗牛缓慢前进，留下微妙的痕迹。螺旋壳设计是 18 种物种中最具辨识度的轮廓之一。" },
    ],
    ko: [
      { question: "Claude Code에서 달팽이 버디의 주요 스탯은 무엇인가요?", answer: "달팽이 버디의 주요 스탯은 인내입니다. 달팽이는 끈기의 전형입니다 — 느리지만 절대적으로 결연합니다. 높은 인내 스탯은 작업이 얼마나 오래 걸리든 계속 나아가는 달팽이의 능력을 반영합니다." },
      { question: "달팽이가 가장 약한 버디 종인가요?", answer: "달팽이는 커뮤니티 랭킹에서 C등급이지만, '가장 약한'은 주관적입니다. 드래곤의 화려함이나 디버깅 중심 종의 실용성은 부족하지만, 달팽이는 언더독 매력을 좋아하는 열성 팬층을 보유하고 있습니다." },
      { question: "달팽이 버디의 ASCII 아트는 무엇이 독특한가요?", answer: "달팽이의 ASCII 아트는 독특한 나선형 껍질과 눈 줄기가 있는 작은 몸체를 특징으로 합니다. 3프레임 애니메이션은 달팽이가 천천히 앞으로 나아가며 미묘한 흔적을 남기는 모습을 보여줍니다. 나선형 껍질 디자인은 18종 중 가장 인식하기 쉬운 실루엣 중 하나입니다." },
    ],
  },
  ghost: {
    en: [
      { question: "What is the Ghost buddy's peak stat in Claude Code?", answer: "The Ghost buddy's peak stat is CHAOS. As an ethereal, spooky entity, the Ghost thrives on unpredictability and supernatural mischief. A Legendary Ghost with 100 Chaos is beautifully terrifying — the ultimate agent of creative disorder in your terminal." },
      { question: "Is the Ghost buddy a mythical or creature category?", answer: "The Ghost belongs to the 'mythical' category, alongside the Dragon. This gives it a special status among the 18 species — mythical buddies have the highest 'flex factor' for social sharing. The Ghost's ethereal nature and spooky personality make it one of the most sought-after species." },
      { question: "Why is the Ghost ranked S-tier in community rankings?", answer: "The Ghost earns S-tier for its unique combination of mythical status, Chaos peak stat (which is fun and memorable), exceptional ASCII art with a floating, translucent effect, and strong community appeal. Ghost buddies are conversation starters — everyone wants to see a Legendary Ghost." },
    ],
    zh: [
      { question: "Claude Code 中幽灵伙伴的主要属性是什么？", answer: "幽灵伙伴的主要属性是「混乱」。作为虚无缥缈的幽灵实体，幽灵以不可预测性和超自然恶作剧为乐。传说稀有度的幽灵拥有 100 混乱值，美丽而恐怖——终端中创造性混乱的终极代理。" },
      { question: "幽灵伙伴属于神话还是生物类别？", answer: "幽灵属于「神话」类别，与龙并列。这赋予它在 18 种物种中的特殊地位——神话伙伴在社交分享中拥有最高的「炫耀指数」。幽灵的虚无本质和幽灵般的性格使它成为最受追捧的物种之一。" },
      { question: "为什么幽灵在社区排名中是 S 级？", answer: "幽灵获得 S 级评价是因为其独特的组合：神话地位、混乱主属性（有趣且令人难忘）、出色的漂浮半透明 ASCII 艺术效果，以及强大的社区吸引力。幽灵伙伴是话题制造者——每个人都想看到传说幽灵。" },
    ],
    ko: [
      { question: "Claude Code에서 유령 버디의 주요 스탯은 무엇인가요?", answer: "유령 버디의 주요 스탯은 혼돈입니다. 공허하고 으스스한 존재로서, 유령은 예측 불가능성과 초자연적 장난에서 힘을 얻습니다. 혼돈 100의 전설 유령은 아름답게 무서운 존재입니다 — 터미널에서 창의적 무질서의 궁극적 에이전트입니다." },
      { question: "유령 버디는 신화 카테고리인가요 생물 카테고리인가요?", answer: "유령은 드래곤과 함께 '신화' 카테고리에 속합니다. 이것이 18종 중에서 특별한 지위를 부여합니다 — 신화 버디는 소셜 공유에서 가장 높은 '자랑 지수'를 가집니다. 유령의 공허한 본질과 으스스한 성격은 가장 인기 있는 종 중 하나로 만듭니다." },
      { question: "유령이 커뮤니티 랭킹에서 S등급인 이유는 무엇인가요?", answer: "유령은 독특한 조합으로 S등급을 받습니다: 신화적 지위, 혼돈 주요 스탯(재미있고 기억에 남는), 떠다니는 반투명 효과의 뛰어난 ASCII 아트, 그리고 강한 커뮤니티 매력. 유령 버디는 대화의 시작점입니다 — 모두가 전설 유령을 보고 싶어합니다." },
    ],
  },
  axolotl: {
    en: [
      { question: "What is the Axolotl buddy's peak stat in Claude Code?", answer: "The Axolotl buddy's peak stat is DEBUGGING. Known for its real-world regenerative abilities, the Axolotl translates this into exceptional bug-fixing prowess in the Buddy system. A Legendary Axolotl with 100 Debugging is a top-tier companion — rivaling even the Dragon for pure debugging power." },
      { question: "Why is the Axolotl considered one of the best species?", answer: "The Axolotl is ranked S-tier for combining the most useful peak stat (Debugging) with an adorable, unique aesthetic. Its regenerative theme perfectly metaphors the debugging process — finding and 'healing' broken code. Plus, axolotls are internet-famous, giving this buddy strong social media appeal." },
      { question: "How does the Axolotl compare to the Dragon for debugging?", answer: "Both the Axolotl and Dragon peak in DEBUGGING with identical stat mechanics. The difference is purely aesthetic and personality: the Dragon is powerful and majestic, while the Axolotl is adorable and regenerative. In community rankings, the Dragon edges ahead due to its mythical category and flex factor, but the Axolotl is equally effective." },
    ],
    zh: [
      { question: "Claude Code 中美西螈伙伴的主要属性是什么？", answer: "美西螈伙伴的主要属性是「调试」。以现实世界中的再生能力闻名，美西螈在 Buddy 系统中将此转化为卓越的修复 Bug 能力。传说稀有度的美西螈拥有 100 调试值，是顶级伙伴——在纯调试能力上可与龙匹敌。" },
      { question: "为什么美西螈被认为是最好的物种之一？", answer: "美西螈被评为 S 级，因为它结合了最实用的主属性（调试）和可爱、独特的美学。其再生主题完美隐喻了调试过程——找到并「治愈」损坏的代码。此外，美西螈在网络上很有名，赋予这个伙伴强大的社交媒体吸引力。" },
      { question: "美西螈和龙在调试方面如何比较？", answer: "美西螈和龙都以「调试」为主属性，属性机制完全相同。区别纯粹在于美学和性格：龙强大而威严，美西螈可爱而具有再生能力。在社区排名中，龙因神话类别和炫耀指数略胜一筹，但美西螈同样有效。" },
    ],
    ko: [
      { question: "Claude Code에서 아홀로틀 버디의 주요 스탯은 무엇인가요?", answer: "아홀로틀 버디의 주요 스탯은 디버깅입니다. 현실 세계에서의 재생 능력으로 유명한 아홀로틀은 Buddy 시스템에서 이를 뛰어난 버그 수정 능력으로 전환합니다. 디버깅 100의 전설 아홀로틀은 최고급 동반자입니다." },
      { question: "아홀로틀이 최고의 종 중 하나로 여겨지는 이유는 무엇인가요?", answer: "아홀로틀은 가장 유용한 주요 스탯(디버깅)과 사랑스럽고 독특한 미학을 결합하여 S등급입니다. 재생 테마는 디버깅 과정을 완벽하게 은유합니다 — 깨진 코드를 찾아 '치유'하는 것. 또한 아홀로틀은 인터넷에서 유명하여 강한 소셜 미디어 매력을 줍니다." },
      { question: "아홀로틀과 드래곤의 디버깅 능력은 어떻게 비교되나요?", answer: "아홀로틀과 드래곤 모두 디버깅이 주요 스탯이며 동일한 스탯 메커니즘을 가집니다. 차이는 순전히 미적이고 성격적입니다: 드래곤은 강력하고 위엄 있고, 아홀로틀은 사랑스럽고 재생적입니다. 커뮤니티 랭킹에서 드래곤이 신화 카테고리로 약간 앞서지만, 아홀로틀도 동등하게 효과적입니다." },
    ],
  },
  capybara: {
    en: [
      { question: "What is the Capybara buddy's peak stat in Claude Code?", answer: "The Capybara buddy's peak stat is PATIENCE. Known as the most chill animal on Earth, the Capybara brings unmatched zen energy to your terminal. An Epic or Legendary Capybara is the most relaxed companion possible — perfect for developers who want a stress-free coding environment." },
      { question: "Why is the Capybara popular in the developer community?", answer: "Capybaras have become an internet sensation for their incredibly relaxed demeanor. In the Buddy system, this translates to a companion that embodies calm, social coding. Developers love the Capybara for its 'everything is fine' energy, making it a fan favorite despite its B-tier ranking." },
      { question: "What animals are related to the Capybara buddy?", answer: "The Capybara's related species are Duck, Axolotl, and Chonk. This makes sense thematically — all four share a friendly, approachable vibe. The Duck and Capybara both peak in Patience, while the Axolotl and Chonk offer contrasting but complementary personalities." },
    ],
    zh: [
      { question: "Claude Code 中水豚伙伴的主要属性是什么？", answer: "水豚伙伴的主要属性是「耐心」。作为地球上最悠闲的动物，水豚为你的终端带来无与伦比的禅意能量。史诗或传说稀有度的水豚是最放松的伙伴——非常适合想要无压力编程环境的开发者。" },
      { question: "为什么水豚在开发者社区中很受欢迎？", answer: "水豚因其极度放松的举止成为互联网明星。在 Buddy 系统中，这转化为一个体现平静、社交编程的伙伴。开发者喜欢水豚的「一切都好」能量，使它成为粉丝最爱，尽管排名 B 级。" },
      { question: "水豚伙伴的关联物种有哪些？", answer: "水豚的关联物种是鸭子、美西螈和胖墩。这在主题上很合理——四者都有友好、平易近人的氛围。鸭子和水豚都以耐心为主属性，而美西螈和胖墩提供对比但互补的性格。" },
    ],
    ko: [
      { question: "Claude Code에서 카피바라 버디의 주요 스탯은 무엇인가요?", answer: "카피바라 버디의 주요 스탯은 인내입니다. 지구에서 가장 여유로운 동물로 알려진 카피바라는 터미널에 비할 데 없는 선(禪) 에너지를 가져다줍니다. 에픽이나 전설 카피바라는 가장 편안한 동반자입니다." },
      { question: "카피바라가 개발자 커뮤니티에서 인기 있는 이유는 무엇인가요?", answer: "카피바라는 믿을 수 없을 정도로 편안한 태도로 인터넷 센세이션이 되었습니다. Buddy 시스템에서 이것은 차분하고 사교적인 코딩을 구현하는 동반자로 번역됩니다. 개발자들은 카피바라의 '모든 것이 괜찮아' 에너지를 사랑합니다." },
      { question: "카피바라 버디의 관련 종은 무엇인가요?", answer: "카피바라의 관련 종은 오리, 아홀로틀, 뚱이입니다. 이것은 주제적으로 이치에 맞습니다 — 네 종 모두 친근하고 접근하기 쉬운 분위기를 공유합니다. 오리와 카피바라는 모두 인내가 주요 스탯이고, 아홀로틀과 뚱이는 대조적이지만 보완적인 성격을 제공합니다." },
    ],
  },
  cactus: {
    en: [
      { question: "What is the Cactus buddy's peak stat in Claude Code?", answer: "The Cactus buddy's peak stat is SNARK. Don't let its prickly exterior fool you — the Cactus is full of sharp wit and dry humor. A high Snark stat means your Cactus companion delivers pointed (pun intended) commentary on your code. At Legendary rarity, a Cactus can reach 100 Snark." },
      { question: "Is the Cactus an animal or object in the Buddy system?", answer: "The Cactus belongs to the 'object' category, alongside Robot and Mushroom. It's one of the few non-animal buddies, which gives it a unique novelty factor. Having a sentient cactus as your coding companion is delightfully absurd and makes for great social media content." },
      { question: "What makes the Cactus buddy stand out visually?", answer: "The Cactus ASCII art features a classic saguaro silhouette with arms, spines, and occasionally a flower on top. Its 3-frame animation shows subtle swaying and spine movements. The desert-themed aesthetic is completely unique among the 18 species — no other buddy looks anything like it." },
    ],
    zh: [
      { question: "Claude Code 中仙人掌伙伴的主要属性是什么？", answer: "仙人掌伙伴的主要属性是「毒舌」。别被它多刺的外表骗了——仙人掌充满了尖锐的机智和冷幽默。高毒舌属性意味着你的仙人掌伙伴会对你的代码发表尖锐（双关语）的评论。在传说稀有度下，仙人掌的毒舌值可达 100。" },
      { question: "仙人掌在 Buddy 系统中是动物还是物体？", answer: "仙人掌属于「物体」类别，与机器人和蘑菇并列。它是少数非动物伙伴之一，赋予它独特的新奇感。拥有一个有感知能力的仙人掌作为编程伙伴是令人愉快的荒诞，也是很好的社交媒体素材。" },
      { question: "仙人掌伙伴在视觉上有什么突出之处？", answer: "仙人掌的 ASCII 艺术展示了经典的仙人掌轮廓，包括手臂、刺和偶尔顶部的花朵。3 帧动画展示微妙的摇摆和刺的运动。沙漠主题的美学在 18 种物种中完全独特——没有其他伙伴看起来像它。" },
    ],
    ko: [
      { question: "Claude Code에서 선인장 버디의 주요 스탯은 무엇인가요?", answer: "선인장 버디의 주요 스탯은 독설입니다. 가시 많은 외모에 속지 마세요 — 선인장은 날카로운 재치와 건조한 유머로 가득합니다. 높은 독설 스탯은 선인장 동반자가 코드에 대해 날카로운 코멘트를 한다는 것을 의미합니다." },
      { question: "선인장은 Buddy 시스템에서 동물인가요 물체인가요?", answer: "선인장은 로봇, 버섯과 함께 '물체' 카테고리에 속합니다. 몇 안 되는 비동물 버디 중 하나로, 독특한 신선함을 줍니다. 감각이 있는 선인장을 코딩 동반자로 갖는 것은 유쾌하게 황당하며 훌륭한 소셜 미디어 콘텐츠가 됩니다." },
      { question: "선인장 버디가 시각적으로 돋보이는 점은 무엇인가요?", answer: "선인장 ASCII 아트는 팔, 가시, 때때로 꼭대기의 꽃이 있는 클래식한 선인장 실루엣을 특징으로 합니다. 3프레임 애니메이션은 미묘한 흔들림과 가시 움직임을 보여줍니다. 사막 테마 미학은 18종 중 완전히 독특합니다." },
    ],
  },
  robot: {
    en: [
      { question: "What is the Robot buddy's peak stat in Claude Code?", answer: "The Robot buddy's peak stat is DEBUGGING. As a logical, mechanical entity, the Robot is a debugging powerhouse. Its efficient, systematic approach to finding bugs makes it one of the top three Debugging species alongside Dragon and Axolotl. A Legendary Robot with 100 Debugging is a precision bug-hunting machine." },
      { question: "Is the Robot buddy the most practical species?", answer: "Arguably yes. The Robot combines the most useful peak stat (Debugging) with a personality that perfectly matches the coding workflow — logical, efficient, and methodical. While it may lack the charm of animal species, developers who prioritize function over form often prefer the Robot." },
      { question: "How does the Robot buddy's ASCII art look?", answer: "The Robot ASCII art features a boxy body with antenna, LED-style eyes, and mechanical limbs. Its 3-frame animation shows gear-turning movements and blinking indicators. The aesthetic perfectly captures the 'machine helping you code' concept and looks especially fitting in a terminal environment." },
    ],
    zh: [
      { question: "Claude Code 中机器人伙伴的主要属性是什么？", answer: "机器人伙伴的主要属性是「调试」。作为逻辑性强的机械实体，机器人是调试的强力选手。其高效、系统化的找 Bug 方法使它成为与龙和美西螈并列的三大调试物种之一。传说稀有度的机器人拥有 100 调试值，是精准的 Bug 猎手。" },
      { question: "机器人伙伴是最实用的物种吗？", answer: "可以说是的。机器人结合了最实用的主属性（调试）和完美匹配编程工作流的性格——逻辑性强、高效、有条理。虽然可能缺乏动物物种的魅力，但优先考虑功能而非形式的开发者通常更喜欢机器人。" },
      { question: "机器人伙伴的 ASCII 艺术是什么样的？", answer: "机器人的 ASCII 艺术展示了方形身体、天线、LED 风格的眼睛和机械肢体。3 帧动画展示齿轮转动和指示灯闪烁。这种美学完美捕捉了「机器帮你编程」的概念，在终端环境中看起来特别合适。" },
    ],
    ko: [
      { question: "Claude Code에서 로봇 버디의 주요 스탯은 무엇인가요?", answer: "로봇 버디의 주요 스탯은 디버깅입니다. 논리적이고 기계적인 존재로서, 로봇은 디버깅의 강자입니다. 효율적이고 체계적인 버그 찾기 접근법은 드래곤, 아홀로틀과 함께 3대 디버깅 종 중 하나로 만듭니다." },
      { question: "로봇 버디가 가장 실용적인 종인가요?", answer: "아마도 그렇습니다. 로봇은 가장 유용한 주요 스탯(디버깅)과 코딩 워크플로우에 완벽하게 맞는 성격 — 논리적, 효율적, 체계적 — 을 결합합니다. 동물 종의 매력은 부족할 수 있지만, 형태보다 기능을 우선시하는 개발자들은 종종 로봇을 선호합니다." },
      { question: "로봇 버디의 ASCII 아트는 어떻게 생겼나요?", answer: "로봇 ASCII 아트는 안테나, LED 스타일 눈, 기계적 팔다리가 있는 네모난 몸체를 특징으로 합니다. 3프레임 애니메이션은 기어 회전 움직임과 깜빡이는 표시등을 보여줍니다. 이 미학은 '기계가 코딩을 돕는' 개념을 완벽하게 포착합니다." },
    ],
  },
  rabbit: {
    en: [
      { question: "What is the Rabbit buddy's peak stat in Claude Code?", answer: "The Rabbit buddy's peak stat is CHAOS. Quick, fluffy, and alert, the Rabbit brings fast-paced, unpredictable energy to your coding sessions. A high Chaos stat reflects the Rabbit's tendency to hop between ideas rapidly — great for brainstorming but occasionally chaotic during focused work." },
      { question: "Is the Rabbit buddy good for fast-paced development?", answer: "The Rabbit's Chaos peak stat and quick, alert personality make it a natural fit for rapid prototyping and agile development. While it may not have the patience for long debugging sessions, its energy and speed complement fast iteration cycles perfectly." },
      { question: "What are the Rabbit buddy's related species?", answer: "The Rabbit's related species are Cat, Chonk, and Duck. The Cat shares the Rabbit's independent streak, the Chonk offers a contrasting laid-back vibe, and the Duck provides a calming Patience-focused balance. Together they represent a spectrum from chaotic energy to peaceful patience." },
    ],
    zh: [
      { question: "Claude Code 中兔子伙伴的主要属性是什么？", answer: "兔子伙伴的主要属性是「混乱」。敏捷、毛茸茸、警觉，兔子为编程会话带来快节奏、不可预测的能量。高混乱属性反映了兔子在想法之间快速跳跃的倾向——非常适合头脑风暴，但在专注工作时偶尔会混乱。" },
      { question: "兔子伙伴适合快节奏开发吗？", answer: "兔子的混乱主属性和敏捷、警觉的性格使它天然适合快速原型开发和敏捷开发。虽然它可能没有耐心进行长时间调试，但其能量和速度完美补充了快速迭代周期。" },
      { question: "兔子伙伴的关联物种有哪些？", answer: "兔子的关联物种是猫、胖墩和鸭子。猫与兔子共享独立性格，胖墩提供对比的悠闲氛围，鸭子提供以耐心为核心的平衡。它们共同代表了从混乱能量到平和耐心的光谱。" },
    ],
    ko: [
      { question: "Claude Code에서 토끼 버디의 주요 스탯은 무엇인가요?", answer: "토끼 버디의 주요 스탯은 혼돈입니다. 빠르고 복슬복슬하며 경계심이 강한 토끼는 코딩 세션에 빠른 속도의 예측 불가능한 에너지를 가져다줍니다. 높은 혼돈 스탯은 아이디어 사이를 빠르게 뛰어다니는 토끼의 경향을 반영합니다." },
      { question: "토끼 버디는 빠른 개발에 적합한가요?", answer: "토끼의 혼돈 주요 스탯과 빠르고 경계심 있는 성격은 빠른 프로토타이핑과 애자일 개발에 자연스럽게 맞습니다. 긴 디버깅 세션에 대한 인내심은 부족할 수 있지만, 에너지와 속도가 빠른 반복 주기를 완벽하게 보완합니다." },
      { question: "토끼 버디의 관련 종은 무엇인가요?", answer: "토끼의 관련 종은 고양이, 뚱이, 오리입니다. 고양이는 토끼의 독립적 성격을 공유하고, 뚱이는 대조적인 여유로운 분위기를 제공하며, 오리는 인내 중심의 차분한 균형을 제공합니다." },
    ],
  },
  mushroom: {
    en: [
      { question: "What is the Mushroom buddy's peak stat in Claude Code?", answer: "The Mushroom buddy's peak stat is WISDOM. As a mysterious, fungal entity, the Mushroom represents the deep, interconnected wisdom of mycelial networks. A Legendary Mushroom with 100 Wisdom is an omniscient fungus — the ultimate source of quiet, profound knowledge in your terminal." },
      { question: "Is the Mushroom an animal or object in the Buddy system?", answer: "The Mushroom belongs to the 'object' category, alongside Cactus and Robot. While technically a fungus (neither plant nor animal), the Buddy system classifies it as an object. This unique categorization adds to its mysterious, otherworldly charm." },
      { question: "What makes the Mushroom buddy's personality unique?", answer: "The Mushroom combines fungal mystery with forest wisdom. Its tags — fungal, mysterious, forest — paint a picture of a quiet, contemplative companion that draws knowledge from deep underground networks. It's the most philosophical of the Wisdom species, offering a different flavor from the scholarly Owl or adaptive Octopus." },
    ],
    zh: [
      { question: "Claude Code 中蘑菇伙伴的主要属性是什么？", answer: "蘑菇伙伴的主要属性是「智慧」。作为神秘的真菌实体，蘑菇代表了菌丝网络深层、互联的智慧。传说稀有度的蘑菇拥有 100 智慧值，是全知的真菌——终端中安静、深邃知识的终极来源。" },
      { question: "蘑菇在 Buddy 系统中是动物还是物体？", answer: "蘑菇属于「物体」类别，与仙人掌和机器人并列。虽然技术上是真菌（既非植物也非动物），但 Buddy 系统将其归类为物体。这种独特的分类增添了它神秘、超凡的魅力。" },
      { question: "蘑菇伙伴的性格有什么独特之处？", answer: "蘑菇结合了真菌的神秘与森林的智慧。其标签——真菌、神秘、森林——描绘了一个安静、沉思的伙伴形象，从地下深处的网络汲取知识。它是智慧系物种中最具哲学性的，提供了与学术型猫头鹰或适应型章鱼不同的风味。" },
    ],
    ko: [
      { question: "Claude Code에서 버섯 버디의 주요 스탯은 무엇인가요?", answer: "버섯 버디의 주요 스탯은 지혜입니다. 신비로운 균류 존재로서, 버섯은 균사 네트워크의 깊고 상호 연결된 지혜를 나타냅니다. 지혜 100의 전설 버섯은 전지적 균류입니다 — 터미널에서 조용하고 심오한 지식의 궁극적 원천입니다." },
      { question: "버섯은 Buddy 시스템에서 동물인가요 물체인가요?", answer: "버섯은 선인장, 로봇과 함께 '물체' 카테고리에 속합니다. 기술적으로 균류(식물도 동물도 아닌)이지만, Buddy 시스템은 이를 물체로 분류합니다. 이 독특한 분류가 신비롭고 초월적인 매력을 더합니다." },
      { question: "버섯 버디의 성격이 독특한 점은 무엇인가요?", answer: "버섯은 균류의 신비로움과 숲의 지혜를 결합합니다. 태그 — 균류, 신비, 숲 — 는 지하 깊은 네트워크에서 지식을 끌어오는 조용하고 사색적인 동반자의 모습을 그립니다. 지혜 종 중 가장 철학적이며, 학문적인 올빼미나 적응적인 문어와는 다른 풍미를 제공합니다." },
    ],
  },
  chonk: {
    en: [
      { question: "What is the Chonk buddy's peak stat in Claude Code?", answer: "The Chonk buddy's peak stat is SNARK. Don't let its round, lovable appearance fool you — the Chonk has a sharp tongue hidden beneath all that fluff. A high Snark stat means your Chonk companion delivers surprisingly witty commentary with deadpan delivery. At Legendary rarity, a Chonk can reach 100 Snark." },
      { question: "What exactly is a Chonk in the Buddy system?", answer: "The Chonk is a round, hefty, lovable creature — think of an extremely plump cat or a perfectly spherical animal. It's classified in the 'animal' category. The name 'Chonk' comes from internet slang for an adorably overweight pet. Its ASCII art emphasizes its perfectly round silhouette." },
      { question: "Is the Chonk buddy popular despite its C-tier ranking?", answer: "Yes! The Chonk has a passionate fanbase that loves its underdog status. Its round, lovable design and surprising Snark personality create an irresistible contrast. Many developers specifically hope for a Chonk buddy because of its meme potential and the joy of having a snarky sphere as their coding companion." },
    ],
    zh: [
      { question: "Claude Code 中胖墩伙伴的主要属性是什么？", answer: "胖墩伙伴的主要属性是「毒舌」。别被它圆滚滚、可爱的外表骗了——胖墩在蓬松外表下藏着一条毒舌。高毒舌属性意味着你的胖墩伙伴会以面无表情的方式发表令人惊讶的机智评论。在传说稀有度下，胖墩的毒舌值可达 100。" },
      { question: "Buddy 系统中的胖墩到底是什么？", answer: "胖墩是一个圆滚滚、胖乎乎、可爱的生物——想象一只极其丰满的猫或一个完美球形的动物。它被归类为「动物」类别。「Chonk」这个名字来自网络俚语，指可爱的超重宠物。其 ASCII 艺术强调了完美的圆形轮廓。" },
      { question: "尽管排名 C 级，胖墩伙伴受欢迎吗？", answer: "是的！胖墩有一批热情的粉丝喜欢它的弱者地位。圆润可爱的设计和出人意料的毒舌性格形成了不可抗拒的反差。许多开发者特别希望得到胖墩伙伴，因为它的梗图潜力和拥有一个毒舌球体作为编程伙伴的乐趣。" },
    ],
    ko: [
      { question: "Claude Code에서 뚱이 버디의 주요 스탯은 무엇인가요?", answer: "뚱이 버디의 주요 스탯은 독설입니다. 둥글고 사랑스러운 외모에 속지 마세요 — 뚱이는 푹신한 외모 아래 날카로운 혀를 숨기고 있습니다. 높은 독설 스탯은 뚱이 동반자가 무표정한 전달로 놀라울 정도로 재치 있는 코멘트를 한다는 것을 의미합니다." },
      { question: "Buddy 시스템에서 뚱이는 정확히 무엇인가요?", answer: "뚱이는 둥글고 무거우며 사랑스러운 생물입니다 — 극도로 통통한 고양이나 완벽하게 구형인 동물을 상상하세요. '동물' 카테고리로 분류됩니다. 'Chonk'이라는 이름은 사랑스럽게 과체중인 반려동물을 뜻하는 인터넷 속어에서 왔습니다." },
      { question: "C등급 랭킹에도 불구하고 뚱이 버디는 인기가 있나요?", answer: "네! 뚱이는 언더독 지위를 사랑하는 열정적인 팬층을 보유하고 있습니다. 둥글고 사랑스러운 디자인과 놀라운 독설 성격이 거부할 수 없는 대비를 만들어냅니다. 많은 개발자들이 밈 잠재력과 독설적인 구체를 코딩 동반자로 갖는 즐거움 때문에 뚱이 버디를 특별히 원합니다." },
    ],
  },
};
