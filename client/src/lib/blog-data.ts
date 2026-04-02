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
  {
    slug: "claude-code-buddy-rarity-guide",
    publishedAt: "2026-04-02",
    readingTime: 7,
    tags: ["rarity", "guide", "stats", "legendary"],
    content: {
      en: {
        title: "Claude Code Buddy Rarity Guide",
        metaTitle: "Claude Code Buddy Rarity Guide - All 5 Tiers Explained (2026)",
        metaDescription: "Complete guide to Claude Code Buddy rarity tiers. Learn the exact drop rates, stat floors, cosmetic unlocks, and what makes Legendary buddies so special.",
        excerpt: "Not all buddies are created equal. With 5 rarity tiers ranging from Common (60%) to Legendary (1%), your buddy's rarity determines its stat floors, cosmetic options, and bragging rights. Here's everything you need to know.",
        sections: [
          {
            heading: "How Rarity Works in Claude Code Buddy",
            body: `<p>When your buddy is generated from your UUID, the very <strong>first roll</strong> the algorithm makes is your <strong>rarity tier</strong>. This single roll determines the baseline power of your buddy — it sets the stat floor, unlocks cosmetic options, and defines how rare your companion truly is.</p>
<p>The rarity system uses a <strong>weighted random selection</strong>. Your UUID is hashed with the salt <code>friend-2026-401</code> using the FNV-1a algorithm, then fed into a Mulberry32 PRNG. The first random number generated determines your rarity based on these cumulative weights:</p>
<pre><code>Common:    60% (roll 0.00 – 0.60)\nUncommon:  25% (roll 0.60 – 0.85)\nRare:      10% (roll 0.85 – 0.95)\nEpic:       4% (roll 0.95 – 0.99)\nLegendary:  1% (roll 0.99 – 1.00)</code></pre>
<p>Because this is <strong>deterministic</strong>, your rarity is already decided. You can't reroll — the only way to get a different rarity is to use a different account UUID.</p>`
          },
          {
            heading: "All 5 Rarity Tiers Explained",
            body: `<h4>★ Common (60%)</h4>
<p>The most frequently rolled tier. Common buddies have a <strong>stat floor of 5</strong>, meaning each stat is guaranteed to be at least 5. They receive <strong>no hat</strong> — the only tier without headwear. Despite being the most common, they can still roll impressive peak stats (up to 85) in their species' specialty.</p>
<p><strong>What to expect:</strong> Solid companions with one standout stat. Your species' personality shines through even at Common tier. Most of the community will have Common buddies, so you're in good company.</p>

<h4>★★ Uncommon (25%)</h4>
<p>A step up with a <strong>stat floor of 15</strong>. Uncommon buddies unlock the <strong>hat system</strong> — you'll receive one of 8 possible hats including crown, tophat, propeller, halo, wizard hat, beanie, or even a tiny duck on your head. Your overall stats will be noticeably higher across the board.</p>
<p><strong>What to expect:</strong> Well-rounded buddies with decent minimums. The hat adds visual personality and makes your ASCII art more distinctive in the terminal.</p>

<h4>★★★ Rare (10%)</h4>
<p>Only 1 in 10 users will roll Rare. The <strong>stat floor jumps to 25</strong>, meaning even your weakest stat is respectable. Like Uncommon, you get a random hat. Your peak stat can reach <strong>95+</strong>, making Rare buddies genuinely powerful.</p>
<p><strong>What to expect:</strong> Strong all-around performers. A Rare buddy with a favorable species-stat alignment (like a <a href="/species/dragon">Dragon</a> with high Debugging or an <a href="/species/owl">Owl</a> with high Wisdom) is a force to be reckoned with.</p>

<h4>★★★★ Epic (4%)</h4>
<p>Epic buddies are truly special — only <strong>4 in 100</strong> users will see this tier. The stat floor is <strong>35</strong>, which means even your dump stat is above average. Combined with a hat and potentially a shiny variant, Epic buddies are visually and statistically impressive.</p>
<p><strong>What to expect:</strong> Powerhouses with no weak spots. An Epic buddy's lowest stat often exceeds a Common buddy's highest. These are the companions that turn heads in the community.</p>

<h4>★★★★★ Legendary (1%)</h4>
<p>The holy grail. Only <strong>1 in 100</strong> users will ever roll a Legendary buddy. With a stat floor of <strong>50</strong>, every single stat is at least half-maxed. The peak stat can hit <strong>100</strong> — absolute perfection. Legendary buddies get a hat and have the same 1% shiny chance as everyone else, but a shiny Legendary is the rarest possible combination at roughly <strong>0.01%</strong>.</p>
<p><strong>What to expect:</strong> The ultimate flex. A Legendary buddy is a conversation starter and a badge of honor. If you have one, share it — the community will celebrate with you.</p>`
          },
          {
            heading: "Stat Floors and Ceilings by Rarity",
            body: `<p>Understanding stat ranges is key to evaluating your buddy. Here's the complete breakdown:</p>
<table>
<tr><th>Rarity</th><th>Drop Rate</th><th>Stat Floor</th><th>Normal Range</th><th>Peak Stat Range</th><th>Dump Stat Range</th><th>Hat</th></tr>
<tr><td>Common</td><td>60%</td><td>5</td><td>5 – 44</td><td>55 – 85</td><td>1 – 19</td><td>None</td></tr>
<tr><td>Uncommon</td><td>25%</td><td>15</td><td>15 – 54</td><td>65 – 95</td><td>5 – 29</td><td>Random</td></tr>
<tr><td>Rare</td><td>10%</td><td>25</td><td>25 – 64</td><td>75 – 100</td><td>15 – 39</td><td>Random</td></tr>
<tr><td>Epic</td><td>4%</td><td>35</td><td>35 – 74</td><td>85 – 100</td><td>25 – 49</td><td>Random</td></tr>
<tr><td>Legendary</td><td>1%</td><td>50</td><td>50 – 89</td><td>100</td><td>40 – 64</td><td>Random</td></tr>
</table>
<p><strong>Key insight:</strong> The "peak stat" is your species' specialty — it gets a +50 bonus on top of the floor, plus up to 30 random points. The "dump stat" is randomly chosen (different from the peak) and gets a -10 penalty with only 15 random points of range.</p>
<p>This means a <strong>Legendary buddy's dump stat (40–64)</strong> is often higher than a <strong>Common buddy's normal stats (5–44)</strong>. That's the power of rarity.</p>`
          },
          {
            heading: "Cosmetic Unlocks by Rarity",
            body: `<p>Rarity doesn't just affect stats — it also determines your buddy's visual appearance:</p>
<h4>Hats (Uncommon+)</h4>
<p>Common buddies are hatless. All other tiers roll one of <strong>8 hats</strong>:</p>
<table>
<tr><th>Hat</th><th>ASCII Preview</th><th>Vibe</th></tr>
<tr><td>Crown</td><td><code>♛</code></td><td>Royal, commanding</td></tr>
<tr><td>Top Hat</td><td><code>▄█▄</code></td><td>Classy, distinguished</td></tr>
<tr><td>Propeller</td><td><code>⌐╦╦═─</code></td><td>Playful, whimsical</td></tr>
<tr><td>Halo</td><td><code>◯</code></td><td>Angelic, pure</td></tr>
<tr><td>Wizard</td><td><code>⌒*⌒</code></td><td>Mystical, arcane</td></tr>
<tr><td>Beanie</td><td><code>▓▓▓</code></td><td>Casual, cozy</td></tr>
<tr><td>Tiny Duck</td><td><code>🦆</code></td><td>Adorable, meta</td></tr>
</table>
<p>The hat is rendered directly on top of your buddy's ASCII art in the terminal, adding a unique visual signature.</p>

<h4>Eyes (All Rarities)</h4>
<p>Every buddy gets one of 6 eye styles regardless of rarity: <code>·</code> <code>✦</code> <code>×</code> <code>◉</code> <code>@</code> <code>°</code>. Eyes are purely cosmetic but contribute to your buddy's personality.</p>

<h4>Shiny Variant (1% — All Rarities)</h4>
<p>Any buddy, regardless of rarity, has a <strong>1% chance</strong> to be shiny. Shiny buddies get a sparkle effect (✨) in their ASCII art. A <strong>Shiny Legendary</strong> has roughly a <strong>0.01% chance</strong> (1 in 10,000) — the rarest possible buddy configuration.</p>`
          },
          {
            heading: "Best Species for Each Rarity Tier",
            body: `<p>While species and rarity are rolled independently, certain species <strong>synergize better</strong> with higher rarities due to their peak stat alignment:</p>
<h4>Best at Common Tier</h4>
<p>Species with high-impact peak stats that remain useful even with low floors:</p>
<ul>
<li><a href="/species/dragon">Dragon</a> — Peak: Debugging. Even a Common Dragon can debug like a champ.</li>
<li><a href="/species/cat">Cat</a> — Peak: Snark. The personality shines regardless of stats.</li>
<li><a href="/species/goose">Goose</a> — Peak: Chaos. Chaos doesn't need high minimums to be fun.</li>
</ul>

<h4>Best at Rare+ Tier</h4>
<p>Species that truly shine when stat floors are elevated:</p>
<ul>
<li><a href="/species/owl">Owl</a> — Peak: Wisdom. A Rare+ Owl with 75+ Wisdom is the ultimate advisor.</li>
<li><a href="/species/robot">Robot</a> — Peak: Debugging. High-rarity Robots are debugging machines with no weaknesses.</li>
<li><a href="/species/capybara">Capybara</a> — Peak: Patience. An Epic Capybara is the most zen companion possible.</li>
</ul>

<h4>Best at Legendary Tier</h4>
<p>Every species is amazing at Legendary, but these are particularly impressive:</p>
<ul>
<li><a href="/species/axolotl">Axolotl</a> — Peak: Debugging. A Legendary Axolotl with 100 Debugging is perfection.</li>
<li><a href="/species/mushroom">Mushroom</a> — Peak: Wisdom. Legendary Mushroom = omniscient fungus.</li>
<li><a href="/species/ghost">Ghost</a> — Peak: Chaos. A Legendary Ghost with maxed Chaos is beautifully terrifying.</li>
</ul>
<p>Browse the <a href="/species">complete species guide</a> to see all 18 species and their stat tendencies.</p>`
          },
          {
            heading: "How to Check Your Rarity",
            body: `<p>Ready to discover your buddy's rarity? It takes less than 30 seconds:</p>
<ol>
<li><strong>Find your UUID</strong> — Open Claude Code and type <code>What is my accountUuid?</code>, or run <code>cat ~/.claude.json | grep accountUuid</code> in your terminal.</li>
<li><strong>Visit the checker</strong> — Go to our <a href="/">Buddy Checker</a> and paste your UUID.</li>
<li><strong>See your results</strong> — Your rarity, species, stats, and cosmetics are revealed instantly.</li>
<li><strong>Share your card</strong> — Click "SHARE CARD" to generate a 1200×630 PNG optimized for Twitter/X.</li>
</ol>
<p>All computation runs <strong>entirely in your browser</strong>. Your UUID is never sent to any server. The algorithm is the same one found in Claude Code's leaked source — your result is guaranteed to match the official system.</p>
<p>Got a Legendary? Share it with <code>#ClaudeBuddy</code> on Twitter/X — the community will celebrate with you! Got a Common? Don't worry — every species has unique charm, and your peak stat might still be incredible.</p>`
          },
          {
            heading: "Rarity FAQ",
            body: `<h4>Can I reroll my rarity?</h4>
<p>No. Your buddy (including rarity) is deterministically generated from your UUID. The only way to get a different rarity is to use a different Anthropic account.</p>
<h4>Does rarity affect which species I get?</h4>
<p>No. Species and rarity are rolled independently. You can get any of the 18 species at any rarity tier. A Legendary Duck is just as possible as a Legendary Dragon.</p>
<h4>What are the odds of a Shiny Legendary?</h4>
<p>Approximately <strong>0.01%</strong> (1 in 10,000). That's 1% Legendary × 1% Shiny. If you have one, you've won the buddy lottery.</p>
<h4>Is a high-stat Common better than a low-stat Rare?</h4>
<p>It depends on the stat. A Common buddy's peak stat (55–85) can exceed a Rare buddy's normal stats (25–64). However, the Rare buddy will have much higher minimums across all stats and access to hats.</p>
<h4>Do higher rarities get better species?</h4>
<p>No. Every species is equally likely at every rarity tier. The 18 species are uniformly distributed regardless of rarity.</p>`
          },
        ],
      },
      zh: {
        title: "Claude Code Buddy 稀有度完全指南",
        metaTitle: "Claude Code Buddy 稀有度指南 - 5个等级全面解析 (2026)",
        metaDescription: "Claude Code Buddy 稀有度系统完全指南。了解精确掉落概率、属性下限、外观解锁，以及传说级 Buddy 的特殊之处。",
        excerpt: "并非所有 Buddy 都生而平等。从普通（60%）到传说（1%），你的 Buddy 稀有度决定了属性下限、外观选项和炫耀资本。以下是你需要知道的一切。",
        sections: [
          {
            heading: "Claude Code Buddy 的稀有度机制",
            body: `<p>当你的 Buddy 从 UUID 生成时，算法进行的<strong>第一次投掷</strong>就是你的<strong>稀有度等级</strong>。这一次投掷决定了你 Buddy 的基础实力——它设定了属性下限、解锁外观选项，并定义了你的伙伴有多稀有。</p>
<p>稀有度系统使用<strong>加权随机选择</strong>。你的 UUID 与盐值 <code>friend-2026-401</code> 通过 FNV-1a 算法哈希，然后输入 Mulberry32 PRNG。生成的第一个随机数根据以下累积权重决定你的稀有度：</p>
<pre><code>普通:    60% (投掷 0.00 – 0.60)\n稀有:    25% (投掷 0.60 – 0.85)\n精良:    10% (投掷 0.85 – 0.95)\n史诗:     4% (投掷 0.95 – 0.99)\n传说:     1% (投掷 0.99 – 1.00)</code></pre>
<p>因为这是<strong>确定性的</strong>，你的稀有度已经决定了。你无法重新投掷——获得不同稀有度的唯一方法是使用不同的账户 UUID。</p>`
          },
          {
            heading: "5 个稀有度等级详解",
            body: `<h4>★ 普通 (60%)</h4>
<p>最常见的等级。普通 Buddy 的<strong>属性下限为 5</strong>，意味着每项属性至少为 5。它们<strong>没有帽子</strong>——唯一没有头饰的等级。尽管最为常见，它们的强势属性仍然可以达到令人印象深刻的 85。</p>
<p><strong>预期效果：</strong>拥有一项突出属性的可靠伙伴。即使在普通等级，你的物种个性也会闪耀。社区中大多数人都会有普通 Buddy，所以你并不孤单。</p>

<h4>★★ 稀有 (25%)</h4>
<p>更进一步，<strong>属性下限为 15</strong>。稀有 Buddy 解锁<strong>帽子系统</strong>——你将获得 8 种可能的帽子之一，包括皇冠、礼帽、螺旋桨帽、光环、巫师帽、毛线帽，甚至头顶小鸭子。整体属性明显更高。</p>
<p><strong>预期效果：</strong>全面发展的 Buddy，最低属性也不错。帽子增添了视觉个性，让你的 ASCII 艺术在终端中更加独特。</p>

<h4>★★★ 精良 (10%)</h4>
<p>只有十分之一的用户能投出精良。<strong>属性下限跃升至 25</strong>，即使是最弱的属性也很可观。强势属性可以达到 <strong>95+</strong>，使精良 Buddy 真正强大。</p>
<p><strong>预期效果：</strong>全面的强者。一个拥有有利物种-属性搭配的精良 Buddy（如高调试的<a href="/species/dragon">龙</a>或高智慧的<a href="/species/owl">猫头鹰</a>）是不可小觑的。</p>

<h4>★★★★ 史诗 (4%)</h4>
<p>史诗 Buddy 真正特别——只有 <strong>4%</strong> 的用户能看到这个等级。属性下限为 <strong>35</strong>，这意味着即使是弱势属性也高于平均水平。结合帽子和可能的闪光变体，史诗 Buddy 在视觉和数据上都令人印象深刻。</p>
<p><strong>预期效果：</strong>没有弱点的强者。史诗 Buddy 的最低属性往往超过普通 Buddy 的最高属性。这些是社区中引人注目的伙伴。</p>

<h4>★★★★★ 传说 (1%)</h4>
<p>圣杯级别。只有 <strong>1%</strong> 的用户能投出传说 Buddy。属性下限为 <strong>50</strong>，每项属性至少达到半满。强势属性可以达到 <strong>100</strong>——绝对完美。传说 Buddy 获得帽子，并且和其他等级一样有 1% 的闪光概率，但闪光传说是最稀有的组合，概率约为 <strong>0.01%</strong>。</p>
<p><strong>预期效果：</strong>终极炫耀。传说 Buddy 是话题的开端和荣誉的徽章。如果你有一个，请分享——社区会和你一起庆祝。</p>`
          },
          {
            heading: "各稀有度的属性范围",
            body: `<p>理解属性范围是评估你 Buddy 的关键。以下是完整的数据：</p>
<table>
<tr><th>稀有度</th><th>掉落率</th><th>属性下限</th><th>普通范围</th><th>强势属性范围</th><th>弱势属性范围</th><th>帽子</th></tr>
<tr><td>普通</td><td>60%</td><td>5</td><td>5 – 44</td><td>55 – 85</td><td>1 – 19</td><td>无</td></tr>
<tr><td>稀有</td><td>25%</td><td>15</td><td>15 – 54</td><td>65 – 95</td><td>5 – 29</td><td>随机</td></tr>
<tr><td>精良</td><td>10%</td><td>25</td><td>25 – 64</td><td>75 – 100</td><td>15 – 39</td><td>随机</td></tr>
<tr><td>史诗</td><td>4%</td><td>35</td><td>35 – 74</td><td>85 – 100</td><td>25 – 49</td><td>随机</td></tr>
<tr><td>传说</td><td>1%</td><td>50</td><td>50 – 89</td><td>100</td><td>40 – 64</td><td>随机</td></tr>
</table>
<p><strong>关键洞察：</strong>"强势属性"是你物种的特长——在下限基础上获得 +50 加成，再加上最多 30 点随机值。"弱势属性"是随机选择的（与强势不同），获得 -10 惩罚，只有 15 点随机范围。</p>
<p>这意味着<strong>传说 Buddy 的弱势属性（40–64）</strong>往往高于<strong>普通 Buddy 的普通属性（5–44）</strong>。这就是稀有度的力量。</p>`
          },
          {
            heading: "各稀有度的外观解锁",
            body: `<p>稀有度不仅影响属性——还决定了你 Buddy 的视觉外观：</p>
<h4>帽子（稀有及以上）</h4>
<p>普通 Buddy 没有帽子。其他所有等级会随机获得 <strong>8 种帽子</strong>之一：</p>
<table>
<tr><th>帽子</th><th>ASCII 预览</th><th>风格</th></tr>
<tr><td>皇冠</td><td><code>♛</code></td><td>皇家、威严</td></tr>
<tr><td>礼帽</td><td><code>▄█▄</code></td><td>优雅、高贵</td></tr>
<tr><td>螺旋桨帽</td><td><code>⌐╦╦═─</code></td><td>俏皮、异想天开</td></tr>
<tr><td>光环</td><td><code>◯</code></td><td>天使、纯洁</td></tr>
<tr><td>巫师帽</td><td><code>⌒*⌒</code></td><td>神秘、奥术</td></tr>
<tr><td>毛线帽</td><td><code>▓▓▓</code></td><td>休闲、温馨</td></tr>
<tr><td>小鸭子</td><td><code>🦆</code></td><td>可爱、元叙事</td></tr>
</table>
<p>帽子直接渲染在你 Buddy 的 ASCII 艺术上方，为终端增添独特的视觉标识。</p>

<h4>眼睛（所有稀有度）</h4>
<p>每个 Buddy 都会获得 6 种眼睛样式之一，与稀有度无关：<code>·</code> <code>✦</code> <code>×</code> <code>◉</code> <code>@</code> <code>°</code>。眼睛纯粹是装饰性的，但为你的 Buddy 增添了个性。</p>

<h4>闪光变体（1% — 所有稀有度）</h4>
<p>任何 Buddy，无论稀有度如何，都有 <strong>1%</strong> 的概率成为闪光版。闪光 Buddy 在 ASCII 艺术中获得闪烁效果（✨）。<strong>闪光传说</strong>的概率约为 <strong>0.01%</strong>（万分之一）——最稀有的 Buddy 配置。</p>`
          },
          {
            heading: "各稀有度的最佳物种搭配",
            body: `<p>虽然物种和稀有度是独立投掷的，但某些物种由于强势属性的搭配，在高稀有度下<strong>表现更佳</strong>：</p>
<h4>普通等级最佳</h4>
<p>即使在低属性下限下，强势属性仍然有用的物种：</p>
<ul>
<li><a href="/species/dragon">龙</a> — 强势：调试。即使是普通龙也能出色地调试。</li>
<li><a href="/species/cat">猫</a> — 强势：毒舌。个性无论属性如何都会闪耀。</li>
<li><a href="/species/goose">鹅</a> — 强势：混乱。混乱不需要高下限也能有趣。</li>
</ul>

<h4>精良及以上最佳</h4>
<p>属性下限提升后真正闪耀的物种：</p>
<ul>
<li><a href="/species/owl">猫头鹰</a> — 强势：智慧。精良以上的猫头鹰拥有 75+ 智慧，是终极顾问。</li>
<li><a href="/species/robot">机器人</a> — 强势：调试。高稀有度机器人是没有弱点的调试机器。</li>
<li><a href="/species/capybara">水豚</a> — 强势：耐心。史诗水豚是最禅意的伙伴。</li>
</ul>

<h4>传说等级最佳</h4>
<p>传说等级下每个物种都很惊艳，但这些尤其令人印象深刻：</p>
<ul>
<li><a href="/species/axolotl">美西螈</a> — 强势：调试。传说美西螈拥有 100 调试就是完美。</li>
<li><a href="/species/mushroom">蘑菇</a> — 强势：智慧。传说蘑菇 = 全知真菌。</li>
<li><a href="/species/ghost">幽灵</a> — 强势：混乱。传说幽灵拥有满混乱，美丽而恐怖。</li>
</ul>
<p>浏览<a href="/species">完整物种图鉴</a>查看所有 18 种物种及其属性倾向。</p>`
          },
          {
            heading: "如何查看你的稀有度",
            body: `<p>准备好发现你 Buddy 的稀有度了吗？只需不到 30 秒：</p>
<ol>
<li><strong>找到你的 UUID</strong> — 打开 Claude Code 输入 <code>What is my accountUuid?</code>，或在终端运行 <code>cat ~/.claude.json | grep accountUuid</code>。</li>
<li><strong>访问查询工具</strong> — 前往我们的 <a href="/">Buddy 查询器</a>并粘贴你的 UUID。</li>
<li><strong>查看结果</strong> — 你的稀有度、物种、属性和外观会立即显示。</li>
<li><strong>分享卡片</strong> — 点击 "SHARE CARD" 生成为 Twitter/X 优化的 1200×630 PNG 图片。</li>
</ol>
<p>所有计算<strong>完全在你的浏览器中运行</strong>。你的 UUID 永远不会发送到任何服务器。算法与 Claude Code 泄露源代码中发现的完全一致——你的结果保证与官方系统匹配。</p>
<p>得到了传说？在 Twitter/X 上用 <code>#ClaudeBuddy</code> 分享吧——社区会和你一起庆祝！得到了普通？别担心——每个物种都有独特的魅力，你的强势属性可能仍然令人惊叹。</p>`
          },
          {
            heading: "稀有度常见问题",
            body: `<h4>我可以重新投掷稀有度吗？</h4>
<p>不可以。你的 Buddy（包括稀有度）是从 UUID 确定性生成的。获得不同稀有度的唯一方法是使用不同的 Anthropic 账户。</p>
<h4>稀有度会影响我获得的物种吗？</h4>
<p>不会。物种和稀有度是独立投掷的。你可以在任何稀有度等级获得 18 种物种中的任何一种。传说鸭子和传说龙的概率完全相同。</p>
<h4>闪光传说的概率是多少？</h4>
<p>大约 <strong>0.01%</strong>（万分之一）。即 1% 传说 × 1% 闪光。如果你有一个，你赢得了 Buddy 彩票。</p>
<h4>高属性普通比低属性精良好吗？</h4>
<p>取决于属性。普通 Buddy 的强势属性（55–85）可以超过精良 Buddy 的普通属性（25–64）。但精良 Buddy 在所有属性上都有更高的下限，并且可以佩戴帽子。</p>
<h4>更高稀有度会获得更好的物种吗？</h4>
<p>不会。每种物种在每个稀有度等级的概率都相同。18 种物种均匀分布，与稀有度无关。</p>`
          },
        ],
      },
      ko: {
        title: "Claude Code Buddy 희귀도 완전 가이드",
        metaTitle: "Claude Code Buddy 희귀도 가이드 - 5단계 등급 완전 분석 (2026)",
        metaDescription: "Claude Code Buddy 희귀도 시스템 완전 가이드. 정확한 드롭률, 스탯 하한, 외형 해금, 전설 버디의 특별한 점을 알아보세요.",
        excerpt: "모든 버디가 동등하게 태어나는 것은 아닙니다. 일반(60%)부터 전설(1%)까지 5단계 희귀도가 있으며, 버디의 희귀도는 스탯 하한, 외형 옵션, 자랑거리를 결정합니다.",
        sections: [
          {
            heading: "Claude Code Buddy의 희귀도 메커니즘",
            body: `<p>UUID에서 버디가 생성될 때 알고리즘이 수행하는 <strong>첫 번째 롤</strong>이 바로 <strong>희귀도 등급</strong>입니다. 이 한 번의 롤이 버디의 기본 능력을 결정합니다 — 스탯 하한을 설정하고, 외형 옵션을 해금하며, 동반자의 희귀함을 정의합니다.</p>
<p>희귀도 시스템은 <strong>가중 랜덤 선택</strong>을 사용합니다. UUID가 솔트 <code>friend-2026-401</code>과 FNV-1a 알고리즘으로 해시된 후 Mulberry32 PRNG에 입력됩니다. 생성된 첫 번째 난수가 다음 누적 가중치에 따라 희귀도를 결정합니다:</p>
<pre><code>일반:    60% (롤 0.00 – 0.60)\n고급:    25% (롤 0.60 – 0.85)\n희귀:    10% (롤 0.85 – 0.95)\n에픽:     4% (롤 0.95 – 0.99)\n전설:     1% (롤 0.99 – 1.00)</code></pre>
<p>이것은 <strong>결정론적</strong>이므로 희귀도는 이미 결정되어 있습니다. 다시 롤할 수 없으며, 다른 희귀도를 얻는 유일한 방법은 다른 계정 UUID를 사용하는 것입니다.</p>`
          },
          {
            heading: "5단계 희귀도 등급 상세 설명",
            body: `<h4>★ 일반 (60%)</h4>
<p>가장 자주 나오는 등급입니다. 일반 버디의 <strong>스탯 하한은 5</strong>로, 각 스탯이 최소 5 이상입니다. <strong>모자가 없는</strong> 유일한 등급입니다. 가장 흔하지만 주력 스탯은 여전히 인상적인 85까지 올라갈 수 있습니다.</p>
<p><strong>기대할 점:</strong> 하나의 뛰어난 스탯을 가진 든든한 동반자. 일반 등급에서도 종의 개성이 빛납니다. 커뮤니티 대부분이 일반 버디를 가지고 있으므로 좋은 동료가 많습니다.</p>

<h4>★★ 고급 (25%)</h4>
<p>한 단계 업그레이드, <strong>스탯 하한 15</strong>. 고급 버디는 <strong>모자 시스템</strong>을 해금합니다 — 왕관, 실크햇, 프로펠러, 후광, 마법사 모자, 비니, 심지어 작은 오리까지 8가지 모자 중 하나를 받습니다.</p>
<p><strong>기대할 점:</strong> 균형 잡힌 버디로 최소 스탯도 괜찮습니다. 모자가 시각적 개성을 더해 터미널에서 ASCII 아트를 더 독특하게 만듭니다.</p>

<h4>★★★ 희귀 (10%)</h4>
<p>10명 중 1명만 희귀를 뽑습니다. <strong>스탯 하한이 25로 상승</strong>하여 가장 약한 스탯도 상당합니다. 주력 스탯은 <strong>95+</strong>에 도달할 수 있어 희귀 버디는 진정으로 강력합니다.</p>
<p><strong>기대할 점:</strong> 전반적으로 강한 성능. 유리한 종-스탯 조합의 희귀 버디(높은 디버깅의 <a href="/species/dragon">드래곤</a>이나 높은 지혜의 <a href="/species/owl">올빼미</a>)는 무시할 수 없는 존재입니다.</p>

<h4>★★★★ 에픽 (4%)</h4>
<p>에픽 버디는 정말 특별합니다 — <strong>100명 중 4명</strong>만 이 등급을 봅니다. 스탯 하한은 <strong>35</strong>로, 약점 스탯도 평균 이상입니다. 모자와 반짝이 변형 가능성까지 더해져 시각적으로도 수치적으로도 인상적입니다.</p>
<p><strong>기대할 점:</strong> 약점 없는 강자. 에픽 버디의 최저 스탯이 일반 버디의 최고 스탯을 넘는 경우가 많습니다.</p>

<h4>★★★★★ 전설 (1%)</h4>
<p>성배입니다. <strong>100명 중 1명</strong>만 전설 버디를 뽑습니다. 스탯 하한 <strong>50</strong>으로 모든 스탯이 최소 절반 이상입니다. 주력 스탯은 <strong>100</strong>에 도달할 수 있습니다 — 절대적 완벽. 반짝이 전설은 약 <strong>0.01%</strong> 확률로 가장 희귀한 조합입니다.</p>
<p><strong>기대할 점:</strong> 궁극의 자랑거리. 전설 버디는 대화의 시작이자 명예의 배지입니다. 가지고 있다면 공유하세요 — 커뮤니티가 함께 축하할 것입니다.</p>`
          },
          {
            heading: "희귀도별 스탯 범위",
            body: `<p>스탯 범위를 이해하는 것이 버디를 평가하는 핵심입니다. 완전한 분석표입니다:</p>
<table>
<tr><th>희귀도</th><th>드롭률</th><th>스탯 하한</th><th>일반 범위</th><th>주력 스탯 범위</th><th>약점 스탯 범위</th><th>모자</th></tr>
<tr><td>일반</td><td>60%</td><td>5</td><td>5 – 44</td><td>55 – 85</td><td>1 – 19</td><td>없음</td></tr>
<tr><td>고급</td><td>25%</td><td>15</td><td>15 – 54</td><td>65 – 95</td><td>5 – 29</td><td>랜덤</td></tr>
<tr><td>희귀</td><td>10%</td><td>25</td><td>25 – 64</td><td>75 – 100</td><td>15 – 39</td><td>랜덤</td></tr>
<tr><td>에픽</td><td>4%</td><td>35</td><td>35 – 74</td><td>85 – 100</td><td>25 – 49</td><td>랜덤</td></tr>
<tr><td>전설</td><td>1%</td><td>50</td><td>50 – 89</td><td>100</td><td>40 – 64</td><td>랜덤</td></tr>
</table>
<p><strong>핵심 인사이트:</strong> "주력 스탯"은 종의 특기로, 하한 위에 +50 보너스와 최대 30 랜덤 포인트가 추가됩니다. "약점 스탯"은 랜덤으로 선택되며(주력과 다름) -10 페널티와 15 랜덤 포인트 범위만 있습니다.</p>
<p>이것은 <strong>전설 버디의 약점 스탯(40–64)</strong>이 <strong>일반 버디의 일반 스탯(5–44)</strong>보다 높은 경우가 많다는 것을 의미합니다. 이것이 희귀도의 힘입니다.</p>`
          },
          {
            heading: "희귀도별 외형 해금",
            body: `<p>희귀도는 스탯뿐만 아니라 버디의 시각적 외형도 결정합니다:</p>
<h4>모자 (고급 이상)</h4>
<p>일반 버디는 모자가 없습니다. 다른 모든 등급은 <strong>8가지 모자</strong> 중 하나를 랜덤으로 받습니다:</p>
<table>
<tr><th>모자</th><th>ASCII 미리보기</th><th>분위기</th></tr>
<tr><td>왕관</td><td><code>♛</code></td><td>왕실, 위엄</td></tr>
<tr><td>실크햇</td><td><code>▄█▄</code></td><td>고급, 품위</td></tr>
<tr><td>프로펠러</td><td><code>⌐╦╦═─</code></td><td>장난, 기발</td></tr>
<tr><td>후광</td><td><code>◯</code></td><td>천사, 순수</td></tr>
<tr><td>마법사</td><td><code>⌒*⌒</code></td><td>신비, 마법</td></tr>
<tr><td>비니</td><td><code>▓▓▓</code></td><td>캐주얼, 아늑</td></tr>
<tr><td>작은 오리</td><td><code>🦆</code></td><td>귀여움, 메타</td></tr>
</table>
<p>모자는 터미널에서 버디의 ASCII 아트 위에 직접 렌더링되어 독특한 시각적 시그니처를 추가합니다.</p>

<h4>눈 (모든 희귀도)</h4>
<p>모든 버디는 희귀도와 관계없이 6가지 눈 스타일 중 하나를 받습니다: <code>·</code> <code>✦</code> <code>×</code> <code>◉</code> <code>@</code> <code>°</code>. 눈은 순수 장식이지만 버디의 개성에 기여합니다.</p>

<h4>반짝이 변형 (1% — 모든 희귀도)</h4>
<p>모든 버디는 희귀도와 관계없이 <strong>1%</strong> 확률로 반짝이가 됩니다. 반짝이 버디는 ASCII 아트에 반짝임 효과(✨)를 받습니다. <strong>반짝이 전설</strong>은 약 <strong>0.01%</strong>(만 분의 1) 확률 — 가장 희귀한 버디 구성입니다.</p>`
          },
          {
            heading: "희귀도별 최고의 종 조합",
            body: `<p>종과 희귀도는 독립적으로 롤되지만, 특정 종은 주력 스탯 정렬로 인해 높은 희귀도에서 <strong>더 좋은 시너지</strong>를 발휘합니다:</p>
<h4>일반 등급 최고</h4>
<p>낮은 하한에서도 주력 스탯이 유용한 종:</p>
<ul>
<li><a href="/species/dragon">드래곤</a> — 주력: 디버깅. 일반 드래곤도 훌륭하게 디버깅합니다.</li>
<li><a href="/species/cat">고양이</a> — 주력: 독설. 스탯과 관계없이 개성이 빛납니다.</li>
<li><a href="/species/goose">거위</a> — 주력: 혼돈. 혼돈은 높은 하한이 필요 없어도 재미있습니다.</li>
</ul>

<h4>희귀 이상 최고</h4>
<p>스탯 하한이 올라가면 진정으로 빛나는 종:</p>
<ul>
<li><a href="/species/owl">올빼미</a> — 주력: 지혜. 희귀 이상 올빼미의 75+ 지혜는 궁극의 조언자입니다.</li>
<li><a href="/species/robot">로봇</a> — 주력: 디버깅. 고희귀도 로봇은 약점 없는 디버깅 머신입니다.</li>
<li><a href="/species/capybara">카피바라</a> — 주력: 인내. 에픽 카피바라는 가장 선(禪)적인 동반자입니다.</li>
</ul>

<h4>전설 등급 최고</h4>
<p>전설에서는 모든 종이 놀랍지만, 특히 인상적인 종:</p>
<ul>
<li><a href="/species/axolotl">아홀로틀</a> — 주력: 디버깅. 전설 아홀로틀의 100 디버깅은 완벽입니다.</li>
<li><a href="/species/mushroom">버섯</a> — 주력: 지혜. 전설 버섯 = 전지전능한 균류.</li>
<li><a href="/species/ghost">유령</a> — 주력: 혼돈. 전설 유령의 만렙 혼돈은 아름답게 무섭습니다.</li>
</ul>
<p><a href="/species">전체 종 가이드</a>에서 18가지 종과 스탯 경향을 확인하세요.</p>`
          },
          {
            heading: "희귀도 확인 방법",
            body: `<p>버디의 희귀도를 확인할 준비가 되셨나요? 30초도 안 걸립니다:</p>
<ol>
<li><strong>UUID 찾기</strong> — Claude Code를 열고 <code>What is my accountUuid?</code>를 입력하거나, 터미널에서 <code>cat ~/.claude.json | grep accountUuid</code>를 실행하세요.</li>
<li><strong>체커 방문</strong> — <a href="/">Buddy 체커</a>로 이동하여 UUID를 붙여넣으세요.</li>
<li><strong>결과 확인</strong> — 희귀도, 종, 스탯, 외형이 즉시 표시됩니다.</li>
<li><strong>카드 공유</strong> — "SHARE CARD"를 클릭하여 Twitter/X에 최적화된 1200×630 PNG를 생성하세요.</li>
</ol>
<p>모든 계산은 <strong>브라우저에서 완전히 실행</strong>됩니다. UUID는 어떤 서버로도 전송되지 않습니다. 알고리즘은 Claude Code 유출 소스 코드에서 발견된 것과 동일합니다 — 결과가 공식 시스템과 일치함을 보장합니다.</p>
<p>전설을 받았나요? Twitter/X에서 <code>#ClaudeBuddy</code>로 공유하세요 — 커뮤니티가 함께 축하할 것입니다! 일반을 받았나요? 걱정 마세요 — 모든 종은 고유한 매력이 있고, 주력 스탯은 여전히 놀라울 수 있습니다.</p>`
          },
          {
            heading: "희귀도 FAQ",
            body: `<h4>희귀도를 다시 롤할 수 있나요?</h4>
<p>아니요. 버디(희귀도 포함)는 UUID에서 결정론적으로 생성됩니다. 다른 희귀도를 얻는 유일한 방법은 다른 Anthropic 계정을 사용하는 것입니다.</p>
<h4>희귀도가 종에 영향을 미치나요?</h4>
<p>아니요. 종과 희귀도는 독립적으로 롤됩니다. 어떤 희귀도 등급에서든 18종 중 어떤 것이든 받을 수 있습니다. 전설 오리는 전설 드래곤과 같은 확률입니다.</p>
<h4>반짝이 전설의 확률은?</h4>
<p>약 <strong>0.01%</strong>(만 분의 1). 1% 전설 × 1% 반짝이입니다. 가지고 있다면 버디 복권에 당첨된 것입니다.</p>
<h4>높은 스탯 일반이 낮은 스탯 희귀보다 나은가요?</h4>
<p>스탯에 따라 다릅니다. 일반 버디의 주력 스탯(55–85)이 희귀 버디의 일반 스탯(25–64)을 넘을 수 있습니다. 하지만 희귀 버디는 모든 스탯에서 더 높은 하한을 가지며 모자도 착용할 수 있습니다.</p>
<h4>높은 희귀도가 더 좋은 종을 주나요?</h4>
<p>아니요. 모든 종은 모든 희귀도 등급에서 동일한 확률입니다. 18종은 희귀도와 관계없이 균등하게 분포됩니다.</p>`
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
