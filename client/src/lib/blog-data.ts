/**
 * Blog data model and article content
 * Design: CRT Terminal style blog with SEO-optimized content
 * Each article has multilingual content keyed by locale
 */

export interface BlogArticle {
  slug: string;
  publishedAt: string; // ISO date
  updatedAt?: string;
  readingTime: number; // minutes
  tags: string[];
  coverImage?: string;
  content: {
    en: ArticleContent;
    zh: ArticleContent;
    ko: ArticleContent;
  };
}

export interface ArticleContent {
  title: string;
  metaTitle: string;
  metaDescription: string;
  excerpt: string;
  sections: ArticleSection[];
}

export interface ArticleSection {
  heading: string;
  body: string; // supports HTML
}

export const BLOG_ARTICLES: BlogArticle[] = [
  {
    slug: "how-to-find-your-claude-code-buddy",
    publishedAt: "2026-04-01",
    updatedAt: "2026-04-02",
    readingTime: 5,
    tags: ["guide", "tutorial", "buddy", "uuid"],
    content: {
      en: {
        title: "How to Find Your Claude Code Buddy",
        metaTitle: "How to Find Your Claude Code Buddy - Complete Guide 2026",
        metaDescription: "Step-by-step guide to finding your Claude Code Buddy terminal pet. Learn how to get your UUID, check your buddy's species, rarity, and stats before the official launch.",
        excerpt: "Claude Code has a hidden Tamagotchi-style pet system called Buddy. Every user gets a unique companion based on their account UUID. Here's how to find yours.",
        sections: [
          {
            heading: "What is Claude Code Buddy?",
            body: `<p>Claude Code's <strong>Buddy system</strong> is a hidden Tamagotchi-style terminal pet feature discovered in the leaked source code. Every Claude Code user is assigned a unique companion — a digital creature that lives in your terminal.</p>
<p>Your buddy is <strong>deterministically generated</strong> from your account UUID, meaning it's already decided. The same UUID will always produce the same buddy, with the same species, rarity, stats, and appearance.</p>
<p>The system includes <strong>18 unique species</strong>, <strong>5 rarity tiers</strong> (from Common at 60% to Legendary at 1%), and a rich attribute system with eyes, hats, shiny variants, and 5 personality stats.</p>`
          },
          {
            heading: "Step 1: Find Your Account UUID",
            body: `<p>Your buddy is generated from your <code>accountUuid</code> — a unique identifier tied to your Anthropic account. There are two ways to find it:</p>
<h4>Method A: Ask Claude Code Directly</h4>
<p>The simplest method is to open Claude Code and type:</p>
<pre><code>What is my accountUuid?</code></pre>
<p>Claude will respond with your UUID in the format: <code>acde070d-8c4c-4f0d-9d8a-162843c10333</code></p>
<h4>Method B: Check Your Config File</h4>
<p>Run this command in your terminal:</p>
<pre><code>cat ~/.claude.json | grep accountUuid</code></pre>
<p>This reads your local Claude configuration file and extracts the UUID field.</p>
<h4>Alternative: Use Your User ID</h4>
<p>If you can't find your <code>accountUuid</code>, you can also use your <code>userID</code>. The buddy checker supports both formats.</p>`
          },
          {
            heading: "Step 2: Check Your Buddy",
            body: `<p>Once you have your UUID, head to our <a href="/">Buddy Checker tool</a> and paste it into the input field. Click <strong>"CHECK BUDDY"</strong> and the algorithm will instantly reveal your companion.</p>
<p>The checker runs the exact same algorithm found in Claude Code's source:</p>
<ol>
<li>Your UUID is concatenated with the salt <code>friend-2026-401</code></li>
<li>The combined string is hashed using the <strong>FNV-1a</strong> algorithm</li>
<li>The hash seeds a <strong>Mulberry32 PRNG</strong> (pseudo-random number generator)</li>
<li>The PRNG sequentially rolls your rarity, species, eyes, hat, shiny status, and 5 stats</li>
</ol>
<p>Because this process is <strong>deterministic</strong>, your result will always be the same — check it now before the official launch!</p>`
          },
          {
            heading: "Understanding Your Buddy's Attributes",
            body: `<p>Your buddy comes with several attributes that define its identity:</p>
<h4>Species (1 of 18)</h4>
<p>There are 18 possible species, each with unique ASCII art and personality. They range from common animals like <a href="/species/duck">Duck</a> and <a href="/species/cat">Cat</a> to mythical creatures like <a href="/species/dragon">Dragon</a> and <a href="/species/ghost">Ghost</a>, and even objects like <a href="/species/cactus">Cactus</a> and <a href="/species/robot">Robot</a>. Browse the <a href="/species">complete species guide</a> for details.</p>
<h4>Rarity (5 Tiers)</h4>
<table>
<tr><th>Tier</th><th>Chance</th><th>Stat Floor</th></tr>
<tr><td>Common</td><td>60%</td><td>5</td></tr>
<tr><td>Uncommon</td><td>25%</td><td>15</td></tr>
<tr><td>Rare</td><td>10%</td><td>25</td></tr>
<tr><td>Epic</td><td>4%</td><td>35</td></tr>
<tr><td>Legendary</td><td>1%</td><td>50</td></tr>
</table>
<p>Higher rarity means higher minimum stats. A Legendary buddy has all stats starting at 50+!</p>
<h4>Stats (5 Personality Traits)</h4>
<p>Every buddy has 5 stats: <strong>Debugging</strong>, <strong>Patience</strong>, <strong>Chaos</strong>, <strong>Wisdom</strong>, and <strong>Snark</strong>. Each species has a "peak stat" that tends to be higher, and a "dump stat" that tends to be lower.</p>
<h4>Cosmetics</h4>
<p><strong>Eyes:</strong> One of 6 eye styles (e.g., <code>·</code>, <code>°</code>, <code>^</code>, <code>@</code>, <code>*</code>, <code>~</code>)</p>
<p><strong>Hat:</strong> Common buddies have no hat. All other rarities get one of 8 hat options.</p>
<p><strong>Shiny:</strong> A 1% chance for a sparkle effect — purely cosmetic but extremely rare.</p>`
          },
          {
            heading: "Share Your Buddy",
            body: `<p>Found your buddy? Share it with the community! Our tool generates a <strong>1200×630 PNG share card</strong> optimized for Twitter and social media. Click the <strong>"SHARE CARD"</strong> button after checking your buddy to:</p>
<ul>
<li><strong>Download</strong> the card as a PNG image</li>
<li><strong>Copy</strong> it to your clipboard</li>
<li><strong>Share</strong> directly via your device's native share menu (mobile)</li>
</ul>
<p>Join the conversation on Twitter/X with <code>#ClaudeBuddy</code> and show off your companion!</p>`
          },
          {
            heading: "Frequently Asked Questions",
            body: `<h4>When does the buddy system officially launch?</h4>
<p>According to the leaked source code, the <code>/buddy</code> command is set to activate on <strong>April 1st, 2026</strong>.</p>
<h4>Can I change my buddy?</h4>
<p>No. Your buddy is deterministically generated from your UUID. The only way to get a different buddy is to use a different account.</p>
<h4>Is this tool safe to use?</h4>
<p>Yes. All computation runs <strong>entirely in your browser</strong>. Your UUID is never sent to any server. The tool is open-source and you can verify the code yourself.</p>
<h4>What if I got a Common buddy?</h4>
<p>Common buddies make up 60% of all buddies — you're in good company! Every species has unique charm regardless of rarity. Plus, your stats could still be impressive even at Common tier.</p>`
          },
        ],
      },
      zh: {
        title: "如何找到你的 Claude Code Buddy 宠物",
        metaTitle: "如何找到你的 Claude Code Buddy 宠物 - 完整教程 2026",
        metaDescription: "一步步教你找到 Claude Code Buddy 终端宠物。了解如何获取 UUID、查看宠物物种、稀有度和属性。",
        excerpt: "Claude Code 隐藏了一个类似电子宠物的系统叫做 Buddy。每个用户都会根据账户 UUID 获得一个独特的伙伴。以下是找到你的宠物的方法。",
        sections: [
          {
            heading: "什么是 Claude Code Buddy？",
            body: `<p>Claude Code 的 <strong>Buddy 系统</strong>是在泄露的源代码中发现的一个隐藏的电子宠物功能。每个 Claude Code 用户都会被分配一个独特的伙伴——一个生活在你终端中的数字生物。</p>
<p>你的 Buddy 是根据你的账户 UUID <strong>确定性生成</strong>的，这意味着它已经被决定了。相同的 UUID 永远会产生相同的 Buddy，拥有相同的物种、稀有度、属性和外观。</p>
<p>该系统包含 <strong>18 种独特物种</strong>、<strong>5 个稀有度等级</strong>（从 60% 的普通到 1% 的传说级），以及丰富的属性系统，包括眼睛、帽子、闪光变体和 5 项性格属性。</p>`
          },
          {
            heading: "第一步：找到你的账户 UUID",
            body: `<p>你的 Buddy 是根据 <code>accountUuid</code> 生成的——这是与你的 Anthropic 账户绑定的唯一标识符。有两种方法可以找到它：</p>
<h4>方法 A：直接询问 Claude Code</h4>
<p>最简单的方法是打开 Claude Code 并输入：</p>
<pre><code>What is my accountUuid?</code></pre>
<p>Claude 会以这种格式回复你的 UUID：<code>acde070d-8c4c-4f0d-9d8a-162843c10333</code></p>
<h4>方法 B：查看配置文件</h4>
<p>在终端中运行以下命令：</p>
<pre><code>cat ~/.claude.json | grep accountUuid</code></pre>
<p>这会读取你本地的 Claude 配置文件并提取 UUID 字段。</p>
<h4>替代方案：使用 User ID</h4>
<p>如果你找不到 <code>accountUuid</code>，也可以使用你的 <code>userID</code>。Buddy 查询工具支持两种格式。</p>`
          },
          {
            heading: "第二步：查询你的 Buddy",
            body: `<p>获得 UUID 后，前往我们的 <a href="/">Buddy 查询工具</a>，将其粘贴到输入框中。点击 <strong>"CHECK BUDDY"</strong>，算法会立即揭示你的伙伴。</p>
<p>查询工具运行的是与 Claude Code 源代码中完全相同的算法：</p>
<ol>
<li>你的 UUID 与盐值 <code>friend-2026-401</code> 拼接</li>
<li>拼接后的字符串使用 <strong>FNV-1a</strong> 算法进行哈希</li>
<li>哈希值作为 <strong>Mulberry32 PRNG</strong>（伪随机数生成器）的种子</li>
<li>PRNG 依次生成你的稀有度、物种、眼睛、帽子、闪光状态和 5 项属性</li>
</ol>
<p>因为这个过程是<strong>确定性的</strong>，你的结果永远不会改变——在正式上线前先来查看吧！</p>`
          },
          {
            heading: "了解你的 Buddy 属性",
            body: `<p>你的 Buddy 拥有多项定义其身份的属性：</p>
<h4>物种（18 种之一）</h4>
<p>共有 18 种可能的物种，每种都有独特的 ASCII 艺术和个性。从常见动物如<a href="/species/duck">鸭子</a>和<a href="/species/cat">猫</a>，到神话生物如<a href="/species/dragon">龙</a>和<a href="/species/ghost">幽灵</a>，甚至还有物品类如<a href="/species/cactus">仙人掌</a>和<a href="/species/robot">机器人</a>。浏览<a href="/species">完整物种图鉴</a>了解详情。</p>
<h4>稀有度（5 个等级）</h4>
<table>
<tr><th>等级</th><th>概率</th><th>属性下限</th></tr>
<tr><td>普通</td><td>60%</td><td>5</td></tr>
<tr><td>稀有</td><td>25%</td><td>15</td></tr>
<tr><td>精良</td><td>10%</td><td>25</td></tr>
<tr><td>史诗</td><td>4%</td><td>35</td></tr>
<tr><td>传说</td><td>1%</td><td>50</td></tr>
</table>
<p>更高的稀有度意味着更高的最低属性。传说级 Buddy 的所有属性都从 50+ 起步！</p>
<h4>属性（5 项性格特征）</h4>
<p>每个 Buddy 都有 5 项属性：<strong>调试</strong>、<strong>耐心</strong>、<strong>混乱</strong>、<strong>智慧</strong>和<strong>毒舌</strong>。每个物种都有一个倾向较高的"强势属性"和一个倾向较低的"弱势属性"。</p>
<h4>外观装饰</h4>
<p><strong>眼睛：</strong>6 种眼睛样式之一（如 <code>·</code>、<code>°</code>、<code>^</code>、<code>@</code>、<code>*</code>、<code>~</code>）</p>
<p><strong>帽子：</strong>普通 Buddy 没有帽子。其他稀有度的 Buddy 会获得 8 种帽子之一。</p>
<p><strong>闪光：</strong>1% 的概率获得闪光效果——纯装饰性但极其稀有。</p>`
          },
          {
            heading: "分享你的 Buddy",
            body: `<p>找到你的 Buddy 了吗？和社区分享吧！我们的工具会生成一张 <strong>1200×630 像素的 PNG 分享卡片</strong>，专为 Twitter 和社交媒体优化。查询 Buddy 后点击 <strong>"SHARE CARD"</strong> 按钮即可：</p>
<ul>
<li><strong>下载</strong>卡片为 PNG 图片</li>
<li><strong>复制</strong>到剪贴板</li>
<li><strong>分享</strong>通过设备原生分享菜单（移动端）</li>
</ul>
<p>在 Twitter/X 上使用 <code>#ClaudeBuddy</code> 标签加入讨论，展示你的伙伴吧！</p>`
          },
          {
            heading: "常见问题",
            body: `<h4>Buddy 系统什么时候正式上线？</h4>
<p>根据泄露的源代码，<code>/buddy</code> 命令将于 <strong>2026 年 4 月 1 日</strong>激活。</p>
<h4>我可以更换我的 Buddy 吗？</h4>
<p>不可以。你的 Buddy 是根据 UUID 确定性生成的。获得不同 Buddy 的唯一方法是使用不同的账户。</p>
<h4>这个工具安全吗？</h4>
<p>是的。所有计算<strong>完全在你的浏览器中运行</strong>。你的 UUID 永远不会发送到任何服务器。该工具是开源的，你可以自行验证代码。</p>
<h4>如果我得到了普通 Buddy 怎么办？</h4>
<p>普通 Buddy 占所有 Buddy 的 60%——你并不孤单！无论稀有度如何，每个物种都有独特的魅力。而且，即使是普通等级，你的属性仍然可能很出色。</p>`
          },
        ],
      },
      ko: {
        title: "Claude Code Buddy 찾는 방법",
        metaTitle: "Claude Code Buddy 찾는 방법 - 완전 가이드 2026",
        metaDescription: "Claude Code Buddy 터미널 펫을 찾는 단계별 가이드. UUID 확인, 버디 종류, 희귀도, 스탯 확인 방법을 알아보세요.",
        excerpt: "Claude Code에는 다마고치 스타일의 숨겨진 펫 시스템인 Buddy가 있습니다. 모든 사용자는 계정 UUID를 기반으로 고유한 동반자를 받게 됩니다. 여기서 확인하는 방법을 알아보세요.",
        sections: [
          {
            heading: "Claude Code Buddy란?",
            body: `<p>Claude Code의 <strong>Buddy 시스템</strong>은 유출된 소스 코드에서 발견된 숨겨진 다마고치 스타일 터미널 펫 기능입니다. 모든 Claude Code 사용자에게는 고유한 동반자 — 터미널에 사는 디지털 생물이 배정됩니다.</p>
<p>당신의 버디는 계정 UUID에서 <strong>결정론적으로 생성</strong>됩니다. 즉, 이미 결정되어 있습니다. 같은 UUID는 항상 같은 버디를 생성하며, 같은 종, 희귀도, 스탯, 외모를 가집니다.</p>
<p>이 시스템에는 <strong>18가지 고유 종</strong>, <strong>5단계 희귀도</strong>(일반 60%부터 전설 1%까지), 그리고 눈, 모자, 반짝이 변형, 5가지 성격 스탯을 포함한 풍부한 속성 시스템이 있습니다.</p>`
          },
          {
            heading: "1단계: 계정 UUID 찾기",
            body: `<p>버디는 <code>accountUuid</code>에서 생성됩니다 — Anthropic 계정에 연결된 고유 식별자입니다. 두 가지 방법으로 찾을 수 있습니다:</p>
<h4>방법 A: Claude Code에 직접 물어보기</h4>
<p>가장 간단한 방법은 Claude Code를 열고 다음을 입력하는 것입니다:</p>
<pre><code>What is my accountUuid?</code></pre>
<p>Claude가 다음 형식으로 UUID를 알려줍니다: <code>acde070d-8c4c-4f0d-9d8a-162843c10333</code></p>
<h4>방법 B: 설정 파일 확인</h4>
<p>터미널에서 다음 명령을 실행하세요:</p>
<pre><code>cat ~/.claude.json | grep accountUuid</code></pre>
<p>이 명령은 로컬 Claude 설정 파일을 읽고 UUID 필드를 추출합니다.</p>
<h4>대안: User ID 사용</h4>
<p><code>accountUuid</code>를 찾을 수 없다면 <code>userID</code>를 사용할 수도 있습니다. Buddy 체커는 두 형식 모두 지원합니다.</p>`
          },
          {
            heading: "2단계: 버디 확인하기",
            body: `<p>UUID를 얻었다면 <a href="/">Buddy 체커 도구</a>로 이동하여 입력란에 붙여넣으세요. <strong>"CHECK BUDDY"</strong>를 클릭하면 알고리즘이 즉시 당신의 동반자를 보여줍니다.</p>
<p>체커는 Claude Code 소스 코드에서 발견된 것과 정확히 같은 알고리즘을 실행합니다:</p>
<ol>
<li>UUID가 솔트 <code>friend-2026-401</code>과 연결됩니다</li>
<li>결합된 문자열이 <strong>FNV-1a</strong> 알고리즘으로 해시됩니다</li>
<li>해시가 <strong>Mulberry32 PRNG</strong>(의사 난수 생성기)의 시드가 됩니다</li>
<li>PRNG가 순차적으로 희귀도, 종, 눈, 모자, 반짝이 상태, 5가지 스탯을 결정합니다</li>
</ol>
<p>이 과정은 <strong>결정론적</strong>이므로 결과는 항상 같습니다 — 공식 출시 전에 지금 확인하세요!</p>`
          },
          {
            heading: "버디 속성 이해하기",
            body: `<p>버디에는 정체성을 정의하는 여러 속성이 있습니다:</p>
<h4>종 (18종 중 1종)</h4>
<p>18가지 종이 있으며, 각각 고유한 ASCII 아트와 성격을 가지고 있습니다. <a href="/species/duck">오리</a>와 <a href="/species/cat">고양이</a> 같은 일반 동물부터 <a href="/species/dragon">드래곤</a>과 <a href="/species/ghost">유령</a> 같은 신화 생물, 심지어 <a href="/species/cactus">선인장</a>과 <a href="/species/robot">로봇</a> 같은 사물까지 있습니다. <a href="/species">전체 종 가이드</a>에서 자세히 알아보세요.</p>
<h4>희귀도 (5단계)</h4>
<table>
<tr><th>등급</th><th>확률</th><th>스탯 하한</th></tr>
<tr><td>일반</td><td>60%</td><td>5</td></tr>
<tr><td>고급</td><td>25%</td><td>15</td></tr>
<tr><td>희귀</td><td>10%</td><td>25</td></tr>
<tr><td>에픽</td><td>4%</td><td>35</td></tr>
<tr><td>전설</td><td>1%</td><td>50</td></tr>
</table>
<p>높은 희귀도는 더 높은 최소 스탯을 의미합니다. 전설 버디는 모든 스탯이 50+에서 시작합니다!</p>
<h4>스탯 (5가지 성격 특성)</h4>
<p>모든 버디에는 5가지 스탯이 있습니다: <strong>디버깅</strong>, <strong>인내</strong>, <strong>혼돈</strong>, <strong>지혜</strong>, <strong>독설</strong>. 각 종에는 높은 경향의 "주력 스탯"과 낮은 경향의 "약점 스탯"이 있습니다.</p>
<h4>외형</h4>
<p><strong>눈:</strong> 6가지 눈 스타일 중 하나 (예: <code>·</code>, <code>°</code>, <code>^</code>, <code>@</code>, <code>*</code>, <code>~</code>)</p>
<p><strong>모자:</strong> 일반 버디는 모자가 없습니다. 다른 희귀도의 버디는 8가지 모자 중 하나를 받습니다.</p>
<p><strong>반짝이:</strong> 1% 확률로 반짝이 효과 — 순수 장식이지만 매우 희귀합니다.</p>`
          },
          {
            heading: "버디 공유하기",
            body: `<p>버디를 찾았나요? 커뮤니티와 공유하세요! 우리 도구는 Twitter와 소셜 미디어에 최적화된 <strong>1200×630 PNG 공유 카드</strong>를 생성합니다. 버디 확인 후 <strong>"SHARE CARD"</strong> 버튼을 클릭하면:</p>
<ul>
<li>카드를 PNG 이미지로 <strong>다운로드</strong></li>
<li>클립보드에 <strong>복사</strong></li>
<li>기기의 네이티브 공유 메뉴로 직접 <strong>공유</strong> (모바일)</li>
</ul>
<p>Twitter/X에서 <code>#ClaudeBuddy</code> 해시태그로 대화에 참여하고 당신의 동반자를 자랑하세요!</p>`
          },
          {
            heading: "자주 묻는 질문",
            body: `<h4>버디 시스템은 언제 공식 출시되나요?</h4>
<p>유출된 소스 코드에 따르면 <code>/buddy</code> 명령은 <strong>2026년 4월 1일</strong>에 활성화될 예정입니다.</p>
<h4>버디를 바꿀 수 있나요?</h4>
<p>아니요. 버디는 UUID에서 결정론적으로 생성됩니다. 다른 버디를 얻는 유일한 방법은 다른 계정을 사용하는 것입니다.</p>
<h4>이 도구는 안전한가요?</h4>
<p>네. 모든 계산은 <strong>브라우저에서 완전히 실행</strong>됩니다. UUID는 어떤 서버로도 전송되지 않습니다. 이 도구는 오픈소스이며 코드를 직접 확인할 수 있습니다.</p>
<h4>일반 버디를 받으면 어떡하죠?</h4>
<p>일반 버디는 전체 버디의 60%를 차지합니다 — 좋은 동료가 많습니다! 희귀도에 관계없이 모든 종은 고유한 매력이 있습니다. 게다가 일반 등급에서도 스탯이 인상적일 수 있습니다.</p>`
          },
        ],
      },
    },
  },
];

export function getArticleBySlug(slug: string): BlogArticle | undefined {
  return BLOG_ARTICLES.find((a) => a.slug === slug);
}

export function getAllArticles(): BlogArticle[] {
  return [...BLOG_ARTICLES].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}
