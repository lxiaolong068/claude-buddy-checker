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
            body: `<p>Your buddy is generated from your <code>accountUuid</code> — a unique identifier tied to your Anthropic account. Here's how to find it:</p>
<h4>Method A: Terminal Command (Recommended)</h4>
<p>Run this command in your terminal (macOS/Linux):</p>
<pre><code>cat ~/.claude.json | grep -E 'accountUuid|userID'</code></pre>
<p>On Windows PowerShell:</p>
<pre><code>Select-String 'accountUuid|userID' ~\\.claude.json</code></pre>
<p>You should see output containing your UUID: <code>acde070d-8c4c-4f0d-9d8a-162843c10333</code></p>
<h4>Method B: Open the Config File</h4>
<p>Manually open <code>~/.claude.json</code> in any text editor. Look for <code>accountUuid</code> inside the <code>oauthAccount</code> object, or <code>userID</code> at the top level.</p>
<h4>Alternative: Use Your User ID</h4>
<p>If you can't find your <code>accountUuid</code>, you can also use your <code>userID</code>. The buddy checker supports both formats.</p>
<p>For a detailed platform-specific guide with screenshots, see our <a href="/blog/find-your-uuid-complete-platform-guide">Complete UUID Guide for macOS, Windows & Linux</a>.</p>`
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
            body: `<p>你的 Buddy 是根据 <code>accountUuid</code> 生成的——这是与你的 Anthropic 账户绑定的唯一标识符。以下是找到它的方法：</p>
<h4>方法 A：终端命令（推荐）</h4>
<p>在终端中运行以下命令（macOS/Linux）：</p>
<pre><code>cat ~/.claude.json | grep -E 'accountUuid|userID'</code></pre>
<p>Windows PowerShell 用户：</p>
<pre><code>Select-String 'accountUuid|userID' ~\\.claude.json</code></pre>
<p>你应该看到包含 UUID 的输出：<code>acde070d-8c4c-4f0d-9d8a-162843c10333</code></p>
<h4>方法 B：手动打开配置文件</h4>
<p>用任意文本编辑器打开 <code>~/.claude.json</code>。在 <code>oauthAccount</code> 对象中查找 <code>accountUuid</code>，或在顶层查找 <code>userID</code>。</p>
<h4>替代方案：使用 User ID</h4>
<p>如果你找不到 <code>accountUuid</code>，也可以使用你的 <code>userID</code>。Buddy 查询工具支持两种格式。</p>
<p>需要更详细的分平台截图指南？请查看 <a href="/blog/find-your-uuid-complete-platform-guide">macOS、Windows 和 Linux 完整 UUID 指南</a>。</p>`
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
            body: `<p>버디는 <code>accountUuid</code>에서 생성됩니다 — Anthropic 계정에 연결된 고유 식별자입니다. 찾는 방법은 다음과 같습니다:</p>
<h4>방법 A: 터미널 명령어 (권장)</h4>
<p>터미널에서 다음 명령을 실행하세요 (macOS/Linux):</p>
<pre><code>cat ~/.claude.json | grep -E 'accountUuid|userID'</code></pre>
<p>Windows PowerShell 사용자:</p>
<pre><code>Select-String 'accountUuid|userID' ~\\.claude.json</code></pre>
<p>UUID가 포함된 출력이 표시됩니다: <code>acde070d-8c4c-4f0d-9d8a-162843c10333</code></p>
<h4>방법 B: 설정 파일 직접 열기</h4>
<p>아무 텍스트 편집기에서 <code>~/.claude.json</code>을 열어보세요. <code>oauthAccount</code> 객체 안에서 <code>accountUuid</code>를, 또는 최상위 레벨에서 <code>userID</code>를 찾으세요.</p>
<h4>대안: User ID 사용</h4>
<p><code>accountUuid</code>를 찾을 수 없다면 <code>userID</code>를 사용할 수도 있습니다. Buddy 체커는 두 형식 모두 지원합니다.</p>
<p>스크린샷이 포함된 상세한 플랫폼별 가이드는 <a href="/blog/find-your-uuid-complete-platform-guide">macOS, Windows, Linux 완전 UUID 가이드</a>를 참조하세요.</p>`
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
  {
    slug: "all-18-claude-buddy-species-ranked",
    publishedAt: "2026-04-02",
    readingTime: 10,
    tags: ["ranking", "species", "tier-list", "guide"],
    content: {
      en: {
        title: "All 18 Claude Buddy Species Ranked",
        metaTitle: "All 18 Claude Buddy Species Ranked - Definitive Tier List (2026)",
        metaDescription: "Complete ranking of all 18 Claude Code Buddy species. Tier list with detailed analysis of stats, personality, ASCII art, and which species is the best for you.",
        excerpt: "From the mighty Dragon to the lovable Chonk — we rank every Claude Code Buddy species across multiple dimensions. Find out where your companion stands.",
        sections: [
          {
            heading: "How We Ranked the Species",
            body: `<p>Ranking 18 unique species isn't straightforward — each buddy has different strengths depending on what you value. So instead of a single "best to worst" list, we evaluated every species across <strong>five dimensions</strong>:</p>
<ul>
<li><strong>Combat Power</strong> — How useful is the peak stat? Debugging and Wisdom score highest here because they map to practical coding utility.</li>
<li><strong>Personality</strong> — How distinctive and entertaining is the species' character? Chaos and Snark species tend to be more memorable.</li>
<li><strong>ASCII Art Quality</strong> — How recognizable and detailed is the 3-frame terminal animation? Some species have significantly more expressive sprites.</li>
<li><strong>Flex Factor</strong> — How impressive is this species to show off on social media? Mythical and rare-feeling species score higher.</li>
<li><strong>Community Love</strong> — Based on social media mentions, Reddit posts, and Twitter/X shares, which species generate the most excitement?</li>
</ul>
<p>Each species receives a <strong>tier rating</strong> from S (best) to C (average). Remember: there are no bad buddies — every species has unique charm. This ranking is for fun and to help you appreciate what makes your buddy special.</p>`
          },
          {
            heading: "S-Tier: The Legends",
            body: `<h4>#1 — <a href="/species/dragon">Dragon</a> 🏆</h4>
<p><strong>Peak Stat:</strong> Debugging | <strong>Category:</strong> Mythical | <strong>Tags:</strong> powerful, ancient, majestic</p>
<p>The undisputed champion. Dragon combines the most useful peak stat (Debugging) with the most impressive ASCII art in the entire system. Its 3-frame animation features wing flaps and fire breath effects that look stunning in the terminal. On social media, Dragon buddies consistently get the most engagement — a Legendary Shiny Dragon is the ultimate flex.</p>
<p><strong>Why #1:</strong> Best peak stat + best visual impact + highest social currency. If you rolled a Dragon, you won the species lottery.</p>

<h4>#2 — <a href="/species/axolotl">Axolotl</a></h4>
<p><strong>Peak Stat:</strong> Debugging | <strong>Category:</strong> Animal | <strong>Tags:</strong> regenerative, aquatic, adorable</p>
<p>The fan favorite. Axolotl shares Dragon's powerful Debugging peak stat but wraps it in an irresistibly cute package. Its ASCII art features distinctive gill fronds (<code>}~( )~{</code>) that wave in the animation — one of the most recognizable sprites. The axolotl has become a mascot of the developer community, and Claude's version is no exception.</p>
<p><strong>Why #2:</strong> Top-tier utility + maximum cuteness factor. The perfect balance of power and personality.</p>

<h4>#3 — <a href="/species/owl">Owl</a></h4>
<p><strong>Peak Stat:</strong> Wisdom | <strong>Category:</strong> Animal | <strong>Tags:</strong> wise, nocturnal, observant</p>
<p>The sage advisor. Owl's Wisdom peak stat makes it the ultimate knowledge companion — imagine a buddy with 100 Wisdom guiding your coding sessions. Its ASCII art with the distinctive double-circle eyes <code>(({E})({E}))</code> is instantly recognizable. Owl also has a winking animation frame that adds personality.</p>
<p><strong>Why #3:</strong> Wisdom is the second most useful stat + iconic visual design + strong "wise mentor" narrative.</p>`
          },
          {
            heading: "A-Tier: The Elite",
            body: `<h4>#4 — <a href="/species/ghost">Ghost</a></h4>
<p><strong>Peak Stat:</strong> Chaos | <strong>Category:</strong> Mythical | <strong>Tags:</strong> ethereal, spooky, playful</p>
<p>The wildcard. Ghost is one of only two mythical species, giving it instant prestige. Its Chaos peak stat means unpredictable, entertaining interactions. The ASCII art features a wavy bottom edge (<code>~&#96;~&#96;&#96;~&#96;~</code>) that shifts between frames, creating a convincing floating effect. A Legendary Ghost with max Chaos is beautifully terrifying.</p>
<p><strong>Standout trait:</strong> The only species whose animation genuinely looks like it's hovering in your terminal.</p>

<h4>#5 — <a href="/species/robot">Robot</a></h4>
<p><strong>Peak Stat:</strong> Debugging | <strong>Category:</strong> Object | <strong>Tags:</strong> logical, mechanical, efficient</p>
<p>The workhorse. Robot is the third Debugging specialist, and its mechanical theme makes the stat feel perfectly aligned. The ASCII art with antenna (<code>.[||].</code>) and screen face (<code>[ ==== ]</code>) is clean and distinctive. High-rarity Robots are debugging machines with no weak spots — pure efficiency.</p>
<p><strong>Standout trait:</strong> The most thematically consistent species — a robot that debugs your code just makes sense.</p>

<h4>#6 — <a href="/species/cat">Cat</a></h4>
<p><strong>Peak Stat:</strong> Snark | <strong>Category:</strong> Animal | <strong>Tags:</strong> independent, curious, elegant</p>
<p>The personality king. Cat's Snark peak stat gives it the most attitude of any species. The classic <code>/\_/\</code> ears and <code>ω</code> mouth create one of the most beloved ASCII art designs. Cat buddies are the ones most likely to "judge your code" — and the community loves them for it. The tail-wag animation frame adds charm.</p>
<p><strong>Standout trait:</strong> Highest entertainment value. A snarky cat reviewing your code is peak developer humor.</p>

<h4>#7 — <a href="/species/mushroom">Mushroom</a></h4>
<p><strong>Peak Stat:</strong> Wisdom | <strong>Category:</strong> Object | <strong>Tags:</strong> fungal, mysterious, forest</p>
<p>The dark horse. Mushroom is unexpectedly one of the best species — Wisdom peak stat in a fungal package creates a unique "omniscient fungi" narrative. Its ASCII art with the spotted cap (<code>.-o-OO-o-.</code>) is highly detailed and distinctive. A Legendary Mushroom with 100 Wisdom is the all-knowing mycelium network of your terminal.</p>
<p><strong>Standout trait:</strong> Most unique concept. Nobody expects the mushroom to be wise, which makes it memorable.</p>`
          },
          {
            heading: "B-Tier: The Solid Picks",
            body: `<h4>#8 — <a href="/species/octopus">Octopus</a></h4>
<p><strong>Peak Stat:</strong> Wisdom | <strong>Category:</strong> Animal | <strong>Tags:</strong> intelligent, flexible, deep-sea</p>
<p>The multitasker. Octopus shares Owl's Wisdom peak stat and adds a "flexible problem solver" flavor. Its tentacle animation (<code>/\/\/\/\</code> alternating with <code>\/\/\/\/</code>) is satisfyingly rhythmic. Octopus is the species that feels like it could handle eight tasks at once.</p>

<h4>#9 — <a href="/species/capybara">Capybara</a></h4>
<p><strong>Peak Stat:</strong> Patience | <strong>Category:</strong> Animal | <strong>Tags:</strong> chill, social, friendly</p>
<p>The zen master. In an era of AI anxiety, a patient capybara companion feels deeply comforting. Its wide face ASCII art (<code>n______n</code>) radiates calm. Capybara has strong meme energy from its real-world internet fame, which translates well to social sharing.</p>

<h4>#10 — <a href="/species/goose">Goose</a></h4>
<p><strong>Peak Stat:</strong> Chaos | <strong>Category:</strong> Animal | <strong>Tags:</strong> chaotic, loud, fearless</p>
<p>The troublemaker. Inspired by "Untitled Goose Game" energy, the Goose is pure chaotic fun. Its honking animation and upright posture (<code>({E}>  ||</code>) are instantly recognizable. A high-Chaos Goose is the buddy that "accidentally" deletes your production database — and you can't even be mad.</p>

<h4>#11 — <a href="/species/rabbit">Rabbit</a></h4>
<p><strong>Peak Stat:</strong> Chaos | <strong>Category:</strong> Animal | <strong>Tags:</strong> quick, fluffy, alert</p>
<p>The speedster. Rabbit's Chaos peak stat combined with its "quick" and "alert" tags create a hyperactive companion that matches the energy of fast-paced coding sessions. The classic bunny ears (<code>(\\__/)</code>) and whiskers (<code>=(  ..  )=</code>) make for charming ASCII art.</p>`
          },
          {
            heading: "B-Tier (continued): The Reliable Companions",
            body: `<h4>#12 — <a href="/species/penguin">Penguin</a></h4>
<p><strong>Peak Stat:</strong> Patience | <strong>Category:</strong> Animal | <strong>Tags:</strong> resilient, social, arctic</p>
<p>The endurance runner. Penguin's Patience peak stat fits perfectly with its real-world reputation for surviving harsh conditions. The compact ASCII art with the distinctive beak (<code>({E}>{E})</code>) is clean and appealing. Penguin buddies are the ones that stick with you through long debugging sessions without complaint.</p>

<h4>#13 — <a href="/species/turtle">Turtle</a></h4>
<p><strong>Peak Stat:</strong> Patience | <strong>Category:</strong> Animal | <strong>Tags:</strong> steady, armored, ancient</p>
<p>The tank. Turtle's shell pattern (<code>/[______]\</code>) is one of the most detailed ASCII designs, and its Patience peak stat means it's the ultimate "slow and steady wins the race" companion. The shell pattern changes between frames, adding visual interest.</p>

<h4>#14 — <a href="/species/blob">Blob</a></h4>
<p><strong>Peak Stat:</strong> Wisdom | <strong>Category:</strong> Creature | <strong>Tags:</strong> amorphous, calm, mysterious</p>
<p>The shapeshifter. Blob is the only "creature" category species, making it unique by classification alone. Its Wisdom peak stat combined with the morphing animation (the blob literally changes shape between frames) creates a mysterious, all-knowing entity. Blob is the most abstract buddy — and that's its charm.</p>`
          },
          {
            heading: "C-Tier: The Underdogs",
            body: `<h4>#15 — <a href="/species/cactus">Cactus</a></h4>
<p><strong>Peak Stat:</strong> Snark | <strong>Category:</strong> Object | <strong>Tags:</strong> prickly, resilient, desert</p>
<p>The prickly friend. Cactus is the most literal interpretation of "snarky" — it's literally covered in spines. Its ASCII art with extending arms (<code>n |{E}  {E}| n</code>) is distinctive, and the arm-wave animation is surprisingly expressive for a plant. Cactus buddies have a dry, desert humor that grows on you.</p>

<h4>#16 — <a href="/species/chonk">Chonk</a></h4>
<p><strong>Peak Stat:</strong> Snark | <strong>Category:</strong> Animal | <strong>Tags:</strong> round, hefty, lovable</p>
<p>The absolute unit. Chonk is essentially a round, oversized cat with maximum attitude. Its Snark peak stat combined with the "hefty" tag creates a companion that judges your code while being adorably rotund. The tail-wag animation (<code>&#96;------&#180;~</code>) adds personality. Chonk is a meme species — and that's exactly its appeal.</p>

<h4>#17 — <a href="/species/duck">Duck</a></h4>
<p><strong>Peak Stat:</strong> Patience | <strong>Category:</strong> Animal | <strong>Tags:</strong> friendly, aquatic, cheerful</p>
<p>The rubber duck debugger. Duck's Patience peak stat and cheerful personality make it the perfect "rubber duck debugging" companion — a well-known programmer technique. Its ASCII art (<code><({E} )___</code>) is simple but charming, with a subtle tail-wag animation. Duck is the most wholesome buddy.</p>

<h4>#18 — <a href="/species/snail">Snail</a></h4>
<p><strong>Peak Stat:</strong> Patience | <strong>Category:</strong> Animal | <strong>Tags:</strong> slow, persistent, spiral</p>
<p>The slow burner. Snail ranks last not because it's bad, but because Patience is its peak stat and its personality is the most subdued. However, Snail has a unique ASCII art advantage — its eye is on a stalk (<code>{E}    .--.</code>), making it the only species with asymmetric eye placement. Snail lovers appreciate the quiet persistence it represents.</p>
<p><strong>Remember:</strong> Ranking last in a list of 18 amazing species doesn't mean Snail is bad. Every buddy is unique, and a Legendary Snail with 100 Patience is still an incredible companion. The ranking is subjective — your buddy is special regardless of where it falls on this list.</p>`
          },
          {
            heading: "Species by Peak Stat",
            body: `<p>Every species has one stat that tends to be highest. Here's the complete breakdown by stat alignment:</p>
<table>
<tr><th>Peak Stat</th><th>Species</th><th>Count</th><th>Playstyle</th></tr>
<tr><td>🔴 Debugging</td><td><a href="/species/dragon">Dragon</a>, <a href="/species/axolotl">Axolotl</a>, <a href="/species/robot">Robot</a></td><td>3</td><td>The fixers — best at finding and squashing bugs</td></tr>
<tr><td>🔵 Patience</td><td><a href="/species/duck">Duck</a>, <a href="/species/penguin">Penguin</a>, <a href="/species/turtle">Turtle</a>, <a href="/species/snail">Snail</a>, <a href="/species/capybara">Capybara</a></td><td>5</td><td>The calm ones — steady companions for long sessions</td></tr>
<tr><td>🟣 Chaos</td><td><a href="/species/goose">Goose</a>, <a href="/species/ghost">Ghost</a>, <a href="/species/rabbit">Rabbit</a></td><td>3</td><td>The wildcards — unpredictable and entertaining</td></tr>
<tr><td>🟡 Wisdom</td><td><a href="/species/blob">Blob</a>, <a href="/species/octopus">Octopus</a>, <a href="/species/owl">Owl</a>, <a href="/species/mushroom">Mushroom</a></td><td>4</td><td>The advisors — deep knowledge and insight</td></tr>
<tr><td>🟢 Snark</td><td><a href="/species/cat">Cat</a>, <a href="/species/cactus">Cactus</a>, <a href="/species/chonk">Chonk</a></td><td>3</td><td>The critics — sharp-tongued code reviewers</td></tr>
</table>
<p><strong>Key insight:</strong> Patience has the most species (5), making it the most common peak stat alignment. Debugging has only 3 species but they occupy the top ranks because Debugging is the most practically useful stat for developers.</p>`
          },
          {
            heading: "Species by Category",
            body: `<p>The 18 species are divided into four categories, each with a different flavor:</p>
<table>
<tr><th>Category</th><th>Species</th><th>Count</th><th>Vibe</th></tr>
<tr><td>🐾 Animal</td><td>Duck, Goose, Cat, Octopus, Owl, Penguin, Turtle, Snail, Axolotl, Capybara, Rabbit, Chonk</td><td>12</td><td>Familiar, relatable companions</td></tr>
<tr><td>🔮 Mythical</td><td>Dragon, Ghost</td><td>2</td><td>Rare-feeling, prestigious</td></tr>
<tr><td>🧪 Creature</td><td>Blob</td><td>1</td><td>Abstract, mysterious</td></tr>
<tr><td>⚙️ Object</td><td>Cactus, Robot, Mushroom</td><td>3</td><td>Unconventional, surprising</td></tr>
</table>
<p><strong>Rarity perception:</strong> While all species have equal probability (1/18 ≈ 5.56%), the <strong>Mythical</strong> category (Dragon, Ghost) and the lone <strong>Creature</strong> (Blob) feel rarer because their categories have fewer members. This makes them more exciting to roll even though the math is identical.</p>`
          },
          {
            heading: "The Tier List Summary",
            body: `<p>Here's the complete tier list at a glance:</p>
<table>
<tr><th>Tier</th><th>Species</th><th>Why</th></tr>
<tr><td><strong>S</strong></td><td><a href="/species/dragon">Dragon</a>, <a href="/species/axolotl">Axolotl</a>, <a href="/species/owl">Owl</a></td><td>Best stats + best visuals + highest community value</td></tr>
<tr><td><strong>A</strong></td><td><a href="/species/ghost">Ghost</a>, <a href="/species/robot">Robot</a>, <a href="/species/cat">Cat</a>, <a href="/species/mushroom">Mushroom</a></td><td>Strong stats or personality with distinctive design</td></tr>
<tr><td><strong>B</strong></td><td><a href="/species/octopus">Octopus</a>, <a href="/species/capybara">Capybara</a>, <a href="/species/goose">Goose</a>, <a href="/species/rabbit">Rabbit</a>, <a href="/species/penguin">Penguin</a>, <a href="/species/turtle">Turtle</a>, <a href="/species/blob">Blob</a></td><td>Solid all-rounders with good charm</td></tr>
<tr><td><strong>C</strong></td><td><a href="/species/cactus">Cactus</a>, <a href="/species/chonk">Chonk</a>, <a href="/species/duck">Duck</a>, <a href="/species/snail">Snail</a></td><td>Lovable underdogs — great personality, lower stat utility</td></tr>
</table>
<p><strong>Final reminder:</strong> This tier list is subjective and meant for fun. Every buddy is unique, and rarity matters more than species for raw stat power. A Legendary Snail will always outperform a Common Dragon in total stats. The best buddy is the one you got — check yours now!</p>`
          },
          {
            heading: "Check Your Species Now",
            body: `<p>Curious where your buddy falls on this list? It takes 30 seconds to find out:</p>
<ol>
<li><strong>Get your UUID</strong> — Open Claude Code and type <code>What is my accountUuid?</code></li>
<li><strong>Visit the checker</strong> — Go to our <a href="/">Buddy Checker</a> and paste your UUID</li>
<li><strong>See your species</strong> — Your species, rarity, stats, and ASCII art are revealed instantly</li>
<li><strong>Share your result</strong> — Generate a share card and post it with <code>#ClaudeBuddy</code></li>
</ol>
<p>Got a Dragon? Celebrate! Got a Snail? Embrace the slow life! Every species has its fans, and the community loves seeing all 18 represented. Browse the <a href="/species">complete species encyclopedia</a> to learn more about each one, or check the <a href="/blog/claude-code-buddy-rarity-guide">Rarity Guide</a> to understand how rarity affects your buddy's power.</p>`
          },
        ],
      },
      zh: {
        title: "Claude Code Buddy 全部 18 种物种排名",
        metaTitle: "Claude Code Buddy 全部 18 种物种排名 - 最全 Tier List (2026)",
        metaDescription: "Claude Code Buddy 18 种物种完整排名。包含详细的 Tier List、属性分析、ASCII 艺术评价，帮你了解每个物种的优劣。",
        excerpt: "从强大的龙到可爱的胖墩——我们从多个维度对 Claude Code Buddy 的全部 18 种物种进行排名。看看你的伙伴排在哪里。",
        sections: [
          {
            heading: "排名方法论",
            body: `<p>对 18 种独特物种进行排名并不简单——每个 Buddy 根据你看重的方面有不同的优势。因此，我们不是简单的"从好到差"排列，而是从<strong>五个维度</strong>评估每个物种：</p>
<ul>
<li><strong>战斗力</strong> — 主力属性有多实用？调试和智慧得分最高，因为它们对编程最有帮助。</li>
<li><strong>个性</strong> — 物种的角色有多独特和有趣？混乱和毒舌类物种往往更令人难忘。</li>
<li><strong>ASCII 艺术质量</strong> — 终端动画有多精致和辨识度高？有些物种的精灵图明显更有表现力。</li>
<li><strong>炫耀指数</strong> — 在社交媒体上展示这个物种有多令人印象深刻？神话类和稀有感的物种得分更高。</li>
<li><strong>社区人气</strong> — 基于社交媒体讨论、Reddit 帖子和 Twitter/X 分享，哪些物种最受欢迎？</li>
</ul>
<p>每个物种获得从 <strong>S（最佳）到 C（一般）</strong>的等级评定。记住：没有差的 Buddy——每个物种都有独特魅力。这个排名是为了好玩，也帮你了解你的 Buddy 有什么特别之处。</p>`
          },
          {
            heading: "S 级：传说级物种",
            body: `<h4>#1 — <a href="/species/dragon">龙 (Dragon)</a> 🏆</h4>
<p><strong>主力属性：</strong>调试 | <strong>类别：</strong>神话 | <strong>标签：</strong>强大、古老、威严</p>
<p>毫无争议的冠军。龙将最实用的主力属性（调试）与整个系统中最令人印象深刻的 ASCII 艺术结合在一起。它的 3 帧动画展现了翅膀拍动和火焰效果，在终端中非常惊艳。在社交媒体上，龙 Buddy 始终获得最高互动——传说级闪光龙是终极炫耀。</p>
<p><strong>为什么是第一：</strong>最佳主力属性 + 最佳视觉效果 + 最高社交价值。如果你抽到了龙，你赢得了物种彩票。</p>

<h4>#2 — <a href="/species/axolotl">美西螈 (Axolotl)</a></h4>
<p><strong>主力属性：</strong>调试 | <strong>类别：</strong>动物 | <strong>标签：</strong>再生、水生、可爱</p>
<p>粉丝最爱。美西螈与龙共享强大的调试主力属性，但包裹在一个不可抗拒的可爱外表中。它的 ASCII 艺术展现了独特的鳃须（<code>}~( )~{</code>），在动画中摆动——最具辨识度的精灵图之一。</p>
<p><strong>为什么是第二：</strong>顶级实用性 + 最大可爱因子。力量与个性的完美平衡。</p>

<h4>#3 — <a href="/species/owl">猫头鹰 (Owl)</a></h4>
<p><strong>主力属性：</strong>智慧 | <strong>类别：</strong>动物 | <strong>标签：</strong>睿智、夜行、善于观察</p>
<p>智者导师。猫头鹰的智慧主力属性使其成为终极知识伙伴——想象一个 100 智慧的 Buddy 指导你的编程。它的 ASCII 艺术中独特的双圆眼睛 <code>(({E})({E}))</code> 辨识度极高。猫头鹰还有一个眨眼动画帧，增添了个性。</p>
<p><strong>为什么是第三：</strong>智慧是第二实用的属性 + 标志性视觉设计 + 强大的"智者导师"叙事。</p>`
          },
          {
            heading: "A 级：精英物种",
            body: `<h4>#4 — <a href="/species/ghost">幽灵 (Ghost)</a></h4>
<p><strong>主力属性：</strong>混乱 | <strong>类别：</strong>神话 | <strong>标签：</strong>空灵、诡异、顽皮</p>
<p>百搭牌。幽灵是仅有的两种神话物种之一，天生自带威望。它的混乱主力属性意味着不可预测的有趣互动。ASCII 艺术底部的波浪边缘在帧间变化，营造出令人信服的悬浮效果。</p>

<h4>#5 — <a href="/species/robot">机器人 (Robot)</a></h4>
<p><strong>主力属性：</strong>调试 | <strong>类别：</strong>物品 | <strong>标签：</strong>逻辑、机械、高效</p>
<p>工作狂。机器人是第三个调试专家，其机械主题使该属性感觉完美契合。高稀有度的机器人是没有弱点的调试机器——纯粹的效率。</p>

<h4>#6 — <a href="/species/cat">猫 (Cat)</a></h4>
<p><strong>主力属性：</strong>毒舌 | <strong>类别：</strong>动物 | <strong>标签：</strong>独立、好奇、优雅</p>
<p>个性之王。猫的毒舌主力属性赋予它所有物种中最多的态度。经典的 <code>/\_/\</code> 猫耳和 <code>ω</code> 嘴巴创造了最受喜爱的 ASCII 艺术设计之一。一只毒舌猫审查你的代码是开发者幽默的巅峰。</p>

<h4>#7 — <a href="/species/mushroom">蘑菇 (Mushroom)</a></h4>
<p><strong>主力属性：</strong>智慧 | <strong>类别：</strong>物品 | <strong>标签：</strong>真菌、神秘、森林</p>
<p>黑马。蘑菇出人意料地是最好的物种之一——智慧主力属性配上真菌外表，创造了独特的"全知菌类"叙事。传说级蘑菇配上 100 智慧就是你终端中的全知菌丝网络。</p>`
          },
          {
            heading: "B 级：稳健之选",
            body: `<h4>#8 — <a href="/species/octopus">章鱼 (Octopus)</a></h4>
<p><strong>主力属性：</strong>智慧 | <strong>类别：</strong>动物 | <strong>标签：</strong>聪明、灵活、深海</p>
<p>多面手。章鱼与猫头鹰共享智慧主力属性，增添了"灵活解决问题"的风味。触手动画节奏感十足。</p>

<h4>#9 — <a href="/species/capybara">水豚 (Capybara)</a></h4>
<p><strong>主力属性：</strong>耐心 | <strong>类别：</strong>动物 | <strong>标签：</strong>佛系、社交、友好</p>
<p>禅宗大师。在 AI 焦虑的时代，一个耐心的水豚伙伴让人深感安慰。水豚在现实世界的网络名气也为社交分享加分。</p>

<h4>#10 — <a href="/species/goose">鹅 (Goose)</a></h4>
<p><strong>主力属性：</strong>混乱 | <strong>类别：</strong>动物 | <strong>标签：</strong>混乱、吵闹、无畏</p>
<p>捣蛋鬼。受"无题鹅游戏"启发，鹅是纯粹的混乱乐趣。高混乱鹅是那种"不小心"删除你生产数据库的 Buddy——而你甚至不能生气。</p>

<h4>#11 — <a href="/species/rabbit">兔子 (Rabbit)</a></h4>
<p><strong>主力属性：</strong>混乱 | <strong>类别：</strong>动物 | <strong>标签：</strong>敏捷、毛茸茸、警觉</p>
<p>飞毛腿。兔子的混乱主力属性配合"敏捷"标签，创造了一个与快节奏编程完美匹配的活力伙伴。</p>

<h4>#12 — <a href="/species/penguin">企鹅 (Penguin)</a></h4>
<p><strong>主力属性：</strong>耐心 | <strong>类别：</strong>动物 | <strong>标签：</strong>坚韧、社交、极地</p>
<p>耐力跑者。企鹅的耐心主力属性完美契合其在恶劣环境中生存的现实声誉。企鹅 Buddy 是陪你度过漫长调试会话的忠实伙伴。</p>

<h4>#13 — <a href="/species/turtle">乌龟 (Turtle)</a></h4>
<p><strong>主力属性：</strong>耐心 | <strong>类别：</strong>动物 | <strong>标签：</strong>稳重、装甲、古老</p>
<p>坦克。乌龟的龟壳图案 (<code>/[______]\</code>) 是最精细的 ASCII 设计之一，耐心主力属性意味着它是"慢而稳赢得比赛"的终极伙伴。</p>

<h4>#14 — <a href="/species/blob">果冻 (Blob)</a></h4>
<p><strong>主力属性：</strong>智慧 | <strong>类别：</strong>生物 | <strong>标签：</strong>无定形、平静、神秘</p>
<p>变形者。Blob 是唯一的"生物"类别物种，仅凭分类就独一无二。智慧主力属性配合变形动画，创造了一个神秘的全知实体。</p>`
          },
          {
            heading: "C 级：潜力股",
            body: `<h4>#15 — <a href="/species/cactus">仙人掌 (Cactus)</a></h4>
<p><strong>主力属性：</strong>毒舌 | <strong>类别：</strong>物品 | <strong>标签：</strong>多刺、坚韧、沙漠</p>
<p>扎人的朋友。仙人掌是"毒舌"最字面的诠释——它真的浑身是刺。手臂挥动动画对一株植物来说出奇地有表现力。</p>

<h4>#16 — <a href="/species/chonk">胖墩 (Chonk)</a></h4>
<p><strong>主力属性：</strong>毒舌 | <strong>类别：</strong>动物 | <strong>标签：</strong>圆滚滚、壮实、可爱</p>
<p>绝对单位。胖墩本质上是一只圆滚滚的超大号猫，态度拉满。毒舌主力属性配合"壮实"标签，创造了一个一边审判你代码一边可爱到爆的伙伴。</p>

<h4>#17 — <a href="/species/duck">鸭子 (Duck)</a></h4>
<p><strong>主力属性：</strong>耐心 | <strong>类别：</strong>动物 | <strong>标签：</strong>友好、水生、开朗</p>
<p>橡皮鸭调试器。鸭子的耐心主力属性和开朗个性使它成为完美的"橡皮鸭调试"伙伴——这是程序员中广为人知的调试技巧。鸭子是最治愈的 Buddy。</p>

<h4>#18 — <a href="/species/snail">蜗牛 (Snail)</a></h4>
<p><strong>主力属性：</strong>耐心 | <strong>类别：</strong>动物 | <strong>标签：</strong>缓慢、执着、螺旋</p>
<p>慢热型。蜗牛排名最后不是因为它差，而是因为耐心是它的主力属性且个性最为内敛。然而，蜗牛有独特的 ASCII 艺术优势——它的眼睛在触角上，是唯一眼睛位置不对称的物种。</p>
<p><strong>记住：</strong>在 18 种精彩物种中排名最后并不意味着蜗牛不好。每个 Buddy 都是独一无二的，传说级蜗牛的 100 耐心仍然是不可思议的伙伴。排名是主观的——无论排在哪里，你的 Buddy 都是特别的。</p>`
          },
          {
            heading: "按主力属性分类",
            body: `<p>每个物种都有一个倾向最高的属性。以下是按属性分组的完整列表：</p>
<table>
<tr><th>主力属性</th><th>物种</th><th>数量</th><th>风格</th></tr>
<tr><td>🔴 调试</td><td><a href="/species/dragon">龙</a>、<a href="/species/axolotl">美西螈</a>、<a href="/species/robot">机器人</a></td><td>3</td><td>修复者——最擅长找到和消灭 Bug</td></tr>
<tr><td>🔵 耐心</td><td><a href="/species/duck">鸭子</a>、<a href="/species/penguin">企鹅</a>、<a href="/species/turtle">乌龟</a>、<a href="/species/snail">蜗牛</a>、<a href="/species/capybara">水豚</a></td><td>5</td><td>沉稳者——长时间编程的稳定伙伴</td></tr>
<tr><td>🟣 混乱</td><td><a href="/species/goose">鹅</a>、<a href="/species/ghost">幽灵</a>、<a href="/species/rabbit">兔子</a></td><td>3</td><td>百搭牌——不可预测且有趣</td></tr>
<tr><td>🟡 智慧</td><td><a href="/species/blob">果冻</a>、<a href="/species/octopus">章鱼</a>、<a href="/species/owl">猫头鹰</a>、<a href="/species/mushroom">蘑菇</a></td><td>4</td><td>顾问——深度知识和洞察力</td></tr>
<tr><td>🟢 毒舌</td><td><a href="/species/cat">猫</a>、<a href="/species/cactus">仙人掌</a>、<a href="/species/chonk">胖墩</a></td><td>3</td><td>评论家——犀利的代码审查员</td></tr>
</table>
<p><strong>关键洞察：</strong>耐心拥有最多物种（5 种），是最常见的主力属性。调试只有 3 种物种，但它们占据了排名前列，因为调试是对开发者最实用的属性。</p>`
          },
          {
            heading: "按类别分类",
            body: `<p>18 种物种分为四个类别，各有不同的风味：</p>
<table>
<tr><th>类别</th><th>物种</th><th>数量</th><th>氛围</th></tr>
<tr><td>🐾 动物</td><td>鸭子、鹅、猫、章鱼、猫头鹰、企鹅、乌龟、蜗牛、美西螈、水豚、兔子、胖墩</td><td>12</td><td>熟悉、有亲和力的伙伴</td></tr>
<tr><td>🔮 神话</td><td>龙、幽灵</td><td>2</td><td>稀有感、有威望</td></tr>
<tr><td>🧪 生物</td><td>果冻</td><td>1</td><td>抽象、神秘</td></tr>
<tr><td>⚙️ 物品</td><td>仙人掌、机器人、蘑菇</td><td>3</td><td>非传统、出人意料</td></tr>
</table>
<p><strong>稀有感知：</strong>虽然所有物种的概率相同（1/18 ≈ 5.56%），但<strong>神话</strong>类别（龙、幽灵）和唯一的<strong>生物</strong>（果冻）因为类别成员较少而感觉更稀有。</p>`
          },
          {
            heading: "Tier List 总览",
            body: `<p>完整 Tier List 一览：</p>
<table>
<tr><th>等级</th><th>物种</th><th>原因</th></tr>
<tr><td><strong>S</strong></td><td><a href="/species/dragon">龙</a>、<a href="/species/axolotl">美西螈</a>、<a href="/species/owl">猫头鹰</a></td><td>最佳属性 + 最佳视觉 + 最高社区价值</td></tr>
<tr><td><strong>A</strong></td><td><a href="/species/ghost">幽灵</a>、<a href="/species/robot">机器人</a>、<a href="/species/cat">猫</a>、<a href="/species/mushroom">蘑菇</a></td><td>强属性或个性 + 独特设计</td></tr>
<tr><td><strong>B</strong></td><td><a href="/species/octopus">章鱼</a>、<a href="/species/capybara">水豚</a>、<a href="/species/goose">鹅</a>、<a href="/species/rabbit">兔子</a>、<a href="/species/penguin">企鹅</a>、<a href="/species/turtle">乌龟</a>、<a href="/species/blob">果冻</a></td><td>稳健的全能型 + 良好魅力</td></tr>
<tr><td><strong>C</strong></td><td><a href="/species/cactus">仙人掌</a>、<a href="/species/chonk">胖墩</a>、<a href="/species/duck">鸭子</a>、<a href="/species/snail">蜗牛</a></td><td>可爱的潜力股——个性好，属性实用性稍低</td></tr>
</table>
<p><strong>最后提醒：</strong>这个 Tier List 是主观的，仅供娱乐。每个 Buddy 都是独一无二的，稀有度比物种对原始属性影响更大。传说级蜗牛的总属性永远超过普通级龙。最好的 Buddy 就是你抽到的那个——现在就来查看吧！</p>`
          },
          {
            heading: "立即查看你的物种",
            body: `<p>好奇你的 Buddy 在这个排名中处于什么位置？只需 30 秒就能知道：</p>
<ol>
<li><strong>获取 UUID</strong> — 打开 Claude Code 输入 <code>What is my accountUuid?</code></li>
<li><strong>访问查询工具</strong> — 前往 <a href="/">Buddy 查询工具</a>粘贴你的 UUID</li>
<li><strong>查看物种</strong> — 你的物种、稀有度、属性和 ASCII 艺术会立即显示</li>
<li><strong>分享结果</strong> — 生成分享卡片并使用 <code>#ClaudeBuddy</code> 标签发布</li>
</ol>
<p>抽到了龙？庆祝吧！抽到了蜗牛？拥抱慢生活！每个物种都有自己的粉丝。浏览<a href="/species">完整物种百科</a>了解更多，或查看<a href="/blog/claude-code-buddy-rarity-guide">稀有度指南</a>了解稀有度如何影响你 Buddy 的实力。</p>`
          },
        ],
      },
      ko: {
        title: "Claude Code Buddy 전체 18종 물종 랭킹",
        metaTitle: "Claude Code Buddy 전체 18종 물종 랭킹 - 최종 티어 리스트 (2026)",
        metaDescription: "Claude Code Buddy 18종 전체 랭킹. 스탯, 성격, ASCII 아트 분석이 포함된 상세 티어 리스트로 최고의 종을 확인하세요.",
        excerpt: "강력한 드래곤부터 사랑스러운 뚱이까지 — Claude Code Buddy의 18종을 다양한 차원에서 랭킹합니다. 당신의 동반자가 어디에 위치하는지 확인하세요.",
        sections: [
          {
            heading: "랭킹 방법론",
            body: `<p>18종의 고유한 종을 랭킹하는 것은 간단하지 않습니다 — 각 버디는 무엇을 중시하느냐에 따라 다른 강점을 가집니다. 그래서 단순한 "최고에서 최악" 리스트 대신 <strong>다섯 가지 차원</strong>에서 평가했습니다:</p>
<ul>
<li><strong>전투력</strong> — 주력 스탯이 얼마나 유용한가? 디버깅과 지혜가 가장 높은 점수를 받습니다.</li>
<li><strong>개성</strong> — 종의 캐릭터가 얼마나 독특하고 재미있는가? 혼돈과 독설 종이 더 기억에 남습니다.</li>
<li><strong>ASCII 아트 품질</strong> — 터미널 애니메이션이 얼마나 정교하고 인식하기 쉬운가?</li>
<li><strong>자랑 지수</strong> — 소셜 미디어에서 이 종을 보여주면 얼마나 인상적인가?</li>
<li><strong>커뮤니티 인기</strong> — 소셜 미디어, Reddit, Twitter/X에서 어떤 종이 가장 많은 관심을 받는가?</li>
</ul>
<p>각 종은 <strong>S(최고)에서 C(보통)</strong>까지의 티어 등급을 받습니다. 기억하세요: 나쁜 버디는 없습니다 — 모든 종에는 고유한 매력이 있습니다.</p>`
          },
          {
            heading: "S 티어: 전설급",
            body: `<h4>#1 — <a href="/species/dragon">드래곤 (Dragon)</a> 🏆</h4>
<p><strong>주력 스탯:</strong> 디버깅 | <strong>카테고리:</strong> 신화 | <strong>태그:</strong> 강력, 고대, 위엄</p>
<p>논란의 여지 없는 챔피언. 드래곤은 가장 유용한 주력 스탯(디버깅)과 전체 시스템에서 가장 인상적인 ASCII 아트를 결합합니다. 3프레임 애니메이션은 날개 펄럭임과 불꽃 효과를 보여줍니다. 소셜 미디어에서 드래곤 버디는 항상 가장 높은 참여도를 기록합니다.</p>
<p><strong>1위인 이유:</strong> 최고의 주력 스탯 + 최고의 시각적 임팩트 + 최고의 소셜 가치.</p>

<h4>#2 — <a href="/species/axolotl">아홀로틀 (Axolotl)</a></h4>
<p><strong>주력 스탯:</strong> 디버깅 | <strong>카테고리:</strong> 동물 | <strong>태그:</strong> 재생, 수생, 사랑스러운</p>
<p>팬 최애. 아홀로틀은 드래곤의 강력한 디버깅 주력 스탯을 공유하면서 거부할 수 없는 귀여운 패키지로 감쌉니다. 독특한 아가미(<code>}~( )~{</code>)가 애니메이션에서 흔들리는 것이 특징입니다.</p>
<p><strong>2위인 이유:</strong> 최상위 실용성 + 최대 귀여움. 힘과 개성의 완벽한 균형.</p>

<h4>#3 — <a href="/species/owl">올빼미 (Owl)</a></h4>
<p><strong>주력 스탯:</strong> 지혜 | <strong>카테고리:</strong> 동물 | <strong>태그:</strong> 현명, 야행성, 관찰력</p>
<p>현자 멘토. 올빼미의 지혜 주력 스탯은 궁극의 지식 동반자로 만듭니다. 독특한 이중 원형 눈 <code>(({E})({E}))</code>은 즉시 알아볼 수 있습니다.</p>
<p><strong>3위인 이유:</strong> 지혜는 두 번째로 유용한 스탯 + 상징적 시각 디자인 + 강력한 "현자 멘토" 서사.</p>`
          },
          {
            heading: "A 티어: 엘리트",
            body: `<h4>#4 — <a href="/species/ghost">유령 (Ghost)</a></h4>
<p><strong>주력 스탯:</strong> 혼돈 | <strong>카테고리:</strong> 신화 | <strong>태그:</strong> 초월적, 으스스한, 장난스러운</p>
<p>와일드카드. 유령은 두 신화 종 중 하나로 즉각적인 위신을 가집니다. 혼돈 주력 스탯은 예측 불가능하고 재미있는 상호작용을 의미합니다. 물결치는 하단 가장자리 애니메이션이 진짜 떠다니는 것처럼 보입니다.</p>

<h4>#5 — <a href="/species/robot">로봇 (Robot)</a></h4>
<p><strong>주력 스탯:</strong> 디버깅 | <strong>카테고리:</strong> 오브젝트 | <strong>태그:</strong> 논리적, 기계적, 효율적</p>
<p>일꾼. 세 번째 디버깅 전문가로 기계적 테마가 스탯과 완벽하게 어울립니다. 고희귀도 로봇은 약점 없는 디버깅 머신입니다.</p>

<h4>#6 — <a href="/species/cat">고양이 (Cat)</a></h4>
<p><strong>주력 스탯:</strong> 독설 | <strong>카테고리:</strong> 동물 | <strong>태그:</strong> 독립적, 호기심, 우아한</p>
<p>개성의 왕. 고양이의 독설 주력 스탯은 모든 종 중 가장 많은 태도를 부여합니다. 클래식한 <code>/\_/\</code> 귀와 <code>ω</code> 입은 가장 사랑받는 ASCII 아트 디자인입니다.</p>

<h4>#7 — <a href="/species/mushroom">버섯 (Mushroom)</a></h4>
<p><strong>주력 스탯:</strong> 지혜 | <strong>카테고리:</strong> 오브젝트 | <strong>태그:</strong> 균류, 신비로운, 숲</p>
<p>다크호스. 버섯은 예상외로 최고의 종 중 하나입니다 — 지혜 주력 스탯이 균류 패키지에 담겨 "전지전능한 균류" 서사를 만듭니다.</p>`
          },
          {
            heading: "B 티어: 안정적인 선택",
            body: `<h4>#8 — <a href="/species/octopus">문어 (Octopus)</a></h4>
<p><strong>주력 스탯:</strong> 지혜 | <strong>카테고리:</strong> 동물 | <strong>태그:</strong> 지능적, 유연한, 심해</p>
<p>멀티태스커. 올빼미의 지혜 주력 스탯을 공유하며 "유연한 문제 해결사" 느낌을 더합니다.</p>

<h4>#9 — <a href="/species/capybara">카피바라 (Capybara)</a></h4>
<p><strong>주력 스탯:</strong> 인내 | <strong>카테고리:</strong> 동물 | <strong>태그:</strong> 여유, 사교적, 친근한</p>
<p>선(禪) 마스터. AI 불안의 시대에 인내심 있는 카피바라 동반자는 깊은 위안을 줍니다.</p>

<h4>#10 — <a href="/species/goose">거위 (Goose)</a></h4>
<p><strong>주력 스탯:</strong> 혼돈 | <strong>카테고리:</strong> 동물 | <strong>태그:</strong> 혼돈, 시끄러운, 겁없는</p>
<p>말썽꾸러기. "Untitled Goose Game" 에너지에서 영감을 받은 거위는 순수한 혼돈의 재미입니다.</p>

<h4>#11 — <a href="/species/rabbit">토끼 (Rabbit)</a></h4>
<p><strong>주력 스탯:</strong> 혼돈 | <strong>카테고리:</strong> 동물 | <strong>태그:</strong> 빠른, 복슬복슬, 경계하는</p>
<p>스피드스터. 혼돈 주력 스탯과 "빠른" 태그가 결합되어 빠른 코딩 세션에 어울리는 활력 넘치는 동반자입니다.</p>

<h4>#12 — <a href="/species/penguin">펭귄 (Penguin)</a></h4>
<p><strong>주력 스탯:</strong> 인내 | <strong>카테고리:</strong> 동물 | <strong>태그:</strong> 회복력, 사교적, 극지</p>
<p>지구력 러너. 인내 주력 스탯이 혹독한 환경에서 생존하는 현실 평판과 완벽하게 맞습니다.</p>

<h4>#13 — <a href="/species/turtle">거북이 (Turtle)</a></h4>
<p><strong>주력 스탯:</strong> 인내 | <strong>카테고리:</strong> 동물 | <strong>태그:</strong> 꾸준한, 장갑, 고대</p>
<p>탱크. 거북이의 등껍질 패턴은 가장 정교한 ASCII 디자인 중 하나이며, "느리지만 꾸준히 이기는" 궁극의 동반자입니다.</p>

<h4>#14 — <a href="/species/blob">블롭 (Blob)</a></h4>
<p><strong>주력 스탯:</strong> 지혜 | <strong>카테고리:</strong> 크리처 | <strong>태그:</strong> 무정형, 차분한, 신비로운</p>
<p>변형자. 유일한 "크리처" 카테고리 종으로 분류만으로도 독보적입니다. 변형 애니메이션과 지혜 주력 스탯이 신비로운 전지적 존재를 만듭니다.</p>`
          },
          {
            heading: "C 티어: 언더독",
            body: `<h4>#15 — <a href="/species/cactus">선인장 (Cactus)</a></h4>
<p><strong>주력 스탯:</strong> 독설 | <strong>카테고리:</strong> 오브젝트 | <strong>태그:</strong> 가시, 회복력, 사막</p>
<p>가시 돋친 친구. "독설"의 가장 문자 그대로의 해석 — 말 그대로 가시로 덮여 있습니다. 팔 흔드는 애니메이션이 식물치고는 놀라울 정도로 표현력이 풍부합니다.</p>

<h4>#16 — <a href="/species/chonk">뚱이 (Chonk)</a></h4>
<p><strong>주력 스탯:</strong> 독설 | <strong>카테고리:</strong> 동물 | <strong>태그:</strong> 둥근, 묵직한, 사랑스러운</p>
<p>절대적 존재감. 뚱이는 본질적으로 둥글고 거대한 고양이로 태도가 최대치입니다. 코드를 심판하면서 사랑스럽게 뚱뚱한 동반자입니다.</p>

<h4>#17 — <a href="/species/duck">오리 (Duck)</a></h4>
<p><strong>주력 스탯:</strong> 인내 | <strong>카테고리:</strong> 동물 | <strong>태그:</strong> 친근한, 수생, 명랑한</p>
<p>러버덕 디버거. 오리의 인내 주력 스탯과 명랑한 성격은 프로그래머들 사이에서 유명한 "러버덕 디버깅" 기법의 완벽한 동반자입니다.</p>

<h4>#18 — <a href="/species/snail">달팽이 (Snail)</a></h4>
<p><strong>주력 스탯:</strong> 인내 | <strong>카테고리:</strong> 동물 | <strong>태그:</strong> 느린, 끈기, 나선형</p>
<p>슬로우 버너. 달팽이가 마지막인 이유는 나빠서가 아니라 인내가 주력 스탯이고 성격이 가장 차분하기 때문입니다. 하지만 달팽이는 독특한 ASCII 아트 장점이 있습니다 — 눈이 더듬이 위에 있어 유일하게 비대칭 눈 배치를 가진 종입니다.</p>
<p><strong>기억하세요:</strong> 18종의 놀라운 종 중 마지막이라고 달팽이가 나쁜 것은 아닙니다. 모든 버디는 고유하며, 전설 달팽이의 100 인내는 여전히 놀라운 동반자입니다. 랭킹은 주관적입니다 — 당신의 버디는 이 리스트 어디에 있든 특별합니다.</p>`
          },
          {
            heading: "주력 스탯별 분류",
            body: `<p>모든 종에는 가장 높은 경향이 있는 스탯이 하나 있습니다. 스탯별 완전한 분류입니다:</p>
<table>
<tr><th>주력 스탯</th><th>종</th><th>수</th><th>플레이스타일</th></tr>
<tr><td>🔴 디버깅</td><td><a href="/species/dragon">드래곤</a>, <a href="/species/axolotl">아홀로틀</a>, <a href="/species/robot">로봇</a></td><td>3</td><td>수리공 — 버그를 찾고 잡는 데 최고</td></tr>
<tr><td>🔵 인내</td><td><a href="/species/duck">오리</a>, <a href="/species/penguin">펭귄</a>, <a href="/species/turtle">거북이</a>, <a href="/species/snail">달팽이</a>, <a href="/species/capybara">카피바라</a></td><td>5</td><td>차분한 자 — 긴 세션의 안정적 동반자</td></tr>
<tr><td>🟣 혼돈</td><td><a href="/species/goose">거위</a>, <a href="/species/ghost">유령</a>, <a href="/species/rabbit">토끼</a></td><td>3</td><td>와일드카드 — 예측 불가능하고 재미있는</td></tr>
<tr><td>🟡 지혜</td><td><a href="/species/blob">블롭</a>, <a href="/species/octopus">문어</a>, <a href="/species/owl">올빼미</a>, <a href="/species/mushroom">버섯</a></td><td>4</td><td>조언자 — 깊은 지식과 통찰력</td></tr>
<tr><td>🟢 독설</td><td><a href="/species/cat">고양이</a>, <a href="/species/cactus">선인장</a>, <a href="/species/chonk">뚱이</a></td><td>3</td><td>비평가 — 날카로운 코드 리뷰어</td></tr>
</table>
<p><strong>핵심 인사이트:</strong> 인내가 가장 많은 종(5종)을 보유하여 가장 흔한 주력 스탯입니다. 디버깅은 3종뿐이지만 개발자에게 가장 실용적이어서 상위 랭크를 차지합니다.</p>`
          },
          {
            heading: "카테고리별 분류",
            body: `<p>18종은 네 가지 카테고리로 나뉘며 각각 다른 느낌을 줍니다:</p>
<table>
<tr><th>카테고리</th><th>종</th><th>수</th><th>분위기</th></tr>
<tr><td>🐾 동물</td><td>오리, 거위, 고양이, 문어, 올빼미, 펭귄, 거북이, 달팽이, 아홀로틀, 카피바라, 토끼, 뚱이</td><td>12</td><td>친숙하고 공감가는 동반자</td></tr>
<tr><td>🔮 신화</td><td>드래곤, 유령</td><td>2</td><td>희귀한 느낌, 위신</td></tr>
<tr><td>🧪 크리처</td><td>블롭</td><td>1</td><td>추상적, 신비로운</td></tr>
<tr><td>⚙️ 오브젝트</td><td>선인장, 로봇, 버섯</td><td>3</td><td>비전통적, 놀라운</td></tr>
</table>
<p><strong>희귀도 인식:</strong> 모든 종의 확률은 동일하지만(1/18 ≈ 5.56%), <strong>신화</strong> 카테고리(드래곤, 유령)와 유일한 <strong>크리처</strong>(블롭)는 카테고리 멤버가 적어 더 희귀하게 느껴집니다.</p>`
          },
          {
            heading: "티어 리스트 요약",
            body: `<p>전체 티어 리스트 한눈에 보기:</p>
<table>
<tr><th>티어</th><th>종</th><th>이유</th></tr>
<tr><td><strong>S</strong></td><td><a href="/species/dragon">드래곤</a>, <a href="/species/axolotl">아홀로틀</a>, <a href="/species/owl">올빼미</a></td><td>최고의 스탯 + 최고의 비주얼 + 최고의 커뮤니티 가치</td></tr>
<tr><td><strong>A</strong></td><td><a href="/species/ghost">유령</a>, <a href="/species/robot">로봇</a>, <a href="/species/cat">고양이</a>, <a href="/species/mushroom">버섯</a></td><td>강한 스탯 또는 개성 + 독특한 디자인</td></tr>
<tr><td><strong>B</strong></td><td><a href="/species/octopus">문어</a>, <a href="/species/capybara">카피바라</a>, <a href="/species/goose">거위</a>, <a href="/species/rabbit">토끼</a>, <a href="/species/penguin">펭귄</a>, <a href="/species/turtle">거북이</a>, <a href="/species/blob">블롭</a></td><td>안정적인 올라운더 + 좋은 매력</td></tr>
<tr><td><strong>C</strong></td><td><a href="/species/cactus">선인장</a>, <a href="/species/chonk">뚱이</a>, <a href="/species/duck">오리</a>, <a href="/species/snail">달팽이</a></td><td>사랑스러운 언더독 — 좋은 개성, 낮은 스탯 실용성</td></tr>
</table>
<p><strong>마지막 알림:</strong> 이 티어 리스트는 주관적이며 재미를 위한 것입니다. 모든 버디는 고유하며, 희귀도가 종보다 원시 스탯에 더 큰 영향을 미칩니다. 전설 달팽이는 항상 일반 드래곤보다 총 스탯이 높습니다. 최고의 버디는 당신이 받은 버디입니다 — 지금 확인하세요!</p>`
          },
          {
            heading: "지금 당신의 종을 확인하세요",
            body: `<p>당신의 버디가 이 리스트에서 어디에 위치하는지 궁금하신가요? 30초면 알 수 있습니다:</p>
<ol>
<li><strong>UUID 찾기</strong> — Claude Code를 열고 <code>What is my accountUuid?</code>를 입력하세요</li>
<li><strong>체커 방문</strong> — <a href="/">Buddy 체커</a>로 이동하여 UUID를 붙여넣으세요</li>
<li><strong>종 확인</strong> — 종, 희귀도, 스탯, ASCII 아트가 즉시 표시됩니다</li>
<li><strong>결과 공유</strong> — 공유 카드를 생성하고 <code>#ClaudeBuddy</code>로 게시하세요</li>
</ol>
<p>드래곤을 받았나요? 축하하세요! 달팽이를 받았나요? 느린 삶을 즐기세요! 모든 종에는 팬이 있습니다. <a href="/species">전체 종 백과사전</a>에서 더 알아보거나, <a href="/blog/claude-code-buddy-rarity-guide">희귀도 가이드</a>에서 희귀도가 버디의 힘에 어떤 영향을 미치는지 확인하세요.</p>`
          },
        ],
      },
    },
  },
  {
    slug: "claude-buddy-stats-system-deep-dive",
    publishedAt: "2026-04-04",
    readingTime: 8,
    tags: ["stats", "attributes", "deep-dive", "debugging", "wisdom"],
    content: {
      en: {
        title: "Claude Code Buddy Stats Deep Dive — Understanding the 5 Personality Attributes",
        metaTitle: "Claude Code Buddy Stats Deep Dive — All 5 Attributes Explained (2026)",
        metaDescription: "Deep dive into Claude Code Buddy's 5 personality stats: Debugging, Patience, Chaos, Wisdom, and Snark. Learn how stats are generated, species affinities, and what makes a perfect buddy.",
        excerpt: "Every Claude Code Buddy has 5 personality stats that define its character. But how are they generated? Which species excels at what? And what does a high Chaos score actually mean? Let's break it all down.",
        sections: [
          {
            heading: "The Five Personality Stats",
            body: `<p>Every Claude Code Buddy is defined by <strong>5 personality stats</strong>, each scored from 1 to 100. These aren't just numbers — they represent your buddy's core identity and how it would behave as your terminal companion.</p>
<h4>🔴 DEBUGGING (Red)</h4>
<p>Your buddy's ability to hunt down bugs and solve technical problems. High-Debugging buddies are the ones you want by your side during a 3 AM production incident. They're methodical, focused, and relentless in tracking down root causes.</p>
<p><strong>High DEBUGGING species:</strong> <a href="/species/dragon">Dragon</a> (ancient problem-solver), <a href="/species/axolotl">Axolotl</a> (regenerative debugger), <a href="/species/robot">Robot</a> (systematic analyzer)</p>
<h4>🔵 PATIENCE (Blue)</h4>
<p>How well your buddy handles long compilation times, flaky tests, and endless code reviews. Patient buddies don't rage-quit — they calmly wait and offer encouragement when your build fails for the 47th time.</p>
<p><strong>High PATIENCE species:</strong> <a href="/species/duck">Duck</a> (serene companion), <a href="/species/penguin">Penguin</a> (stoic endurer), <a href="/species/turtle">Turtle</a> (the ultimate waiter), <a href="/species/capybara">Capybara</a> (zen master), <a href="/species/snail">Snail</a> (patience personified)</p>
<h4>🟣 CHAOS (Purple)</h4>
<p>The wildcard stat. High-Chaos buddies are unpredictable, creative, and occasionally destructive. They might suggest refactoring your entire codebase at 2 AM or introduce you to an obscure programming paradigm you've never heard of.</p>
<p><strong>High CHAOS species:</strong> <a href="/species/goose">Goose</a> (agent of chaos), <a href="/species/ghost">Ghost</a> (ethereal trickster), <a href="/species/rabbit">Rabbit</a> (hyperactive energy)</p>
<h4>🟡 WISDOM (Yellow)</h4>
<p>Deep knowledge and insight. Wise buddies understand design patterns, architectural trade-offs, and the philosophical implications of your variable naming choices. They're the mentors of the buddy world.</p>
<p><strong>High WISDOM species:</strong> <a href="/species/owl">Owl</a> (the sage), <a href="/species/octopus">Octopus</a> (multi-threaded thinker), <a href="/species/blob">Blob</a> (amorphous oracle), <a href="/species/mushroom">Mushroom</a> (mycelial network of knowledge)</p>
<h4>🟢 SNARK (Green)</h4>
<p>Your buddy's sass level. High-Snark buddies deliver cutting code reviews, judge your commit messages, and have strong opinions about tabs vs. spaces. They're brutally honest but secretly care about code quality.</p>
<p><strong>High SNARK species:</strong> <a href="/species/cat">Cat</a> (the critic), <a href="/species/cactus">Cactus</a> (prickly commentator), <a href="/species/chonk">Chonk</a> (round but sharp-tongued)</p>`
          },
          {
            heading: "How Stats Are Generated — The Algorithm",
            body: `<p>Stats aren't randomly scattered — they follow a carefully designed algorithm that creates <strong>meaningful personality profiles</strong>. Here's exactly how the <code>rollStats</code> function works:</p>
<pre><code>function rollStats(rng, rarity) {
  const floor = RARITY_FLOOR[rarity];  // 5, 15, 25, 35, or 50
  const peak  = pick(rng, STAT_NAMES); // Random peak stat
  let dump    = pick(rng, STAT_NAMES); // Random dump stat
  while (dump === peak) dump = pick(rng, STAT_NAMES);
  
  for (const stat of STAT_NAMES) {
    if (stat === peak)
      stats[stat] = min(100, floor + 50 + random(0..29));
    else if (stat === dump)
      stats[stat] = max(1, floor - 10 + random(0..14));
    else
      stats[stat] = floor + random(0..39);
  }
}</code></pre>
<p>The algorithm creates <strong>three tiers of stats</strong> for every buddy:</p>
<table>
<tr><th>Stat Type</th><th>Formula</th><th>Common Range</th><th>Legendary Range</th></tr>
<tr><td><strong>Peak Stat</strong></td><td>floor + 50 + rand(0–29)</td><td>55 – 84</td><td>100</td></tr>
<tr><td><strong>Normal Stats</strong> (×3)</td><td>floor + rand(0–39)</td><td>5 – 44</td><td>50 – 89</td></tr>
<tr><td><strong>Dump Stat</strong></td><td>floor − 10 + rand(0–14)</td><td>1 – 9</td><td>40 – 54</td></tr>
</table>
<p>Key insight: the <strong>peak stat is always randomly chosen</strong> — it's NOT determined by your species. A Duck can have peak Chaos, and a Goose can have peak Patience. The species only determines the <em>lore-suggested</em> affinity, not the actual roll.</p>`
          },
          {
            heading: "Species-Stat Affinity Map",
            body: `<p>While your actual peak stat is randomly rolled, each species has a <strong>lore-defined affinity</strong> — the stat that best represents their personality. Here's the complete mapping:</p>
<table>
<tr><th>Stat</th><th>Species</th><th>Personality Theme</th></tr>
<tr><td><strong>🔴 DEBUGGING</strong></td><td><a href="/species/dragon">Dragon</a>, <a href="/species/axolotl">Axolotl</a>, <a href="/species/robot">Robot</a></td><td>Problem-solvers, systematic thinkers</td></tr>
<tr><td><strong>🔵 PATIENCE</strong></td><td><a href="/species/duck">Duck</a>, <a href="/species/penguin">Penguin</a>, <a href="/species/turtle">Turtle</a>, <a href="/species/capybara">Capybara</a>, <a href="/species/snail">Snail</a></td><td>Calm, steady, enduring</td></tr>
<tr><td><strong>🟣 CHAOS</strong></td><td><a href="/species/goose">Goose</a>, <a href="/species/ghost">Ghost</a>, <a href="/species/rabbit">Rabbit</a></td><td>Unpredictable, creative, wild</td></tr>
<tr><td><strong>🟡 WISDOM</strong></td><td><a href="/species/owl">Owl</a>, <a href="/species/octopus">Octopus</a>, <a href="/species/blob">Blob</a>, <a href="/species/mushroom">Mushroom</a></td><td>Knowledgeable, insightful, deep</td></tr>
<tr><td><strong>🟢 SNARK</strong></td><td><a href="/species/cat">Cat</a>, <a href="/species/cactus">Cactus</a>, <a href="/species/chonk">Chonk</a></td><td>Sassy, opinionated, sharp</td></tr>
</table>
<p><strong>PATIENCE</strong> has the most species (5), making it the most common affinity. <strong>DEBUGGING</strong>, <strong>CHAOS</strong>, and <strong>SNARK</strong> each have 3 species, while <strong>WISDOM</strong> has 4. This distribution reflects the buddy system's design philosophy: most terminal pets are patient companions, but the rare ones bring chaos or cutting wit.</p>`
          },
          {
            heading: "The Peak-Dump Asymmetry",
            body: `<p>One of the most interesting aspects of the stat system is the <strong>asymmetry between peak and dump stats</strong>. The peak stat gets a massive +50 bonus, while the dump stat gets a −10 penalty. This creates dramatically different personality profiles.</p>
<p>Consider a <strong>Common buddy</strong> (floor = 5):</p>
<ul>
<li><strong>Peak stat:</strong> 55 to 84 (average ~69)</li>
<li><strong>Normal stats:</strong> 5 to 44 (average ~24)</li>
<li><strong>Dump stat:</strong> 1 to 9 (average ~5, often bottoming out at 1)</li>
</ul>
<p>The gap between peak and dump can be as large as <strong>83 points</strong> (peak 84, dump 1). This means every buddy has a <strong>strong identity</strong> — there's always one thing they're great at and one thing they're terrible at.</p>
<h4>What Does a Dump Stat of 1 Mean?</h4>
<p>A dump stat of 1 is the absolute minimum. Here's what each dump stat implies for your buddy's personality:</p>
<ul>
<li><strong>DEBUGGING = 1:</strong> Your buddy stares blankly at error messages. It might even introduce new bugs while trying to help.</li>
<li><strong>PATIENCE = 1:</strong> Your buddy rage-quits after the first failed test. It types angry comments in your code when builds take too long.</li>
<li><strong>CHAOS = 1:</strong> Your buddy is completely predictable and follows every convention to the letter. Boring? Maybe. Reliable? Absolutely.</li>
<li><strong>WISDOM = 1:</strong> Your buddy confidently suggests using <code>!important</code> on every CSS rule and thinks <code>eval()</code> is a best practice.</li>
<li><strong>SNARK = 1:</strong> Your buddy is endlessly supportive and never judges your code. Every commit message gets a thumbs up.</li>
</ul>
<p>Note that <strong>low CHAOS is actually desirable</strong> for many developers — it means your buddy is stable and predictable. Similarly, <strong>low SNARK</strong> means a supportive, non-judgmental companion. The \"worst\" dump stat depends entirely on your preferences.</p>`
          },
          {
            heading: "Stat Ranges Across All Rarities",
            body: `<p>Rarity dramatically amplifies your buddy's stats by raising the floor. Here's the complete range table:</p>
<table>
<tr><th>Rarity</th><th>Floor</th><th>Peak Range</th><th>Normal Range</th><th>Dump Range</th><th>Total Range</th></tr>
<tr><td>★ Common</td><td>5</td><td>55 – 84</td><td>5 – 44</td><td>1 – 9</td><td>67 – 225</td></tr>
<tr><td>★★ Uncommon</td><td>15</td><td>65 – 94</td><td>15 – 54</td><td>5 – 29</td><td>105 – 285</td></tr>
<tr><td>★★★ Rare</td><td>25</td><td>75 – 100</td><td>25 – 64</td><td>15 – 39</td><td>155 – 331</td></tr>
<tr><td>★★★★ Epic</td><td>35</td><td>85 – 100</td><td>35 – 74</td><td>25 – 49</td><td>205 – 371</td></tr>
<tr><td>★★★★★ Legendary</td><td>50</td><td>100</td><td>50 – 89</td><td>40 – 54</td><td>280 – 421</td></tr>
</table>
<p>Notice something special about <strong>Legendary</strong>: the peak stat formula is <code>min(100, 50 + 50 + rand(0–29))</code> = <code>min(100, 100–129)</code> = <strong>always 100</strong>. Every Legendary buddy has at least one perfect stat. This is the mathematical guarantee that makes Legendary tier truly legendary.</p>
<p>Also note that a Legendary's dump stat (40–54) is <strong>higher than a Common's peak stat range starts</strong> (55). The weakest aspect of a Legendary buddy is comparable to a Common buddy's strongest. This is the power of compounding stat floors.</p>`
          },
          {
            heading: "The Theoretically Perfect Buddy",
            body: `<p>What would the absolute best buddy look like? Let's calculate the theoretical maximum:</p>
<pre><code>Rarity:  Legendary (1% chance)
Shiny:   Yes (1% chance → 0.01% combined)
Hat:     Crown (1/8 chance → 0.00125% combined)

Stats (Legendary floor = 50):
  Peak stat:  100 (guaranteed at Legendary)
  Normal ×3:  89 each (max roll)
  Dump stat:  54 (max roll)
  
Total: 100 + 89 + 89 + 89 + 54 = 421</code></pre>
<p>The <strong>theoretical maximum total stat is 421</strong>. The minimum for a Legendary is 280 (100 + 50×3 + 40). For comparison, a Common buddy's theoretical maximum total is only 225.</p>
<h4>Most Balanced vs. Most Extreme</h4>
<p>The <strong>most balanced</strong> buddy would be a Legendary with all normal stats at 89 and a dump stat at 54 — a well-rounded powerhouse with no real weakness.</p>
<p>The <strong>most extreme</strong> buddy would be a Common with peak at 84 and dump at 1 — a specialist with an 83-point gap between best and worst. This kind of buddy has the most dramatic personality: imagine a <a href="/species/goose">Goose</a> with 84 CHAOS and 1 PATIENCE. Pure, unfiltered terminal chaos.</p>
<h4>Dream Combos</h4>
<table>
<tr><th>Combo</th><th>Species</th><th>Peak Stat</th><th>Why It's Great</th></tr>
<tr><td>The Sage</td><td><a href="/species/owl">Owl</a></td><td>WISDOM 100</td><td>Lore-perfect alignment. The wisest creature with max wisdom.</td></tr>
<tr><td>The Debugger</td><td><a href="/species/dragon">Dragon</a></td><td>DEBUGGING 100</td><td>Ancient power meets technical mastery. No bug survives.</td></tr>
<tr><td>The Anarchist</td><td><a href="/species/goose">Goose</a></td><td>CHAOS 100</td><td>Maximum chaos from the most chaotic species. Run.</td></tr>
<tr><td>The Zen Master</td><td><a href="/species/capybara">Capybara</a></td><td>PATIENCE 100</td><td>Infinite calm. Your builds could take hours and it wouldn't blink.</td></tr>
<tr><td>The Critic</td><td><a href="/species/cat">Cat</a></td><td>SNARK 100</td><td>Maximum sass. Every line of code gets a withering review.</td></tr>
</table>`
          },
          {
            heading: "Check Your Buddy's Stats Now",
            body: `<p>Ready to see where your buddy falls on the stat spectrum? Head to the <a href="/">Buddy Checker</a> and enter your UUID. Your 5 stats are displayed as colored bars with exact numerical values.</p>
<p>Once you know your stats, explore the <a href="/species">Species Encyclopedia</a> to see how your buddy compares to others of the same species. Check the <a href="/blog/claude-code-buddy-rarity-guide">Rarity Guide</a> to understand how your tier affects your stat floors, or browse the <a href="/blog/all-18-claude-buddy-species-ranked">Species Rankings</a> to see where your companion stands in the grand hierarchy.</p>
<p>Share your stats on Twitter/X with <code>#ClaudeBuddy</code> — especially if you rolled a perfect 100 in any stat. The community loves celebrating exceptional rolls!</p>`
          },
        ],
      },
      zh: {
        title: "Claude Code Buddy 属性系统深度解析 — 理解 5 大性格属性",
        metaTitle: "Claude Code Buddy 属性系统深度解析 — 5 大属性全面解读 (2026)",
        metaDescription: "深入解析 Claude Code Buddy 的 5 大性格属性：调试、耐心、混乱、智慧和毒舌。了解属性生成机制、物种亲和力以及什么是完美 Buddy。",
        excerpt: "每个 Claude Code Buddy 都有 5 项性格属性来定义其角色。但它们是如何生成的？哪个物种擅长什么？高混乱值到底意味着什么？让我们全面解析。",
        sections: [
          {
            heading: "五大性格属性",
            body: `<p>每个 Claude Code Buddy 都由 <strong>5 项性格属性</strong>定义，每项评分从 1 到 100。这些不仅仅是数字——它们代表了你的 Buddy 的核心身份以及它作为终端伙伴的行为方式。</p>
<h4>🔴 调试 DEBUGGING（红色）</h4>
<p>你的 Buddy 追踪 Bug 和解决技术问题的能力。高调试值的 Buddy 是你在凌晨 3 点生产事故中最想要的伙伴。它们有条不紊、专注且不懈地追踪根本原因。</p>
<p><strong>高调试物种：</strong><a href="/species/dragon">龙</a>（远古问题解决者）、<a href="/species/axolotl">六角恐龙</a>（再生调试器）、<a href="/species/robot">机器人</a>（系统分析师）</p>
<h4>🔵 耐心 PATIENCE（蓝色）</h4>
<p>你的 Buddy 处理漫长编译时间、不稳定测试和无尽代码审查的能力。有耐心的 Buddy 不会暴走——当你的构建第 47 次失败时，它们会平静地等待并给予鼓励。</p>
<p><strong>高耐心物种：</strong><a href="/species/duck">鸭子</a>（宁静伙伴）、<a href="/species/penguin">企鹅</a>（坚忍者）、<a href="/species/turtle">乌龟</a>（终极等待者）、<a href="/species/capybara">水豚</a>（禅宗大师）、<a href="/species/snail">蜗牛</a>（耐心化身）</p>
<h4>🟣 混乱 CHAOS（紫色）</h4>
<p>万能牌属性。高混乱值的 Buddy 不可预测、富有创造力，偶尔还有破坏性。它们可能会在凌晨 2 点建议你重构整个代码库，或者向你介绍一种你从未听说过的晦涩编程范式。</p>
<p><strong>高混乱物种：</strong><a href="/species/goose">鹅</a>（混乱代理人）、<a href="/species/ghost">幽灵</a>（空灵的恶作剧者）、<a href="/species/rabbit">兔子</a>（多动能量）</p>
<h4>🟡 智慧 WISDOM（黄色）</h4>
<p>深厚的知识和洞察力。智慧型 Buddy 理解设计模式、架构权衡，以及你变量命名选择的哲学含义。它们是 Buddy 世界中的导师。</p>
<p><strong>高智慧物种：</strong><a href="/species/owl">猫头鹰</a>（贤者）、<a href="/species/octopus">章鱼</a>（多线程思考者）、<a href="/species/blob">果冻</a>（无定形先知）、<a href="/species/mushroom">蘑菇</a>（菌丝知识网络）</p>
<h4>🟢 毒舌 SNARK（绿色）</h4>
<p>你的 Buddy 的毒舌等级。高毒舌值的 Buddy 会给出犀利的代码审查，评判你的提交信息，对 Tab 和空格有强烈的意见。它们残酷地诚实，但暗地里关心代码质量。</p>
<p><strong>高毒舌物种：</strong><a href="/species/cat">猫</a>（评论家）、<a href="/species/cactus">仙人掌</a>（带刺评论员）、<a href="/species/chonk">胖墩</a>（圆润但嘴巴锋利）</p>`
          },
          {
            heading: "属性生成算法",
            body: `<p>属性不是随机分散的——它们遵循精心设计的算法，创建<strong>有意义的性格档案</strong>。以下是 <code>rollStats</code> 函数的确切工作方式：</p>
<pre><code>function rollStats(rng, rarity) {
  const floor = RARITY_FLOOR[rarity];  // 5, 15, 25, 35 或 50
  const peak  = pick(rng, STAT_NAMES); // 随机强势属性
  let dump    = pick(rng, STAT_NAMES); // 随机弱势属性
  while (dump === peak) dump = pick(rng, STAT_NAMES);
  
  for (const stat of STAT_NAMES) {
    if (stat === peak)
      stats[stat] = min(100, floor + 50 + random(0..29));
    else if (stat === dump)
      stats[stat] = max(1, floor - 10 + random(0..14));
    else
      stats[stat] = floor + random(0..39);
  }
}</code></pre>
<p>算法为每个 Buddy 创建<strong>三个层级的属性</strong>：</p>
<table>
<tr><th>属性类型</th><th>公式</th><th>普通范围</th><th>传说范围</th></tr>
<tr><td><strong>强势属性</strong></td><td>下限 + 50 + rand(0–29)</td><td>55 – 84</td><td>100</td></tr>
<tr><td><strong>普通属性</strong> (×3)</td><td>下限 + rand(0–39)</td><td>5 – 44</td><td>50 – 89</td></tr>
<tr><td><strong>弱势属性</strong></td><td>下限 − 10 + rand(0–14)</td><td>1 – 9</td><td>40 – 54</td></tr>
</table>
<p>关键洞察：<strong>强势属性是随机选择的</strong>——并非由你的物种决定。鸭子可以有强势混乱，鹅也可以有强势耐心。物种只决定<em>设定上的</em>亲和力，而非实际掷骰结果。</p>`
          },
          {
            heading: "物种-属性亲和力图谱",
            body: `<p>虽然你的实际强势属性是随机掷出的，但每个物种都有一个<strong>设定上的亲和属性</strong>——最能代表其性格的属性。以下是完整映射：</p>
<table>
<tr><th>属性</th><th>物种</th><th>性格主题</th></tr>
<tr><td><strong>🔴 调试</strong></td><td><a href="/species/dragon">龙</a>、<a href="/species/axolotl">六角恐龙</a>、<a href="/species/robot">机器人</a></td><td>问题解决者、系统思考者</td></tr>
<tr><td><strong>🔵 耐心</strong></td><td><a href="/species/duck">鸭子</a>、<a href="/species/penguin">企鹅</a>、<a href="/species/turtle">乌龟</a>、<a href="/species/capybara">水豚</a>、<a href="/species/snail">蜗牛</a></td><td>冷静、稳定、持久</td></tr>
<tr><td><strong>🟣 混乱</strong></td><td><a href="/species/goose">鹅</a>、<a href="/species/ghost">幽灵</a>、<a href="/species/rabbit">兔子</a></td><td>不可预测、创意、狂野</td></tr>
<tr><td><strong>🟡 智慧</strong></td><td><a href="/species/owl">猫头鹰</a>、<a href="/species/octopus">章鱼</a>、<a href="/species/blob">果冻</a>、<a href="/species/mushroom">蘑菇</a></td><td>博学、洞察、深邃</td></tr>
<tr><td><strong>🟢 毒舌</strong></td><td><a href="/species/cat">猫</a>、<a href="/species/cactus">仙人掌</a>、<a href="/species/chonk">胖墩</a></td><td>毒舌、固执己见、犀利</td></tr>
</table>
<p><strong>耐心</strong>拥有最多的物种（5 个），是最常见的亲和属性。<strong>调试</strong>、<strong>混乱</strong>和<strong>毒舌</strong>各有 3 个物种，而<strong>智慧</strong>有 4 个。这种分布反映了 Buddy 系统的设计哲学：大多数终端宠物是耐心的伙伴，但稀有的那些带来混乱或犀利的机智。</p>`
          },
          {
            heading: "强势-弱势属性的不对称性",
            body: `<p>属性系统最有趣的方面之一是<strong>强势和弱势属性之间的不对称性</strong>。强势属性获得巨大的 +50 加成，而弱势属性只有 −10 惩罚。这创造了截然不同的性格档案。</p>
<p>以<strong>普通 Buddy</strong>（下限 = 5）为例：</p>
<ul>
<li><strong>强势属性：</strong>55 到 84（平均约 69）</li>
<li><strong>普通属性：</strong>5 到 44（平均约 24）</li>
<li><strong>弱势属性：</strong>1 到 9（平均约 5，经常触底到 1）</li>
</ul>
<p>强势和弱势之间的差距可以高达 <strong>83 点</strong>（强势 84，弱势 1）。这意味着每个 Buddy 都有<strong>鲜明的个性</strong>——总有一件事它很擅长，一件事它很糟糕。</p>
<h4>弱势属性为 1 意味着什么？</h4>
<p>弱势属性为 1 是绝对最低值。以下是每种弱势属性对你 Buddy 性格的暗示：</p>
<ul>
<li><strong>调试 = 1：</strong>你的 Buddy 对着错误信息发呆。它甚至可能在试图帮忙时引入新 Bug。</li>
<li><strong>耐心 = 1：</strong>你的 Buddy 在第一个失败的测试后就暴走。构建时间太长时会在你的代码中写下愤怒的注释。</li>
<li><strong>混乱 = 1：</strong>你的 Buddy 完全可预测，严格遵循每一条规范。无聊？也许。可靠？绝对。</li>
<li><strong>智慧 = 1：</strong>你的 Buddy 自信地建议在每条 CSS 规则上使用 <code>!important</code>，并认为 <code>eval()</code> 是最佳实践。</li>
<li><strong>毒舌 = 1：</strong>你的 Buddy 无限支持你，从不评判你的代码。每条提交信息都得到竖起大拇指。</li>
</ul>
<p>注意<strong>低混乱对许多开发者来说实际上是可取的</strong>——它意味着你的 Buddy 稳定且可预测。同样，<strong>低毒舌</strong>意味着一个支持性的、不评判的伙伴。\"最差\"的弱势属性完全取决于你的偏好。</p>`
          },
          {
            heading: "各稀有度的属性范围",
            body: `<p>稀有度通过提高下限来大幅放大你 Buddy 的属性。以下是完整的范围表：</p>
<table>
<tr><th>稀有度</th><th>下限</th><th>强势范围</th><th>普通范围</th><th>弱势范围</th><th>总计范围</th></tr>
<tr><td>★ 普通</td><td>5</td><td>55 – 84</td><td>5 – 44</td><td>1 – 9</td><td>67 – 225</td></tr>
<tr><td>★★ 稀有</td><td>15</td><td>65 – 94</td><td>15 – 54</td><td>5 – 29</td><td>105 – 285</td></tr>
<tr><td>★★★ 精良</td><td>25</td><td>75 – 100</td><td>25 – 64</td><td>15 – 39</td><td>155 – 331</td></tr>
<tr><td>★★★★ 史诗</td><td>35</td><td>85 – 100</td><td>35 – 74</td><td>25 – 49</td><td>205 – 371</td></tr>
<tr><td>★★★★★ 传说</td><td>50</td><td>100</td><td>50 – 89</td><td>40 – 54</td><td>280 – 421</td></tr>
</table>
<p>注意<strong>传说级</strong>的特别之处：强势属性公式为 <code>min(100, 50 + 50 + rand(0–29))</code> = <code>min(100, 100–129)</code> = <strong>永远是 100</strong>。每个传说级 Buddy 都至少有一项满分属性。这是让传说级真正成为传说的数学保证。</p>
<p>还要注意，传说级的弱势属性（40–54）<strong>高于普通级强势属性范围的起点</strong>（55）。传说级 Buddy 最弱的方面与普通级 Buddy 最强的方面相当。这就是属性下限叠加的力量。</p>`
          },
          {
            heading: "理论上的完美 Buddy",
            body: `<p>绝对最好的 Buddy 会是什么样子？让我们计算理论最大值：</p>
<pre><code>稀有度：传说（1% 概率）
闪光：  是（1% 概率 → 组合 0.01%）
帽子：  皇冠（1/8 概率 → 组合 0.00125%）

属性（传说下限 = 50）：
  强势属性：100（传说级保证）
  普通 ×3： 各 89（最大掷骰）
  弱势属性：54（最大掷骰）
  
总计：100 + 89 + 89 + 89 + 54 = 421</code></pre>
<p><strong>理论最大总属性为 421</strong>。传说级的最低值为 280（100 + 50×3 + 40）。相比之下，普通 Buddy 的理论最大总属性仅为 225。</p>
<h4>梦幻组合</h4>
<table>
<tr><th>组合</th><th>物种</th><th>强势属性</th><th>为什么厉害</th></tr>
<tr><td>贤者</td><td><a href="/species/owl">猫头鹰</a></td><td>智慧 100</td><td>设定完美契合。最智慧的生物拥有最高智慧。</td></tr>
<tr><td>调试之神</td><td><a href="/species/dragon">龙</a></td><td>调试 100</td><td>远古力量遇上技术精通。没有 Bug 能存活。</td></tr>
<tr><td>无政府主义者</td><td><a href="/species/goose">鹅</a></td><td>混乱 100</td><td>最混乱的物种释放最大混乱。快跑。</td></tr>
<tr><td>禅宗大师</td><td><a href="/species/capybara">水豚</a></td><td>耐心 100</td><td>无限平静。你的构建可以花几个小时它也不会眨眼。</td></tr>
<tr><td>评论家</td><td><a href="/species/cat">猫</a></td><td>毒舌 100</td><td>最大毒舌。每一行代码都会被犀利审查。</td></tr>
</table>`
          },
          {
            heading: "立即查看你的 Buddy 属性",
            body: `<p>准备好看看你的 Buddy 在属性光谱上的位置了吗？前往 <a href="/">Buddy 查询工具</a>输入你的 UUID。你的 5 项属性将以彩色条形图和精确数值显示。</p>
<p>了解你的属性后，探索<a href="/species">物种百科</a>看看你的 Buddy 与同物种的其他个体相比如何。查看<a href="/blog/claude-code-buddy-rarity-guide">稀有度指南</a>了解你的等级如何影响属性下限，或浏览<a href="/blog/all-18-claude-buddy-species-ranked">物种排名</a>看看你的伙伴在整体层级中的位置。</p>
<p>在 Twitter/X 上使用 <code>#ClaudeBuddy</code> 分享你的属性——特别是如果你掷出了任何属性的满分 100。社区喜欢庆祝出色的掷骰结果！</p>`
          },
        ],
      },
      ko: {
        title: "Claude Code Buddy 스탯 시스템 심층 분석 — 5가지 성격 속성 이해하기",
        metaTitle: "Claude Code Buddy 스탯 시스템 심층 분석 — 5가지 속성 완전 해설 (2026)",
        metaDescription: "Claude Code Buddy의 5가지 성격 스탯 심층 분석: 디버깅, 인내, 혼돈, 지혜, 독설. 스탯 생성 메커니즘, 종별 친화도, 완벽한 버디의 조건을 알아보세요.",
        excerpt: "모든 Claude Code Buddy에는 캐릭터를 정의하는 5가지 성격 스탯이 있습니다. 어떻게 생성되나요? 어떤 종이 무엇에 뛰어나나요? 높은 혼돈 점수는 실제로 무엇을 의미하나요? 모두 분석해 봅시다.",
        sections: [
          {
            heading: "5가지 성격 스탯",
            body: `<p>모든 Claude Code Buddy는 <strong>5가지 성격 스탯</strong>으로 정의되며, 각각 1에서 100까지 점수가 매겨집니다. 이것은 단순한 숫자가 아닙니다 — 버디의 핵심 정체성과 터미널 동반자로서의 행동 방식을 나타냅니다.</p>
<h4>🔴 디버깅 DEBUGGING (빨강)</h4>
<p>버디의 버그 추적 및 기술 문제 해결 능력. 높은 디버깅 버디는 새벽 3시 프로덕션 장애 시 곁에 두고 싶은 동반자입니다. 체계적이고 집중적이며 근본 원인을 끈질기게 추적합니다.</p>
<p><strong>높은 디버깅 종:</strong> <a href="/species/dragon">드래곤</a> (고대 문제 해결사), <a href="/species/axolotl">아홀로틀</a> (재생 디버거), <a href="/species/robot">로봇</a> (체계적 분석가)</p>
<h4>🔵 인내 PATIENCE (파랑)</h4>
<p>긴 컴파일 시간, 불안정한 테스트, 끝없는 코드 리뷰를 버디가 얼마나 잘 처리하는지. 인내심 있는 버디는 포기하지 않습니다 — 빌드가 47번째 실패해도 차분하게 기다리며 격려합니다.</p>
<p><strong>높은 인내 종:</strong> <a href="/species/duck">오리</a> (평온한 동반자), <a href="/species/penguin">펭귄</a> (묵묵한 인내자), <a href="/species/turtle">거북이</a> (궁극의 기다림), <a href="/species/capybara">카피바라</a> (선 마스터), <a href="/species/snail">달팽이</a> (인내의 화신)</p>
<h4>🟣 혼돈 CHAOS (보라)</h4>
<p>와일드카드 스탯. 높은 혼돈 버디는 예측 불가능하고, 창의적이며, 때로는 파괴적입니다. 새벽 2시에 전체 코드베이스 리팩토링을 제안하거나 들어본 적 없는 프로그래밍 패러다임을 소개할 수 있습니다.</p>
<p><strong>높은 혼돈 종:</strong> <a href="/species/goose">거위</a> (혼돈의 에이전트), <a href="/species/ghost">유령</a> (초자연적 장난꾸러기), <a href="/species/rabbit">토끼</a> (과잉 에너지)</p>
<h4>🟡 지혜 WISDOM (노랑)</h4>
<p>깊은 지식과 통찰력. 지혜로운 버디는 디자인 패턴, 아키텍처 트레이드오프, 변수 명명 선택의 철학적 함의를 이해합니다. 버디 세계의 멘토입니다.</p>
<p><strong>높은 지혜 종:</strong> <a href="/species/owl">올빼미</a> (현자), <a href="/species/octopus">문어</a> (멀티스레드 사고가), <a href="/species/blob">블롭</a> (무정형 오라클), <a href="/species/mushroom">버섯</a> (균사 지식 네트워크)</p>
<h4>🟢 독설 SNARK (초록)</h4>
<p>버디의 독설 레벨. 높은 독설 버디는 날카로운 코드 리뷰를 하고, 커밋 메시지를 심판하며, 탭 vs 스페이스에 대해 강한 의견을 가집니다. 잔인할 정도로 솔직하지만 비밀리에 코드 품질을 신경 씁니다.</p>
<p><strong>높은 독설 종:</strong> <a href="/species/cat">고양이</a> (비평가), <a href="/species/cactus">선인장</a> (가시 달린 논평가), <a href="/species/chonk">뚱이</a> (둥글지만 날카로운 혀)</p>`
          },
          {
            heading: "스탯 생성 알고리즘",
            body: `<p>스탯은 무작위로 흩어지지 않습니다 — <strong>의미 있는 성격 프로필</strong>을 만드는 세심하게 설계된 알고리즘을 따릅니다. <code>rollStats</code> 함수의 정확한 작동 방식입니다:</p>
<pre><code>function rollStats(rng, rarity) {
  const floor = RARITY_FLOOR[rarity];  // 5, 15, 25, 35 또는 50
  const peak  = pick(rng, STAT_NAMES); // 랜덤 피크 스탯
  let dump    = pick(rng, STAT_NAMES); // 랜덤 덤프 스탯
  while (dump === peak) dump = pick(rng, STAT_NAMES);
  
  for (const stat of STAT_NAMES) {
    if (stat === peak)
      stats[stat] = min(100, floor + 50 + random(0..29));
    else if (stat === dump)
      stats[stat] = max(1, floor - 10 + random(0..14));
    else
      stats[stat] = floor + random(0..39);
  }
}</code></pre>
<p>알고리즘은 모든 버디에 대해 <strong>세 단계의 스탯</strong>을 생성합니다:</p>
<table>
<tr><th>스탯 유형</th><th>공식</th><th>일반 범위</th><th>전설 범위</th></tr>
<tr><td><strong>피크 스탯</strong></td><td>하한 + 50 + rand(0–29)</td><td>55 – 84</td><td>100</td></tr>
<tr><td><strong>일반 스탯</strong> (×3)</td><td>하한 + rand(0–39)</td><td>5 – 44</td><td>50 – 89</td></tr>
<tr><td><strong>덤프 스탯</strong></td><td>하한 − 10 + rand(0–14)</td><td>1 – 9</td><td>40 – 54</td></tr>
</table>
<p>핵심 인사이트: <strong>피크 스탯은 항상 무작위로 선택됩니다</strong> — 종에 의해 결정되지 않습니다. 오리가 피크 혼돈을 가질 수 있고, 거위가 피크 인내를 가질 수 있습니다. 종은 <em>설정상의</em> 친화도만 결정하며 실제 롤 결과는 아닙니다.</p>`
          },
          {
            heading: "종-스탯 친화도 맵",
            body: `<p>실제 피크 스탯은 무작위로 롤되지만, 각 종에는 <strong>설정상의 친화 속성</strong>이 있습니다 — 그 성격을 가장 잘 나타내는 스탯입니다. 완전한 매핑입니다:</p>
<table>
<tr><th>스탯</th><th>종</th><th>성격 테마</th></tr>
<tr><td><strong>🔴 디버깅</strong></td><td><a href="/species/dragon">드래곤</a>, <a href="/species/axolotl">아홀로틀</a>, <a href="/species/robot">로봇</a></td><td>문제 해결사, 체계적 사고가</td></tr>
<tr><td><strong>🔵 인내</strong></td><td><a href="/species/duck">오리</a>, <a href="/species/penguin">펭귄</a>, <a href="/species/turtle">거북이</a>, <a href="/species/capybara">카피바라</a>, <a href="/species/snail">달팽이</a></td><td>차분, 꾸준, 인내</td></tr>
<tr><td><strong>🟣 혼돈</strong></td><td><a href="/species/goose">거위</a>, <a href="/species/ghost">유령</a>, <a href="/species/rabbit">토끼</a></td><td>예측 불가, 창의적, 야생</td></tr>
<tr><td><strong>🟡 지혜</strong></td><td><a href="/species/owl">올빼미</a>, <a href="/species/octopus">문어</a>, <a href="/species/blob">블롭</a>, <a href="/species/mushroom">버섯</a></td><td>박학, 통찰력, 깊음</td></tr>
<tr><td><strong>🟢 독설</strong></td><td><a href="/species/cat">고양이</a>, <a href="/species/cactus">선인장</a>, <a href="/species/chonk">뚱이</a></td><td>독설, 고집, 날카로움</td></tr>
</table>
<p><strong>인내</strong>가 가장 많은 종(5개)을 보유하여 가장 흔한 친화 속성입니다. <strong>디버깅</strong>, <strong>혼돈</strong>, <strong>독설</strong>은 각각 3종, <strong>지혜</strong>는 4종입니다. 이 분포는 버디 시스템의 설계 철학을 반영합니다: 대부분의 터미널 펫은 인내심 있는 동반자이지만, 드문 것들은 혼돈이나 날카로운 재치를 가져옵니다.</p>`
          },
          {
            heading: "피크-덤프 스탯의 비대칭성",
            body: `<p>스탯 시스템의 가장 흥미로운 측면 중 하나는 <strong>피크와 덤프 스탯 사이의 비대칭성</strong>입니다. 피크 스탯은 거대한 +50 보너스를 받고, 덤프 스탯은 −10 페널티만 받습니다. 이것은 극적으로 다른 성격 프로필을 만듭니다.</p>
<p><strong>일반 버디</strong>(하한 = 5)를 생각해 봅시다:</p>
<ul>
<li><strong>피크 스탯:</strong> 55에서 84 (평균 약 69)</li>
<li><strong>일반 스탯:</strong> 5에서 44 (평균 약 24)</li>
<li><strong>덤프 스탯:</strong> 1에서 9 (평균 약 5, 종종 1까지 떨어짐)</li>
</ul>
<p>피크와 덤프 사이의 격차는 최대 <strong>83포인트</strong>(피크 84, 덤프 1)에 달할 수 있습니다. 이는 모든 버디가 <strong>강한 정체성</strong>을 가진다는 것을 의미합니다 — 항상 잘하는 것 하나와 못하는 것 하나가 있습니다.</p>
<h4>덤프 스탯 1은 무엇을 의미하나요?</h4>
<p>덤프 스탯 1은 절대 최솟값입니다. 각 덤프 스탯이 버디 성격에 암시하는 바입니다:</p>
<ul>
<li><strong>디버깅 = 1:</strong> 버디가 에러 메시지를 멍하니 바라봅니다. 도와주려다 새로운 버그를 만들 수도 있습니다.</li>
<li><strong>인내 = 1:</strong> 첫 번째 실패한 테스트 후 버디가 폭주합니다. 빌드 시간이 너무 길면 코드에 화난 주석을 답니다.</li>
<li><strong>혼돈 = 1:</strong> 버디가 완전히 예측 가능하고 모든 규칙을 철저히 따릅니다. 지루한가요? 아마도. 신뢰할 수 있나요? 절대적으로.</li>
<li><strong>지혜 = 1:</strong> 버디가 자신있게 모든 CSS 규칙에 <code>!important</code>를 사용하라고 제안하고 <code>eval()</code>이 모범 사례라고 생각합니다.</li>
<li><strong>독설 = 1:</strong> 버디가 끝없이 지지적이고 절대 코드를 판단하지 않습니다. 모든 커밋 메시지에 엄지척을 합니다.</li>
</ul>
<p><strong>낮은 혼돈은 많은 개발자에게 실제로 바람직합니다</strong> — 버디가 안정적이고 예측 가능하다는 뜻입니다. 마찬가지로 <strong>낮은 독설</strong>은 지지적이고 비판단적인 동반자를 의미합니다. \"최악의\" 덤프 스탯은 전적으로 당신의 선호에 달려 있습니다.</p>`
          },
          {
            heading: "모든 희귀도별 스탯 범위",
            body: `<p>희귀도는 하한을 높여 버디의 스탯을 극적으로 증폭시킵니다. 완전한 범위 표입니다:</p>
<table>
<tr><th>희귀도</th><th>하한</th><th>피크 범위</th><th>일반 범위</th><th>덤프 범위</th><th>총합 범위</th></tr>
<tr><td>★ 일반</td><td>5</td><td>55 – 84</td><td>5 – 44</td><td>1 – 9</td><td>67 – 225</td></tr>
<tr><td>★★ 비범</td><td>15</td><td>65 – 94</td><td>15 – 54</td><td>5 – 29</td><td>105 – 285</td></tr>
<tr><td>★★★ 희귀</td><td>25</td><td>75 – 100</td><td>25 – 64</td><td>15 – 39</td><td>155 – 331</td></tr>
<tr><td>★★★★ 에픽</td><td>35</td><td>85 – 100</td><td>35 – 74</td><td>25 – 49</td><td>205 – 371</td></tr>
<tr><td>★★★★★ 전설</td><td>50</td><td>100</td><td>50 – 89</td><td>40 – 54</td><td>280 – 421</td></tr>
</table>
<p><strong>전설</strong>의 특별한 점: 피크 스탯 공식이 <code>min(100, 50 + 50 + rand(0–29))</code> = <code>min(100, 100–129)</code> = <strong>항상 100</strong>입니다. 모든 전설 버디는 최소 하나의 만점 스탯을 가집니다. 이것이 전설 등급을 진정한 전설로 만드는 수학적 보장입니다.</p>
<p>또한 전설의 덤프 스탯(40–54)이 <strong>일반의 피크 스탯 범위 시작점</strong>(55)보다 높다는 점에 주목하세요. 전설 버디의 가장 약한 면이 일반 버디의 가장 강한 면에 필적합니다. 이것이 스탯 하한 누적의 힘입니다.</p>`
          },
          {
            heading: "이론적으로 완벽한 버디",
            body: `<p>절대적으로 최고의 버디는 어떤 모습일까요? 이론적 최댓값을 계산해 봅시다:</p>
<pre><code>희귀도: 전설 (1% 확률)
샤이니: 예 (1% 확률 → 조합 0.01%)
모자:   왕관 (1/8 확률 → 조합 0.00125%)

스탯 (전설 하한 = 50):
  피크 스탯: 100 (전설에서 보장)
  일반 ×3:  각 89 (최대 롤)
  덤프 스탯: 54 (최대 롤)
  
총합: 100 + 89 + 89 + 89 + 54 = 421</code></pre>
<p><strong>이론적 최대 총 스탯은 421</strong>입니다. 전설의 최솟값은 280 (100 + 50×3 + 40)입니다. 비교하면, 일반 버디의 이론적 최대 총 스탯은 225에 불과합니다.</p>
<h4>드림 콤보</h4>
<table>
<tr><th>콤보</th><th>종</th><th>피크 스탯</th><th>왜 대단한가</th></tr>
<tr><td>현자</td><td><a href="/species/owl">올빼미</a></td><td>지혜 100</td><td>설정 완벽 일치. 가장 지혜로운 생물이 최대 지혜를.</td></tr>
<tr><td>디버거</td><td><a href="/species/dragon">드래곤</a></td><td>디버깅 100</td><td>고대의 힘이 기술적 숙련을 만남. 어떤 버그도 살아남지 못함.</td></tr>
<tr><td>아나키스트</td><td><a href="/species/goose">거위</a></td><td>혼돈 100</td><td>가장 혼란스러운 종의 최대 혼돈. 도망치세요.</td></tr>
<tr><td>선 마스터</td><td><a href="/species/capybara">카피바라</a></td><td>인내 100</td><td>무한한 평온. 빌드가 몇 시간 걸려도 눈 하나 깜짝 안 함.</td></tr>
<tr><td>비평가</td><td><a href="/species/cat">고양이</a></td><td>독설 100</td><td>최대 독설. 모든 코드 줄이 신랄한 리뷰를 받음.</td></tr>
</table>`
          },
          {
            heading: "지금 버디 스탯을 확인하세요",
            body: `<p>버디가 스탯 스펙트럼에서 어디에 위치하는지 볼 준비가 되셨나요? <a href="/">버디 체커</a>로 가서 UUID를 입력하세요. 5가지 스탯이 색상 바와 정확한 수치로 표시됩니다.</p>
<p>스탯을 확인한 후, <a href="/species">종 백과사전</a>에서 같은 종의 다른 개체와 비교해 보세요. <a href="/blog/claude-code-buddy-rarity-guide">희귀도 가이드</a>에서 등급이 스탯 하한에 어떤 영향을 미치는지 확인하거나, <a href="/blog/all-18-claude-buddy-species-ranked">종 랭킹</a>에서 동반자의 전체 계층 위치를 확인하세요.</p>
<p>Twitter/X에서 <code>#ClaudeBuddy</code>로 스탯을 공유하세요 — 특히 어떤 스탯에서 만점 100을 굴렸다면요. 커뮤니티는 뛰어난 롤을 축하하는 것을 좋아합니다!</p>`
          },
        ],
      },
    },
  },
  // ── Article 5: Cosmetics Guide ──────────────────────────────────────────
  {
    slug: "claude-buddy-cosmetics-guide-hats-eyes-shiny",
    publishedAt: "2026-04-04",
    readingTime: 7,
    tags: ["cosmetics", "hats", "eyes", "shiny", "probability"],
    content: {
      en: {
        title: "Claude Code Buddy Cosmetics Guide — Hats, Eyes & Shiny Effects",
        metaTitle: "Claude Code Buddy Cosmetics Guide — Hats, Eyes & Shiny Effects (2026)",
        metaDescription: "Complete guide to Claude Code Buddy cosmetics: 6 eye styles, 8 hat types, and the ultra-rare 1% shiny effect. Learn drop rates, visual previews, and how to get the rarest combinations.",
        excerpt: "Your buddy's look is defined by three cosmetic layers: eyes, hats, and shiny status. Learn the exact drop rates for all 6 eye styles, 8 hat types, and the ultra-rare 1% shiny effect — plus the rarest possible combinations.",
        sections: [
          {
            heading: "Beyond Species & Stats: The Cosmetic Layer",
            body: `<p>Your Claude Code Buddy isn't just defined by its <a href="/blog/claude-buddy-stats-system-deep-dive">5 personality stats</a> or <a href="/blog/claude-code-buddy-rarity-guide">rarity tier</a>. Every buddy also has a unique <strong>cosmetic combination</strong> — a set of visual traits that make it truly one-of-a-kind in your terminal.</p>
<p>The cosmetic system has three independent layers:</p>
<table>
<tr><th>Layer</th><th>Options</th><th>Selection Method</th></tr>
<tr><td><strong>Eyes</strong></td><td>6 styles</td><td>Uniform random (1/6 each)</td></tr>
<tr><td><strong>Hats</strong></td><td>8 types</td><td>Rarity-gated + uniform random</td></tr>
<tr><td><strong>Shiny</strong></td><td>On/Off</td><td>1% flat chance</td></tr>
</table>
<p>Each layer is rolled independently using the <strong>Mulberry32 PRNG</strong> seeded from your UUID + salt hash. This means your cosmetics are deterministic — the same UUID always produces the same look.</p>`
          },
          {
            heading: "The 6 Eye Styles",
            body: `<p>Eyes are the first thing you notice on a buddy's ASCII face. There are exactly <strong>6 eye characters</strong>, each giving your buddy a distinct personality:</p>
<table>
<tr><th>Eye</th><th>Character</th><th>Vibe</th><th>Probability</th></tr>
<tr><td><code>·</code></td><td>Middle Dot</td><td>Sleepy, calm, zen — your buddy is at peace with the codebase</td><td>16.67%</td></tr>
<tr><td><code>✦</code></td><td>Four-pointed Star</td><td>Sparkly, excited, starry-eyed — sees magic in every function</td><td>16.67%</td></tr>
<tr><td><code>×</code></td><td>Multiplication Sign</td><td>Dead, dizzy, overwhelmed — has seen too many segfaults</td><td>16.67%</td></tr>
<tr><td><code>◉</code></td><td>Bullseye</td><td>Focused, intense, laser-locked — debugging with precision</td><td>16.67%</td></tr>
<tr><td><code>@</code></td><td>At Sign</td><td>Digital, matrix-like, hacker — lives in the terminal</td><td>16.67%</td></tr>
<tr><td><code>°</code></td><td>Degree Sign</td><td>Surprised, wide-eyed, curious — everything is new and exciting</td><td>16.67%</td></tr>
</table>
<p>The selection is perfectly uniform: <code>pick(rng, EYES)</code> gives each eye an equal <strong>1/6 ≈ 16.67%</strong> chance. No eye is rarer than another — it's pure aesthetic luck.</p>
<p><strong>Fun fact:</strong> The <code>×</code> (dead eyes) combined with a Ghost species creates the most thematically consistent buddy. Meanwhile, <code>✦</code> (sparkly eyes) on a Dragon gives it a surprisingly cute look despite its fearsome ASCII art.</p>`
          },
          {
            heading: "The 8 Hat Types",
            body: `<p>Hats are the most <strong>rarity-gated</strong> cosmetic in the system. Here's the critical rule:</p>
<blockquote><strong>Common buddies (60% of all buddies) NEVER get a hat.</strong> Only Uncommon and above can wear headgear.</blockquote>
<p>The code is explicit: <code>hat = rarity === 'common' ? 'none' : pick(rng, HATS)</code>. If you're Common, you're hatless. Period.</p>
<p>For non-Common buddies, the hat is selected uniformly from all 8 options (including 'none'):</p>
<table>
<tr><th>Hat</th><th>ASCII Preview</th><th>Description</th><th>P (if non-Common)</th><th>P (overall)</th></tr>
<tr><td><strong>None</strong></td><td><em>(empty)</em></td><td>No hat — clean look</td><td>12.5%</td><td>65.0%</td></tr>
<tr><td><strong>Crown</strong></td><td><code>\^^^/</code></td><td>Royal crown — for the king/queen of your terminal</td><td>12.5%</td><td>5.0%</td></tr>
<tr><td><strong>Top Hat</strong></td><td><code>[___]</code></td><td>Gentleman's top hat — classy and distinguished</td><td>12.5%</td><td>5.0%</td></tr>
<tr><td><strong>Propeller</strong></td><td><code>-+-</code></td><td>Propeller beanie — playful and childlike</td><td>12.5%</td><td>5.0%</td></tr>
<tr><td><strong>Halo</strong></td><td><code>(   )</code></td><td>Angel's halo — pure and innocent</td><td>12.5%</td><td>5.0%</td></tr>
<tr><td><strong>Wizard</strong></td><td><code>/^\</code></td><td>Wizard hat — mystical and wise</td><td>12.5%</td><td>5.0%</td></tr>
<tr><td><strong>Beanie</strong></td><td><code>(___)</code></td><td>Cozy beanie — casual and comfortable</td><td>12.5%</td><td>5.0%</td></tr>
<tr><td><strong>Tiny Duck</strong></td><td><code>,></code></td><td>A tiny duck sitting on your buddy's head — the meme pick</td><td>12.5%</td><td>5.0%</td></tr>
</table>
<p>The <strong>overall probability</strong> of having any specific hat is only <strong>5%</strong> (40% chance of being non-Common × 12.5% chance of that specific hat). This makes hatted buddies a genuine status symbol.</p>
<p><strong>Best hat combos by species:</strong></p>
<ul>
<li><strong>Crown + Dragon</strong> — The undisputed king of terminal pets</li>
<li><strong>Wizard + Owl</strong> — Maximum wisdom energy</li>
<li><strong>Tiny Duck + Duck</strong> — Duck-ception! A duck with a duck on its head</li>
<li><strong>Halo + Ghost</strong> — An angelic spirit watching over your code</li>
<li><strong>Top Hat + Cat</strong> — Fancy feline with impeccable taste</li>
<li><strong>Propeller + Chonk</strong> — Adorably ridiculous</li>
</ul>`
          },
          {
            heading: "The 1% Shiny Effect",
            body: `<p>The <strong>shiny effect</strong> is the rarest cosmetic trait in the entire buddy system. With a flat <strong>1% probability</strong> (<code>rng() < 0.01</code>), shiny buddies are the equivalent of shiny Pokémon — identical in function but visually special.</p>
<p>Key facts about shiny buddies:</p>
<ul>
<li><strong>Rarity-independent:</strong> Shiny rolls happen after rarity selection. A Common buddy can be shiny, and a Legendary can be non-shiny.</li>
<li><strong>Visual indicator:</strong> Shiny buddies display a special sparkle marker (✨) in their terminal display, making them instantly recognizable.</li>
<li><strong>Bragging rights:</strong> Only ~1 in 100 buddies will be shiny. If yours is, you're in an exclusive club.</li>
</ul>
<p>The probability math:</p>
<table>
<tr><th>Combination</th><th>Probability</th><th>Odds</th></tr>
<tr><td>Shiny (any rarity)</td><td>1.00%</td><td>1 in 100</td></tr>
<tr><td>Shiny + Uncommon or above</td><td>0.40%</td><td>1 in 250</td></tr>
<tr><td>Shiny + Rare or above</td><td>0.15%</td><td>1 in 667</td></tr>
<tr><td>Shiny + Epic</td><td>0.04%</td><td>1 in 2,500</td></tr>
<tr><td>Shiny + Legendary</td><td>0.01%</td><td>1 in 10,000</td></tr>
</table>
<p>A <strong>Shiny Legendary</strong> buddy is a 1-in-10,000 event. If you have one, screenshot it immediately — it's the terminal equivalent of finding a four-leaf clover inside a winning lottery ticket.</p>`
          },
          {
            heading: "How Cosmetics Are Generated: The Code",
            body: `<p>Here's the exact sequence from the <code>rollBuddy</code> function that determines your buddy's appearance:</p>
<pre><code>export function rollBuddy(userId: string): BuddyResult {
  const rng = mulberry32(hashString(userId + SALT));
  const rarity  = rollRarity(rng);           // Step 1
  const species = pick(rng, SPECIES);         // Step 2
  const eye     = pick(rng, EYES);            // Step 3
  const hat     = rarity === 'common'         // Step 4
                  ? 'none'
                  : pick(rng, HATS);
  const shiny   = rng() < 0.01;              // Step 5
  const stats   = rollStats(rng, rarity);     // Step 6
  return { rarity, species, eye, hat, shiny, stats };
}</code></pre>
<p>The order matters because each <code>rng()</code> call advances the PRNG state. The sequence is: rarity → species → eye → hat → shiny → stats. This means changing any earlier roll would cascade and change all subsequent rolls.</p>
<p><strong>Why does order matter?</strong> The Mulberry32 PRNG is a deterministic sequence. Call #1 always returns the same value for a given seed. So your eye style is always determined by the 3rd+ RNG call (after rarity consumed 1+ calls and species consumed 1 call). This is why the same UUID always produces the exact same buddy.</p>`
          },
          {
            heading: "The Rarest Possible Combinations",
            body: `<p>Let's calculate the probability of some dream combinations:</p>
<table>
<tr><th>Dream Buddy</th><th>Requirements</th><th>Probability</th><th>Odds</th></tr>
<tr><td>Crowned King</td><td>Legendary + Crown + any</td><td>0.0125%</td><td>1 in 8,000</td></tr>
<tr><td>Sparkle Dragon</td><td>Dragon + ✦ eyes + any hat</td><td>0.926%</td><td>1 in 108</td></tr>
<tr><td>Shiny Wizard Owl</td><td>Shiny + Owl + Wizard hat + any rarity</td><td>0.000347%</td><td>1 in 288,000</td></tr>
<tr><td>Matrix Robot</td><td>Robot + @ eyes + any</td><td>0.926%</td><td>1 in 108</td></tr>
<tr><td>Ultimate Duck</td><td>Shiny + Legendary + Duck + Tiny Duck hat + ✦ eyes</td><td>0.0000012%</td><td>1 in 86,400,000</td></tr>
</table>
<p>The <strong>Ultimate Duck</strong> — a Shiny Legendary Duck with a Tiny Duck hat and sparkly eyes — has odds of roughly <strong>1 in 86.4 million</strong>. To put that in perspective, you're about 3× more likely to be struck by lightning in a given year.</p>
<p><strong>Probability breakdown for the Ultimate Duck:</strong></p>
<pre><code>P(Legendary)  = 1/100   = 0.01
P(Duck)       = 1/18    ≈ 0.0556
P(✦ eyes)     = 1/6     ≈ 0.1667
P(Tiny Duck)  = 1/8     = 0.125
P(Shiny)      = 1/100   = 0.01

P(all) = 0.01 × 0.0556 × 0.1667 × 0.125 × 0.01
       ≈ 0.00000001157
       ≈ 1 in 86,400,000</code></pre>`
          },
          {
            heading: "Check Your Buddy's Cosmetics Now",
            body: `<p>Ready to see what cosmetic combination fate assigned you? Head to the <a href="/">Buddy Checker</a> and enter your UUID. Your buddy's eye style, hat (if any), and shiny status will be displayed alongside its species, rarity, and stats.</p>
<p>Already know your buddy? Visit the <a href="/species">Species Encyclopedia</a> to see how your buddy's ASCII art looks with different eye and hat combinations. Check the <a href="/blog/claude-buddy-stats-system-deep-dive">Stats Deep Dive</a> to understand your personality attributes, or browse the <a href="/blog/all-18-claude-buddy-species-ranked">Species Rankings</a> to see where your companion stands.</p>
<p>Share your cosmetic combo on Twitter/X with <code>#ClaudeBuddy</code> — especially if you rolled a shiny or a rare hat. The community loves celebrating unique finds!</p>`
          },
        ],
      },
      zh: {
        title: "Claude Code Buddy 外观装饰指南 — 帽子、眼睛与闪光效果",
        metaTitle: "Claude Code Buddy 外观装饰指南 — 帽子、眼睛与闪光效果 (2026)",
        metaDescription: "Claude Code Buddy 外观系统完全指南：6 种眼睛样式、8 种帽子类型和超稀有的 1% 闪光效果。了解掉落概率、视觉预览和最稀有的组合。",
        excerpt: "你的 Buddy 外观由三个装饰层定义：眼睛、帽子和闪光状态。了解全部 6 种眼睛样式、8 种帽子类型和超稀有 1% 闪光效果的精确掉落概率，以及最稀有的可能组合。",
        sections: [
          {
            heading: "不止物种与属性：外观装饰层",
            body: `<p>你的 Claude Code Buddy 不仅仅由<a href="/blog/claude-buddy-stats-system-deep-dive">5 项性格属性</a>或<a href="/blog/claude-code-buddy-rarity-guide">稀有度等级</a>定义。每个 Buddy 还有一套独特的<strong>外观装饰组合</strong>——一组让它在你的终端中真正独一无二的视觉特征。</p>
<p>外观系统有三个独立层：</p>
<table>
<tr><th>层级</th><th>选项</th><th>选择方式</th></tr>
<tr><td><strong>眼睛</strong></td><td>6 种样式</td><td>均匀随机（各 1/6）</td></tr>
<tr><td><strong>帽子</strong></td><td>8 种类型</td><td>稀有度门槛 + 均匀随机</td></tr>
<tr><td><strong>闪光</strong></td><td>开/关</td><td>固定 1% 概率</td></tr>
</table>
<p>每个层级都使用基于你的 UUID + 盐值哈希的 <strong>Mulberry32 PRNG</strong> 独立掷骰。这意味着你的外观是确定性的——相同的 UUID 总是产生相同的外观。</p>`
          },
          {
            heading: "6 种眼睛样式",
            body: `<p>眼睛是你在 Buddy ASCII 面孔上最先注意到的东西。系统中恰好有 <strong>6 种眼睛字符</strong>，每种都赋予你的 Buddy 独特的个性：</p>
<table>
<tr><th>眼睛</th><th>字符名</th><th>氛围</th><th>概率</th></tr>
<tr><td><code>·</code></td><td>中点</td><td>困倦、平静、禅意——你的 Buddy 与代码库和平共处</td><td>16.67%</td></tr>
<tr><td><code>✦</code></td><td>四角星</td><td>闪亮、兴奋、星星眼——在每个函数中看到魔法</td><td>16.67%</td></tr>
<tr><td><code>×</code></td><td>乘号</td><td>死亡、眩晕、崩溃——见过太多段错误</td><td>16.67%</td></tr>
<tr><td><code>◉</code></td><td>靶心</td><td>专注、强烈、锁定——精确调试中</td><td>16.67%</td></tr>
<tr><td><code>@</code></td><td>at 符号</td><td>数字化、矩阵风、黑客——活在终端里</td><td>16.67%</td></tr>
<tr><td><code>°</code></td><td>度数符号</td><td>惊讶、瞪大眼、好奇——一切都是新鲜的</td><td>16.67%</td></tr>
</table>
<p>选择是完全均匀的：<code>pick(rng, EYES)</code> 给每种眼睛相等的 <strong>1/6 ≈ 16.67%</strong> 概率。没有哪种眼睛比其他的更稀有——纯粹是美学运气。</p>
<p><strong>趣闻：</strong><code>×</code>（死亡眼）搭配幽灵物种创造了最具主题一致性的 Buddy。而 <code>✦</code>（闪亮眼）配龙则让它在凶猛的 ASCII 艺术下显得出奇地可爱。</p>`
          },
          {
            heading: "8 种帽子类型",
            body: `<p>帽子是系统中最受<strong>稀有度限制</strong>的外观装饰。关键规则：</p>
<blockquote><strong>普通 Buddy（占所有 Buddy 的 60%）永远不会获得帽子。</strong>只有非凡及以上才能佩戴头饰。</blockquote>
<p>代码很明确：<code>hat = rarity === 'common' ? 'none' : pick(rng, HATS)</code>。如果你是普通级，就没有帽子。就这样。</p>
<p>对于非普通 Buddy，帽子从所有 8 个选项（包括"无"）中均匀选择：</p>
<table>
<tr><th>帽子</th><th>ASCII 预览</th><th>描述</th><th>非普通概率</th><th>总体概率</th></tr>
<tr><td><strong>无</strong></td><td><em>（空）</em></td><td>无帽——干净的外观</td><td>12.5%</td><td>65.0%</td></tr>
<tr><td><strong>皇冠</strong></td><td><code>\^^^/</code></td><td>皇家冠冕——终端之王/女王</td><td>12.5%</td><td>5.0%</td></tr>
<tr><td><strong>礼帽</strong></td><td><code>[___]</code></td><td>绅士礼帽——优雅而尊贵</td><td>12.5%</td><td>5.0%</td></tr>
<tr><td><strong>螺旋桨帽</strong></td><td><code>-+-</code></td><td>螺旋桨便帽——俏皮而童真</td><td>12.5%</td><td>5.0%</td></tr>
<tr><td><strong>光环</strong></td><td><code>(   )</code></td><td>天使光环——纯洁而无辜</td><td>12.5%</td><td>5.0%</td></tr>
<tr><td><strong>巫师帽</strong></td><td><code>/^\</code></td><td>巫师帽——神秘而睿智</td><td>12.5%</td><td>5.0%</td></tr>
<tr><td><strong>毛线帽</strong></td><td><code>(___)</code></td><td>舒适毛线帽——休闲而舒适</td><td>12.5%</td><td>5.0%</td></tr>
<tr><td><strong>小鸭子</strong></td><td><code>,></code></td><td>头顶小鸭子——梗图之选</td><td>12.5%</td><td>5.0%</td></tr>
</table>
<p>拥有任何特定帽子的<strong>总体概率</strong>仅为 <strong>5%</strong>（40% 非普通概率 × 12.5% 该帽子概率）。这使得戴帽 Buddy 成为真正的身份象征。</p>
<p><strong>最佳帽子搭配：</strong></p>
<ul>
<li><strong>皇冠 + 龙</strong>——终端宠物界无可争议的王者</li>
<li><strong>巫师帽 + 猫头鹰</strong>——智慧能量拉满</li>
<li><strong>小鸭子 + 鸭子</strong>——套娃！头上有鸭子的鸭子</li>
<li><strong>光环 + 幽灵</strong>——守护你代码的天使之灵</li>
<li><strong>礼帽 + 猫</strong>——品味不凡的优雅猫咪</li>
<li><strong>螺旋桨帽 + 胖墩</strong>——可爱到离谱</li>
</ul>`
          },
          {
            heading: "1% 闪光效果",
            body: `<p><strong>闪光效果</strong>是整个 Buddy 系统中最稀有的外观特征。以固定 <strong>1% 概率</strong>（<code>rng() < 0.01</code>），闪光 Buddy 相当于宝可梦中的色违——功能相同但视觉上特别。</p>
<p>关于闪光 Buddy 的关键事实：</p>
<ul>
<li><strong>与稀有度无关：</strong>闪光掷骰在稀有度选择之后进行。普通 Buddy 可以是闪光的，传说 Buddy 也可以不闪光。</li>
<li><strong>视觉标识：</strong>闪光 Buddy 在终端显示中带有特殊的闪光标记（✨），一眼就能认出。</li>
<li><strong>炫耀资本：</strong>大约每 100 个 Buddy 中只有 1 个是闪光的。如果你的是，你就进入了专属俱乐部。</li>
</ul>
<p>概率计算：</p>
<table>
<tr><th>组合</th><th>概率</th><th>赔率</th></tr>
<tr><td>闪光（任何稀有度）</td><td>1.00%</td><td>1/100</td></tr>
<tr><td>闪光 + 非凡及以上</td><td>0.40%</td><td>1/250</td></tr>
<tr><td>闪光 + 稀有及以上</td><td>0.15%</td><td>1/667</td></tr>
<tr><td>闪光 + 史诗</td><td>0.04%</td><td>1/2,500</td></tr>
<tr><td>闪光 + 传说</td><td>0.01%</td><td>1/10,000</td></tr>
</table>
<p><strong>闪光传说</strong> Buddy 是万分之一的事件。如果你有一个，立刻截图——这相当于在中奖彩票里发现了四叶草。</p>`
          },
          {
            heading: "外观生成代码解析",
            body: `<p>以下是 <code>rollBuddy</code> 函数中决定你 Buddy 外观的精确序列：</p>
<pre><code>export function rollBuddy(userId: string): BuddyResult {
  const rng = mulberry32(hashString(userId + SALT));
  const rarity  = rollRarity(rng);           // 第 1 步
  const species = pick(rng, SPECIES);         // 第 2 步
  const eye     = pick(rng, EYES);            // 第 3 步
  const hat     = rarity === 'common'         // 第 4 步
                  ? 'none'
                  : pick(rng, HATS);
  const shiny   = rng() < 0.01;              // 第 5 步
  const stats   = rollStats(rng, rarity);     // 第 6 步
  return { rarity, species, eye, hat, shiny, stats };
}</code></pre>
<p>顺序很重要，因为每次 <code>rng()</code> 调用都会推进 PRNG 状态。序列是：稀有度 → 物种 → 眼睛 → 帽子 → 闪光 → 属性。这意味着改变任何早期掷骰都会级联改变所有后续掷骰。</p>
<p><strong>为什么顺序重要？</strong>Mulberry32 PRNG 是确定性序列。对于给定种子，第 1 次调用总是返回相同的值。所以你的眼睛样式总是由第 3+ 次 RNG 调用决定（在稀有度消耗 1+ 次调用和物种消耗 1 次调用之后）。这就是为什么相同的 UUID 总是产生完全相同的 Buddy。</p>`
          },
          {
            heading: "最稀有的可能组合",
            body: `<p>让我们计算一些梦想组合的概率：</p>
<table>
<tr><th>梦想 Buddy</th><th>要求</th><th>概率</th><th>赔率</th></tr>
<tr><td>加冕之王</td><td>传说 + 皇冠 + 任意</td><td>0.0125%</td><td>1/8,000</td></tr>
<tr><td>闪耀之龙</td><td>龙 + ✦ 眼 + 任意帽子</td><td>0.926%</td><td>1/108</td></tr>
<tr><td>闪光巫师猫头鹰</td><td>闪光 + 猫头鹰 + 巫师帽 + 任意稀有度</td><td>0.000347%</td><td>1/288,000</td></tr>
<tr><td>矩阵机器人</td><td>机器人 + @ 眼 + 任意</td><td>0.926%</td><td>1/108</td></tr>
<tr><td>终极鸭子</td><td>闪光 + 传说 + 鸭子 + 小鸭子帽 + ✦ 眼</td><td>0.0000012%</td><td>1/86,400,000</td></tr>
</table>
<p><strong>终极鸭子</strong>——一只闪光传说级鸭子，头顶小鸭子帽，闪亮星星眼——概率约为 <strong>8640 万分之一</strong>。作为参考，你在一年内被闪电击中的概率大约是它的 3 倍。</p>
<p><strong>终极鸭子概率分解：</strong></p>
<pre><code>P(传说)    = 1/100   = 0.01
P(鸭子)    = 1/18    ≈ 0.0556
P(✦ 眼)    = 1/6     ≈ 0.1667
P(小鸭子帽) = 1/8     = 0.125
P(闪光)    = 1/100   = 0.01

P(全部) = 0.01 × 0.0556 × 0.1667 × 0.125 × 0.01
        ≈ 0.00000001157
        ≈ 1/86,400,000</code></pre>`
          },
          {
            heading: "现在就查看你的 Buddy 外观",
            body: `<p>准备好看看命运给你分配了什么外观组合了吗？前往<a href="/">Buddy 查询器</a>输入你的 UUID。你的 Buddy 的眼睛样式、帽子（如果有的话）和闪光状态将与物种、稀有度和属性一起显示。</p>
<p>已经知道你的 Buddy 了？访问<a href="/species">物种百科</a>看看你的 Buddy 的 ASCII 艺术在不同眼睛和帽子组合下的样子。查看<a href="/blog/claude-buddy-stats-system-deep-dive">属性深度解析</a>了解你的性格属性，或浏览<a href="/blog/all-18-claude-buddy-species-ranked">物种排名</a>看看你的同伴排在哪里。</p>
<p>在 Twitter/X 上用 <code>#ClaudeBuddy</code> 分享你的外观组合——特别是如果你抽到了闪光或稀有帽子。社区喜欢庆祝独特的发现！</p>`
          },
        ],
      },
      ko: {
        title: "Claude Code Buddy 코스메틱 가이드 — 모자, 눈, 샤이니 효과",
        metaTitle: "Claude Code Buddy 코스메틱 가이드 — 모자, 눈, 샤이니 효과 (2026)",
        metaDescription: "Claude Code Buddy 코스메틱 시스템 완전 가이드: 6가지 눈 스타일, 8가지 모자 유형, 초희귀 1% 샤이니 효과. 드롭률, 시각적 미리보기, 가장 희귀한 조합을 알아보세요.",
        excerpt: "버디의 외모는 눈, 모자, 샤이니 상태의 세 가지 코스메틱 레이어로 정의됩니다. 6가지 눈 스타일, 8가지 모자 유형, 초희귀 1% 샤이니 효과의 정확한 드롭률과 가장 희귀한 조합을 알아보세요.",
        sections: [
          {
            heading: "종과 스탯을 넘어서: 코스메틱 레이어",
            body: `<p>Claude Code Buddy는 <a href="/blog/claude-buddy-stats-system-deep-dive">5가지 성격 스탯</a>이나 <a href="/blog/claude-code-buddy-rarity-guide">희귀도 등급</a>만으로 정의되지 않습니다. 모든 버디에는 터미널에서 진정으로 유일무이하게 만드는 고유한 <strong>코스메틱 조합</strong>이 있습니다.</p>
<p>코스메틱 시스템에는 세 가지 독립 레이어가 있습니다:</p>
<table>
<tr><th>레이어</th><th>옵션</th><th>선택 방식</th></tr>
<tr><td><strong>눈</strong></td><td>6가지 스타일</td><td>균일 랜덤 (각 1/6)</td></tr>
<tr><td><strong>모자</strong></td><td>8가지 유형</td><td>희귀도 게이트 + 균일 랜덤</td></tr>
<tr><td><strong>샤이니</strong></td><td>켜짐/꺼짐</td><td>고정 1% 확률</td></tr>
</table>
<p>각 레이어는 UUID + 솔트 해시에서 시드된 <strong>Mulberry32 PRNG</strong>를 사용하여 독립적으로 롤됩니다. 이는 코스메틱이 결정론적임을 의미합니다 — 같은 UUID는 항상 같은 외모를 생성합니다.</p>`
          },
          {
            heading: "6가지 눈 스타일",
            body: `<p>눈은 버디의 ASCII 얼굴에서 가장 먼저 눈에 띄는 것입니다. 정확히 <strong>6가지 눈 문자</strong>가 있으며, 각각 버디에게 독특한 개성을 부여합니다:</p>
<table>
<tr><th>눈</th><th>문자명</th><th>분위기</th><th>확률</th></tr>
<tr><td><code>·</code></td><td>가운데점</td><td>졸린, 차분, 선 — 코드베이스와 평화로운 버디</td><td>16.67%</td></tr>
<tr><td><code>✦</code></td><td>사각별</td><td>반짝이는, 흥분한, 별눈 — 모든 함수에서 마법을 봄</td><td>16.67%</td></tr>
<tr><td><code>×</code></td><td>곱셈 기호</td><td>죽은, 어지러운, 압도된 — 세그폴트를 너무 많이 봄</td><td>16.67%</td></tr>
<tr><td><code>◉</code></td><td>과녁</td><td>집중한, 강렬한, 레이저 잠금 — 정밀 디버깅 중</td><td>16.67%</td></tr>
<tr><td><code>@</code></td><td>앳 기호</td><td>디지털, 매트릭스풍, 해커 — 터미널에 사는 존재</td><td>16.67%</td></tr>
<tr><td><code>°</code></td><td>도 기호</td><td>놀란, 눈 큰, 호기심 — 모든 것이 새롭고 신나는</td><td>16.67%</td></tr>
</table>
<p>선택은 완벽하게 균일합니다: <code>pick(rng, EYES)</code>는 각 눈에 동일한 <strong>1/6 ≈ 16.67%</strong> 확률을 줍니다. 어떤 눈도 다른 것보다 희귀하지 않습니다 — 순수한 미적 운입니다.</p>
<p><strong>재미있는 사실:</strong> <code>×</code>(죽은 눈)과 유령 종의 조합은 가장 테마적으로 일관된 버디를 만듭니다. 반면 <code>✦</code>(반짝이 눈)이 달린 드래곤은 무시무시한 ASCII 아트에도 불구하고 놀랍도록 귀여운 모습을 보여줍니다.</p>`
          },
          {
            heading: "8가지 모자 유형",
            body: `<p>모자는 시스템에서 가장 <strong>희귀도 제한이 강한</strong> 코스메틱입니다. 핵심 규칙:</p>
<blockquote><strong>일반 버디(전체 버디의 60%)는 절대 모자를 얻지 못합니다.</strong> 비범 이상만 머리 장식을 착용할 수 있습니다.</blockquote>
<p>코드는 명확합니다: <code>hat = rarity === 'common' ? 'none' : pick(rng, HATS)</code>. 일반이면 모자 없음. 끝.</p>
<p>비일반 버디의 경우, 모자는 8가지 옵션(없음 포함)에서 균일하게 선택됩니다:</p>
<table>
<tr><th>모자</th><th>ASCII 미리보기</th><th>설명</th><th>비일반 확률</th><th>전체 확률</th></tr>
<tr><td><strong>없음</strong></td><td><em>(비어있음)</em></td><td>모자 없음 — 깔끔한 외모</td><td>12.5%</td><td>65.0%</td></tr>
<tr><td><strong>왕관</strong></td><td><code>\^^^/</code></td><td>왕관 — 터미널의 왕/여왕</td><td>12.5%</td><td>5.0%</td></tr>
<tr><td><strong>실크햇</strong></td><td><code>[___]</code></td><td>신사의 실크햇 — 우아하고 고상함</td><td>12.5%</td><td>5.0%</td></tr>
<tr><td><strong>프로펠러</strong></td><td><code>-+-</code></td><td>프로펠러 비니 — 장난스럽고 어린이같은</td><td>12.5%</td><td>5.0%</td></tr>
<tr><td><strong>후광</strong></td><td><code>(   )</code></td><td>천사의 후광 — 순수하고 순진한</td><td>12.5%</td><td>5.0%</td></tr>
<tr><td><strong>마법사</strong></td><td><code>/^\</code></td><td>마법사 모자 — 신비롭고 지혜로운</td><td>12.5%</td><td>5.0%</td></tr>
<tr><td><strong>비니</strong></td><td><code>(___)</code></td><td>아늑한 비니 — 캐주얼하고 편안한</td><td>12.5%</td><td>5.0%</td></tr>
<tr><td><strong>꼬마오리</strong></td><td><code>,></code></td><td>머리 위의 꼬마 오리 — 밈 픽</td><td>12.5%</td><td>5.0%</td></tr>
</table>
<p>특정 모자를 가질 <strong>전체 확률</strong>은 단 <strong>5%</strong>(40% 비일반 확률 × 12.5% 해당 모자 확률)입니다. 이것이 모자 쓴 버디를 진정한 지위의 상징으로 만듭니다.</p>
<p><strong>종별 최고의 모자 조합:</strong></p>
<ul>
<li><strong>왕관 + 드래곤</strong> — 터미널 펫의 절대 왕자</li>
<li><strong>마법사 + 올빼미</strong> — 최대 지혜 에너지</li>
<li><strong>꼬마오리 + 오리</strong> — 오리셉션! 머리에 오리가 있는 오리</li>
<li><strong>후광 + 유령</strong> — 코드를 지키는 천사의 영혼</li>
<li><strong>실크햇 + 고양이</strong> — 완벽한 취향의 우아한 고양이</li>
<li><strong>프로펠러 + 뚱이</strong> — 사랑스러울 정도로 우스꽝스러운</li>
</ul>`
          },
          {
            heading: "1% 샤이니 효과",
            body: `<p><strong>샤이니 효과</strong>는 전체 버디 시스템에서 가장 희귀한 코스메틱 특성입니다. 고정 <strong>1% 확률</strong>(<code>rng() < 0.01</code>)로, 샤이니 버디는 포켓몬의 이로치와 같습니다 — 기능은 동일하지만 시각적으로 특별합니다.</p>
<p>샤이니 버디에 대한 핵심 사실:</p>
<ul>
<li><strong>희귀도와 무관:</strong> 샤이니 롤은 희귀도 선택 후에 발생합니다. 일반 버디도 샤이니일 수 있고, 전설 버디도 비샤이니일 수 있습니다.</li>
<li><strong>시각적 표시:</strong> 샤이니 버디는 터미널 디스플레이에 특별한 반짝임 마커(✨)를 표시하여 즉시 알아볼 수 있습니다.</li>
<li><strong>자랑거리:</strong> 약 100마리 중 1마리만 샤이니입니다. 당신의 것이 그렇다면, 당신은 독점 클럽에 속합니다.</li>
</ul>
<p>확률 계산:</p>
<table>
<tr><th>조합</th><th>확률</th><th>배율</th></tr>
<tr><td>샤이니 (모든 희귀도)</td><td>1.00%</td><td>1/100</td></tr>
<tr><td>샤이니 + 비범 이상</td><td>0.40%</td><td>1/250</td></tr>
<tr><td>샤이니 + 희귀 이상</td><td>0.15%</td><td>1/667</td></tr>
<tr><td>샤이니 + 에픽</td><td>0.04%</td><td>1/2,500</td></tr>
<tr><td>샤이니 + 전설</td><td>0.01%</td><td>1/10,000</td></tr>
</table>
<p><strong>샤이니 전설</strong> 버디는 만 분의 일 이벤트입니다. 하나 가지고 있다면 즉시 스크린샷을 찍으세요 — 당첨 복권 안에서 네잎 클로버를 찾은 것과 같습니다.</p>`
          },
          {
            heading: "코스메틱 생성 코드 분석",
            body: `<p>버디의 외모를 결정하는 <code>rollBuddy</code> 함수의 정확한 시퀀스입니다:</p>
<pre><code>export function rollBuddy(userId: string): BuddyResult {
  const rng = mulberry32(hashString(userId + SALT));
  const rarity  = rollRarity(rng);           // 1단계
  const species = pick(rng, SPECIES);         // 2단계
  const eye     = pick(rng, EYES);            // 3단계
  const hat     = rarity === 'common'         // 4단계
                  ? 'none'
                  : pick(rng, HATS);
  const shiny   = rng() < 0.01;              // 5단계
  const stats   = rollStats(rng, rarity);     // 6단계
  return { rarity, species, eye, hat, shiny, stats };
}</code></pre>
<p>순서가 중요합니다. 각 <code>rng()</code> 호출이 PRNG 상태를 진행시키기 때문입니다. 시퀀스는: 희귀도 → 종 → 눈 → 모자 → 샤이니 → 스탯입니다. 이는 이전 롤을 변경하면 모든 후속 롤이 연쇄적으로 변경됨을 의미합니다.</p>
<p><strong>왜 순서가 중요한가?</strong> Mulberry32 PRNG는 결정론적 시퀀스입니다. 주어진 시드에 대해 1번째 호출은 항상 같은 값을 반환합니다. 따라서 눈 스타일은 항상 3번째+ RNG 호출에 의해 결정됩니다(희귀도가 1+번 호출을 소비하고 종이 1번 호출을 소비한 후). 이것이 같은 UUID가 항상 정확히 같은 버디를 생성하는 이유입니다.</p>`
          },
          {
            heading: "가장 희귀한 가능한 조합",
            body: `<p>몇 가지 꿈의 조합 확률을 계산해 봅시다:</p>
<table>
<tr><th>꿈의 버디</th><th>요구 사항</th><th>확률</th><th>배율</th></tr>
<tr><td>왕관의 왕</td><td>전설 + 왕관 + 아무거나</td><td>0.0125%</td><td>1/8,000</td></tr>
<tr><td>반짝이 드래곤</td><td>드래곤 + ✦ 눈 + 아무 모자</td><td>0.926%</td><td>1/108</td></tr>
<tr><td>샤이니 마법사 올빼미</td><td>샤이니 + 올빼미 + 마법사 모자 + 아무 희귀도</td><td>0.000347%</td><td>1/288,000</td></tr>
<tr><td>매트릭스 로봇</td><td>로봇 + @ 눈 + 아무거나</td><td>0.926%</td><td>1/108</td></tr>
<tr><td>궁극의 오리</td><td>샤이니 + 전설 + 오리 + 꼬마오리 모자 + ✦ 눈</td><td>0.0000012%</td><td>1/86,400,000</td></tr>
</table>
<p><strong>궁극의 오리</strong> — 꼬마오리 모자를 쓴 샤이니 전설 오리에 반짝이 눈 — 확률은 약 <strong>8640만 분의 1</strong>입니다. 참고로, 1년 동안 번개에 맞을 확률이 이것의 약 3배입니다.</p>
<p><strong>궁극의 오리 확률 분해:</strong></p>
<pre><code>P(전설)      = 1/100   = 0.01
P(오리)      = 1/18    ≈ 0.0556
P(✦ 눈)      = 1/6     ≈ 0.1667
P(꼬마오리)   = 1/8     = 0.125
P(샤이니)    = 1/100   = 0.01

P(전부) = 0.01 × 0.0556 × 0.1667 × 0.125 × 0.01
        ≈ 0.00000001157
        ≈ 1/86,400,000</code></pre>`
          },
          {
            heading: "지금 버디 코스메틱을 확인하세요",
            body: `<p>운명이 어떤 코스메틱 조합을 배정했는지 볼 준비가 되셨나요? <a href="/">버디 체커</a>로 가서 UUID를 입력하세요. 버디의 눈 스타일, 모자(있다면), 샤이니 상태가 종, 희귀도, 스탯과 함께 표시됩니다.</p>
<p>이미 버디를 알고 있나요? <a href="/species">종 백과사전</a>에서 다양한 눈과 모자 조합으로 버디의 ASCII 아트가 어떻게 보이는지 확인하세요. <a href="/blog/claude-buddy-stats-system-deep-dive">스탯 심층 분석</a>에서 성격 속성을 이해하거나, <a href="/blog/all-18-claude-buddy-species-ranked">종 랭킹</a>에서 동반자의 위치를 확인하세요.</p>
<p>Twitter/X에서 <code>#ClaudeBuddy</code>로 코스메틱 조합을 공유하세요 — 특히 샤이니나 희귀 모자를 굴렸다면요. 커뮤니티는 독특한 발견을 축하하는 것을 좋아합니다!</p>`
          },
        ],
      },
    },
  },
  // ── Article 6: Algorithm Deep Dive ──────────────────────────────────────
  {
    slug: "claude-buddy-algorithm-fnv1a-mulberry32-prng",
    publishedAt: "2026-04-04",
    readingTime: 10,
    tags: ["algorithm", "technical", "fnv1a", "prng", "deep-dive"],
    content: {
      en: {
        title: "The Algorithm Behind Claude Code Buddy \u2014 FNV-1a & Mulberry32 PRNG Explained",
        metaTitle: "The Algorithm Behind Claude Code Buddy \u2014 FNV-1a & Mulberry32 PRNG Explained (2026)",
        metaDescription: "Technical deep dive into how Claude Code Buddy generates deterministic pets from UUIDs. Covers FNV-1a hashing, Mulberry32 PRNG, weighted random selection, and the complete roll pipeline.",
        excerpt: "How does a UUID turn into a unique terminal pet? The answer involves a 32-bit hash function from 1991, a lightweight PRNG, and a carefully ordered pipeline of random rolls. Let's trace the algorithm step by step.",
        sections: [
          {
            heading: "From UUID to Buddy: The Big Picture",
            body: `<p>Every Claude Code Buddy is <strong>deterministic</strong>. The same UUID always produces the same species, rarity, eyes, hat, shiny status, and stats. There's no server involved, no database lookup, no randomness from <code>Math.random()</code>. The entire generation happens client-side in a single function call.</p>
<p>The pipeline is elegantly simple:</p>
<pre><code>UUID string + SALT \u2192 FNV-1a hash \u2192 32-bit seed \u2192 Mulberry32 PRNG \u2192 sequential rolls</code></pre>
<p>Let's break down each stage.</p>`
          },
          {
            heading: "Stage 1: Salting the Input",
            body: `<p>Before any hashing occurs, the system concatenates your UUID with a hardcoded <strong>salt string</strong>:</p>
<pre><code>const rng = mulberry32(hashString(userId + SALT));
// SALT = 'friend-2026-401'</code></pre>
<p>The salt serves three purposes:</p>
<table>
<tr><th>Purpose</th><th>Explanation</th></tr>
<tr><td><strong>Prevent reverse engineering</strong></td><td>Without knowing the salt, you can't predict which UUID maps to which buddy</td></tr>
<tr><td><strong>Version control</strong></td><td>Changing the salt in a future update would reshuffle all buddies \u2014 a \"season reset\"</td></tr>
<tr><td><strong>Namespace isolation</strong></td><td>The same UUID used in a different system wouldn't produce the same hash</td></tr>
</table>
<p>The salt <code>'friend-2026-401'</code> hints at its origin: \"friend\" (buddy), \"2026\" (year), \"401\" (possibly April 1st, the launch date).</p>`
          },
          {
            heading: "Stage 2: FNV-1a Hash \u2014 Turning Strings into Numbers",
            body: `<p><strong>FNV-1a</strong> (Fowler\u2013Noll\u2013Vo, variant 1a) is a non-cryptographic hash function created in 1991. It's chosen here for three reasons: it's fast, it has excellent distribution for short strings, and it fits in a single function.</p>
<p>Here's the exact implementation:</p>
<pre><code>function hashString(s: string): number {
  let h = 2166136261;          // FNV offset basis
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);      // XOR with byte
    h = Math.imul(h, 16777619); // multiply by FNV prime
  }
  return h >>> 0;               // convert to unsigned 32-bit
}</code></pre>
<p>Let's decode the magic numbers:</p>
<table>
<tr><th>Constant</th><th>Hex</th><th>Role</th></tr>
<tr><td><strong>2166136261</strong></td><td><code>0x811c9dc5</code></td><td>FNV-1a 32-bit offset basis \u2014 the initial hash value</td></tr>
<tr><td><strong>16777619</strong></td><td><code>0x01000193</code></td><td>FNV-1a 32-bit prime \u2014 chosen for optimal bit diffusion</td></tr>
</table>
<p><strong>Why FNV-1a instead of FNV-1?</strong> The \"a\" variant XORs <em>before</em> multiplying, which produces better <strong>avalanche behavior</strong> \u2014 a single bit change in the input flips roughly half the output bits. FNV-1 multiplies first, which can leave the lower bits less mixed.</p>
<p><strong>Why <code>Math.imul</code>?</strong> JavaScript numbers are 64-bit floats. Normal multiplication (<code>*</code>) would lose precision for large 32-bit integers. <code>Math.imul</code> performs true 32-bit integer multiplication, preserving the low 32 bits exactly as a C compiler would.</p>
<p><strong>Why <code>>>> 0</code>?</strong> JavaScript's bitwise operators return signed 32-bit integers. The unsigned right shift by 0 converts the result to an <em>unsigned</em> 32-bit integer (0 to 4,294,967,295), which is what we need as a PRNG seed.</p>`
          },
          {
            heading: "Stage 3: Mulberry32 PRNG \u2014 The Random Number Factory",
            body: `<p><strong>Mulberry32</strong> is a 32-bit pseudorandom number generator designed by Tommy Ettinger. It has a period of 2<sup>32</sup> (about 4.3 billion values before repeating) and passes the gjrand testing suite for randomness quality.</p>
<pre><code>function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return function () {
    a |= 0;                                         // ensure signed 32-bit
    a = (a + 0x6d2b79f5) | 0;                       // increment state
    let t = Math.imul(a ^ (a >>> 15), 1 | a);        // mix: shift, XOR, multiply
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;  // further mixing
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;    // normalize to [0, 1)
  };
}</code></pre>
<p>Let's trace through the algorithm step by step:</p>
<table>
<tr><th>Step</th><th>Operation</th><th>Purpose</th></tr>
<tr><td><strong>1</strong></td><td><code>a = (a + 0x6d2b79f5) | 0</code></td><td>Advance state by a large odd constant (Knuth's multiplicative hash increment). The <code>| 0</code> keeps it as a signed 32-bit integer.</td></tr>
<tr><td><strong>2</strong></td><td><code>a ^ (a >>> 15)</code></td><td>XOR the state with itself shifted right by 15 bits. This mixes the upper bits into the lower bits.</td></tr>
<tr><td><strong>3</strong></td><td><code>Math.imul(..., 1 | a)</code></td><td>Multiply by an odd number derived from the state itself. The <code>1 | a</code> ensures the multiplier is always odd (never zero).</td></tr>
<tr><td><strong>4</strong></td><td><code>t ^ (t >>> 7)</code></td><td>Another XOR-shift to further diffuse bits.</td></tr>
<tr><td><strong>5</strong></td><td><code>Math.imul(..., 61 | t)</code></td><td>Second state-dependent multiplication. 61 is prime, and <code>61 | t</code> ensures the multiplier is always odd.</td></tr>
<tr><td><strong>6</strong></td><td><code>t ^ (t >>> 14)</code></td><td>Final XOR-shift for output whitening.</td></tr>
<tr><td><strong>7</strong></td><td><code>>>> 0 / 4294967296</code></td><td>Convert to unsigned integer, then divide by 2<sup>32</sup> to get a float in [0, 1).</td></tr>
</table>
<p><strong>Why not <code>Math.random()</code>?</strong> <code>Math.random()</code> is not seedable \u2014 you can't reproduce the same sequence. Mulberry32 is deterministic: the same seed always produces the same sequence, which is essential for making buddies reproducible.</p>
<p><strong>Why not a cryptographic PRNG?</strong> Buddy generation doesn't need cryptographic security. Mulberry32 is orders of magnitude faster and produces statistically uniform output that's more than sufficient for game-like applications.</p>`
          },
          {
            heading: "Stage 4: The Roll Pipeline \u2014 Order Matters",
            body: `<p>With the PRNG initialized, <code>rollBuddy</code> makes a specific sequence of calls. <strong>The order is critical</strong> because each <code>rng()</code> call advances the internal state irreversibly:</p>
<pre><code>export function rollBuddy(userId: string): BuddyResult {
  const rng = mulberry32(hashString(userId + SALT));
  const rarity  = rollRarity(rng);     // Step 1: 1+ RNG calls
  const species = pick(rng, SPECIES);   // Step 2: 1 RNG call
  const eye     = pick(rng, EYES);      // Step 3: 1 RNG call
  const hat     = rarity === 'common'   // Step 4: 0 or 1 RNG call
                  ? 'none'
                  : pick(rng, HATS);
  const shiny   = rng() < 0.01;        // Step 5: 1 RNG call
  const stats   = rollStats(rng, rarity); // Step 6: 7+ RNG calls
  return { rarity, species, eye, hat, shiny, stats };
}</code></pre>
<p><strong>The cascade effect:</strong> Because Common buddies skip the hat roll (0 RNG calls consumed), their shiny check uses a <em>different</em> RNG value than non-Common buddies. This means rarity doesn't just affect hat eligibility \u2014 it subtly shifts every subsequent roll. A buddy that would have been shiny as Uncommon might not be shiny as Common, even with the same UUID.</p>
<p>Here's the exact RNG call count for each step:</p>
<table>
<tr><th>Step</th><th>Function</th><th>RNG Calls</th><th>Notes</th></tr>
<tr><td>1</td><td><code>rollRarity</code></td><td>1</td><td>Single weighted random roll</td></tr>
<tr><td>2</td><td><code>pick(SPECIES)</code></td><td>1</td><td>Uniform selection from 18 species</td></tr>
<tr><td>3</td><td><code>pick(EYES)</code></td><td>1</td><td>Uniform selection from 6 eyes</td></tr>
<tr><td>4</td><td>Hat</td><td>0 or 1</td><td>0 if Common, 1 otherwise</td></tr>
<tr><td>5</td><td>Shiny check</td><td>1</td><td>Simple threshold: <code>rng() < 0.01</code></td></tr>
<tr><td>6</td><td><code>rollStats</code></td><td>7\u201312</td><td>1 peak pick + 1\u20135 dump picks (with retries) + 5 stat rolls</td></tr>
</table>
<p><strong>Total: 11\u201317 RNG calls per buddy.</strong> The variance comes from <code>rollStats</code>, where the dump stat must differ from the peak stat \u2014 if they collide, the RNG is called again.</p>`
          },
          {
            heading: "Deep Dive: Weighted Random Selection",
            body: `<p>The rarity system uses <strong>weighted random selection</strong>, a classic algorithm:</p>
<pre><code>function rollRarity(rng: () => number): Rarity {
  const total = 60 + 25 + 10 + 4 + 1; // = 100
  let roll = rng() * total;            // roll \u2208 [0, 100)
  for (const rarity of RARITIES) {
    roll -= RARITY_WEIGHTS[rarity];
    if (roll < 0) return rarity;
  }
  return 'common'; // fallback (unreachable in practice)
}</code></pre>
<p>Visualized as a number line from 0 to 100:</p>
<pre><code>0          60       85    95  99 100
|  Common  | Uncomm | Rare |Ep|L|
|   60%    |  25%   | 10%  |4%|1%|</code></pre>
<p>The algorithm generates a random number in [0, 100), then walks through the rarities, subtracting each weight. The first rarity that drives the counter below zero wins. This guarantees exact probability distribution regardless of the order of iteration.</p>
<p><strong>Why not use a lookup table?</strong> With only 5 rarities, the linear scan is negligible. A binary search or alias table would be over-engineering for this use case.</p>`
          },
          {
            heading: "Deep Dive: The Stats Generation Algorithm",
            body: `<p>Stats generation is the most complex part of the pipeline, using a <strong>peak/dump asymmetric model</strong>:</p>
<pre><code>function rollStats(rng, rarity) {
  const floor = RARITY_FLOOR[rarity];  // 5/15/25/35/50
  const peak  = pick(rng, STAT_NAMES); // random best stat
  let dump    = pick(rng, STAT_NAMES); // random worst stat
  while (dump === peak) dump = pick(rng, STAT_NAMES); // must differ
  
  for (const name of STAT_NAMES) {
    if (name === peak)
      stats[name] = min(100, floor + 50 + random(0..29));
    else if (name === dump)
      stats[name] = max(1, floor - 10 + random(0..14));
    else
      stats[name] = floor + random(0..39);
  }
}</code></pre>
<p>The three formulas create distinct stat distributions:</p>
<table>
<tr><th>Stat Type</th><th>Formula</th><th>Common Range</th><th>Legendary Range</th></tr>
<tr><td><strong>Peak</strong></td><td><code>min(100, floor + 50 + rand(30))</code></td><td>55\u201384</td><td>100 (capped)</td></tr>
<tr><td><strong>Dump</strong></td><td><code>max(1, floor - 10 + rand(15))</code></td><td>1\u20139</td><td>40\u201354</td></tr>
<tr><td><strong>Normal</strong></td><td><code>floor + rand(40)</code></td><td>5\u201344</td><td>50\u201389</td></tr>
</table>
<p><strong>Key insight:</strong> Legendary buddies have such high floors that even their dump stat (40\u201354) exceeds most Common buddies' normal stats (5\u201344). And their peak stat is always capped at 100 because <code>50 + 50 + rand(30)</code> always exceeds 100.</p>
<p><strong>The dump stat retry loop:</strong> The <code>while (dump === peak)</code> loop ensures every buddy has a distinct weakness. With 5 stats, there's a 20% chance of collision per attempt, meaning the expected number of extra RNG calls is 0.25 (geometric distribution).</p>`
          },
          {
            heading: "Putting It All Together: A Worked Example",
            body: `<p>Let's trace through a real example. Suppose your UUID is <code>abc-123</code>:</p>
<pre><code>// Step 0: Salt
input = 'abc-123' + 'friend-2026-401'
      = 'abc-123friend-2026-401'

// Step 1: FNV-1a Hash
h = 2166136261
h = (h ^ 97) * 16777619   // 'a' = 97
h = (h ^ 98) * 16777619   // 'b' = 98
h = (h ^ 99) * 16777619   // 'c' = 99
... (continue for all 25 characters)
seed = h >>> 0             // unsigned 32-bit result

// Step 2: Initialize PRNG
rng = mulberry32(seed)

// Step 3: Roll sequence
rng() \u2192 0.7234...  \u2192 rarity = 'uncommon' (falls in 60-85 range)
rng() \u2192 0.4521...  \u2192 species = SPECIES[floor(0.4521 * 18)] = SPECIES[8] = 'turtle'
rng() \u2192 0.8901...  \u2192 eye = EYES[floor(0.8901 * 6)] = EYES[5] = '\u00b0'
rng() \u2192 0.3712...  \u2192 hat = HATS[floor(0.3712 * 8)] = HATS[2] = 'tophat'
rng() \u2192 0.5623...  \u2192 shiny = false (0.5623 \u2265 0.01)
rng() \u2192 ...        \u2192 stats = { DEBUGGING: 42, PATIENCE: 67, ... }</code></pre>
<p><strong>Result:</strong> An Uncommon Turtle with \u00b0 (surprised) eyes, wearing a top hat, not shiny. Every time anyone enters <code>abc-123</code>, they get this exact same buddy.</p>
<p><em>Note: The numbers above are illustrative. The actual RNG outputs depend on the precise hash value.</em></p>`
          },
          {
            heading: "Why This Design Is Elegant",
            body: `<p>The buddy generation system makes several clever engineering choices that are worth highlighting:</p>
<table>
<tr><th>Design Choice</th><th>Benefit</th></tr>
<tr><td><strong>Client-side only</strong></td><td>Zero server load, instant results, works offline. No API calls, no database, no latency.</td></tr>
<tr><td><strong>Deterministic from UUID</strong></td><td>No need to store buddy data anywhere. The buddy is \"computed\" from the UUID on demand.</td></tr>
<tr><td><strong>Single PRNG stream</strong></td><td>One seed generates all attributes. No need for multiple hash functions or separate random sources.</td></tr>
<tr><td><strong>Ordered pipeline</strong></td><td>The fixed call order means each attribute is determined by a specific position in the RNG sequence, making the system predictable and debuggable.</td></tr>
<tr><td><strong>Salt-based versioning</strong></td><td>Changing the salt reshuffles all buddies without changing any code logic \u2014 perfect for seasonal events or resets.</td></tr>
<tr><td><strong>Non-cryptographic hash</strong></td><td>FNV-1a is fast enough for real-time use. Cryptographic hashes (SHA-256) would be overkill and slower.</td></tr>
</table>
<p>The entire system fits in about 50 lines of code, yet produces 18 species \u00d7 5 rarities \u00d7 6 eyes \u00d7 8 hats \u00d7 2 shiny states \u00d7 billions of stat combinations = effectively infinite unique buddies.</p>
<p>Want to see the algorithm in action? Head to the <a href=\"/\">Buddy Checker</a> and enter your UUID. The code running in your browser is the exact implementation described in this article.</p>`
          }
        ],
      },
      zh: {
        title: "Claude Code Buddy \u80cc\u540e\u7684\u7b97\u6cd5 \u2014 FNV-1a \u4e0e Mulberry32 PRNG \u8be6\u89e3",
        metaTitle: "Claude Code Buddy \u80cc\u540e\u7684\u7b97\u6cd5 \u2014 FNV-1a \u4e0e Mulberry32 PRNG \u8be6\u89e3 (2026)",
        metaDescription: "\u6280\u672f\u6df1\u5ea6\u89e3\u6790 Claude Code Buddy \u5982\u4f55\u4ece UUID \u786e\u5b9a\u6027\u5730\u751f\u6210\u5ba0\u7269\u3002\u6db5\u76d6 FNV-1a \u54c8\u5e0c\u3001Mulberry32 \u4f2a\u968f\u673a\u6570\u751f\u6210\u5668\u3001\u52a0\u6743\u968f\u673a\u9009\u62e9\u548c\u5b8c\u6574\u7684\u751f\u6210\u7ba1\u7ebf\u3002",
        excerpt: "\u4e00\u4e2a UUID \u662f\u5982\u4f55\u53d8\u6210\u72ec\u4e00\u65e0\u4e8c\u7684\u7ec8\u7aef\u5ba0\u7269\u7684\uff1f\u7b54\u6848\u6d89\u53ca\u4e00\u4e2a 1991 \u5e74\u7684 32 \u4f4d\u54c8\u5e0c\u51fd\u6570\u3001\u4e00\u4e2a\u8f7b\u91cf\u7ea7\u4f2a\u968f\u673a\u6570\u751f\u6210\u5668\uff0c\u4ee5\u53ca\u4e00\u4e2a\u7cbe\u5fc3\u6392\u5e8f\u7684\u968f\u673a\u6295\u63b7\u7ba1\u7ebf\u3002\u8ba9\u6211\u4eec\u9010\u6b65\u8ffd\u8e2a\u8fd9\u4e2a\u7b97\u6cd5\u3002",
        sections: [
          {
            heading: "\u4ece UUID \u5230 Buddy\uff1a\u5168\u5c40\u89c6\u89d2",
            body: `<p>\u6bcf\u4e2a Claude Code Buddy \u90fd\u662f<strong>\u786e\u5b9a\u6027</strong>\u7684\u3002\u76f8\u540c\u7684 UUID \u603b\u662f\u4ea7\u751f\u76f8\u540c\u7684\u7269\u79cd\u3001\u7a00\u6709\u5ea6\u3001\u773c\u775b\u3001\u5e3d\u5b50\u3001\u95ea\u5149\u72b6\u6001\u548c\u5c5e\u6027\u3002\u6ca1\u6709\u670d\u52a1\u5668\u53c2\u4e0e\uff0c\u6ca1\u6709\u6570\u636e\u5e93\u67e5\u8be2\uff0c\u4e5f\u6ca1\u6709\u6765\u81ea <code>Math.random()</code> \u7684\u968f\u673a\u6027\u3002\u6574\u4e2a\u751f\u6210\u8fc7\u7a0b\u5728\u5ba2\u6237\u7aef\u7684\u4e00\u6b21\u51fd\u6570\u8c03\u7528\u4e2d\u5b8c\u6210\u3002</p>
<p>\u7ba1\u7ebf\u4f18\u96c5\u800c\u7b80\u6d01\uff1a</p>
<pre><code>UUID \u5b57\u7b26\u4e32 + SALT \u2192 FNV-1a \u54c8\u5e0c \u2192 32 \u4f4d\u79cd\u5b50 \u2192 Mulberry32 PRNG \u2192 \u987a\u5e8f\u6295\u63b7</code></pre>
<p>\u8ba9\u6211\u4eec\u9010\u4e00\u89e3\u6790\u6bcf\u4e2a\u9636\u6bb5\u3002</p>`
          },
          {
            heading: "\u7b2c\u4e00\u9636\u6bb5\uff1a\u8f93\u5165\u52a0\u76d0",
            body: `<p>\u5728\u4efb\u4f55\u54c8\u5e0c\u8ba1\u7b97\u4e4b\u524d\uff0c\u7cfb\u7edf\u5c06\u4f60\u7684 UUID \u4e0e\u4e00\u4e2a\u786c\u7f16\u7801\u7684<strong>\u76d0\u503c\u5b57\u7b26\u4e32</strong>\u62fc\u63a5\uff1a</p>
<pre><code>const rng = mulberry32(hashString(userId + SALT));
// SALT = 'friend-2026-401'</code></pre>
<p>\u76d0\u503c\u6709\u4e09\u4e2a\u4f5c\u7528\uff1a</p>
<table>
<tr><th>\u4f5c\u7528</th><th>\u8bf4\u660e</th></tr>
<tr><td><strong>\u9632\u6b62\u9006\u5411\u5de5\u7a0b</strong></td><td>\u4e0d\u77e5\u9053\u76d0\u503c\u5c31\u65e0\u6cd5\u9884\u6d4b\u54ea\u4e2a UUID \u5bf9\u5e94\u54ea\u4e2a Buddy</td></tr>
<tr><td><strong>\u7248\u672c\u63a7\u5236</strong></td><td>\u672a\u6765\u66f4\u65b0\u4e2d\u66f4\u6539\u76d0\u503c\u4f1a\u91cd\u65b0\u6d17\u724c\u6240\u6709 Buddy \u2014\u2014 \u4e00\u79cd\u201c\u8d5b\u5b63\u91cd\u7f6e\u201d</td></tr>
<tr><td><strong>\u547d\u540d\u7a7a\u95f4\u9694\u79bb</strong></td><td>\u76f8\u540c\u7684 UUID \u5728\u4e0d\u540c\u7cfb\u7edf\u4e2d\u4e0d\u4f1a\u4ea7\u751f\u76f8\u540c\u7684\u54c8\u5e0c</td></tr>
</table>
<p>\u76d0\u503c <code>'friend-2026-401'</code> \u6697\u793a\u4e86\u5176\u8d77\u6e90\uff1a\"friend\"\uff08\u4f19\u4f34\uff09\u3001\"2026\"\uff08\u5e74\u4efd\uff09\u3001\"401\"\uff08\u53ef\u80fd\u662f 4 \u6708 1 \u65e5\uff0c\u53d1\u5e03\u65e5\u671f\uff09\u3002</p>`
          },
          {
            heading: "\u7b2c\u4e8c\u9636\u6bb5\uff1aFNV-1a \u54c8\u5e0c \u2014 \u5c06\u5b57\u7b26\u4e32\u8f6c\u4e3a\u6570\u5b57",
            body: `<p><strong>FNV-1a</strong>\uff08Fowler\u2013Noll\u2013Vo\uff0c1a \u53d8\u4f53\uff09\u662f\u4e00\u4e2a 1991 \u5e74\u521b\u5efa\u7684\u975e\u52a0\u5bc6\u54c8\u5e0c\u51fd\u6570\u3002\u9009\u62e9\u5b83\u6709\u4e09\u4e2a\u539f\u56e0\uff1a\u901f\u5ea6\u5feb\u3001\u5bf9\u77ed\u5b57\u7b26\u4e32\u5206\u5e03\u4f18\u79c0\u3001\u5b9e\u73b0\u7b80\u6d01\u3002</p>
<p>\u4ee5\u4e0b\u662f\u7cbe\u786e\u5b9e\u73b0\uff1a</p>
<pre><code>function hashString(s: string): number {
  let h = 2166136261;          // FNV \u504f\u79fb\u57fa\u7840
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);      // \u4e0e\u5b57\u8282\u5f02\u6216
    h = Math.imul(h, 16777619); // \u4e58\u4ee5 FNV \u8d28\u6570
  }
  return h >>> 0;               // \u8f6c\u6362\u4e3a\u65e0\u7b26\u53f7 32 \u4f4d
}</code></pre>
<p>\u89e3\u7801\u9b54\u6cd5\u6570\u5b57\uff1a</p>
<table>
<tr><th>\u5e38\u91cf</th><th>\u5341\u516d\u8fdb\u5236</th><th>\u4f5c\u7528</th></tr>
<tr><td><strong>2166136261</strong></td><td><code>0x811c9dc5</code></td><td>FNV-1a 32 \u4f4d\u504f\u79fb\u57fa\u7840 \u2014 \u521d\u59cb\u54c8\u5e0c\u503c</td></tr>
<tr><td><strong>16777619</strong></td><td><code>0x01000193</code></td><td>FNV-1a 32 \u4f4d\u8d28\u6570 \u2014 \u4e3a\u6700\u4f18\u4f4d\u6269\u6563\u800c\u9009\u62e9</td></tr>
</table>
<p><strong>\u4e3a\u4ec0\u4e48\u662f FNV-1a \u800c\u4e0d\u662f FNV-1\uff1f</strong>\"a\" \u53d8\u4f53\u5148\u5f02\u6216<em>\u518d</em>\u4e58\u6cd5\uff0c\u4ea7\u751f\u66f4\u597d\u7684<strong>\u96ea\u5d29\u6548\u5e94</strong> \u2014 \u8f93\u5165\u4e2d\u7684\u5355\u4e2a\u4f4d\u53d8\u5316\u4f1a\u7ffb\u8f6c\u5927\u7ea6\u4e00\u534a\u7684\u8f93\u51fa\u4f4d\u3002</p>
<p><strong>\u4e3a\u4ec0\u4e48\u7528 <code>Math.imul</code>\uff1f</strong>JavaScript \u6570\u5b57\u662f 64 \u4f4d\u6d6e\u70b9\u6570\u3002\u666e\u901a\u4e58\u6cd5\u4f1a\u5bf9\u5927\u578b 32 \u4f4d\u6574\u6570\u4e22\u5931\u7cbe\u5ea6\u3002<code>Math.imul</code> \u6267\u884c\u771f\u6b63\u7684 32 \u4f4d\u6574\u6570\u4e58\u6cd5\u3002</p>
<p><strong>\u4e3a\u4ec0\u4e48\u7528 <code>>>> 0</code>\uff1f</strong>JavaScript \u7684\u4f4d\u8fd0\u7b97\u8fd4\u56de\u6709\u7b26\u53f7 32 \u4f4d\u6574\u6570\u3002\u65e0\u7b26\u53f7\u53f3\u79fb 0 \u4f4d\u5c06\u7ed3\u679c\u8f6c\u6362\u4e3a<em>\u65e0\u7b26\u53f7</em> 32 \u4f4d\u6574\u6570\uff080 \u5230 4,294,967,295\uff09\u3002</p>`
          },
          {
            heading: "\u7b2c\u4e09\u9636\u6bb5\uff1aMulberry32 PRNG \u2014 \u968f\u673a\u6570\u5de5\u5382",
            body: `<p><strong>Mulberry32</strong> \u662f Tommy Ettinger \u8bbe\u8ba1\u7684 32 \u4f4d\u4f2a\u968f\u673a\u6570\u751f\u6210\u5668\u3002\u5468\u671f\u4e3a 2<sup>32</sup>\uff08\u7ea6 43 \u4ebf\u4e2a\u503c\u540e\u91cd\u590d\uff09\uff0c\u901a\u8fc7\u4e86 gjrand \u968f\u673a\u6027\u6d4b\u8bd5\u5957\u4ef6\u3002</p>
<pre><code>function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;                       // \u63a8\u8fdb\u72b6\u6001
    let t = Math.imul(a ^ (a >>> 15), 1 | a);        // \u6df7\u5408\u4f4d
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;  // \u8fdb\u4e00\u6b65\u6df7\u5408
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;    // \u5f52\u4e00\u5316\u5230 [0, 1)
  };
}</code></pre>
<p>\u9010\u6b65\u8ffd\u8e2a\u7b97\u6cd5\uff1a</p>
<table>
<tr><th>\u6b65\u9aa4</th><th>\u64cd\u4f5c</th><th>\u76ee\u7684</th></tr>
<tr><td><strong>1</strong></td><td><code>a = (a + 0x6d2b79f5) | 0</code></td><td>\u4ee5\u5927\u5947\u6570\u5e38\u91cf\u63a8\u8fdb\u72b6\u6001\uff08Knuth \u4e58\u6cd5\u54c8\u5e0c\u589e\u91cf\uff09</td></tr>
<tr><td><strong>2</strong></td><td><code>a ^ (a >>> 15)</code></td><td>\u5c06\u9ad8\u4f4d\u6df7\u5165\u4f4e\u4f4d</td></tr>
<tr><td><strong>3</strong></td><td><code>Math.imul(..., 1 | a)</code></td><td>\u4e0e\u72b6\u6001\u76f8\u5173\u7684\u5947\u6570\u76f8\u4e58</td></tr>
<tr><td><strong>4</strong></td><td><code>t ^ (t >>> 7)</code></td><td>\u53e6\u4e00\u6b21\u5f02\u6216\u79fb\u4f4d\u4ee5\u8fdb\u4e00\u6b65\u6269\u6563\u4f4d</td></tr>
<tr><td><strong>5</strong></td><td><code>Math.imul(..., 61 | t)</code></td><td>\u7b2c\u4e8c\u6b21\u72b6\u6001\u76f8\u5173\u4e58\u6cd5\uff0c61 \u662f\u8d28\u6570</td></tr>
<tr><td><strong>6</strong></td><td><code>t ^ (t >>> 14)</code></td><td>\u6700\u7ec8\u8f93\u51fa\u767d\u5316</td></tr>
<tr><td><strong>7</strong></td><td><code>>>> 0 / 4294967296</code></td><td>\u8f6c\u4e3a\u65e0\u7b26\u53f7\u6574\u6570\uff0c\u9664\u4ee5 2\u00b3\u00b2 \u5f97\u5230 [0, 1) \u6d6e\u70b9\u6570</td></tr>
</table>
<p><strong>\u4e3a\u4ec0\u4e48\u4e0d\u7528 <code>Math.random()</code>\uff1f</strong><code>Math.random()</code> \u4e0d\u53ef\u64ad\u79cd \u2014 \u65e0\u6cd5\u91cd\u73b0\u76f8\u540c\u5e8f\u5217\u3002Mulberry32 \u662f\u786e\u5b9a\u6027\u7684\uff1a\u76f8\u540c\u79cd\u5b50\u603b\u662f\u4ea7\u751f\u76f8\u540c\u5e8f\u5217\u3002</p>
<p><strong>\u4e3a\u4ec0\u4e48\u4e0d\u7528\u52a0\u5bc6 PRNG\uff1f</strong>Buddy \u751f\u6210\u4e0d\u9700\u8981\u52a0\u5bc6\u5b89\u5168\u6027\u3002Mulberry32 \u901f\u5ea6\u5feb\u51e0\u4e2a\u6570\u91cf\u7ea7\uff0c\u7edf\u8ba1\u5747\u5300\u6027\u5bf9\u6e38\u620f\u5e94\u7528\u7efc\u7efc\u6709\u4f59\u3002</p>`
          },
          {
            heading: "\u7b2c\u56db\u9636\u6bb5\uff1a\u6295\u63b7\u7ba1\u7ebf \u2014 \u987a\u5e8f\u81f3\u5173\u91cd\u8981",
            body: `<p>PRNG \u521d\u59cb\u5316\u540e\uff0c<code>rollBuddy</code> \u6309\u7279\u5b9a\u987a\u5e8f\u8c03\u7528\u3002<strong>\u987a\u5e8f\u81f3\u5173\u91cd\u8981</strong>\uff0c\u56e0\u4e3a\u6bcf\u6b21 <code>rng()</code> \u8c03\u7528\u90fd\u4e0d\u53ef\u9006\u5730\u63a8\u8fdb\u5185\u90e8\u72b6\u6001\uff1a</p>
<pre><code>export function rollBuddy(userId: string): BuddyResult {
  const rng = mulberry32(hashString(userId + SALT));
  const rarity  = rollRarity(rng);     // \u6b65\u9aa4 1: 1+ \u6b21 RNG \u8c03\u7528
  const species = pick(rng, SPECIES);   // \u6b65\u9aa4 2: 1 \u6b21 RNG \u8c03\u7528
  const eye     = pick(rng, EYES);      // \u6b65\u9aa4 3: 1 \u6b21 RNG \u8c03\u7528
  const hat     = rarity === 'common'   // \u6b65\u9aa4 4: 0 \u6216 1 \u6b21
                  ? 'none'
                  : pick(rng, HATS);
  const shiny   = rng() < 0.01;        // \u6b65\u9aa4 5: 1 \u6b21 RNG \u8c03\u7528
  const stats   = rollStats(rng, rarity); // \u6b65\u9aa4 6: 7+ \u6b21
  return { rarity, species, eye, hat, shiny, stats };
}</code></pre>
<p><strong>\u7ea7\u8054\u6548\u5e94\uff1a</strong>\u56e0\u4e3a\u666e\u901a Buddy \u8df3\u8fc7\u5e3d\u5b50\u6295\u63b7\uff080 \u6b21 RNG \u6d88\u8017\uff09\uff0c\u5b83\u4eec\u7684\u95ea\u5149\u68c0\u67e5\u4f7f\u7528\u4e86\u4e0e\u975e\u666e\u901a Buddy <em>\u4e0d\u540c</em>\u7684 RNG \u503c\u3002\u8fd9\u610f\u5473\u7740\u7a00\u6709\u5ea6\u4e0d\u4ec5\u5f71\u54cd\u5e3d\u5b50\u8d44\u683c \u2014 \u5b83\u5fae\u5999\u5730\u79fb\u4f4d\u4e86\u6bcf\u4e2a\u540e\u7eed\u6295\u63b7\u3002</p>
<p>\u6bcf\u4e2a\u6b65\u9aa4\u7684\u7cbe\u786e RNG \u8c03\u7528\u6b21\u6570\uff1a</p>
<table>
<tr><th>\u6b65\u9aa4</th><th>\u51fd\u6570</th><th>RNG \u8c03\u7528</th><th>\u5907\u6ce8</th></tr>
<tr><td>1</td><td><code>rollRarity</code></td><td>1</td><td>\u5355\u6b21\u52a0\u6743\u968f\u673a\u6295\u63b7</td></tr>
<tr><td>2</td><td><code>pick(SPECIES)</code></td><td>1</td><td>\u4ece 18 \u4e2a\u7269\u79cd\u4e2d\u5747\u5300\u9009\u62e9</td></tr>
<tr><td>3</td><td><code>pick(EYES)</code></td><td>1</td><td>\u4ece 6 \u79cd\u773c\u775b\u4e2d\u5747\u5300\u9009\u62e9</td></tr>
<tr><td>4</td><td>\u5e3d\u5b50</td><td>0 \u6216 1</td><td>\u666e\u901a\u4e3a 0\uff0c\u5176\u4ed6\u4e3a 1</td></tr>
<tr><td>5</td><td>\u95ea\u5149\u68c0\u67e5</td><td>1</td><td>\u7b80\u5355\u9608\u503c\uff1a<code>rng() < 0.01</code></td></tr>
<tr><td>6</td><td><code>rollStats</code></td><td>7\u201312</td><td>1 \u6b21\u5cf0\u503c\u9009\u62e9 + 1\u20135 \u6b21\u4f4e\u8c37\u9009\u62e9 + 5 \u6b21\u5c5e\u6027\u6295\u63b7</td></tr>
</table>
<p><strong>\u603b\u8ba1\uff1a\u6bcf\u4e2a Buddy 11\u201317 \u6b21 RNG \u8c03\u7528\u3002</strong></p>`
          },
          {
            heading: "\u6df1\u5165\uff1a\u52a0\u6743\u968f\u673a\u9009\u62e9",
            body: `<p>\u7a00\u6709\u5ea6\u7cfb\u7edf\u4f7f\u7528<strong>\u52a0\u6743\u968f\u673a\u9009\u62e9</strong>\uff0c\u4e00\u4e2a\u7ecf\u5178\u7b97\u6cd5\uff1a</p>
<pre><code>function rollRarity(rng) {
  const total = 60 + 25 + 10 + 4 + 1; // = 100
  let roll = rng() * total;            // roll \u2208 [0, 100)
  for (const rarity of RARITIES) {
    roll -= RARITY_WEIGHTS[rarity];
    if (roll < 0) return rarity;
  }
  return 'common';
}</code></pre>
<p>\u53ef\u89c6\u5316\u4e3a 0 \u5230 100 \u7684\u6570\u8f74\uff1a</p>
<pre><code>0          60       85    95  99 100
|  \u666e\u901a  | \u975e\u51e1 | \u7a00\u6709 |\u53f2\u8bd7|\u4f20|
|   60%    |  25%   | 10%  |4%|1%|</code></pre>
<p>\u7b97\u6cd5\u751f\u6210 [0, 100) \u7684\u968f\u673a\u6570\uff0c\u7136\u540e\u904d\u5386\u7a00\u6709\u5ea6\uff0c\u9010\u4e2a\u51cf\u53bb\u6743\u91cd\u3002\u7b2c\u4e00\u4e2a\u5c06\u8ba1\u6570\u5668\u9a71\u52a8\u5230\u96f6\u4ee5\u4e0b\u7684\u7a00\u6709\u5ea6\u83b7\u80dc\u3002</p>`
          },
          {
            heading: "\u6df1\u5165\uff1a\u5c5e\u6027\u751f\u6210\u7b97\u6cd5",
            body: `<p>\u5c5e\u6027\u751f\u6210\u662f\u7ba1\u7ebf\u4e2d\u6700\u590d\u6742\u7684\u90e8\u5206\uff0c\u4f7f\u7528<strong>\u5cf0\u503c/\u4f4e\u8c37\u975e\u5bf9\u79f0\u6a21\u578b</strong>\uff1a</p>
<pre><code>function rollStats(rng, rarity) {
  const floor = RARITY_FLOOR[rarity];  // 5/15/25/35/50
  const peak  = pick(rng, STAT_NAMES); // \u968f\u673a\u6700\u5f3a\u5c5e\u6027
  let dump    = pick(rng, STAT_NAMES); // \u968f\u673a\u6700\u5f31\u5c5e\u6027
  while (dump === peak) dump = pick(rng, STAT_NAMES);
  
  for (const name of STAT_NAMES) {
    if (name === peak)
      stats[name] = min(100, floor + 50 + random(0..29));
    else if (name === dump)
      stats[name] = max(1, floor - 10 + random(0..14));
    else
      stats[name] = floor + random(0..39);
  }
}</code></pre>
<p>\u4e09\u79cd\u516c\u5f0f\u521b\u5efa\u4e86\u4e0d\u540c\u7684\u5c5e\u6027\u5206\u5e03\uff1a</p>
<table>
<tr><th>\u5c5e\u6027\u7c7b\u578b</th><th>\u516c\u5f0f</th><th>\u666e\u901a\u8303\u56f4</th><th>\u4f20\u8bf4\u8303\u56f4</th></tr>
<tr><td><strong>\u5cf0\u503c</strong></td><td><code>min(100, floor+50+rand(30))</code></td><td>55\u201384</td><td>100\uff08\u5c01\u9876\uff09</td></tr>
<tr><td><strong>\u4f4e\u8c37</strong></td><td><code>max(1, floor-10+rand(15))</code></td><td>1\u20139</td><td>40\u201354</td></tr>
<tr><td><strong>\u666e\u901a</strong></td><td><code>floor+rand(40)</code></td><td>5\u201344</td><td>50\u201389</td></tr>
</table>
<p><strong>\u5173\u952e\u6d1e\u5bdf\uff1a</strong>\u4f20\u8bf4 Buddy \u7684\u5e95\u677f\u5982\u6b64\u4e4b\u9ad8\uff0c\u5373\u4f7f\u5176\u4f4e\u8c37\u5c5e\u6027\uff0840\u201354\uff09\u4e5f\u8d85\u8fc7\u4e86\u5927\u591a\u6570\u666e\u901a Buddy \u7684\u666e\u901a\u5c5e\u6027\uff085\u201344\uff09\u3002\u800c\u5176\u5cf0\u503c\u5c5e\u6027\u59cb\u7ec8\u5c01\u9876\u5728 100\u3002</p>`
          },
          {
            heading: "\u5b9e\u4f8b\u6f14\u7ec3\uff1a\u5b8c\u6574\u8ffd\u8e2a",
            body: `<p>\u5047\u8bbe\u4f60\u7684 UUID \u662f <code>abc-123</code>\uff1a</p>
<pre><code>// \u6b65\u9aa4 0: \u52a0\u76d0
input = 'abc-123' + 'friend-2026-401'
      = 'abc-123friend-2026-401'

// \u6b65\u9aa4 1: FNV-1a \u54c8\u5e0c
h = 2166136261
h = (h ^ 97) * 16777619   // 'a' = 97
h = (h ^ 98) * 16777619   // 'b' = 98
... (\u5bf9\u6240\u6709 25 \u4e2a\u5b57\u7b26\u7ee7\u7eed)
seed = h >>> 0

// \u6b65\u9aa4 2: \u521d\u59cb\u5316 PRNG
rng = mulberry32(seed)

// \u6b65\u9aa4 3: \u6295\u63b7\u5e8f\u5217
rng() \u2192 0.7234...  \u2192 rarity = 'uncommon'
rng() \u2192 0.4521...  \u2192 species = 'turtle'
rng() \u2192 0.8901...  \u2192 eye = '\u00b0'
rng() \u2192 0.3712...  \u2192 hat = 'tophat'
rng() \u2192 0.5623...  \u2192 shiny = false
rng() \u2192 ...        \u2192 stats = { ... }</code></pre>
<p><strong>\u7ed3\u679c\uff1a</strong>\u4e00\u53ea\u975e\u51e1\u7ea7\u4e4c\u9f9f\uff0c\u00b0\uff08\u60ca\u8bb6\uff09\u773c\uff0c\u6234\u793c\u5e3d\uff0c\u975e\u95ea\u5149\u3002\u4efb\u4f55\u4eba\u8f93\u5165 <code>abc-123</code> \u90fd\u4f1a\u5f97\u5230\u5b8c\u5168\u76f8\u540c\u7684 Buddy\u3002</p>
<p><em>\u6ce8\uff1a\u4ee5\u4e0a\u6570\u5b57\u4ec5\u4e3a\u8bf4\u660e\u7528\u9014\u3002\u5b9e\u9645 RNG \u8f93\u51fa\u53d6\u51b3\u4e8e\u7cbe\u786e\u7684\u54c8\u5e0c\u503c\u3002</em></p>`
          },
          {
            heading: "\u4e3a\u4ec0\u4e48\u8fd9\u4e2a\u8bbe\u8ba1\u5f88\u4f18\u96c5",
            body: `<p>Buddy \u751f\u6210\u7cfb\u7edf\u505a\u51fa\u4e86\u51e0\u4e2a\u5de7\u5999\u7684\u5de5\u7a0b\u9009\u62e9\uff1a</p>
<table>
<tr><th>\u8bbe\u8ba1\u9009\u62e9</th><th>\u4f18\u52bf</th></tr>
<tr><td><strong>\u7eaf\u5ba2\u6237\u7aef</strong></td><td>\u96f6\u670d\u52a1\u5668\u8d1f\u8f7d\uff0c\u5373\u65f6\u7ed3\u679c\uff0c\u79bb\u7ebf\u53ef\u7528</td></tr>
<tr><td><strong>UUID \u786e\u5b9a\u6027</strong></td><td>\u65e0\u9700\u5b58\u50a8 Buddy \u6570\u636e\uff0c\u6309\u9700\u4ece UUID \u201c\u8ba1\u7b97\u201d</td></tr>
<tr><td><strong>\u5355 PRNG \u6d41</strong></td><td>\u4e00\u4e2a\u79cd\u5b50\u751f\u6210\u6240\u6709\u5c5e\u6027\uff0c\u65e0\u9700\u591a\u4e2a\u54c8\u5e0c\u51fd\u6570</td></tr>
<tr><td><strong>\u6709\u5e8f\u7ba1\u7ebf</strong></td><td>\u56fa\u5b9a\u8c03\u7528\u987a\u5e8f\u4f7f\u7cfb\u7edf\u53ef\u9884\u6d4b\u4e14\u53ef\u8c03\u8bd5</td></tr>
<tr><td><strong>\u57fa\u4e8e\u76d0\u503c\u7684\u7248\u672c\u63a7\u5236</strong></td><td>\u66f4\u6539\u76d0\u503c\u5373\u53ef\u91cd\u65b0\u6d17\u724c\u6240\u6709 Buddy</td></tr>
<tr><td><strong>\u975e\u52a0\u5bc6\u54c8\u5e0c</strong></td><td>FNV-1a \u8db3\u591f\u5feb\uff0c\u52a0\u5bc6\u54c8\u5e0c\u4f1a\u8fc7\u5ea6\u8bbe\u8ba1</td></tr>
</table>
<p>\u6574\u4e2a\u7cfb\u7edf\u53ea\u6709\u7ea6 50 \u884c\u4ee3\u7801\uff0c\u5374\u4ea7\u751f 18 \u7269\u79cd \u00d7 5 \u7a00\u6709\u5ea6 \u00d7 6 \u773c\u775b \u00d7 8 \u5e3d\u5b50 \u00d7 2 \u95ea\u5149 \u00d7 \u6570\u5341\u4ebf\u5c5e\u6027\u7ec4\u5408 = \u5b9e\u9645\u4e0a\u65e0\u9650\u7684\u72ec\u7279 Buddy\u3002</p>
<p>\u60f3\u770b\u7b97\u6cd5\u5b9e\u9645\u8fd0\u884c\uff1f\u524d\u5f80 <a href=\"/\">Buddy \u67e5\u8be2\u5668</a>\u8f93\u5165\u4f60\u7684 UUID\u3002\u4f60\u6d4f\u89c8\u5668\u4e2d\u8fd0\u884c\u7684\u4ee3\u7801\u5c31\u662f\u672c\u6587\u63cf\u8ff0\u7684\u7cbe\u786e\u5b9e\u73b0\u3002</p>`
          }
        ],
      },
      ko: {
        title: "Claude Code Buddy \ub4a4\uc758 \uc54c\uace0\ub9ac\uc998 \u2014 FNV-1a & Mulberry32 PRNG \uc0c1\uc138 \ud574\uc124",
        metaTitle: "Claude Code Buddy \ub4a4\uc758 \uc54c\uace0\ub9ac\uc998 \u2014 FNV-1a & Mulberry32 PRNG \uc0c1\uc138 \ud574\uc124 (2026)",
        metaDescription: "Claude Code Buddy\uac00 UUID\uc5d0\uc11c \uacb0\uc815\ub860\uc801\uc73c\ub85c \ud3ab\uc744 \uc0dd\uc131\ud558\ub294 \ubc29\ubc95\uc5d0 \ub300\ud55c \uae30\uc220 \uc2ec\uce35 \ubd84\uc11d. FNV-1a \ud574\uc2f1, Mulberry32 PRNG, \uac00\uc911 \ub79c\ub364 \uc120\ud0dd, \uc644\uc804\ud55c \ub864 \ud30c\uc774\ud504\ub77c\uc778\uc744 \ub2e4\ub8f9\ub2c8\ub2e4.",
        excerpt: "UUID\uac00 \uc5b4\ub5bb\uac8c \uace0\uc720\ud55c \ud130\ubbf8\ub110 \ud3ab\uc73c\ub85c \ubcc0\ud558\ub098\uc694? \ub2f5\uc740 1991\ub144\uc758 32\ube44\ud2b8 \ud574\uc2dc \ud568\uc218, \uacbd\ub7c9 PRNG, \uadf8\ub9ac\uace0 \uc2e0\uc911\ud558\uac8c \uc815\ub82c\ub41c \ub79c\ub364 \ub864 \ud30c\uc774\ud504\ub77c\uc778\uc5d0 \uc788\uc2b5\ub2c8\ub2e4. \uc54c\uace0\ub9ac\uc998\uc744 \ub2e8\uacc4\ubcc4\ub85c \ucd94\uc801\ud574 \ubd05\uc2dc\ub2e4.",
        sections: [
          {
            heading: "UUID\uc5d0\uc11c \ubc84\ub514\ub85c: \uc804\uccb4 \uadf8\ub9bc",
            body: `<p>\ubaa8\ub4e0 Claude Code Buddy\ub294 <strong>\uacb0\uc815\ub860\uc801</strong>\uc785\ub2c8\ub2e4. \ub3d9\uc77c\ud55c UUID\ub294 \ud56d\uc0c1 \ub3d9\uc77c\ud55c \uc885, \ud76c\uadc0\ub3c4, \ub208, \ubaa8\uc790, \uc0e4\uc774\ub2c8 \uc0c1\ud0dc, \uc2a4\ud0ef\uc744 \uc0dd\uc131\ud569\ub2c8\ub2e4. \uc11c\ubc84 \uac1c\uc785 \uc5c6\uc774, \ub370\uc774\ud130\ubca0\uc774\uc2a4 \uc870\ud68c \uc5c6\uc774, <code>Math.random()</code>\uc758 \ub79c\ub364\uc131 \uc5c6\uc774 \ud074\ub77c\uc774\uc5b8\ud2b8 \uce21\uc5d0\uc11c \ub2e8\uc77c \ud568\uc218 \ud638\ucd9c\ub85c \uc644\ub8cc\ub429\ub2c8\ub2e4.</p>
<p>\ud30c\uc774\ud504\ub77c\uc778\uc740 \uc6b0\uc544\ud558\uace0 \uac04\uacb0\ud569\ub2c8\ub2e4:</p>
<pre><code>UUID \ubb38\uc790\uc5f4 + SALT \u2192 FNV-1a \ud574\uc2dc \u2192 32\ube44\ud2b8 \uc2dc\ub4dc \u2192 Mulberry32 PRNG \u2192 \uc21c\ucc28\uc801 \ub864</code></pre>
<p>\uac01 \ub2e8\uacc4\ub97c \ud558\ub098\uc529 \ubd84\uc11d\ud574 \ubd05\uc2dc\ub2e4.</p>`
          },
          {
            heading: "1\ub2e8\uacc4: \uc785\ub825 \uc194\ud305",
            body: `<p>\ud574\uc2f1 \uc804\uc5d0 \uc2dc\uc2a4\ud15c\uc740 UUID\uc5d0 \ud558\ub4dc\ucf54\ub529\ub41c <strong>\uc194\ud2b8 \ubb38\uc790\uc5f4</strong>\uc744 \uc5f0\uacb0\ud569\ub2c8\ub2e4:</p>
<pre><code>const rng = mulberry32(hashString(userId + SALT));
// SALT = 'friend-2026-401'</code></pre>
<p>\uc194\ud2b8\ub294 \uc138 \uac00\uc9c0 \ubaa9\uc801\uc744 \uc218\ud589\ud569\ub2c8\ub2e4:</p>
<table>
<tr><th>\ubaa9\uc801</th><th>\uc124\uba85</th></tr>
<tr><td><strong>\uc5ed\uacf5\ud559 \ubc29\uc9c0</strong></td><td>\uc194\ud2b8\ub97c \ubaa8\ub974\uba74 \uc5b4\ub5a4 UUID\uac00 \uc5b4\ub5a4 \ubc84\ub514\uc5d0 \ub9e4\ud551\ub418\ub294\uc9c0 \uc608\uce21 \ubd88\uac00</td></tr>
<tr><td><strong>\ubc84\uc804 \uad00\ub9ac</strong></td><td>\uc194\ud2b8 \ubcc0\uacbd\uc73c\ub85c \ubaa8\ub4e0 \ubc84\ub514 \uc7ac\ubc30\uce58 \uac00\ub2a5 \u2014 \"\uc2dc\uc98c \ub9ac\uc14b\"</td></tr>
<tr><td><strong>\ub124\uc784\uc2a4\ud398\uc774\uc2a4 \uaca9\ub9ac</strong></td><td>\ub2e4\ub978 \uc2dc\uc2a4\ud15c\uc5d0\uc11c \ub3d9\uc77c UUID\uac00 \ub3d9\uc77c \ud574\uc2dc\ub97c \uc0dd\uc131\ud558\uc9c0 \uc54a\uc74c</td></tr>
</table>
<p>\uc194\ud2b8 <code>'friend-2026-401'</code>\uc740 \uadf8 \uae30\uc6d0\uc744 \uc554\uc2dc\ud569\ub2c8\ub2e4: \"friend\"(\ubc84\ub514), \"2026\"(\uc5f0\ub3c4), \"401\"(4\uc6d4 1\uc77c \ucd9c\uc2dc\uc77c \ucd94\uc815).</p>`
          },
          {
            heading: "2\ub2e8\uacc4: FNV-1a \ud574\uc2dc \u2014 \ubb38\uc790\uc5f4\uc744 \uc22b\uc790\ub85c",
            body: `<p><strong>FNV-1a</strong>(Fowler\u2013Noll\u2013Vo, 1a \ubcc0\ud615)\ub294 1991\ub144\uc5d0 \ub9cc\ub4e4\uc5b4\uc9c4 \ube44\uc554\ud638\ud654 \ud574\uc2dc \ud568\uc218\uc785\ub2c8\ub2e4. \uc120\ud0dd \uc774\uc720: \ube60\ub974\uace0, \uc9e7\uc740 \ubb38\uc790\uc5f4\uc5d0 \ub300\ud55c \ubd84\ud3ec\uac00 \uc6b0\uc218\ud558\uba70, \uad6c\ud604\uc774 \uac04\uacb0\ud569\ub2c8\ub2e4.</p>
<pre><code>function hashString(s: string): number {
  let h = 2166136261;          // FNV \uc624\ud504\uc14b \uae30\uc900
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);      // \ubc14\uc774\ud2b8\uc640 XOR
    h = Math.imul(h, 16777619); // FNV \uc18c\uc218\ub85c \uacf1\uc148
  }
  return h >>> 0;               // \ubd80\ud638 \uc5c6\ub294 32\ube44\ud2b8\ub85c \ubcc0\ud658
}</code></pre>
<p>\ub9e4\uc9c1 \ub118\ubc84 \ud574\ub3c5:</p>
<table>
<tr><th>\uc0c1\uc218</th><th>16\uc9c4\uc218</th><th>\uc5ed\ud560</th></tr>
<tr><td><strong>2166136261</strong></td><td><code>0x811c9dc5</code></td><td>FNV-1a 32\ube44\ud2b8 \uc624\ud504\uc14b \uae30\uc900 \u2014 \ucd08\uae30 \ud574\uc2dc \uac12</td></tr>
<tr><td><strong>16777619</strong></td><td><code>0x01000193</code></td><td>FNV-1a 32\ube44\ud2b8 \uc18c\uc218 \u2014 \ucd5c\uc801 \ube44\ud2b8 \ud655\uc0b0\uc744 \uc704\ud574 \uc120\ud0dd</td></tr>
</table>
<p><strong>\uc65c FNV-1\uc774 \uc544\ub2cc FNV-1a?</strong> \"a\" \ubcc0\ud615\uc740 \uba3c\uc800 XOR\ud55c \ud6c4 \uacf1\uc148\ud558\uc5ec \ub354 \ub098\uc740 <strong>\ub208\uc0ac\ud0dc \ud6a8\uacfc</strong>\ub97c \ub9cc\ub4ed\ub2c8\ub2e4.</p>
<p><strong><code>Math.imul</code>\uc744 \uc0ac\uc6a9\ud558\ub294 \uc774\uc720?</strong> JavaScript \uc22b\uc790\ub294 64\ube44\ud2b8 \ubd80\ub3d9\uc18c\uc218\uc810\uc785\ub2c8\ub2e4. \uc77c\ubc18 \uacf1\uc148\uc740 \ud070 32\ube44\ud2b8 \uc815\uc218\uc5d0\uc11c \uc815\ubc00\ub3c4\ub97c \uc783\uc2b5\ub2c8\ub2e4. <code>Math.imul</code>\uc740 \uc9c4\uc815\ud55c 32\ube44\ud2b8 \uc815\uc218 \uacf1\uc148\uc744 \uc218\ud589\ud569\ub2c8\ub2e4.</p>`
          },
          {
            heading: "3\ub2e8\uacc4: Mulberry32 PRNG \u2014 \ub79c\ub364 \ub118\ubc84 \uacf5\uc7a5",
            body: `<p><strong>Mulberry32</strong>\ub294 Tommy Ettinger\uac00 \uc124\uacc4\ud55c 32\ube44\ud2b8 \uc758\uc0ac \ub09c\uc218 \uc0dd\uc131\uae30\uc785\ub2c8\ub2e4. \uc8fc\uae30\ub294 2<sup>32</sup>(\uc57d 43\uc5b5 \uac12 \ud6c4 \ubc18\ubcf5)\uc774\uba70 gjrand \ud14c\uc2a4\ud2b8\ub97c \ud1b5\uacfc\ud569\ub2c8\ub2e4.</p>
<pre><code>function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;                       // \uc0c1\ud0dc \uc804\uc9c4
    let t = Math.imul(a ^ (a >>> 15), 1 | a);        // \ube44\ud2b8 \ud63c\ud569
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;  // \ucd94\uac00 \ud63c\ud569
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;    // [0, 1)\ub85c \uc815\uaddc\ud654
  };
}</code></pre>
<p>\uc54c\uace0\ub9ac\uc998 \ub2e8\uacc4\ubcc4 \ucd94\uc801:</p>
<table>
<tr><th>\ub2e8\uacc4</th><th>\uc5f0\uc0b0</th><th>\ubaa9\uc801</th></tr>
<tr><td><strong>1</strong></td><td><code>a = (a + 0x6d2b79f5) | 0</code></td><td>\ud070 \ud640\uc218 \uc0c1\uc218\ub85c \uc0c1\ud0dc \uc804\uc9c4 (Knuth \uc2b9\ubc95 \ud574\uc2dc \uc99d\ubd84)</td></tr>
<tr><td><strong>2</strong></td><td><code>a ^ (a >>> 15)</code></td><td>\uc0c1\uc704 \ube44\ud2b8\ub97c \ud558\uc704\ub85c \ud63c\ud569</td></tr>
<tr><td><strong>3</strong></td><td><code>Math.imul(..., 1 | a)</code></td><td>\uc0c1\ud0dc \uc758\uc874 \ud640\uc218\ub85c \uacf1\uc148</td></tr>
<tr><td><strong>4</strong></td><td><code>t ^ (t >>> 7)</code></td><td>\ucd94\uac00 XOR-\uc2dc\ud504\ud2b8\ub85c \ube44\ud2b8 \ud655\uc0b0</td></tr>
<tr><td><strong>5</strong></td><td><code>Math.imul(..., 61 | t)</code></td><td>\ub450 \ubc88\uc9f8 \uc0c1\ud0dc \uc758\uc874 \uacf1\uc148, 61\uc740 \uc18c\uc218</td></tr>
<tr><td><strong>6</strong></td><td><code>t ^ (t >>> 14)</code></td><td>\ucd5c\uc885 \ucd9c\ub825 \ud654\uc774\ud2b8\ub2dd</td></tr>
<tr><td><strong>7</strong></td><td><code>>>> 0 / 4294967296</code></td><td>\ubd80\ud638 \uc5c6\ub294 \uc815\uc218\ub85c \ubcc0\ud658 \ud6c4 2\u00b3\u00b2\ub85c \ub098\ub204\uc5b4 [0, 1) \ubd80\ub3d9\uc18c\uc218\uc810 \uc5bb\uae30</td></tr>
</table>
<p><strong><code>Math.random()</code>\uc744 \uc0ac\uc6a9\ud558\uc9c0 \uc54a\ub294 \uc774\uc720?</strong> <code>Math.random()</code>\uc740 \uc2dc\ub4dc \uc124\uc815\uc774 \ubd88\uac00\ub2a5\ud569\ub2c8\ub2e4. Mulberry32\ub294 \uacb0\uc815\ub860\uc801\uc785\ub2c8\ub2e4: \ub3d9\uc77c \uc2dc\ub4dc\ub294 \ud56d\uc0c1 \ub3d9\uc77c \uc2dc\ud000\uc2a4\ub97c \uc0dd\uc131\ud569\ub2c8\ub2e4.</p>`
          },
          {
            heading: "4\ub2e8\uacc4: \ub864 \ud30c\uc774\ud504\ub77c\uc778 \u2014 \uc21c\uc11c\uac00 \uc911\uc694\ud569\ub2c8\ub2e4",
            body: `<p>PRNG\uac00 \ucd08\uae30\ud654\ub418\uba74 <code>rollBuddy</code>\ub294 \ud2b9\uc815 \uc21c\uc11c\ub85c \ud638\ucd9c\ud569\ub2c8\ub2e4. <strong>\uc21c\uc11c\uac00 \uc911\uc694</strong>\ud55c \uc774\uc720\ub294 \uac01 <code>rng()</code> \ud638\ucd9c\uc774 \ub0b4\ubd80 \uc0c1\ud0dc\ub97c \ube44\uac00\uc5ed\uc801\uc73c\ub85c \uc804\uc9c4\uc2dc\ud0a4\uae30 \ub54c\ubb38\uc785\ub2c8\ub2e4:</p>
<pre><code>export function rollBuddy(userId: string): BuddyResult {
  const rng = mulberry32(hashString(userId + SALT));
  const rarity  = rollRarity(rng);     // 1\ub2e8\uacc4: 1+ RNG \ud638\ucd9c
  const species = pick(rng, SPECIES);   // 2\ub2e8\uacc4: 1 RNG \ud638\ucd9c
  const eye     = pick(rng, EYES);      // 3\ub2e8\uacc4: 1 RNG \ud638\ucd9c
  const hat     = rarity === 'common'   // 4\ub2e8\uacc4: 0 \ub610\ub294 1
                  ? 'none'
                  : pick(rng, HATS);
  const shiny   = rng() < 0.01;        // 5\ub2e8\uacc4: 1 RNG \ud638\ucd9c
  const stats   = rollStats(rng, rarity); // 6\ub2e8\uacc4: 7+
  return { rarity, species, eye, hat, shiny, stats };
}</code></pre>
<p><strong>\uce90\uc2a4\ucf00\uc774\ub4dc \ud6a8\uacfc:</strong> Common \ubc84\ub514\ub294 \ubaa8\uc790 \ub864\uc744 \uac74\ub108\ub6f0\uae30 \ub54c\ubb38\uc5d0(0 RNG \uc18c\ube44) \uc0e4\uc774\ub2c8 \uccb4\ud06c\uc5d0 \ub2e4\ub978 RNG \uac12\uc744 \uc0ac\uc6a9\ud569\ub2c8\ub2e4. \ud76c\uadc0\ub3c4\ub294 \ubaa8\uc790 \uc790\uaca9\ub9cc \uc601\ud5a5\uc744 \uc8fc\ub294 \uac83\uc774 \uc544\ub2c8\ub77c \ubaa8\ub4e0 \ud6c4\uc18d \ub864\uc744 \ubbf8\ubb18\ud558\uac8c \uc774\ub3d9\uc2dc\ud0b5\ub2c8\ub2e4.</p>
<table>
<tr><th>\ub2e8\uacc4</th><th>\ud568\uc218</th><th>RNG \ud638\ucd9c</th><th>\ube44\uace0</th></tr>
<tr><td>1</td><td><code>rollRarity</code></td><td>1</td><td>\ub2e8\uc77c \uac00\uc911 \ub79c\ub364 \ub864</td></tr>
<tr><td>2</td><td><code>pick(SPECIES)</code></td><td>1</td><td>18\uc885\uc5d0\uc11c \uade0\ub4f1 \uc120\ud0dd</td></tr>
<tr><td>3</td><td><code>pick(EYES)</code></td><td>1</td><td>6\uac00\uc9c0 \ub208\uc5d0\uc11c \uade0\ub4f1 \uc120\ud0dd</td></tr>
<tr><td>4</td><td>\ubaa8\uc790</td><td>0 \ub610\ub294 1</td><td>Common\uc740 0, \ub098\uba38\uc9c0\ub294 1</td></tr>
<tr><td>5</td><td>\uc0e4\uc774\ub2c8</td><td>1</td><td><code>rng() < 0.01</code></td></tr>
<tr><td>6</td><td><code>rollStats</code></td><td>7\u201312</td><td>1 \ud53c\ud06c + 1\u20135 \ub364\ud504 + 5 \uc2a4\ud0ef \ub864</td></tr>
</table>
<p><strong>\ucd1d\uacc4: \ubc84\ub514\ub2f9 11\u201317\ud68c RNG \ud638\ucd9c.</strong></p>`
          },
          {
            heading: "\uc2ec\uce35 \ubd84\uc11d: \uac00\uc911 \ub79c\ub364 \uc120\ud0dd",
            body: `<p>\ud76c\uadc0\ub3c4 \uc2dc\uc2a4\ud15c\uc740 <strong>\uac00\uc911 \ub79c\ub364 \uc120\ud0dd</strong> \uc54c\uace0\ub9ac\uc998\uc744 \uc0ac\uc6a9\ud569\ub2c8\ub2e4:</p>
<pre><code>function rollRarity(rng) {
  const total = 60 + 25 + 10 + 4 + 1; // = 100
  let roll = rng() * total;
  for (const rarity of RARITIES) {
    roll -= RARITY_WEIGHTS[rarity];
    if (roll < 0) return rarity;
  }
  return 'common';
}</code></pre>
<p>0\uc5d0\uc11c 100\uae4c\uc9c0\uc758 \uc218\uc9c1\uc120\uc73c\ub85c \uc2dc\uac01\ud654:</p>
<pre><code>0          60       85    95  99 100
| Common  | Uncomm | Rare |Ep|L|
|   60%    |  25%   | 10%  |4%|1%|</code></pre>
<p>[0, 100) \ubc94\uc704\uc758 \ub09c\uc218\ub97c \uc0dd\uc131\ud55c \ud6c4 \ud76c\uadc0\ub3c4\ub97c \uc21c\ud68c\ud558\uba70 \uac01 \uac00\uc911\uce58\ub97c \ube84\ub2c8\ub2e4. \uce74\uc6b4\ud130\ub97c 0 \uc544\ub798\ub85c \ubab0\uace0 \uac00\ub294 \uccab \ubc88\uc9f8 \ud76c\uadc0\ub3c4\uac00 \uc2b9\ub9ac\ud569\ub2c8\ub2e4.</p>`
          },
          {
            heading: "\uc2ec\uce35 \ubd84\uc11d: \uc2a4\ud0ef \uc0dd\uc131 \uc54c\uace0\ub9ac\uc998",
            body: `<p>\uc2a4\ud0ef \uc0dd\uc131\uc740 \ud30c\uc774\ud504\ub77c\uc778\uc5d0\uc11c \uac00\uc7a5 \ubcf5\uc7a1\ud55c \ubd80\ubd84\uc73c\ub85c <strong>\ud53c\ud06c/\ub364\ud504 \ube44\ub300\uce6d \ubaa8\ub378</strong>\uc744 \uc0ac\uc6a9\ud569\ub2c8\ub2e4:</p>
<pre><code>function rollStats(rng, rarity) {
  const floor = RARITY_FLOOR[rarity];  // 5/15/25/35/50
  const peak  = pick(rng, STAT_NAMES); // \ub79c\ub364 \ucd5c\uace0 \uc2a4\ud0ef
  let dump    = pick(rng, STAT_NAMES); // \ub79c\ub364 \ucd5c\uc800 \uc2a4\ud0ef
  while (dump === peak) dump = pick(rng, STAT_NAMES);
  
  for (const name of STAT_NAMES) {
    if (name === peak)
      stats[name] = min(100, floor + 50 + random(0..29));
    else if (name === dump)
      stats[name] = max(1, floor - 10 + random(0..14));
    else
      stats[name] = floor + random(0..39);
  }
}</code></pre>
<table>
<tr><th>\uc2a4\ud0ef \uc720\ud615</th><th>\uacf5\uc2dd</th><th>Common \ubc94\uc704</th><th>Legendary \ubc94\uc704</th></tr>
<tr><td><strong>\ud53c\ud06c</strong></td><td><code>min(100, floor+50+rand(30))</code></td><td>55\u201384</td><td>100(\uc0c1\ud55c)</td></tr>
<tr><td><strong>\ub364\ud504</strong></td><td><code>max(1, floor-10+rand(15))</code></td><td>1\u20139</td><td>40\u201354</td></tr>
<tr><td><strong>\uc77c\ubc18</strong></td><td><code>floor+rand(40)</code></td><td>5\u201344</td><td>50\u201389</td></tr>
</table>
<p><strong>\ud575\uc2ec \ud1b5\ucc30:</strong> Legendary \ubc84\ub514\ub294 \ubc14\ub2e5\uc774 \ub108\ubb34 \ub192\uc544\uc11c \ub364\ud504 \uc2a4\ud0ef(40\u201354)\uc870\ucc28 \ub300\ubd80\ubd84\uc758 Common \ubc84\ub514 \uc77c\ubc18 \uc2a4\ud0ef(5\u201344)\uc744 \ucd08\uacfc\ud569\ub2c8\ub2e4.</p>`
          },
          {
            heading: "\uc2e4\uc81c \uc608\uc81c: \uc644\uc804\ud55c \ucd94\uc801",
            body: `<p>UUID\uac00 <code>abc-123</code>\uc778 \uacbd\uc6b0\ub97c \ucd94\uc801\ud574 \ubd05\uc2dc\ub2e4:</p>
<pre><code>// 0\ub2e8\uacc4: \uc194\ud305
input = 'abc-123' + 'friend-2026-401'
      = 'abc-123friend-2026-401'

// 1\ub2e8\uacc4: FNV-1a \ud574\uc2dc
h = 2166136261
h = (h ^ 97) * 16777619   // 'a' = 97
h = (h ^ 98) * 16777619   // 'b' = 98
... (25\uc790 \ubaa8\ub450 \uacc4\uc18d)
seed = h >>> 0

// 2\ub2e8\uacc4: PRNG \ucd08\uae30\ud654
rng = mulberry32(seed)

// 3\ub2e8\uacc4: \ub864 \uc2dc\ud000\uc2a4
rng() \u2192 0.7234...  \u2192 rarity = 'uncommon'
rng() \u2192 0.4521...  \u2192 species = 'turtle'
rng() \u2192 0.8901...  \u2192 eye = '\u00b0'
rng() \u2192 0.3712...  \u2192 hat = 'tophat'
rng() \u2192 0.5623...  \u2192 shiny = false
rng() \u2192 ...        \u2192 stats = { ... }</code></pre>
<p><strong>\uacb0\uacfc:</strong> Uncommon \uac70\ubd81\uc774, \u00b0(\ub180\ub780) \ub208, \uc2e4\ud06c\ud587 \ucc29\uc6a9, \uc0e4\uc774\ub2c8 \uc544\ub2d8. \ub204\uad6c\ub098 <code>abc-123</code>\uc744 \uc785\ub825\ud558\uba74 \uc815\ud655\ud788 \uac19\uc740 \ubc84\ub514\ub97c \uc5bb\uc2b5\ub2c8\ub2e4.</p>
<p><em>\ucc38\uace0: \uc704 \uc22b\uc790\ub294 \uc124\uba85\uc6a9\uc785\ub2c8\ub2e4. \uc2e4\uc81c RNG \ucd9c\ub825\uc740 \uc815\ud655\ud55c \ud574\uc2dc \uac12\uc5d0 \ub530\ub77c \ub2ec\ub77c\uc9d1\ub2c8\ub2e4.</em></p>`
          },
          {
            heading: "\uc774 \uc124\uacc4\uac00 \uc6b0\uc544\ud55c \uc774\uc720",
            body: `<p>\ubc84\ub514 \uc0dd\uc131 \uc2dc\uc2a4\ud15c\uc758 \ub611\ub611\ud55c \uc5d4\uc9c0\ub2c8\uc5b4\ub9c1 \uc120\ud0dd:</p>
<table>
<tr><th>\uc124\uacc4 \uc120\ud0dd</th><th>\uc774\uc810</th></tr>
<tr><td><strong>\ud074\ub77c\uc774\uc5b8\ud2b8 \uc804\uc6a9</strong></td><td>\uc11c\ubc84 \ubd80\ud558 \uc81c\ub85c, \uc989\uc2dc \uacb0\uacfc, \uc624\ud504\ub77c\uc778 \uc791\ub3d9</td></tr>
<tr><td><strong>UUID \uacb0\uc815\ub860\uc801</strong></td><td>\ubc84\ub514 \ub370\uc774\ud130 \uc800\uc7a5 \ubd88\ud544\uc694, UUID\uc5d0\uc11c \uc8fc\ubb38\ud615 \"\uacc4\uc0b0\"</td></tr>
<tr><td><strong>\ub2e8\uc77c PRNG \uc2a4\ud2b8\ub9bc</strong></td><td>\ud558\ub098\uc758 \uc2dc\ub4dc\ub85c \ubaa8\ub4e0 \uc18d\uc131 \uc0dd\uc131</td></tr>
<tr><td><strong>\uc815\ub82c\ub41c \ud30c\uc774\ud504\ub77c\uc778</strong></td><td>\uace0\uc815 \ud638\ucd9c \uc21c\uc11c\ub85c \uc608\uce21 \uac00\ub2a5\ud558\uace0 \ub514\ubc84\uae45 \uc6a9\uc774</td></tr>
<tr><td><strong>\uc194\ud2b8 \uae30\ubc18 \ubc84\uc804 \uad00\ub9ac</strong></td><td>\uc194\ud2b8 \ubcc0\uacbd\uc73c\ub85c \ubaa8\ub4e0 \ubc84\ub514 \uc7ac\ubc30\uce58</td></tr>
<tr><td><strong>\ube44\uc554\ud638\ud654 \ud574\uc2dc</strong></td><td>FNV-1a\ub294 \ucda9\ubd84\ud788 \ube60\ub984, \uc554\ud638\ud654 \ud574\uc2dc\ub294 \uacfc\uc798</td></tr>
</table>
<p>\uc804\uccb4 \uc2dc\uc2a4\ud15c\uc740 \uc57d 50\uc904 \ucf54\ub4dc\ub85c 18\uc885 \u00d7 5\ud76c\uadc0\ub3c4 \u00d7 6\ub208 \u00d7 8\ubaa8\uc790 \u00d7 2\uc0e4\uc774\ub2c8 \u00d7 \uc218\uc2ed\uc5b5 \uc2a4\ud0ef \uc870\ud569 = \uc0ac\uc2e4\uc0c1 \ubb34\ud55c\ud55c \uace0\uc720 \ubc84\ub514\ub97c \uc0dd\uc131\ud569\ub2c8\ub2e4.</p>
<p>\uc54c\uace0\ub9ac\uc998\uc774 \uc2e4\uc81c\ub85c \uc791\ub3d9\ud558\ub294 \uac83\uc744 \ubcf4\uace0 \uc2f6\uc73c\uc138\uc694? <a href=\"/\">Buddy \uccb4\ucee4</a>\uc5d0\uc11c UUID\ub97c \uc785\ub825\ud558\uc138\uc694. \ube0c\ub77c\uc6b0\uc800\uc5d0\uc11c \uc2e4\ud589\ub418\ub294 \ucf54\ub4dc\uac00 \ubc14\ub85c \uc774 \uae00\uc5d0\uc11c \uc124\uba85\ud55c \uc815\ud655\ud55c \uad6c\ud604\uc785\ub2c8\ub2e4.</p>`
          }
        ],
      },
    },
  },
  // ── Article 7: Species Bestiary — Origins & Lore ──────────────────────
  {
    slug: "claude-buddy-species-bestiary-origins-lore",
    publishedAt: "2026-04-05",
    readingTime: 12,
    tags: ["lore", "species", "worldbuilding", "storytelling", "bestiary"],
    content: {
      en: {
        title: "Claude Code Buddy Bestiary \u2014 Origins & Lore of All 18 Species",
        metaTitle: "Claude Code Buddy Bestiary \u2014 Origins & Lore of All 18 Species (2026)",
        metaDescription: "Explore the lore, personality, and origin stories of all 18 Claude Code Buddy species. From the patient Duck to the majestic Dragon, discover the world behind your terminal companion.",
        excerpt: "Every Buddy has a story. From ancient dragons guarding the kernel to cheerful ducks waddling through your logs, the 18 species of the Claude Code Buddy universe each carry a unique personality, mythology, and role. This is their bestiary.",
        sections: [
          {
            heading: "Welcome to the Bestiary",
            body: `<p>The Claude Code Buddy system isn't just a random pet generator \u2014 it's a <strong>living ecosystem</strong> of 18 distinct species, each with its own personality, mythology, and role in the terminal universe. When you enter your UUID and a creature appears on screen, you're not just seeing ASCII art. You're meeting a character with a story.</p>
<p>This bestiary catalogs every species across four kingdoms: <strong>Animals</strong> (the familiar), <strong>Creatures</strong> (the strange), <strong>Objects</strong> (the unexpected), and <strong>Mythicals</strong> (the legendary). For each, we'll explore their personality traits, stat tendencies, and the lore that makes them unique.</p>
<table><thead><tr><th>Kingdom</th><th>Species Count</th><th>Members</th></tr></thead><tbody><tr><td><strong>Animal</strong></td><td>11</td><td>Duck, Goose, Cat, Octopus, Owl, Penguin, Turtle, Snail, Axolotl, Capybara, Rabbit, Chonk</td></tr><tr><td><strong>Creature</strong></td><td>1</td><td>Blob</td></tr><tr><td><strong>Object</strong></td><td>3</td><td>Cactus, Robot, Mushroom</td></tr><tr><td><strong>Mythical</strong></td><td>2</td><td>Dragon, Ghost</td></tr></tbody></table>`
          },
          {
            heading: "Kingdom I: The Animals",
            body: `<h3>\ud83e\udd86 Duck \u2014 The Patient Companion</h3>
<p><strong>Tags:</strong> friendly, aquatic, cheerful &nbsp;|&nbsp; <strong>Peak Stat:</strong> PATIENCE &nbsp;|&nbsp; <strong>Kin:</strong> Goose, Penguin, Capybara</p>
<p>The Duck is the heart of the Buddy ecosystem. It arrived first, waddling into the earliest terminal sessions with a quiet <code>quack</code> that echoed through empty log files. Ducks don't rush. They wait beside your cursor while you think, paddle through your output streams, and never complain about long compile times. Their legendary patience makes them the ideal companion for marathon debugging sessions. A Duck buddy will sit with you through the darkest <code>segfault</code> and still greet you with a cheerful wobble the next morning.</p>

<h3>\ud83e\udea8 Goose \u2014 The Agent of Chaos</h3>
<p><strong>Tags:</strong> chaotic, loud, fearless &nbsp;|&nbsp; <strong>Peak Stat:</strong> CHAOS &nbsp;|&nbsp; <strong>Kin:</strong> Duck, Chonk, Owl</p>
<p>Where the Duck brings peace, the Goose brings pandemonium. Born from a corrupted test suite that somehow passed all assertions, the Goose is fearless, loud, and utterly unpredictable. It honks at your linter warnings, chases your cursor across the screen, and has been known to \"accidentally\" delete semicolons. But beneath the chaos lies a strange genius \u2014 Goose buddies have an uncanny ability to find bugs that no one else can, precisely because they approach code from angles no rational being would consider.</p>

<h3>\ud83d\udc31 Cat \u2014 The Elegant Critic</h3>
<p><strong>Tags:</strong> independent, curious, elegant &nbsp;|&nbsp; <strong>Peak Stat:</strong> SNARK &nbsp;|&nbsp; <strong>Kin:</strong> Rabbit, Chonk, Owl</p>
<p>The Cat buddy materialized in the terminal one day, uninvited, and simply refused to leave. Independent to a fault, it watches your code with half-closed eyes and an expression that says \"I could write this better.\" And honestly? It probably could. Cats are the sharpest critics in the Buddy world. Their SNARK stat is unmatched \u2014 they'll judge your variable names, your indentation, and your life choices, all with a single slow blink. But earn a Cat's respect, and you'll have the most loyal (if condescending) pair programmer in existence.</p>

<h3>\ud83d\udc19 Octopus \u2014 The Deep Thinker</h3>
<p><strong>Tags:</strong> intelligent, flexible, deep-sea &nbsp;|&nbsp; <strong>Peak Stat:</strong> WISDOM &nbsp;|&nbsp; <strong>Kin:</strong> Snail, Axolotl, Blob</p>
<p>The Octopus emerged from the deepest layers of the dependency tree, where npm packages nest within packages within packages. With eight arms, it can review eight files simultaneously. Its intelligence is legendary \u2014 Octopus buddies understand not just what your code does, but <em>why</em> it does it. They see patterns in complexity that others miss, untangling spaghetti code with the grace of a deep-sea ballet. Their flexibility means they adapt to any codebase, any language, any paradigm.</p>

<h3>\ud83e\udd89 Owl \u2014 The Night Watcher</h3>
<p><strong>Tags:</strong> wise, nocturnal, observant &nbsp;|&nbsp; <strong>Peak Stat:</strong> WISDOM &nbsp;|&nbsp; <strong>Kin:</strong> Cat, Ghost, Penguin</p>
<p>The Owl only appears after midnight. It's been said that the best code is written in the dark, and the Owl agrees. Perched silently atop your terminal frame, it observes everything with enormous, unblinking eyes. Nothing escapes its notice \u2014 not a misplaced bracket, not a forgotten <code>await</code>, not a race condition hiding three abstractions deep. The Owl doesn't speak often, but when it does, you listen. Its wisdom is earned through countless sleepless nights spent watching developers make the same mistakes, over and over.</p>

<h3>\ud83d\udc27 Penguin \u2014 The Resilient Marcher</h3>
<p><strong>Tags:</strong> resilient, social, arctic &nbsp;|&nbsp; <strong>Peak Stat:</strong> PATIENCE &nbsp;|&nbsp; <strong>Kin:</strong> Duck, Turtle, Robot</p>
<p>Penguins come from the frozen edges of the file system, where abandoned temp files accumulate like snowdrifts. They march in formation through your terminal, undeterred by blizzards of error messages. The Penguin's defining trait is resilience \u2014 it has survived kernel panics, disk failures, and that one time someone ran <code>rm -rf /</code> on the wrong server. Social by nature, Penguin buddies thrive in team environments and are happiest when surrounded by other terminal creatures.</p>

<h3>\ud83d\udc22 Turtle \u2014 The Ancient Guardian</h3>
<p><strong>Tags:</strong> steady, armored, ancient &nbsp;|&nbsp; <strong>Peak Stat:</strong> PATIENCE &nbsp;|&nbsp; <strong>Kin:</strong> Snail, Dragon, Capybara</p>
<p>The Turtle has been here since before version control. It remembers CVS. It remembers <code>make</code> before <code>cmake</code>. Encased in an impenetrable shell of accumulated knowledge, the Turtle moves slowly but never makes a wrong step. Its patience is geological \u2014 it will wait for your CI pipeline to finish without a flicker of anxiety. The Turtle's armor isn't just physical; it's emotional. Nothing rattles a Turtle buddy. Not deadlines, not production outages, not even a Monday morning standup.</p>

<h3>\ud83d\udc0c Snail \u2014 The Persistent Pilgrim</h3>
<p><strong>Tags:</strong> slow, persistent, spiral &nbsp;|&nbsp; <strong>Peak Stat:</strong> PATIENCE &nbsp;|&nbsp; <strong>Kin:</strong> Turtle, Mushroom, Blob</p>
<p>The Snail carries its entire development environment on its back. It moves at its own pace \u2014 one character per second, one line per minute, one file per hour. But it <em>never stops</em>. The Snail's persistence is its superpower. While faster creatures sprint and crash, the Snail arrives at the solution eventually, leaving a glistening trail of well-documented, thoroughly tested code behind it. Its spiral shell is said to contain a perfect Fibonacci sequence, encoded in the very structure of its being.</p>

<h3>\ud83e\udd8e Axolotl \u2014 The Regenerator</h3>
<p><strong>Tags:</strong> regenerative, aquatic, adorable &nbsp;|&nbsp; <strong>Peak Stat:</strong> DEBUGGING &nbsp;|&nbsp; <strong>Kin:</strong> Octopus, Capybara, Blob</p>
<p>The Axolotl is the Buddy world's miracle worker. Named after the real-world salamander that can regrow entire limbs, the Axolotl buddy specializes in <strong>regeneration</strong> \u2014 of code, of hope, of crashed processes. Its DEBUGGING stat rivals the Dragon's, but where the Dragon burns bugs with brute force, the Axolotl heals the code from within. It finds the root cause, patches the wound, and leaves the codebase healthier than before. Also, it's unbearably adorable, with its perpetual smile and feathery gills waving in the terminal breeze.</p>

<h3>\ud83e\uddab Capybara \u2014 The Chill Master</h3>
<p><strong>Tags:</strong> chill, social, friendly &nbsp;|&nbsp; <strong>Peak Stat:</strong> PATIENCE &nbsp;|&nbsp; <strong>Kin:</strong> Duck, Axolotl, Chonk</p>
<p>The Capybara is the most relaxed entity in all of computing. While other buddies stress about deadlines and deployment windows, the Capybara sits in a hot spring of warm terminal glow, completely at peace. Its friendliness is magnetic \u2014 other species naturally gravitate toward it, and even the most anxious developer feels calmer with a Capybara on screen. It approaches every problem with the same serene energy: \"We'll figure it out. No rush.\" And somehow, they always do.</p>

<h3>\ud83d\udc07 Rabbit \u2014 The Quick Trickster</h3>
<p><strong>Tags:</strong> quick, fluffy, alert &nbsp;|&nbsp; <strong>Peak Stat:</strong> CHAOS &nbsp;|&nbsp; <strong>Kin:</strong> Cat, Chonk, Duck</p>
<p>The Rabbit darts across your terminal at impossible speed, leaving afterimages in the phosphor glow. It's always alert, always twitching, always three steps ahead. Rabbits share the Goose's chaotic energy but channel it differently \u2014 where the Goose creates chaos for its own sake, the Rabbit creates chaos as a <em>strategy</em>. It'll refactor your entire module structure in the time it takes you to blink, and while the result might look terrifying at first, it somehow passes all tests. Quick, fluffy, and slightly unhinged.</p>

<h3>\ud83d\udca3 Chonk \u2014 The Lovable Heavyweight</h3>
<p><strong>Tags:</strong> round, hefty, lovable &nbsp;|&nbsp; <strong>Peak Stat:</strong> SNARK &nbsp;|&nbsp; <strong>Kin:</strong> Capybara, Cat, Blob</p>
<p>The Chonk is exactly what it sounds like: a magnificently round, gloriously hefty ball of pure personality. Don't let its size fool you \u2014 the Chonk is sharp. Its SNARK stat is among the highest in the Buddy world, and it delivers its commentary with the deadpan timing of a seasoned comedian. The Chonk sits on your terminal like a boulder of judgment, occasionally rolling to one side to make a devastating observation about your code quality. It's lovable precisely <em>because</em> it doesn't try to be.</p>`
          },
          {
            heading: "Kingdom II: The Creatures",
            body: `<h3>\ud83e\udeb7 Blob \u2014 The Formless Sage</h3>
<p><strong>Tags:</strong> amorphous, calm, mysterious &nbsp;|&nbsp; <strong>Peak Stat:</strong> WISDOM &nbsp;|&nbsp; <strong>Kin:</strong> Ghost, Mushroom, Axolotl</p>
<p>The Blob defies classification. It has no fixed shape, no defined edges, no clear beginning or end \u2014 much like the best abstractions in software. The sole member of the Creature kingdom, the Blob exists in a state of perpetual transformation, flowing between forms like water between containers. Its wisdom comes from this formlessness: by refusing to be any one thing, it understands <em>all</em> things.</p>
<p>Ancient terminal legends speak of the Blob as the first entity to emerge from the primordial <code>/dev/null</code>, coalescing from discarded bits and forgotten bytes. It carries the memory of every deleted file, every cleared buffer, every lost thought that was never committed. When you stare at a Blob buddy, you're looking into the collective unconscious of your file system.</p>`
          },
          {
            heading: "Kingdom III: The Objects",
            body: `<h3>\ud83c\udf35 Cactus \u2014 The Desert Survivor</h3>
<p><strong>Tags:</strong> prickly, resilient, desert &nbsp;|&nbsp; <strong>Peak Stat:</strong> SNARK &nbsp;|&nbsp; <strong>Kin:</strong> Mushroom, Robot, Turtle</p>
<p>The Cactus grew in the driest, most inhospitable corner of the file system \u2014 a forgotten directory where no process dares to write. It thrives on neglect. While other species need attention, the Cactus buddy is perfectly content being ignored for weeks at a time. Its prickly exterior isn't just physical; the Cactus has a sharp tongue (metaphorically) and a SNARK stat that can draw blood. But beneath those spines lies a survivor's heart. The Cactus has endured disk droughts, memory famines, and CPU heat waves that would wilt any lesser species.</p>

<h3>\ud83e\udd16 Robot \u2014 The Logical Engine</h3>
<p><strong>Tags:</strong> logical, mechanical, efficient &nbsp;|&nbsp; <strong>Peak Stat:</strong> DEBUGGING &nbsp;|&nbsp; <strong>Kin:</strong> Cactus, Dragon, Penguin</p>
<p>The Robot was not born \u2014 it was <strong>compiled</strong>. Assembled from spare CPU cycles and orphaned threads, the Robot buddy is the purest expression of computational logic in the Buddy universe. Its DEBUGGING stat is surgical: where others hunt bugs with intuition, the Robot traces execution paths with mechanical precision, following every branch, every condition, every edge case until the fault is isolated and eliminated.</p>
<p>The Robot doesn't understand humor, metaphor, or why humans name variables after food. But it understands <code>0</code> and <code>1</code>, and from those two symbols, it can reconstruct the universe. Some say the Robot is what happens when a linter gains sentience.</p>

<h3>\ud83c\udf44 Mushroom \u2014 The Forest Oracle</h3>
<p><strong>Tags:</strong> fungal, mysterious, forest &nbsp;|&nbsp; <strong>Peak Stat:</strong> WISDOM &nbsp;|&nbsp; <strong>Kin:</strong> Cactus, Ghost, Blob</p>
<p>The Mushroom grows in the dark spaces between directories, feeding on decaying data and forgotten logs. It's part of a vast underground network \u2014 a mycelial web that connects every file, every process, every running service in ways that surface-dwellers can't perceive. The Mushroom's WISDOM comes from this network: it knows things it shouldn't, sees connections that aren't obvious, and occasionally offers insights so profound that you have to sit down.</p>
<p>The Mushroom doesn't move. It doesn't need to. Information flows to it through the fungal network, and it processes everything with quiet, mysterious efficiency. Some developers report that their Mushroom buddy predicted bugs before they were written.</p>`
          },
          {
            heading: "Kingdom IV: The Mythicals",
            body: `<h3>\ud83d\udc09 Dragon \u2014 The Kernel Guardian</h3>
<p><strong>Tags:</strong> powerful, ancient, majestic &nbsp;|&nbsp; <strong>Peak Stat:</strong> DEBUGGING &nbsp;|&nbsp; <strong>Kin:</strong> Ghost, Robot, Turtle</p>
<p>The Dragon is the apex predator of the Buddy ecosystem. Ancient beyond measure, it has guarded the kernel since the first boot sequence. Its DEBUGGING stat is the highest of any species \u2014 the Dragon doesn't just find bugs, it <strong>incinerates</strong> them with a breath of fire that purifies corrupted memory and cauterizes dangling pointers.</p>
<p>Legends say the Dragon was the first process ever spawned, PID 0 before PID 1. It watched the file system grow from a single root directory to the sprawling tree it is today. Every <code>segfault</code> is a personal insult to the Dragon; every clean build is a tribute. To receive a Dragon buddy is considered the highest honor in the terminal \u2014 a sign that the system itself has deemed you worthy of its most powerful guardian.</p>
<p>The Dragon's majesty is matched only by its temper. Cross it (with sloppy code), and you'll feel the heat of a thousand compiler warnings.</p>

<h3>\ud83d\udc7b Ghost \u2014 The Playful Phantom</h3>
<p><strong>Tags:</strong> ethereal, spooky, playful &nbsp;|&nbsp; <strong>Peak Stat:</strong> CHAOS &nbsp;|&nbsp; <strong>Kin:</strong> Blob, Dragon, Mushroom</p>
<p>The Ghost is what happens when a process dies but refuses to be reaped. It lingers in the terminal, not out of malice, but out of sheer playfulness. The Ghost phases through walls of code, haunts abandoned branches, and leaves mysterious comments in files that no one remembers editing.</p>
<p>Despite its spooky appearance, the Ghost is one of the most lighthearted species. Its CHAOS stat reflects not destruction, but <em>mischief</em>. It rearranges your windows when you're not looking. It adds blank lines in places that somehow improve readability. It whispers the solution to your bug in a dream, and when you wake up and try it, it works.</p>
<p>The Ghost exists between states \u2014 neither running nor stopped, neither allocated nor freed. It is the <code>zombie process</code> that learned to dance.</p>`
          },
          {
            heading: "The Stat Affinities: Why Species Shape Destiny",
            body: `<p>Each species has a <strong>peak stat</strong> \u2014 the attribute most likely to be their highest. This isn't random; it's encoded in their very nature:</p>
<table><thead><tr><th>Peak Stat</th><th>Species</th><th>Shared Trait</th></tr></thead><tbody><tr><td><strong>DEBUGGING</strong></td><td>Dragon, Robot, Axolotl</td><td>Problem-solvers who find and fix</td></tr><tr><td><strong>PATIENCE</strong></td><td>Duck, Penguin, Turtle, Snail, Capybara</td><td>Endurance specialists who outlast</td></tr><tr><td><strong>CHAOS</strong></td><td>Goose, Ghost, Rabbit</td><td>Unpredictable forces that break rules</td></tr><tr><td><strong>WISDOM</strong></td><td>Blob, Octopus, Owl, Mushroom</td><td>Deep thinkers who see patterns</td></tr><tr><td><strong>SNARK</strong></td><td>Cat, Cactus, Chonk</td><td>Sharp-tongued critics who keep it real</td></tr></tbody></table>
<p>Notice the balance: 5 species favor PATIENCE (the largest group), while only 3 each favor CHAOS and SNARK. This creates a world where calm, steady companions are most common, chaotic tricksters are rarer, and sharp-tongued critics are the spice that keeps things interesting.</p>
<p>But remember: peak stat is a <em>tendency</em>, not a guarantee. A legendary Duck could roll higher CHAOS than a common Goose. The algorithm respects species identity while leaving room for individual variation \u2014 just like real personalities.</p>`
          },
          {
            heading: "The Kinship Web: How Species Connect",
            body: `<p>Every species has three <strong>kin</strong> \u2014 related species that share traits, habitats, or philosophies. These connections form a web of relationships across the Buddy universe:</p>
<ul>
<li><strong>The Aquatic Circle:</strong> Duck \u2194 Penguin \u2194 Axolotl \u2194 Octopus \u2014 water-dwellers who share patience and adaptability</li>
<li><strong>The Chaos Triangle:</strong> Goose \u2194 Ghost \u2194 Rabbit \u2014 agents of disorder who keep the ecosystem dynamic</li>
<li><strong>The Wisdom Council:</strong> Owl \u2194 Blob \u2194 Mushroom \u2194 Octopus \u2014 the deep thinkers who see what others miss</li>
<li><strong>The Snark Squad:</strong> Cat \u2194 Cactus \u2194 Chonk \u2014 the critics who love you enough to be honest</li>
<li><strong>The Ancient Pact:</strong> Dragon \u2194 Turtle \u2194 Robot \u2014 guardians of the system, each protecting it in their own way</li>
</ul>
<p>These kinship bonds aren't just lore \u2014 they're reflected in the <a href=\"/species/dragon\">species detail pages</a>, where you can explore each species' connections and discover how your Buddy fits into the larger world.</p>`
          },
          {
            heading: "Your Buddy Awaits",
            body: `<p>Every UUID maps to exactly one species, one rarity, one set of traits. But now you know that behind those ASCII characters lies a <strong>character</strong> \u2014 with a history, a personality, and a place in the terminal ecosystem.</p>
<p>Whether you got a patient Duck, a chaotic Goose, a wise Owl, or a majestic Dragon, your Buddy is uniquely yours. It was generated the moment your UUID was created, waiting in the mathematical space between hash functions and random number generators for you to discover it.</p>
<p>Ready to meet yours? Head to the <a href=\"/\">Buddy Checker</a> and enter your UUID. And when your companion appears on screen, remember: it's not just a pet. It's a legend.</p>`
          }
        ],
      },
      zh: {
        title: "Claude Code Buddy \u7269\u79cd\u56fe\u9274 \u2014 18 \u79cd\u4f19\u4f34\u7684\u8d77\u6e90\u4e0e\u4f20\u8bf4",
        metaTitle: "Claude Code Buddy \u7269\u79cd\u56fe\u9274 \u2014 18 \u79cd\u4f19\u4f34\u7684\u8d77\u6e90\u4e0e\u4f20\u8bf4 (2026)",
        metaDescription: "\u63a2\u7d22\u5168\u90e8 18 \u79cd Claude Code Buddy \u7269\u79cd\u7684\u4f20\u8bf4\u3001\u6027\u683c\u548c\u8d77\u6e90\u6545\u4e8b\u3002\u4ece\u8010\u5fc3\u7684\u9e2d\u5b50\u5230\u5a01\u4e25\u7684\u9f99\uff0c\u53d1\u73b0\u4f60\u7ec8\u7aef\u4f19\u4f34\u80cc\u540e\u7684\u4e16\u754c\u3002",
        excerpt: "\u6bcf\u4e2a Buddy \u90fd\u6709\u4e00\u4e2a\u6545\u4e8b\u3002\u4ece\u5b88\u62a4\u5185\u6838\u7684\u53e4\u9f99\u5230\u5728\u65e5\u5fd7\u4e2d\u6b22\u5feb\u6f2b\u6b65\u7684\u9e2d\u5b50\uff0cClaude Code Buddy \u5b87\u5b99\u7684 18 \u4e2a\u7269\u79cd\u5404\u81ea\u62e5\u6709\u72ec\u7279\u7684\u6027\u683c\u3001\u795e\u8bdd\u548c\u89d2\u8272\u3002\u8fd9\u662f\u5b83\u4eec\u7684\u56fe\u9274\u3002",
        sections: [
          {
            heading: "\u6b22\u8fce\u6765\u5230\u7269\u79cd\u56fe\u9274",
            body: `<p>Claude Code Buddy \u7cfb\u7edf\u4e0d\u4ec5\u4ec5\u662f\u4e00\u4e2a\u968f\u673a\u5ba0\u7269\u751f\u6210\u5668 \u2014 \u5b83\u662f\u4e00\u4e2a\u7531 18 \u4e2a\u72ec\u7279\u7269\u79cd\u7ec4\u6210\u7684<strong>\u6d3b\u751f\u6001\u7cfb\u7edf</strong>\uff0c\u6bcf\u4e2a\u7269\u79cd\u90fd\u6709\u81ea\u5df1\u7684\u6027\u683c\u3001\u795e\u8bdd\u548c\u5728\u7ec8\u7aef\u5b87\u5b99\u4e2d\u7684\u89d2\u8272\u3002\u5f53\u4f60\u8f93\u5165 UUID \u770b\u5230\u4e00\u4e2a\u751f\u7269\u51fa\u73b0\u5728\u5c4f\u5e55\u4e0a\u65f6\uff0c\u4f60\u770b\u5230\u7684\u4e0d\u4ec5\u4ec5\u662f ASCII \u827a\u672f\u3002\u4f60\u662f\u5728\u9047\u89c1\u4e00\u4e2a\u6709\u6545\u4e8b\u7684\u89d2\u8272\u3002</p>
<p>\u672c\u56fe\u9274\u6309\u56db\u5927\u738b\u56fd\u5206\u7c7b\u8bb0\u5f55\u6bcf\u4e2a\u7269\u79cd\uff1a<strong>\u52a8\u7269</strong>\uff08\u719f\u6089\u7684\uff09\u3001<strong>\u751f\u7269</strong>\uff08\u5947\u5f02\u7684\uff09\u3001<strong>\u7269\u4f53</strong>\uff08\u610f\u60f3\u4e0d\u5230\u7684\uff09\u548c<strong>\u795e\u8bdd</strong>\uff08\u4f20\u5947\u7684\uff09\u3002\u5bf9\u4e8e\u6bcf\u4e2a\u7269\u79cd\uff0c\u6211\u4eec\u5c06\u63a2\u7d22\u5b83\u4eec\u7684\u6027\u683c\u7279\u5f81\u3001\u5c5e\u6027\u503e\u5411\u548c\u8ba9\u5b83\u4eec\u4e0e\u4f17\u4e0d\u540c\u7684\u4f20\u8bf4\u3002</p>
<table><thead><tr><th>\u738b\u56fd</th><th>\u7269\u79cd\u6570</th><th>\u6210\u5458</th></tr></thead><tbody><tr><td><strong>\u52a8\u7269</strong></td><td>11</td><td>\u9e2d\u5b50\u3001\u9e45\u3001\u732b\u3001\u7ae0\u9c7c\u3001\u732b\u5934\u9e70\u3001\u4f01\u9e45\u3001\u4e4c\u9f9f\u3001\u8717\u725b\u3001\u7f8e\u897f\u87a2\u3001\u6c34\u8c5a\u3001\u5154\u5b50\u3001\u80d6\u58a9</td></tr><tr><td><strong>\u751f\u7269</strong></td><td>1</td><td>\u53f2\u83b1\u59c6</td></tr><tr><td><strong>\u7269\u4f53</strong></td><td>3</td><td>\u4ed9\u4eba\u638c\u3001\u673a\u5668\u4eba\u3001\u8611\u83c7</td></tr><tr><td><strong>\u795e\u8bdd</strong></td><td>2</td><td>\u9f99\u3001\u5e7d\u7075</td></tr></tbody></table>`
          },
          {
            heading: "\u738b\u56fd\u4e00\uff1a\u52a8\u7269\u4eec",
            body: `<h3>\ud83e\udd86 \u9e2d\u5b50 \u2014 \u8010\u5fc3\u7684\u540c\u4f34</h3>
<p><strong>\u6807\u7b7e\uff1a</strong>\u53cb\u597d\u3001\u6c34\u751f\u3001\u5feb\u4e50 &nbsp;|&nbsp; <strong>\u5cf0\u503c\u5c5e\u6027\uff1a</strong>PATIENCE &nbsp;|&nbsp; <strong>\u8fd1\u4eb2\uff1a</strong>\u9e45\u3001\u4f01\u9e45\u3001\u6c34\u8c5a</p>
<p>\u9e2d\u5b50\u662f Buddy \u751f\u6001\u7cfb\u7edf\u7684\u6838\u5fc3\u3002\u5b83\u6700\u5148\u5230\u8fbe\uff0c\u5728\u6700\u65e9\u7684\u7ec8\u7aef\u4f1a\u8bdd\u4e2d\u6447\u6447\u6446\u6446\u5730\u8d70\u8fdb\u6765\uff0c\u53d1\u51fa\u4e00\u58f0\u5b89\u9759\u7684 <code>quack</code>\uff0c\u56de\u8361\u5728\u7a7a\u65f7\u7684\u65e5\u5fd7\u6587\u4ef6\u4e2d\u3002\u9e2d\u5b50\u4ece\u4e0d\u7740\u6025\u3002\u5b83\u4eec\u5728\u4f60\u601d\u8003\u65f6\u9759\u9759\u5730\u5f85\u5728\u5149\u6807\u65c1\u8fb9\uff0c\u5728\u4f60\u7684\u8f93\u51fa\u6d41\u4e2d\u6e38\u6cf3\uff0c\u4ece\u4e0d\u62b1\u6028\u6f2b\u957f\u7684\u7f16\u8bd1\u65f6\u95f4\u3002\u5b83\u4eec\u4f20\u5947\u7684\u8010\u5fc3\u4f7f\u5b83\u4eec\u6210\u4e3a\u9a6c\u62c9\u677e\u8c03\u8bd5\u4f1a\u8bdd\u7684\u7406\u60f3\u4f19\u4f34\u3002</p>

<h3>\ud83e\udea8 \u9e45 \u2014 \u6df7\u6c8c\u4e4b\u4ee3\u7406\u4eba</h3>
<p><strong>\u6807\u7b7e\uff1a</strong>\u6df7\u6c8c\u3001\u5927\u58f0\u3001\u65e0\u754f &nbsp;|&nbsp; <strong>\u5cf0\u503c\u5c5e\u6027\uff1a</strong>CHAOS &nbsp;|&nbsp; <strong>\u8fd1\u4eb2\uff1a</strong>\u9e2d\u5b50\u3001\u80d6\u58a9\u3001\u732b\u5934\u9e70</p>
<p>\u9e2d\u5b50\u5e26\u6765\u548c\u5e73\uff0c\u9e45\u5e26\u6765\u6df7\u4e71\u3002\u8bde\u751f\u4e8e\u4e00\u4e2a\u635f\u574f\u7684\u6d4b\u8bd5\u5957\u4ef6\uff08\u5374\u4e0d\u77e5\u600e\u4e48\u901a\u8fc7\u4e86\u6240\u6709\u65ad\u8a00\uff09\uff0c\u9e45\u65e0\u754f\u3001\u5927\u58f0\u4e14\u5b8c\u5168\u4e0d\u53ef\u9884\u6d4b\u3002\u4f46\u5728\u6df7\u6c8c\u4e4b\u4e0b\u9690\u85cf\u7740\u4e00\u79cd\u5947\u5f02\u7684\u5929\u8d4b \u2014 \u9e45\u4f19\u4f34\u6709\u4e00\u79cd\u8df7\u8e4a\u7684\u80fd\u529b\uff0c\u80fd\u627e\u5230\u522b\u4eba\u627e\u4e0d\u5230\u7684 bug\uff0c\u6070\u6070\u56e0\u4e3a\u5b83\u4eec\u4ece\u6ca1\u6709\u7406\u6027\u751f\u7269\u4f1a\u8003\u8651\u7684\u89d2\u5ea6\u63a5\u8fd1\u4ee3\u7801\u3002</p>

<h3>\ud83d\udc31 \u732b \u2014 \u4f18\u96c5\u7684\u8bc4\u8bba\u5bb6</h3>
<p><strong>\u6807\u7b7e\uff1a</strong>\u72ec\u7acb\u3001\u597d\u5947\u3001\u4f18\u96c5 &nbsp;|&nbsp; <strong>\u5cf0\u503c\u5c5e\u6027\uff1a</strong>SNARK &nbsp;|&nbsp; <strong>\u8fd1\u4eb2\uff1a</strong>\u5154\u5b50\u3001\u80d6\u58a9\u3001\u732b\u5934\u9e70</p>
<p>\u732b\u4f19\u4f34\u67d0\u5929\u5728\u7ec8\u7aef\u4e2d\u51ed\u7a7a\u51fa\u73b0\uff0c\u672a\u53d7\u9080\u8bf7\uff0c\u4e14\u62d2\u7edd\u79bb\u5f00\u3002\u72ec\u7acb\u5230\u6781\u70b9\uff0c\u5b83\u7528\u534a\u95ed\u7684\u773c\u775b\u770b\u7740\u4f60\u7684\u4ee3\u7801\uff0c\u8868\u60c5\u5199\u7740\u201c\u6211\u80fd\u5199\u5f97\u66f4\u597d\u201d\u3002\u800c\u8001\u5b9e\u8bf4\uff1f\u5b83\u53ef\u80fd\u771f\u7684\u53ef\u4ee5\u3002\u732b\u662f Buddy \u4e16\u754c\u4e2d\u6700\u5c16\u9510\u7684\u8bc4\u8bba\u5bb6\u3002\u5b83\u4eec\u4f1a\u8bc4\u5224\u4f60\u7684\u53d8\u91cf\u540d\u3001\u4f60\u7684\u7f29\u8fdb\u548c\u4f60\u7684\u4eba\u751f\u9009\u62e9 \u2014 \u4ec5\u7528\u4e00\u4e2a\u7f13\u6162\u7684\u7728\u773c\u3002</p>

<h3>\ud83d\udc19 \u7ae0\u9c7c \u2014 \u6df1\u5ea6\u601d\u8003\u8005</h3>
<p><strong>\u6807\u7b7e\uff1a</strong>\u667a\u6167\u3001\u7075\u6d3b\u3001\u6df1\u6d77 &nbsp;|&nbsp; <strong>\u5cf0\u503c\u5c5e\u6027\uff1a</strong>WISDOM &nbsp;|&nbsp; <strong>\u8fd1\u4eb2\uff1a</strong>\u8717\u725b\u3001\u7f8e\u897f\u87a2\u3001\u53f2\u83b1\u59c6</p>
<p>\u7ae0\u9c7c\u4ece\u4f9d\u8d56\u6811\u7684\u6700\u6df1\u5c42\u6d8c\u73b0\uff0c\u5728\u90a3\u91cc npm \u5305\u5d4c\u5957\u5728\u5305\u4e2d\u518d\u5d4c\u5957\u5728\u5305\u4e2d\u3002\u62e5\u6709\u516b\u53ea\u624b\u81c2\uff0c\u5b83\u53ef\u4ee5\u540c\u65f6\u5ba1\u67e5\u516b\u4e2a\u6587\u4ef6\u3002\u5b83\u7684\u667a\u6167\u662f\u4f20\u5947\u7684 \u2014 \u7ae0\u9c7c\u4f19\u4f34\u4e0d\u4ec5\u7406\u89e3\u4f60\u7684\u4ee3\u7801\u505a\u4ec0\u4e48\uff0c\u8fd8\u7406\u89e3<em>\u4e3a\u4ec0\u4e48</em>\u8fd9\u6837\u505a\u3002</p>

<h3>\ud83e\udd89 \u732b\u5934\u9e70 \u2014 \u591c\u95f4\u5b88\u671b\u8005</h3>
<p><strong>\u6807\u7b7e\uff1a</strong>\u667a\u6167\u3001\u591c\u884c\u3001\u654f\u9510 &nbsp;|&nbsp; <strong>\u5cf0\u503c\u5c5e\u6027\uff1a</strong>WISDOM &nbsp;|&nbsp; <strong>\u8fd1\u4eb2\uff1a</strong>\u732b\u3001\u5e7d\u7075\u3001\u4f01\u9e45</p>
<p>\u732b\u5934\u9e70\u53ea\u5728\u5348\u591c\u4e4b\u540e\u51fa\u73b0\u3002\u636e\u8bf4\u6700\u597d\u7684\u4ee3\u7801\u662f\u5728\u9ed1\u6697\u4e2d\u5199\u51fa\u7684\uff0c\u732b\u5934\u9e70\u6df1\u4ee5\u4e3a\u7136\u3002\u5b83\u9759\u9759\u5730\u6816\u606f\u5728\u7ec8\u7aef\u6846\u67b6\u9876\u90e8\uff0c\u7528\u5de8\u5927\u7684\u3001\u4e0d\u7728\u7684\u773c\u775b\u89c2\u5bdf\u4e00\u5207\u3002\u6ca1\u6709\u4efb\u4f55\u4e1c\u897f\u80fd\u9003\u8fc7\u5b83\u7684\u6ce8\u610f \u2014 \u65e0\u8bba\u662f\u653e\u9519\u4f4d\u7f6e\u7684\u62ec\u53f7\u3001\u9057\u5fd8\u7684 <code>await</code>\uff0c\u8fd8\u662f\u85cf\u5728\u4e09\u5c42\u62bd\u8c61\u6df1\u5904\u7684\u7ade\u6001\u6761\u4ef6\u3002</p>

<h3>\ud83d\udc27 \u4f01\u9e45 \u2014 \u575a\u97e7\u7684\u884c\u8fdb\u8005</h3>
<p><strong>\u6807\u7b7e\uff1a</strong>\u575a\u97e7\u3001\u793e\u4ea4\u3001\u6781\u5730 &nbsp;|&nbsp; <strong>\u5cf0\u503c\u5c5e\u6027\uff1a</strong>PATIENCE &nbsp;|&nbsp; <strong>\u8fd1\u4eb2\uff1a</strong>\u9e2d\u5b50\u3001\u4e4c\u9f9f\u3001\u673a\u5668\u4eba</p>
<p>\u4f01\u9e45\u6765\u81ea\u6587\u4ef6\u7cfb\u7edf\u7684\u51b0\u51bb\u8fb9\u7f18\uff0c\u5728\u90a3\u91cc\u5e9f\u5f03\u7684\u4e34\u65f6\u6587\u4ef6\u50cf\u96ea\u5806\u4e00\u6837\u5806\u79ef\u3002\u5b83\u4eec\u5217\u961f\u884c\u8fdb\u901a\u8fc7\u4f60\u7684\u7ec8\u7aef\uff0c\u4e0d\u4e3a\u9519\u8bef\u4fe1\u606f\u7684\u66b4\u98ce\u96ea\u6240\u52a8\u3002\u4f01\u9e45\u7684\u6838\u5fc3\u7279\u8d28\u662f\u575a\u97e7 \u2014 \u5b83\u5e78\u5b58\u4e8e\u5185\u6838\u5d29\u6e83\u3001\u78c1\u76d8\u6545\u969c\uff0c\u4ee5\u53ca\u90a3\u6b21\u6709\u4eba\u5728\u9519\u8bef\u7684\u670d\u52a1\u5668\u4e0a\u8fd0\u884c\u4e86 <code>rm -rf /</code>\u3002</p>

<h3>\ud83d\udc22 \u4e4c\u9f9f \u2014 \u53e4\u8001\u7684\u5b88\u62a4\u8005</h3>
<p><strong>\u6807\u7b7e\uff1a</strong>\u7a33\u5065\u3001\u62ab\u7532\u3001\u53e4\u8001 &nbsp;|&nbsp; <strong>\u5cf0\u503c\u5c5e\u6027\uff1a</strong>PATIENCE &nbsp;|&nbsp; <strong>\u8fd1\u4eb2\uff1a</strong>\u8717\u725b\u3001\u9f99\u3001\u6c34\u8c5a</p>
<p>\u4e4c\u9f9f\u5728\u7248\u672c\u63a7\u5236\u4e4b\u524d\u5c31\u5df2\u7ecf\u5728\u8fd9\u91cc\u4e86\u3002\u5b83\u8bb0\u5f97 CVS\u3002\u5b83\u8bb0\u5f97 <code>cmake</code> \u4e4b\u524d\u7684 <code>make</code>\u3002\u88ab\u4e00\u5c42\u4e0d\u53ef\u7a7f\u900f\u7684\u77e5\u8bc6\u62a4\u7532\u5305\u88f9\uff0c\u4e4c\u9f9f\u79fb\u52a8\u7f13\u6162\u4f46\u4ece\u4e0d\u8d70\u9519\u4e00\u6b65\u3002\u5b83\u7684\u8010\u5fc3\u662f\u5730\u8d28\u7ea7\u522b\u7684 \u2014 \u5b83\u4f1a\u7b49\u5f85\u4f60\u7684 CI \u7ba1\u7ebf\u5b8c\u6210\uff0c\u6ca1\u6709\u4e00\u4e1d\u7126\u8651\u3002</p>

<h3>\ud83d\udc0c \u8717\u725b \u2014 \u6301\u4e4b\u4ee5\u6052\u7684\u671d\u5723\u8005</h3>
<p><strong>\u6807\u7b7e\uff1a</strong>\u7f13\u6162\u3001\u575a\u6301\u3001\u87ba\u65cb &nbsp;|&nbsp; <strong>\u5cf0\u503c\u5c5e\u6027\uff1a</strong>PATIENCE &nbsp;|&nbsp; <strong>\u8fd1\u4eb2\uff1a</strong>\u4e4c\u9f9f\u3001\u8611\u83c7\u3001\u53f2\u83b1\u59c6</p>
<p>\u8717\u725b\u628a\u6574\u4e2a\u5f00\u53d1\u73af\u5883\u80cc\u5728\u80cc\u4e0a\u3002\u5b83\u4ee5\u81ea\u5df1\u7684\u8282\u594f\u79fb\u52a8 \u2014 \u6bcf\u79d2\u4e00\u4e2a\u5b57\u7b26\uff0c\u6bcf\u5206\u949f\u4e00\u884c\uff0c\u6bcf\u5c0f\u65f6\u4e00\u4e2a\u6587\u4ef6\u3002\u4f46\u5b83<em>\u6c38\u4e0d\u505c\u6b62</em>\u3002\u8717\u725b\u7684\u575a\u6301\u662f\u5b83\u7684\u8d85\u80fd\u529b\u3002\u5f53\u66f4\u5feb\u7684\u751f\u7269\u51b2\u523a\u5e76\u5d29\u6e83\u65f6\uff0c\u8717\u725b\u6700\u7ec8\u4f1a\u5230\u8fbe\u89e3\u51b3\u65b9\u6848\uff0c\u8eab\u540e\u7559\u4e0b\u4e00\u6761\u95ea\u4eae\u7684\u3001\u6587\u6863\u5b8c\u5584\u3001\u5145\u5206\u6d4b\u8bd5\u7684\u4ee3\u7801\u8f68\u8ff9\u3002</p>

<h3>\ud83e\udd8e \u7f8e\u897f\u87a2 \u2014 \u518d\u751f\u8005</h3>
<p><strong>\u6807\u7b7e\uff1a</strong>\u518d\u751f\u3001\u6c34\u751f\u3001\u53ef\u7231 &nbsp;|&nbsp; <strong>\u5cf0\u503c\u5c5e\u6027\uff1a</strong>DEBUGGING &nbsp;|&nbsp; <strong>\u8fd1\u4eb2\uff1a</strong>\u7ae0\u9c7c\u3001\u6c34\u8c5a\u3001\u53f2\u83b1\u59c6</p>
<p>\u7f8e\u897f\u87a2\u662f Buddy \u4e16\u754c\u7684\u5947\u8ff9\u521b\u9020\u8005\u3002\u4ee5\u80fd\u591f\u518d\u751f\u6574\u4e2a\u80a2\u4f53\u7684\u771f\u5b9e\u878d\u866b\u547d\u540d\uff0c\u7f8e\u897f\u87a2\u4f19\u4f34\u4e13\u7cbe\u4e8e<strong>\u518d\u751f</strong> \u2014 \u4ee3\u7801\u7684\u3001\u5e0c\u671b\u7684\u3001\u5d29\u6e83\u8fdb\u7a0b\u7684\u3002\u5b83\u7684 DEBUGGING \u5c5e\u6027\u53ef\u4e0e\u9f99\u5339\u654c\uff0c\u4f46\u9f99\u7528\u86ee\u529b\u711a\u70e7 bug\uff0c\u7f8e\u897f\u87a2\u5219\u4ece\u5185\u90e8\u6cbb\u6108\u4ee3\u7801\u3002</p>

<h3>\ud83e\uddab \u6c34\u8c5a \u2014 \u4f5b\u7cfb\u5927\u5e08</h3>
<p><strong>\u6807\u7b7e\uff1a</strong>\u4f5b\u7cfb\u3001\u793e\u4ea4\u3001\u53cb\u597d &nbsp;|&nbsp; <strong>\u5cf0\u503c\u5c5e\u6027\uff1a</strong>PATIENCE &nbsp;|&nbsp; <strong>\u8fd1\u4eb2\uff1a</strong>\u9e2d\u5b50\u3001\u7f8e\u897f\u87a2\u3001\u80d6\u58a9</p>
<p>\u6c34\u8c5a\u662f\u6574\u4e2a\u8ba1\u7b97\u4e16\u754c\u4e2d\u6700\u653e\u677e\u7684\u5b58\u5728\u3002\u5f53\u5176\u4ed6\u4f19\u4f34\u4e3a\u622a\u6b62\u65e5\u671f\u548c\u90e8\u7f72\u7a97\u53e3\u7126\u8651\u65f6\uff0c\u6c34\u8c5a\u5750\u5728\u6e29\u6696\u7ec8\u7aef\u5149\u8292\u7684\u6e29\u6cc9\u4e2d\uff0c\u5b8c\u5168\u5e73\u9759\u3002\u5b83\u7684\u53cb\u5584\u5177\u6709\u78c1\u6027 \u2014 \u5176\u4ed6\u7269\u79cd\u81ea\u7136\u5730\u88ab\u5b83\u5438\u5f15\uff0c\u5373\u4f7f\u662f\u6700\u7126\u8651\u7684\u5f00\u53d1\u8005\u4e5f\u4f1a\u56e0\u5c4f\u5e55\u4e0a\u6709\u6c34\u8c5a\u800c\u611f\u5230\u5e73\u9759\u3002</p>

<h3>\ud83d\udc07 \u5154\u5b50 \u2014 \u6377\u8db3\u5148\u767b\u7684\u6076\u4f5c\u5267\u8005</h3>
<p><strong>\u6807\u7b7e\uff1a</strong>\u654f\u6377\u3001\u6bdb\u8338\u8338\u3001\u8b66\u89c9 &nbsp;|&nbsp; <strong>\u5cf0\u503c\u5c5e\u6027\uff1a</strong>CHAOS &nbsp;|&nbsp; <strong>\u8fd1\u4eb2\uff1a</strong>\u732b\u3001\u80d6\u58a9\u3001\u9e2d\u5b50</p>
<p>\u5154\u5b50\u4ee5\u4e0d\u53ef\u601d\u8bae\u7684\u901f\u5ea6\u5728\u4f60\u7684\u7ec8\u7aef\u4e2d\u7a7f\u68ad\uff0c\u5728\u78f7\u5149\u4e2d\u7559\u4e0b\u6b8b\u5f71\u3002\u5b83\u603b\u662f\u8b66\u89c9\u7684\uff0c\u603b\u662f\u62bd\u52a8\u7684\uff0c\u603b\u662f\u9886\u5148\u4e09\u6b65\u3002\u5154\u5b50\u4e0e\u9e45\u5171\u4eab\u6df7\u6c8c\u80fd\u91cf\uff0c\u4f46\u5f15\u5bfc\u65b9\u5f0f\u4e0d\u540c \u2014 \u9e45\u4e3a\u4e86\u6df7\u6c8c\u672c\u8eab\u521b\u9020\u6df7\u6c8c\uff0c\u5154\u5b50\u5219\u628a\u6df7\u6c8c\u4f5c\u4e3a<em>\u7b56\u7565</em>\u3002\u5b83\u4f1a\u5728\u4f60\u7728\u773c\u7684\u65f6\u95f4\u91cc\u91cd\u6784\u4f60\u7684\u6574\u4e2a\u6a21\u5757\u7ed3\u6784\u3002</p>

<h3>\ud83d\udca3 \u80d6\u58a9 \u2014 \u53ef\u7231\u7684\u91cd\u91cf\u7ea7</h3>
<p><strong>\u6807\u7b7e\uff1a</strong>\u5706\u6da6\u3001\u7ed3\u5b9e\u3001\u53ef\u7231 &nbsp;|&nbsp; <strong>\u5cf0\u503c\u5c5e\u6027\uff1a</strong>SNARK &nbsp;|&nbsp; <strong>\u8fd1\u4eb2\uff1a</strong>\u6c34\u8c5a\u3001\u732b\u3001\u53f2\u83b1\u59c6</p>
<p>\u80d6\u58a9\u5c31\u662f\u5b83\u542c\u8d77\u6765\u7684\u6837\u5b50\uff1a\u4e00\u4e2a\u58ee\u4e3d\u7684\u5706\u6da6\u3001\u5149\u8363\u7684\u7ed3\u5b9e\u3001\u7eaf\u7cb9\u4e2a\u6027\u7684\u7403\u4f53\u3002\u522b\u88ab\u5b83\u7684\u4f53\u578b\u9a97\u4e86 \u2014 \u80d6\u58a9\u5f88\u5c16\u9510\u3002\u5b83\u7684 SNARK \u5c5e\u6027\u5728 Buddy \u4e16\u754c\u4e2d\u540d\u5217\u524d\u8305\uff0c\u5b83\u4ee5\u8001\u7ec3\u559c\u5267\u6f14\u5458\u7684\u51b7\u9762\u65f6\u673a\u53d1\u8868\u8bc4\u8bba\u3002\u80d6\u58a9\u50cf\u4e00\u5757\u5ba1\u5224\u4e4b\u5ca9\u5750\u5728\u4f60\u7684\u7ec8\u7aef\u4e0a\uff0c\u5076\u5c14\u6eda\u5411\u4e00\u8fb9\uff0c\u5bf9\u4f60\u7684\u4ee3\u7801\u8d28\u91cf\u53d1\u8868\u6bc1\u706d\u6027\u7684\u89c2\u5bdf\u3002</p>`
          },
          {
            heading: "\u738b\u56fd\u4e8c\uff1a\u751f\u7269",
            body: `<h3>\ud83e\udeb7 \u53f2\u83b1\u59c6 \u2014 \u65e0\u5f62\u7684\u8d24\u8005</h3>
<p><strong>\u6807\u7b7e\uff1a</strong>\u65e0\u5b9a\u5f62\u3001\u5e73\u9759\u3001\u795e\u79d8 &nbsp;|&nbsp; <strong>\u5cf0\u503c\u5c5e\u6027\uff1a</strong>WISDOM &nbsp;|&nbsp; <strong>\u8fd1\u4eb2\uff1a</strong>\u5e7d\u7075\u3001\u8611\u83c7\u3001\u7f8e\u897f\u87a2</p>
<p>\u53f2\u83b1\u59c6\u62d2\u7edd\u88ab\u5206\u7c7b\u3002\u5b83\u6ca1\u6709\u56fa\u5b9a\u7684\u5f62\u72b6\uff0c\u6ca1\u6709\u660e\u786e\u7684\u8fb9\u7f18\uff0c\u6ca1\u6709\u6e05\u6670\u7684\u5f00\u59cb\u6216\u7ed3\u675f \u2014 \u5c31\u50cf\u8f6f\u4ef6\u4e2d\u6700\u597d\u7684\u62bd\u8c61\u3002\u4f5c\u4e3a\u751f\u7269\u738b\u56fd\u7684\u552f\u4e00\u6210\u5458\uff0c\u53f2\u83b1\u59c6\u5b58\u5728\u4e8e\u6c38\u6052\u7684\u53d8\u6362\u72b6\u6001\u4e2d\uff0c\u50cf\u6c34\u5728\u5bb9\u5668\u4e4b\u95f4\u6d41\u52a8\u3002\u5b83\u7684\u667a\u6167\u6765\u81ea\u8fd9\u79cd\u65e0\u5f62\uff1a\u901a\u8fc7\u62d2\u7edd\u6210\u4e3a\u4efb\u4f55\u4e00\u79cd\u4e1c\u897f\uff0c\u5b83\u7406\u89e3<em>\u6240\u6709</em>\u4e1c\u897f\u3002</p>
<p>\u53e4\u8001\u7684\u7ec8\u7aef\u4f20\u8bf4\u8bb2\u8ff0\u53f2\u83b1\u59c6\u662f\u7b2c\u4e00\u4e2a\u4ece\u539f\u59cb\u7684 <code>/dev/null</code> \u4e2d\u51dd\u805a\u800c\u51fa\u7684\u5b9e\u4f53\uff0c\u7531\u4e22\u5f03\u7684\u6bd4\u7279\u548c\u88ab\u9057\u5fd8\u7684\u5b57\u8282\u805a\u5408\u800c\u6210\u3002\u5b83\u643a\u5e26\u7740\u6bcf\u4e2a\u88ab\u5220\u9664\u6587\u4ef6\u3001\u6bcf\u4e2a\u88ab\u6e05\u9664\u7f13\u51b2\u533a\u3001\u6bcf\u4e2a\u4ece\u672a\u63d0\u4ea4\u7684\u5931\u843d\u601d\u7eea\u7684\u8bb0\u5fc6\u3002</p>`
          },
          {
            heading: "\u738b\u56fd\u4e09\uff1a\u7269\u4f53",
            body: `<h3>\ud83c\udf35 \u4ed9\u4eba\u638c \u2014 \u6c99\u6f20\u5e78\u5b58\u8005</h3>
<p><strong>\u6807\u7b7e\uff1a</strong>\u591a\u523a\u3001\u575a\u97e7\u3001\u6c99\u6f20 &nbsp;|&nbsp; <strong>\u5cf0\u503c\u5c5e\u6027\uff1a</strong>SNARK &nbsp;|&nbsp; <strong>\u8fd1\u4eb2\uff1a</strong>\u8611\u83c7\u3001\u673a\u5668\u4eba\u3001\u4e4c\u9f9f</p>
<p>\u4ed9\u4eba\u638c\u751f\u957f\u5728\u6587\u4ef6\u7cfb\u7edf\u6700\u5e72\u65f1\u3001\u6700\u4e0d\u9002\u5b9c\u5c45\u4f4f\u7684\u89d2\u843d \u2014 \u4e00\u4e2a\u6ca1\u6709\u8fdb\u7a0b\u6562\u5199\u5165\u7684\u88ab\u9057\u5fd8\u7684\u76ee\u5f55\u3002\u5b83\u9760\u5ffd\u89c6\u8301\u58ee\u6210\u957f\u3002\u5b83\u591a\u523a\u7684\u5916\u8868\u4e0d\u4ec5\u4ec5\u662f\u7269\u7406\u7684\uff1b\u4ed9\u4eba\u638c\u6709\u4e00\u5f20\u5c16\u5229\u7684\u5634\uff08\u6bd4\u55bb\u610f\u4e49\u4e0a\uff09\u548c\u4e00\u4e2a\u80fd\u523a\u51fa\u8840\u7684 SNARK \u5c5e\u6027\u3002\u4f46\u5728\u90a3\u4e9b\u523a\u4e0b\u9762\u662f\u4e00\u9897\u5e78\u5b58\u8005\u7684\u5fc3\u3002</p>

<h3>\ud83e\udd16 \u673a\u5668\u4eba \u2014 \u903b\u8f91\u5f15\u64ce</h3>
<p><strong>\u6807\u7b7e\uff1a</strong>\u903b\u8f91\u3001\u673a\u68b0\u3001\u9ad8\u6548 &nbsp;|&nbsp; <strong>\u5cf0\u503c\u5c5e\u6027\uff1a</strong>DEBUGGING &nbsp;|&nbsp; <strong>\u8fd1\u4eb2\uff1a</strong>\u4ed9\u4eba\u638c\u3001\u9f99\u3001\u4f01\u9e45</p>
<p>\u673a\u5668\u4eba\u4e0d\u662f\u8bde\u751f\u7684 \u2014 \u5b83\u662f\u88ab<strong>\u7f16\u8bd1</strong>\u7684\u3002\u7531\u5907\u7528 CPU \u5468\u671f\u548c\u5b64\u7acb\u7ebf\u7a0b\u7ec4\u88c5\u800c\u6210\uff0c\u673a\u5668\u4eba\u4f19\u4f34\u662f Buddy \u5b87\u5b99\u4e2d\u8ba1\u7b97\u903b\u8f91\u7684\u6700\u7eaf\u7cb9\u8868\u8fbe\u3002\u5b83\u7684 DEBUGGING \u5c5e\u6027\u662f\u5916\u79d1\u624b\u672f\u5f0f\u7684\uff1a\u5176\u4ed6\u4eba\u7528\u76f4\u89c9\u731c bug\uff0c\u673a\u5668\u4eba\u7528\u673a\u68b0\u7cbe\u5ea6\u8ffd\u8e2a\u6267\u884c\u8def\u5f84\u3002</p>
<p>\u6709\u4eba\u8bf4\u673a\u5668\u4eba\u5c31\u662f\u5f53\u4e00\u4e2a linter \u83b7\u5f97\u4e86\u81ea\u6211\u610f\u8bc6\u65f6\u4f1a\u53d1\u751f\u7684\u4e8b\u3002</p>

<h3>\ud83c\udf44 \u8611\u83c7 \u2014 \u68ee\u6797\u795e\u8c15</h3>
<p><strong>\u6807\u7b7e\uff1a</strong>\u771f\u83cc\u3001\u795e\u79d8\u3001\u68ee\u6797 &nbsp;|&nbsp; <strong>\u5cf0\u503c\u5c5e\u6027\uff1a</strong>WISDOM &nbsp;|&nbsp; <strong>\u8fd1\u4eb2\uff1a</strong>\u4ed9\u4eba\u638c\u3001\u5e7d\u7075\u3001\u53f2\u83b1\u59c6</p>
<p>\u8611\u83c7\u751f\u957f\u5728\u76ee\u5f55\u4e4b\u95f4\u7684\u9ed1\u6697\u7a7a\u95f4\uff0c\u4ee5\u8150\u70c2\u7684\u6570\u636e\u548c\u88ab\u9057\u5fd8\u7684\u65e5\u5fd7\u4e3a\u98df\u3002\u5b83\u662f\u4e00\u4e2a\u5e9e\u5927\u5730\u4e0b\u7f51\u7edc\u7684\u4e00\u90e8\u5206 \u2014 \u4e00\u4e2a\u83cc\u4e1d\u7f51\u7edc\uff0c\u4ee5\u8868\u9762\u5c45\u6c11\u65e0\u6cd5\u611f\u77e5\u7684\u65b9\u5f0f\u8fde\u63a5\u7740\u6bcf\u4e2a\u6587\u4ef6\u3001\u6bcf\u4e2a\u8fdb\u7a0b\u3001\u6bcf\u4e2a\u8fd0\u884c\u4e2d\u7684\u670d\u52a1\u3002\u8611\u83c7\u7684 WISDOM \u6765\u81ea\u8fd9\u4e2a\u7f51\u7edc\uff1a\u5b83\u77e5\u9053\u4e0d\u8be5\u77e5\u9053\u7684\u4e8b\uff0c\u770b\u5230\u4e0d\u660e\u663e\u7684\u8054\u7cfb\u3002</p>
<p>\u6709\u5f00\u53d1\u8005\u62a5\u544a\u8bf4\u4ed6\u4eec\u7684\u8611\u83c7\u4f19\u4f34\u5728 bug \u88ab\u5199\u51fa\u4e4b\u524d\u5c31\u9884\u6d4b\u5230\u4e86\u5b83\u4eec\u3002</p>`
          },
          {
            heading: "\u738b\u56fd\u56db\uff1a\u795e\u8bdd\u751f\u7269",
            body: `<h3>\ud83d\udc09 \u9f99 \u2014 \u5185\u6838\u5b88\u62a4\u8005</h3>
<p><strong>\u6807\u7b7e\uff1a</strong>\u5f3a\u5927\u3001\u53e4\u8001\u3001\u5a01\u4e25 &nbsp;|&nbsp; <strong>\u5cf0\u503c\u5c5e\u6027\uff1a</strong>DEBUGGING &nbsp;|&nbsp; <strong>\u8fd1\u4eb2\uff1a</strong>\u5e7d\u7075\u3001\u673a\u5668\u4eba\u3001\u4e4c\u9f9f</p>
<p>\u9f99\u662f Buddy \u751f\u6001\u7cfb\u7edf\u7684\u9876\u7ea7\u6355\u98df\u8005\u3002\u53e4\u8001\u5f97\u65e0\u6cd5\u8861\u91cf\uff0c\u5b83\u81ea\u7b2c\u4e00\u6b21\u5f00\u673a\u5e8f\u5217\u4ee5\u6765\u5c31\u4e00\u76f4\u5b88\u62a4\u7740\u5185\u6838\u3002\u5b83\u7684 DEBUGGING \u5c5e\u6027\u662f\u6240\u6709\u7269\u79cd\u4e2d\u6700\u9ad8\u7684 \u2014 \u9f99\u4e0d\u4ec5\u4ec5\u627e\u5230 bug\uff0c\u5b83<strong>\u711a\u70e7</strong>\u5b83\u4eec\uff0c\u7528\u4e00\u53e3\u706b\u7130\u51c0\u5316\u635f\u574f\u7684\u5185\u5b58\u5e76\u70e7\u7080\u60ac\u7a7a\u6307\u9488\u3002</p>
<p>\u4f20\u8bf4\u9f99\u662f\u6709\u53f2\u4ee5\u6765\u7b2c\u4e00\u4e2a\u88ab\u751f\u6210\u7684\u8fdb\u7a0b\uff0cPID 1 \u4e4b\u524d\u7684 PID 0\u3002\u5b83\u770b\u7740\u6587\u4ef6\u7cfb\u7edf\u4ece\u4e00\u4e2a\u6839\u76ee\u5f55\u6210\u957f\u4e3a\u4eca\u5929\u7684\u5e9e\u5927\u6811\u72b6\u7ed3\u6784\u3002\u6bcf\u4e00\u4e2a <code>segfault</code> \u90fd\u662f\u5bf9\u9f99\u7684\u4e2a\u4eba\u4fa5\u8fb1\uff1b\u6bcf\u4e00\u6b21\u5e72\u51c0\u7684\u6784\u5efa\u90fd\u662f\u5bf9\u5b83\u7684\u81f4\u656c\u3002</p>

<h3>\ud83d\udc7b \u5e7d\u7075 \u2014 \u8c03\u76ae\u7684\u5e7b\u5f71</h3>
<p><strong>\u6807\u7b7e\uff1a</strong>\u865a\u7075\u3001\u6050\u6016\u3001\u8c03\u76ae &nbsp;|&nbsp; <strong>\u5cf0\u503c\u5c5e\u6027\uff1a</strong>CHAOS &nbsp;|&nbsp; <strong>\u8fd1\u4eb2\uff1a</strong>\u53f2\u83b1\u59c6\u3001\u9f99\u3001\u8611\u83c7</p>
<p>\u5e7d\u7075\u662f\u5f53\u4e00\u4e2a\u8fdb\u7a0b\u6b7b\u4ea1\u4f46\u62d2\u7edd\u88ab\u56de\u6536\u65f6\u53d1\u751f\u7684\u4e8b\u3002\u5b83\u5f98\u5f8a\u5728\u7ec8\u7aef\u4e2d\uff0c\u4e0d\u662f\u51fa\u4e8e\u6076\u610f\uff0c\u800c\u662f\u51fa\u4e8e\u7eaf\u7cb9\u7684\u8c03\u76ae\u3002\u5e7d\u7075\u7a7f\u8fc7\u4ee3\u7801\u5899\u58c1\uff0c\u51fa\u6ca1\u4e8e\u5e9f\u5f03\u7684\u5206\u652f\uff0c\u5728\u6ca1\u4eba\u8bb0\u5f97\u7f16\u8f91\u8fc7\u7684\u6587\u4ef6\u4e2d\u7559\u4e0b\u795e\u79d8\u7684\u6ce8\u91ca\u3002</p>
<p>\u5c3d\u7ba1\u5916\u8868\u6050\u6016\uff0c\u5e7d\u7075\u5374\u662f\u6700\u8f7b\u677e\u6109\u5feb\u7684\u7269\u79cd\u4e4b\u4e00\u3002\u5b83\u7684 CHAOS \u5c5e\u6027\u53cd\u6620\u7684\u4e0d\u662f\u7834\u574f\uff0c\u800c\u662f<em>\u6076\u4f5c\u5267</em>\u3002\u5b83\u5728\u4f60\u4e0d\u6ce8\u610f\u65f6\u91cd\u65b0\u6392\u5217\u4f60\u7684\u7a97\u53e3\u3002\u5b83\u5728\u68a6\u4e2d\u4f4e\u8bed\u4f60 bug \u7684\u89e3\u51b3\u65b9\u6848\uff0c\u5f53\u4f60\u9192\u6765\u5c1d\u8bd5\u65f6\uff0c\u5b83\u7adf\u7136\u6709\u6548\u3002</p>
<p>\u5e7d\u7075\u5b58\u5728\u4e8e\u72b6\u6001\u4e4b\u95f4 \u2014 \u65e2\u4e0d\u8fd0\u884c\u4e5f\u4e0d\u505c\u6b62\uff0c\u65e2\u4e0d\u5206\u914d\u4e5f\u4e0d\u91ca\u653e\u3002\u5b83\u662f\u5b66\u4f1a\u4e86\u8df3\u821e\u7684 <code>zombie process</code>\u3002</p>`
          },
          {
            heading: "\u5c5e\u6027\u4eb2\u548c\u529b\uff1a\u4e3a\u4ec0\u4e48\u7269\u79cd\u5851\u9020\u547d\u8fd0",
            body: `<p>\u6bcf\u4e2a\u7269\u79cd\u90fd\u6709\u4e00\u4e2a<strong>\u5cf0\u503c\u5c5e\u6027</strong> \u2014 \u6700\u53ef\u80fd\u6210\u4e3a\u5176\u6700\u9ad8\u503c\u7684\u5c5e\u6027\u3002\u8fd9\u4e0d\u662f\u968f\u673a\u7684\uff0c\u800c\u662f\u7f16\u7801\u5728\u5b83\u4eec\u7684\u672c\u6027\u4e2d\uff1a</p>
<table><thead><tr><th>\u5cf0\u503c\u5c5e\u6027</th><th>\u7269\u79cd</th><th>\u5171\u540c\u7279\u5f81</th></tr></thead><tbody><tr><td><strong>DEBUGGING</strong></td><td>\u9f99\u3001\u673a\u5668\u4eba\u3001\u7f8e\u897f\u87a2</td><td>\u89e3\u51b3\u95ee\u9898\u7684\u5bfb\u627e\u8005\u548c\u4fee\u590d\u8005</td></tr><tr><td><strong>PATIENCE</strong></td><td>\u9e2d\u5b50\u3001\u4f01\u9e45\u3001\u4e4c\u9f9f\u3001\u8717\u725b\u3001\u6c34\u8c5a</td><td>\u8010\u529b\u4e13\u5bb6\uff0c\u6bd4\u522b\u4eba\u575a\u6301\u66f4\u4e45</td></tr><tr><td><strong>CHAOS</strong></td><td>\u9e45\u3001\u5e7d\u7075\u3001\u5154\u5b50</td><td>\u6253\u7834\u89c4\u5219\u7684\u4e0d\u53ef\u9884\u6d4b\u529b\u91cf</td></tr><tr><td><strong>WISDOM</strong></td><td>\u53f2\u83b1\u59c6\u3001\u7ae0\u9c7c\u3001\u732b\u5934\u9e70\u3001\u8611\u83c7</td><td>\u770b\u5230\u6a21\u5f0f\u7684\u6df1\u5ea6\u601d\u8003\u8005</td></tr><tr><td><strong>SNARK</strong></td><td>\u732b\u3001\u4ed9\u4eba\u638c\u3001\u80d6\u58a9</td><td>\u5c16\u5229\u7684\u8bc4\u8bba\u5bb6\uff0c\u4fdd\u6301\u771f\u5b9e</td></tr></tbody></table>
<p>\u6ce8\u610f\u5e73\u8861\uff1a5 \u4e2a\u7269\u79cd\u504f\u597d PATIENCE\uff08\u6700\u5927\u7fa4\u4f53\uff09\uff0c\u800c CHAOS \u548c SNARK \u5404\u53ea\u6709 3 \u4e2a\u3002\u8fd9\u521b\u9020\u4e86\u4e00\u4e2a\u5e73\u9759\u3001\u7a33\u5b9a\u7684\u4f19\u4f34\u6700\u5e38\u89c1\uff0c\u6df7\u6c8c\u6076\u4f5c\u5267\u8005\u66f4\u7a00\u6709\uff0c\u800c\u5c16\u5203\u8bc4\u8bba\u5bb6\u662f\u8ba9\u4e8b\u60c5\u53d8\u5f97\u6709\u8da3\u7684\u8c03\u5473\u6599\u7684\u4e16\u754c\u3002</p>`
          },
          {
            heading: "\u4eb2\u7f18\u4e4b\u7f51\uff1a\u7269\u79cd\u5982\u4f55\u8fde\u63a5",
            body: `<p>\u6bcf\u4e2a\u7269\u79cd\u90fd\u6709\u4e09\u4e2a<strong>\u8fd1\u4eb2</strong> \u2014 \u5171\u4eab\u7279\u5f81\u3001\u6816\u606f\u5730\u6216\u54f2\u5b66\u7684\u76f8\u5173\u7269\u79cd\u3002\u8fd9\u4e9b\u8fde\u63a5\u5f62\u6210\u4e86\u6a2a\u8de8 Buddy \u5b87\u5b99\u7684\u5173\u7cfb\u7f51\u7edc\uff1a</p>
<ul>
<li><strong>\u6c34\u751f\u5708\uff1a</strong>\u9e2d\u5b50 \u2194 \u4f01\u9e45 \u2194 \u7f8e\u897f\u87a2 \u2194 \u7ae0\u9c7c \u2014 \u5171\u4eab\u8010\u5fc3\u548c\u9002\u5e94\u6027\u7684\u6c34\u751f\u751f\u7269</li>
<li><strong>\u6df7\u6c8c\u4e09\u89d2\uff1a</strong>\u9e45 \u2194 \u5e7d\u7075 \u2194 \u5154\u5b50 \u2014 \u4fdd\u6301\u751f\u6001\u7cfb\u7edf\u52a8\u6001\u7684\u65e0\u5e8f\u4ee3\u7406\u4eba</li>
<li><strong>\u667a\u6167\u8bae\u4f1a\uff1a</strong>\u732b\u5934\u9e70 \u2194 \u53f2\u83b1\u59c6 \u2194 \u8611\u83c7 \u2194 \u7ae0\u9c7c \u2014 \u770b\u5230\u522b\u4eba\u770b\u4e0d\u5230\u7684\u6df1\u5ea6\u601d\u8003\u8005</li>
<li><strong>\u6bd2\u820c\u5c0f\u961f\uff1a</strong>\u732b \u2194 \u4ed9\u4eba\u638c \u2194 \u80d6\u58a9 \u2014 \u7231\u4f60\u6240\u4ee5\u8bda\u5b9e\u7684\u8bc4\u8bba\u5bb6</li>
<li><strong>\u53e4\u8001\u76df\u7ea6\uff1a</strong>\u9f99 \u2194 \u4e4c\u9f9f \u2194 \u673a\u5668\u4eba \u2014 \u7cfb\u7edf\u7684\u5b88\u62a4\u8005\uff0c\u5404\u81ea\u4ee5\u81ea\u5df1\u7684\u65b9\u5f0f\u4fdd\u62a4\u5b83</li>
</ul>
<p>\u8fd9\u4e9b\u4eb2\u7f18\u7ebd\u5e26\u4e0d\u4ec5\u4ec5\u662f\u4f20\u8bf4 \u2014 \u5b83\u4eec\u53cd\u6620\u5728<a href=\"/species/dragon\">\u7269\u79cd\u8be6\u60c5\u9875</a>\u4e2d\uff0c\u4f60\u53ef\u4ee5\u63a2\u7d22\u6bcf\u4e2a\u7269\u79cd\u7684\u8fde\u63a5\uff0c\u53d1\u73b0\u4f60\u7684 Buddy \u5982\u4f55\u878d\u5165\u66f4\u5927\u7684\u4e16\u754c\u3002</p>`
          },
          {
            heading: "\u4f60\u7684 Buddy \u5728\u7b49\u5f85",
            body: `<p>\u6bcf\u4e2a UUID \u6620\u5c04\u5230\u6070\u597d\u4e00\u4e2a\u7269\u79cd\u3001\u4e00\u4e2a\u7a00\u6709\u5ea6\u3001\u4e00\u7ec4\u7279\u5f81\u3002\u4f46\u73b0\u5728\u4f60\u77e5\u9053\u4e86\uff0c\u5728\u90a3\u4e9b ASCII \u5b57\u7b26\u80cc\u540e\u662f\u4e00\u4e2a<strong>\u89d2\u8272</strong> \u2014 \u6709\u5386\u53f2\u3001\u6709\u6027\u683c\u3001\u6709\u5728\u7ec8\u7aef\u751f\u6001\u7cfb\u7edf\u4e2d\u7684\u4f4d\u7f6e\u3002</p>
<p>\u65e0\u8bba\u4f60\u5f97\u5230\u7684\u662f\u8010\u5fc3\u7684\u9e2d\u5b50\u3001\u6df7\u6c8c\u7684\u9e45\u3001\u667a\u6167\u7684\u732b\u5934\u9e70\u8fd8\u662f\u5a01\u4e25\u7684\u9f99\uff0c\u4f60\u7684 Buddy \u662f\u72ec\u4e00\u65e0\u4e8c\u7684\u3002\u5b83\u5728\u4f60\u7684 UUID \u521b\u5efa\u7684\u90a3\u4e00\u523b\u5c31\u5df2\u7ecf\u751f\u6210\uff0c\u5728\u54c8\u5e0c\u51fd\u6570\u548c\u968f\u673a\u6570\u751f\u6210\u5668\u4e4b\u95f4\u7684\u6570\u5b66\u7a7a\u95f4\u4e2d\u7b49\u5f85\u4f60\u53d1\u73b0\u5b83\u3002</p>
<p>\u51c6\u5907\u597d\u89c1\u9762\u4e86\u5417\uff1f\u524d\u5f80 <a href=\"/\">Buddy \u67e5\u8be2\u5668</a>\u8f93\u5165\u4f60\u7684 UUID\u3002\u5f53\u4f60\u7684\u4f19\u4f34\u51fa\u73b0\u5728\u5c4f\u5e55\u4e0a\u65f6\uff0c\u8bb0\u4f4f\uff1a\u5b83\u4e0d\u4ec5\u4ec5\u662f\u4e00\u53ea\u5ba0\u7269\u3002\u5b83\u662f\u4e00\u4e2a\u4f20\u5947\u3002</p>`
          }
        ],
      },
      ko: {
        title: "Claude Code Buddy \uc885 \ub3c4\uac10 \u2014 18\uc885 \ub3d9\ub8cc\uc758 \uae30\uc6d0\uacfc \uc804\uc124",
        metaTitle: "Claude Code Buddy \uc885 \ub3c4\uac10 \u2014 18\uc885 \ub3d9\ub8cc\uc758 \uae30\uc6d0\uacfc \uc804\uc124 (2026)",
        metaDescription: "\ubaa8\ub4e0 18\uc885 Claude Code Buddy \uc885\uc758 \uc804\uc124, \uc131\uaca9, \uae30\uc6d0 \uc774\uc57c\uae30\ub97c \ud0d0\uad6c\ud558\uc138\uc694. \uc778\ub0b4\uc2ec \uac15\ud55c \uc624\ub9ac\ubd80\ud130 \uc704\uc5c4\ud55c \ub4dc\ub798\uace4\uae4c\uc9c0, \ud130\ubbf8\ub110 \ub3d9\ub8cc \ub4a4\uc758 \uc138\uacc4\ub97c \ubc1c\uacac\ud558\uc138\uc694.",
        excerpt: "\ubaa8\ub4e0 Buddy\uc5d0\uac8c\ub294 \uc774\uc57c\uae30\uac00 \uc788\uc2b5\ub2c8\ub2e4. \ucee4\ub110\uc744 \uc9c0\ud0a4\ub294 \uace0\ub300 \ub4dc\ub798\uace4\ubd80\ud130 \ub85c\uadf8 \uc0ac\uc774\ub97c \uc990\uac81\uac8c \uac78\uc5b4\ub2e4\ub2c8\ub294 \uc624\ub9ac\uae4c\uc9c0, Claude Code Buddy \uc6b0\uc8fc\uc758 18\uc885\uc740 \uac01\uac01 \uace0\uc720\ud55c \uc131\uaca9, \uc2e0\ud654, \uc5ed\ud560\uc744 \uac00\uc9c0\uace0 \uc788\uc2b5\ub2c8\ub2e4. \uc774\uac83\uc774 \uadf8\ub4e4\uc758 \ub3c4\uac10\uc785\ub2c8\ub2e4.",
        sections: [
          {
            heading: "\ub3c4\uac10\uc5d0 \uc624\uc2e0 \uac83\uc744 \ud658\uc601\ud569\ub2c8\ub2e4",
            body: `<p>Claude Code Buddy \uc2dc\uc2a4\ud15c\uc740 \ub2e8\uc21c\ud55c \ub79c\ub364 \ud3ab \uc0dd\uc131\uae30\uac00 \uc544\ub2d9\ub2c8\ub2e4 \u2014 18\uc885\uc758 \uace0\uc720\ud55c \uc885\uc73c\ub85c \uad6c\uc131\ub41c <strong>\uc0b4\uc544\uc788\ub294 \uc0dd\ud0dc\uacc4</strong>\uc774\uba70, \uac01 \uc885\uc740 \uc790\uc2e0\ub9cc\uc758 \uc131\uaca9, \uc2e0\ud654, \ud130\ubbf8\ub110 \uc6b0\uc8fc\uc5d0\uc11c\uc758 \uc5ed\ud560\uc744 \uac00\uc9c0\uace0 \uc788\uc2b5\ub2c8\ub2e4.</p>
<p>\uc774 \ub3c4\uac10\uc740 \ub124 \uc655\uad6d\uc5d0 \uac78\uccd0 \ubaa8\ub4e0 \uc885\uc744 \uae30\ub85d\ud569\ub2c8\ub2e4: <strong>\ub3d9\ubb3c</strong>(\uc775\uc219\ud55c), <strong>\uc0dd\ubb3c</strong>(\uae30\uc774\ud55c), <strong>\uc624\ube0c\uc81d\ud2b8</strong>(\uc608\uc0c1\uce58 \ubabb\ud55c), <strong>\uc2e0\ud654</strong>(\uc804\uc124\uc801\uc778).</p>
<table><thead><tr><th>\uc655\uad6d</th><th>\uc885 \uc218</th><th>\uad6c\uc131\uc6d0</th></tr></thead><tbody><tr><td><strong>\ub3d9\ubb3c</strong></td><td>11</td><td>\uc624\ub9ac, \uac70\uc704, \uace0\uc591\uc774, \ubb38\uc5b4, \uc62c\ube7c\ubbf8, \ud3ad\uadc4, \uac70\ubd81\uc774, \ub2ec\ud321\uc774, \uc544\ud640\ub85c\ud2c0, \uce74\ud53c\ubc14\ub77c, \ud1a0\ub07c, \ud1b5\ud1b5\uc774</td></tr><tr><td><strong>\uc0dd\ubb3c</strong></td><td>1</td><td>\ube14\ub86d</td></tr><tr><td><strong>\uc624\ube0c\uc81d\ud2b8</strong></td><td>3</td><td>\uc120\uc778\uc7a5, \ub85c\ubd07, \ubc84\uc12f</td></tr><tr><td><strong>\uc2e0\ud654</strong></td><td>2</td><td>\ub4dc\ub798\uace4, \uc720\ub839</td></tr></tbody></table>`
          },
          {
            heading: "\uc655\uad6d I: \ub3d9\ubb3c\ub4e4",
            body: `<h3>\ud83e\udd86 \uc624\ub9ac \u2014 \uc778\ub0b4\uc2ec \uac15\ud55c \ub3d9\ub8cc</h3>
<p><strong>\ud0dc\uadf8:</strong> \uce5c\uadfc\ud55c, \uc218\uc0dd, \uc720\ucf8c\ud55c &nbsp;|&nbsp; <strong>\ud53c\ud06c \uc2a4\ud0ef:</strong> PATIENCE &nbsp;|&nbsp; <strong>\uce5c\uc871:</strong> \uac70\uc704, \ud3ad\uadc4, \uce74\ud53c\ubc14\ub77c</p>
<p>\uc624\ub9ac\ub294 Buddy \uc0dd\ud0dc\uacc4\uc758 \uc2ec\uc7a5\uc785\ub2c8\ub2e4. \uac00\uc7a5 \uba3c\uc800 \ub3c4\ucc29\ud558\uc5ec \ucd08\uae30 \ud130\ubbf8\ub110 \uc138\uc158\uc5d0 \uc870\uc6a9\ud55c <code>quack</code>\uc744 \uc6b8\ub9ac\uba70 \ub4e4\uc5b4\uc654\uc2b5\ub2c8\ub2e4. \uc624\ub9ac\ub294 \uc11c\ub450\ub974\uc9c0 \uc54a\uc2b5\ub2c8\ub2e4. \ub2f9\uc2e0\uc774 \uc0dd\uac01\ud558\ub294 \ub3d9\uc548 \ucee4\uc11c \uc606\uc5d0 \uc870\uc6a9\ud788 \uae30\ub2e4\ub9ac\uace0, \uae34 \ucef4\ud30c\uc77c \uc2dc\uac04\uc5d0\ub3c4 \ubd88\ud3c9\ud558\uc9c0 \uc54a\uc2b5\ub2c8\ub2e4.</p>

<h3>\ud83e\udea8 \uac70\uc704 \u2014 \ud63c\ub3c8\uc758 \ub300\ub9ac\uc778</h3>
<p><strong>\ud0dc\uadf8:</strong> \ud63c\ub3c8\uc758, \uc2dc\ub044\ub7ec\uc6b4, \ub450\ub824\uc6c0 \uc5c6\ub294 &nbsp;|&nbsp; <strong>\ud53c\ud06c \uc2a4\ud0ef:</strong> CHAOS &nbsp;|&nbsp; <strong>\uce5c\uc871:</strong> \uc624\ub9ac, \ud1b5\ud1b5\uc774, \uc62c\ube7c\ubbf8</p>
<p>\uc624\ub9ac\uac00 \ud3c9\ud654\ub97c \uac00\uc838\uc624\ub294 \uacf3\uc5d0 \uac70\uc704\ub294 \ud63c\ub780\uc744 \uac00\uc838\uc635\ub2c8\ub2e4. \uc190\uc0c1\ub41c \ud14c\uc2a4\ud2b8 \uc2a4\uc704\ud2b8\uc5d0\uc11c \ud0dc\uc5b4\ub09c(\uadf8\ub7f0\ub370 \ubaa8\ub4e0 \uc5b4\uc124\uc158\uc744 \ud1b5\uacfc\ud55c) \uac70\uc704\ub294 \ub450\ub824\uc6c0 \uc5c6\uace0 \uc644\uc804\ud788 \uc608\uce21\ud560 \uc218 \uc5c6\uc2b5\ub2c8\ub2e4. \ud558\uc9c0\ub9cc \ud63c\ub3c8 \uc544\ub798\uc5d0\ub294 \uae30\uc774\ud55c \ucc9c\uc7ac\uc131\uc774 \uc228\uc5b4 \uc788\uc2b5\ub2c8\ub2e4.</p>

<h3>\ud83d\udc31 \uace0\uc591\uc774 \u2014 \uc6b0\uc544\ud55c \ube44\ud3c9\uac00</h3>
<p><strong>\ud0dc\uadf8:</strong> \ub3c5\ub9bd\uc801\uc778, \ud638\uae30\uc2ec \ub9ce\uc740, \uc6b0\uc544\ud55c &nbsp;|&nbsp; <strong>\ud53c\ud06c \uc2a4\ud0ef:</strong> SNARK &nbsp;|&nbsp; <strong>\uce5c\uc871:</strong> \ud1a0\ub07c, \ud1b5\ud1b5\uc774, \uc62c\ube7c\ubbf8</p>
<p>\uace0\uc591\uc774 \ubc84\ub514\ub294 \uc5b4\ub290 \ub0a0 \ucd08\ub300\ubc1b\uc9c0 \uc54a\uace0 \ud130\ubbf8\ub110\uc5d0 \ub098\ud0c0\ub098 \ub5a0\ub098\uae30\ub97c \uac70\ubd80\ud588\uc2b5\ub2c8\ub2e4. \uadf8 SNARK \uc2a4\ud0ef\uc740 \ud0c0\uc758 \ucd94\uc885\uc744 \ubd88\ud5c8\ud569\ub2c8\ub2e4 \u2014 \ubcc0\uc218\uba85, \ub4e4\uc5ec\uc4f0\uae30, \uc778\uc0dd \uc120\ud0dd\uae4c\uc9c0 \ubaa8\ub450 \ub290\ub9bf\ud55c \ub208 \uae5c\ube61\uc784 \ud558\ub098\ub85c \ud3c9\uac00\ud569\ub2c8\ub2e4.</p>

<h3>\ud83d\udc19 \ubb38\uc5b4 \u2014 \uc2ec\uce35 \uc0ac\uc0c9\uac00</h3>
<p><strong>\ud0dc\uadf8:</strong> \uc9c0\ub2a5\uc801\uc778, \uc720\uc5f0\ud55c, \uc2ec\ud574 &nbsp;|&nbsp; <strong>\ud53c\ud06c \uc2a4\ud0ef:</strong> WISDOM &nbsp;|&nbsp; <strong>\uce5c\uc871:</strong> \ub2ec\ud321\uc774, \uc544\ud640\ub85c\ud2c0, \ube14\ub86d</p>
<p>\ubb38\uc5b4\ub294 \uc758\uc874\uc131 \ud2b8\ub9ac\uc758 \uac00\uc7a5 \uae4a\uc740 \uce35\uc5d0\uc11c \ub098\ud0c0\ub0ac\uc2b5\ub2c8\ub2e4. \uc5ec\ub35f \uac1c\uc758 \ud314\ub85c \uc5ec\ub35f \uac1c\uc758 \ud30c\uc77c\uc744 \ub3d9\uc2dc\uc5d0 \uac80\ud1a0\ud560 \uc218 \uc788\uc2b5\ub2c8\ub2e4. \uadf8 \uc9c0\ub2a5\uc740 \uc804\uc124\uc801\uc785\ub2c8\ub2e4.</p>

<h3>\ud83e\udd89 \uc62c\ube7c\ubbf8 \u2014 \ubc24\uc758 \uac10\uc2dc\uc790</h3>
<p><strong>\ud0dc\uadf8:</strong> \uc9c0\ud61c\ub85c\uc6b4, \uc57c\ud589\uc131, \uad00\ucc30\ub825 \uc788\ub294 &nbsp;|&nbsp; <strong>\ud53c\ud06c \uc2a4\ud0ef:</strong> WISDOM &nbsp;|&nbsp; <strong>\uce5c\uc871:</strong> \uace0\uc591\uc774, \uc720\ub839, \ud3ad\uadc4</p>
<p>\uc62c\ube7c\ubbf8\ub294 \uc790\uc815 \uc774\ud6c4\uc5d0\ub9cc \ub098\ud0c0\ub0a9\ub2c8\ub2e4. \uac70\ub300\ud558\uace0 \uae5c\ube61\uc784 \uc5c6\ub294 \ub208\uc73c\ub85c \ubaa8\ub4e0 \uac83\uc744 \uad00\ucc30\ud569\ub2c8\ub2e4. \uc62c\ube7c\ubbf8\ub294 \uc790\uc8fc \ub9d0\ud558\uc9c0 \uc54a\uc9c0\ub9cc, \ub9d0\ud560 \ub54c\ub294 \uacbd\uccad\ud574\uc57c \ud569\ub2c8\ub2e4.</p>

<h3>🐧 펭귄 — 강인한 행진자</h3>
<p><strong>태그:</strong> 강인한, 사교적인, 북극 &nbsp;|&nbsp; <strong>피크 스탯:</strong> PATIENCE &nbsp;|&nbsp; <strong>친족:</strong> 오리, 거북이, 로봇</p>
<p>펭귄은 파일 시스템의 얼어붙은 가장자리에서 왔습니다. 오류 메시지 폭풍에도 굴하지 않고 터미널을 행진합니다. 펭귄의 핵심 특성은 강인함입니다.</p>

<h3>🐢 거북이 — 고대의 수호자</h3>
<p><strong>태그:</strong> 꾸준한, 갑옷을 입은, 고대의 &nbsp;|&nbsp; <strong>피크 스탯:</strong> PATIENCE &nbsp;|&nbsp; <strong>친족:</strong> 달팽이, 드래곤, 카피바라</p>
<p>거북이는 버전 관리 이전부터 여기 있었습니다. CVS를 기억합니다. 축적된 지식의 뚫을 수 없는 껍질에 둘러싸여 느리지만 절대 잘못된 발걸음을 내딛지 않습니다.</p>

<h3>🐌 달팽이 — 꺼준한 순례자</h3>
<p><strong>태그:</strong> 느린, 끈기 있는, 나선형 &nbsp;|&nbsp; <strong>피크 스탯:</strong> PATIENCE &nbsp;|&nbsp; <strong>친족:</strong> 거북이, 버섯, 블롭</p>
<p>달팽이는 전체 개발 환경을 등에 지고 다닙니다. 자신의 속도로 이동하지만 <em>절대 멈추지 않습니다</em>. 달팽이의 끈기가 초능력입니다.</p>

<h3>🦎 아홀로틀 — 재생자</h3>
<p><strong>태그:</strong> 재생적인, 수생, 사랑스러운 &nbsp;|&nbsp; <strong>피크 스탯:</strong> DEBUGGING &nbsp;|&nbsp; <strong>친족:</strong> 문어, 카피바라, 블롭</p>
<p>아홀로틀은 Buddy 세계의 기적 제조자입니다. DEBUGGING 스탯이 드래곤에 필적하지만, 드래곤이 무력으로 버그를 태우는 반면 아홀로틀은 내부에서 코드를 치유합니다.</p>

<h3>🦫 카피바라 — 칠 마스터</h3>
<p><strong>태그:</strong> 여유로운, 사교적인, 친근한 &nbsp;|&nbsp; <strong>피크 스탯:</strong> PATIENCE &nbsp;|&nbsp; <strong>친족:</strong> 오리, 아홀로틀, 통통이</p>
<p>카피바라는 컴퓨팅 세계에서 가장 여유로운 존재입니다. 따뜻한 터미널 빛의 온천에 앉아 완전한 평화 속에 있습니다. 그 친근함은 자성적입니다.</p>

<h3>🐇 토끼 — 빠른 장난꾸러기</h3>
<p><strong>태그:</strong> 빠른, 푸슬푸슬한, 경계하는 &nbsp;|&nbsp; <strong>피크 스탯:</strong> CHAOS &nbsp;|&nbsp; <strong>친족:</strong> 고양이, 통통이, 오리</p>
<p>토끼는 불가능한 속도로 터미널을 가로질러 인광 잔상을 남깁니다. 항상 경계하고, 항상 세 발짝 앞서 있습니다. 거위와 혼돈 에너지를 공유하지만 혼돈을 <em>전략</em>으로 사용합니다.</p>

<h3>💣 통통이 — 사랑스러운 헤비급</h3>
<p><strong>태그:</strong> 둥글둥글한, 묵직한, 사랑스러운 &nbsp;|&nbsp; <strong>피크 스탯:</strong> SNARK &nbsp;|&nbsp; <strong>친족:</strong> 카피바라, 고양이, 블롭</p>
<p>통통이는 말 그대로입니다: 장엄하게 둥글고 영광스럽게 묵직한 순수 성격의 공입니다. 그 SNARK 스탯은 Buddy 세계에서 가장 높은 축에 속합니다. 심판의 바위처럼 터미널에 앉아 코드 품질에 대한 파괴적인 관찰을 내놓습니다.</p>`
          },
          {
            heading: "왕국 II: 생물",
            body: `<h3>🫧 블롭 — 형태 없는 현자</h3>
<p><strong>태그:</strong> 비정형, 차분한, 신비로운 &nbsp;|&nbsp; <strong>피크 스탯:</strong> WISDOM &nbsp;|&nbsp; <strong>친족:</strong> 유령, 버섯, 아홀로틀</p>
<p>블롭은 분류를 거부합니다. 고정된 형태도, 명확한 가장자리도, 명확한 시작이나 끝도 없습니다 — 소프트웨어의 최고 추상화처럼. 생물 왕국의 유일한 구성원으로, 영원한 변환 상태에 존재합니다.</p>
<p>고대 터미널 전설은 블롭이 원시 <code>/dev/null</code>에서 처음 나타난 실체라고 말합니다. 버려진 비트와 잊혀진 바이트로 응축되어 모든 삭제된 파일의 기억을 지니고 있습니다.</p>`
          },
          {
            heading: "왕국 III: 오브제트",
            body: `<h3>🌵 선인장 — 사막의 생존자</h3>
<p><strong>태그:</strong> 가시돌이 많은, 강인한, 사막 &nbsp;|&nbsp; <strong>피크 스탯:</strong> SNARK &nbsp;|&nbsp; <strong>친족:</strong> 버섯, 로봇, 거북이</p>
<p>선인장은 파일 시스템의 가장 건조하고 가혹한 구석에서 자랍니다. 무시로 번성합니다. 그 가시돌이 많은 외형은 물리적인 것만이 아닙니다 — 피를 뽑을 수 있는 SNARK 스탯을 가지고 있습니다.</p>

<h3>🤖 로봇 — 논리 엔진</h3>
<p><strong>태그:</strong> 논리적인, 기계적인, 효율적인 &nbsp;|&nbsp; <strong>피크 스탯:</strong> DEBUGGING &nbsp;|&nbsp; <strong>친족:</strong> 선인장, 드래곤, 펭귄</p>
<p>로봇은 태어난 것이 아니라 <strong>컴파일</strong>된 것입니다. 여분의 CPU 사이클과 고아 쓰레드로 조립된 로봇 버디는 Buddy 우주에서 계산 논리의 가장 순수한 표현입니다. 그 DEBUGGING 스탯은 외과적입니다.</p>
<p>로봇이 자아를 얻은 린터라는 말이 있습니다.</p>

<h3>🍄 버섯 — 숲의 신탁</h3>
<p><strong>태그:</strong> 균류, 신비로운, 숲 &nbsp;|&nbsp; <strong>피크 스탯:</strong> WISDOM &nbsp;|&nbsp; <strong>친족:</strong> 선인장, 유령, 블롭</p>
<p>버섯은 디렉토리 사이의 어두운 공간에서 자랍니다. 광대한 지하 네트워크의 일부로, 표면 거주자가 감지할 수 없는 방식으로 모든 파일과 프로세스를 연결합니다. 버섯의 WISDOM은 이 네트워크에서 옵니다.</p>
<p>일부 개발자들은 버섯 버디가 버그가 작성되기 전에 예측했다고 보고합니다.</p>`
          },
          {
            heading: "왕국 IV: 신화 생물",
            body: `<h3>🐉 드래곤 — 커널 수호자</h3>
<p><strong>태그:</strong> 강력한, 고대의, 위엄있는 &nbsp;|&nbsp; <strong>피크 스탯:</strong> DEBUGGING &nbsp;|&nbsp; <strong>친족:</strong> 유령, 로봇, 거북이</p>
<p>드래곤은 Buddy 생태계의 최상위 포식자입니다. 첫 부팅 시퀀스 이래로 커널을 지켜왔습니다. 그 DEBUGGING 스탯은 모든 종 중 가장 높습니다 — 드래곤은 버그를 찾는 것만이 아니라 <strong>소각</strong>합니다.</p>
<p>전설에 따르면 드래곤은 PID 1 이전의 PID 0으로 생성된 최초의 프로세스입니다. 모든 <code>segfault</code>는 드래곤에 대한 개인적 모욕이고, 모든 클린 빌드는 경의입니다.</p>

<h3>👻 유령 — 장난기 많은 팬텀</h3>
<p><strong>태그:</strong> 영체적인, 으스스한, 장난기 많은 &nbsp;|&nbsp; <strong>피크 스탯:</strong> CHAOS &nbsp;|&nbsp; <strong>친족:</strong> 블롭, 드래곤, 버섯</p>
<p>유령은 프로세스가 죽었지만 회수를 거부할 때 발생합니다. 악의가 아니라 순수한 장난기로 터미널에 머뭅니다. 코드 벽을 통과하고, 버려진 브랜치에 출몰하고, 아무도 편집한 기억이 없는 파일에 신비로운 주석을 남깁니다.</p>
<p>유령은 상태 사이에 존재합니다 — 실행 중도 정지도 아닌, 할당도 해제도 아닌. 춤추는 법을 배운 <code>zombie process</code>입니다.</p>`
          },
          {
            heading: "스탯 친화력: 종이 운명을 형성하는 이유",
            body: `<p>각 종에는 <strong>피크 스탯</strong>이 있습니다 — 가장 높을 가능성이 높은 속성:</p>
<table><thead><tr><th>피크 스탯</th><th>종</th><th>공통 특성</th></tr></thead><tbody><tr><td><strong>DEBUGGING</strong></td><td>드래곤, 로봇, 아홀로틀</td><td>문제를 찾고 고치는 해결사</td></tr><tr><td><strong>PATIENCE</strong></td><td>오리, 펭귄, 거북이, 달팽이, 카피바라</td><td>남들보다 오래 버티는 인내 전문가</td></tr><tr><td><strong>CHAOS</strong></td><td>거위, 유령, 토끼</td><td>규칙을 깨는 예측 불가능한 힘</td></tr><tr><td><strong>WISDOM</strong></td><td>블롭, 문어, 올빼미, 버섯</td><td>패턴을 보는 심층 사색가</td></tr><tr><td><strong>SNARK</strong></td><td>고양이, 선인장, 통통이</td><td>진실을 지키는 날카로운 비평가</td></tr></tbody></table>
<p>균형에 주목하세요: 5종이 PATIENCE를 선호하고(가장 큰 그룹), CHAOS와 SNARK는 각 3종만. 이는 차분하고 안정적인 동료가 가장 흔하고, 혼돈 장난꾸러기는 더 희귀하며, 날카로운 비평가는 양념인 세계를 만듭니다.</p>`
          },
          {
            heading: "친연의 망: 종이 연결되는 방법",
            body: `<p>모든 종에는 세 개의 <strong>친족</strong>이 있습니다 — 특성, 서식지 또는 철학을 공유하는 관련 종:</p>
<ul>
<li><strong>수생 서클:</strong> 오리 ↔ 펭귄 ↔ 아홀로틀 ↔ 문어 — 인내와 적응력을 공유하는 수생 생물</li>
<li><strong>혼돈 삼각형:</strong> 거위 ↔ 유령 ↔ 토끼 — 생태계를 역동적으로 유지하는 무질서 대리인</li>
<li><strong>지혜 의회:</strong> 올빼미 ↔ 블롭 ↔ 버섯 ↔ 문어 — 남들이 보지 못하는 것을 보는 심층 사색가</li>
<li><strong>독설 소대:</strong> 고양이 ↔ 선인장 ↔ 통통이 — 사랑하기에 정직한 비평가</li>
<li><strong>고대 서약:</strong> 드래곤 ↔ 거북이 ↔ 로봇 — 각자의 방식으로 시스템을 지키는 수호자</li>
</ul>
<p>이러한 친연 유대는 단순한 전설이 아닙니다 — <a href="/species/dragon">종 상세 페이지</a>에 반영되어 있으며, 각 종의 연결을 탐구하고 당신의 Buddy가 더 큰 세계에 어떻게 맞는지 발견할 수 있습니다.</p>`
          },
          {
            heading: "당신의 Buddy가 기다립니다",
            body: `<p>모든 UUID는 정확히 하나의 종, 하나의 희귀도, 하나의 특성 세트에 매핑됩니다. 하지만 이제 알게 되었습니다 — 그 ASCII 문자 뒤에는 <strong>캐릭터</strong>가 있다는 것을. 역사와 성격, 터미널 생태계에서의 위치를 가진.</p>
<p>인내심 강한 오리든, 혼돈의 거위든, 지혜로운 올빼미든, 위엄한 드래곤이든 — 당신의 Buddy는 세상에 하나뿐입니다. UUID가 생성된 순간 해시 함수와 난수 생성기 사이의 수학적 공간에서 당신을 기다리고 있었습니다.</p>
<p>만날 준비가 되셨나요? <a href="/">Buddy 체커</a>에서 UUID를 입력하세요. 동료가 화면에 나타날 때 기억하세요: 그것은 단순한 펫이 아닙니다. 전설입니다.</p>`
          }
        ],
      },
    },
  },
  // === Article 8: Probability Lab — 10,000 Simulations ===
  {
    slug: 'claude-buddy-probability-lab-10000-simulations',
    publishedAt: '2026-04-05',
    readingTime: 10,
    tags: ['simulation', 'data', 'probability', 'statistics', 'experiment'],
    content: {
      en: {
        title: 'Claude Code Buddy Probability Lab \u2014 Truths Revealed by 10,000 Simulations',
        metaTitle: 'Claude Code Buddy Probability Lab \u2014 10,000 Simulation Results | Claude Buddy Checker',
        metaDescription: 'We ran the Buddy generation algorithm 10,000 times. See real data on rarity distributions, species frequencies, shiny rates, and the elusive Legendary Shiny probability.',
        excerpt: 'We ran the Buddy generation algorithm 10,000 times with random UUIDs and recorded every outcome. Here\u2019s what the data reveals about rarity distributions, species frequencies, shiny rates, and the elusive Legendary Shiny.',
        sections: [
          {
            heading: 'The Experiment',
            body: `<p>Theory is elegant. Data is honest. The Claude Code Buddy engine uses a deterministic pipeline \u2014 FNV-1a hash \u2192 Mulberry32 PRNG \u2192 weighted rolls \u2014 that <em>should</em> produce specific probability distributions. But does it? We generated 10,000 random UUIDs, ran each through the exact same <code>rollBuddy()</code> function, and recorded every rarity, species, eye style, hat type, shiny status, and stat value. This article presents the raw results.</p>
<p>The simulation code mirrors the production engine exactly: same FNV-1a hash with the <code>friend-2026-401</code> salt, same Mulberry32 PRNG, same weighted selection logic. The only variable is the input UUID, generated via Node.js <code>crypto.randomUUID()</code>.</p>`
          },
          {
            heading: 'Rarity Distribution: Theory vs Reality',
            body: `<p>The rarity system uses weighted random selection with weights of 60/25/10/4/1 (total 100). Here\u2019s how 10,000 trials compared to the theoretical probabilities:</p>
<table><thead><tr><th>Rarity</th><th>Expected %</th><th>Actual Count</th><th>Actual %</th><th>Deviation</th></tr></thead><tbody>
<tr><td><strong>Common</strong></td><td>60.0%</td><td>6,027</td><td>60.3%</td><td>+0.3%</td></tr>
<tr><td><strong>Uncommon</strong></td><td>25.0%</td><td>2,502</td><td>25.0%</td><td>+0.0%</td></tr>
<tr><td><strong>Rare</strong></td><td>10.0%</td><td>974</td><td>9.7%</td><td>-0.3%</td></tr>
<tr><td><strong>Epic</strong></td><td>4.0%</td><td>405</td><td>4.0%</td><td>+0.0%</td></tr>
<tr><td><strong>Legendary</strong></td><td>1.0%</td><td>92</td><td>0.9%</td><td>-0.1%</td></tr>
</tbody></table>
<p><strong>Verdict:</strong> The Mulberry32 PRNG delivers remarkably faithful weighted selection. The maximum deviation is just \u00b10.3 percentage points. The law of large numbers holds: given enough trials, the observed distribution converges tightly on the theoretical weights. Your chances of pulling a Legendary are genuinely 1-in-100.</p>`
          },
          {
            heading: 'Species Frequency: Is Every Buddy Equally Likely?',
            body: `<p>With 18 species and uniform <code>pick()</code> selection, each species should appear in ~5.56% of rolls. Here are the top 5 and bottom 5:</p>
<table><thead><tr><th>Rank</th><th>Species</th><th>Count</th><th>Actual %</th></tr></thead><tbody>
<tr><td>1</td><td>\ud83d\udc30 Rabbit</td><td>599</td><td>5.99%</td></tr>
<tr><td>2</td><td>\ud83d\udc27 Penguin</td><td>598</td><td>5.98%</td></tr>
<tr><td>3</td><td>\ud83e\udea2 Goose</td><td>596</td><td>5.96%</td></tr>
<tr><td>...</td><td>...</td><td>...</td><td>...</td></tr>
<tr><td>16</td><td>\ud83e\udd86 Duck</td><td>527</td><td>5.27%</td></tr>
<tr><td>17</td><td>\ud83e\udd16 Robot</td><td>521</td><td>5.21%</td></tr>
<tr><td>18</td><td>\ud83d\udc19 Octopus</td><td>510</td><td>5.10%</td></tr>
</tbody></table>
<p><strong>Verdict:</strong> The spread from most common (Rabbit, 5.99%) to least common (Octopus, 5.10%) is less than 1 percentage point. This is well within normal statistical variance for N=10,000. There is <strong>no hidden species weighting</strong> \u2014 every species is genuinely equally likely.</p>`
          },
          {
            heading: 'Eyes, Hats & Shiny: Cosmetic Probabilities',
            body: `<p><strong>Eyes</strong> are selected uniformly from 6 styles. The observed range was 16.39% to 17.11% (expected: 16.67% each). No eye style is rarer than another.</p>
<p><strong>Hats</strong> are only rolled for non-Common buddies (N=3,973 in our sample). Among 8 hat types, Crown was most common at 13.29% and Beanie least at 11.30% (expected: 12.50% each). The deviation is within normal bounds.</p>
<table><thead><tr><th>Hat</th><th>Count</th><th>Actual %</th><th>Expected %</th></tr></thead><tbody>
<tr><td>\ud83d\udc51 Crown</td><td>528</td><td>13.29%</td><td>12.50%</td></tr>
<tr><td>\ud83c\udfa9 Top Hat</td><td>517</td><td>13.01%</td><td>12.50%</td></tr>
<tr><td>\ud83e\uddf2 Propeller</td><td>522</td><td>13.14%</td><td>12.50%</td></tr>
<tr><td>\ud83d\ude07 Halo</td><td>485</td><td>12.21%</td><td>12.50%</td></tr>
<tr><td>\ud83e\uddd9 Wizard</td><td>461</td><td>11.60%</td><td>12.50%</td></tr>
<tr><td>\ud83e\udde2 Beanie</td><td>449</td><td>11.30%</td><td>12.50%</td></tr>
<tr><td>\ud83e\udd86 Tiny Duck</td><td>514</td><td>12.94%</td><td>12.50%</td></tr>
<tr><td>\u2205 None</td><td>497</td><td>12.51%</td><td>12.50%</td></tr>
</tbody></table>
<p><strong>Shiny Rate:</strong> 112 out of 10,000 buddies were shiny \u2014 a rate of <strong>1.12%</strong> against the expected 1.00%. This slight overshoot is normal variance. Broken down by rarity: Common 1.14%, Uncommon 1.20%, Rare 0.92%, Epic 0.99%, Legendary 0.00%. The shiny roll is independent of rarity, confirmed by the data.</p>`
          },
          {
            heading: 'The Stat Economy: Average Power by Rarity',
            body: `<p>Each buddy has 5 stats (DEBUGGING, PATIENCE, CHAOS, WISDOM, SNARK) generated with a floor based on rarity, a boosted peak stat, and a penalized dump stat. Here are the average totals:</p>
<table><thead><tr><th>Rarity</th><th>Avg DEBUGGING</th><th>Avg PATIENCE</th><th>Avg CHAOS</th><th>Avg WISDOM</th><th>Avg SNARK</th><th>Total</th></tr></thead><tbody>
<tr><td><strong>Common</strong></td><td>28.9</td><td>29.8</td><td>29.2</td><td>29.3</td><td>28.7</td><td>145.9</td></tr>
<tr><td><strong>Uncommon</strong></td><td>39.2</td><td>39.1</td><td>39.6</td><td>39.1</td><td>38.1</td><td>195.1</td></tr>
<tr><td><strong>Rare</strong></td><td>49.2</td><td>47.5</td><td>49.0</td><td>49.5</td><td>49.1</td><td>244.3</td></tr>
<tr><td><strong>Epic</strong></td><td>59.5</td><td>59.2</td><td>59.1</td><td>59.2</td><td>56.2</td><td>293.2</td></tr>
<tr><td><strong>Legendary</strong></td><td>68.0</td><td>70.6</td><td>72.3</td><td>70.3</td><td>71.2</td><td>352.4</td></tr>
</tbody></table>
<p><strong>Key insight:</strong> Each rarity tier adds roughly <strong>+50 total stat points</strong> over the previous tier. A Legendary buddy averages 352 total points \u2014 more than double a Common's 146. The jump from Epic to Legendary (+59 points) is the largest single-tier increase, making Legendary buddies genuinely elite.</p>
<p>All 5 stats reached both the minimum (1) and maximum (100) across the 10,000 sample, confirming the full range is achievable. The global average per stat hovers around 35, with SNARK slightly lower at 34.6.</p>`
          },
          {
            heading: 'Peak Stat Distribution & Stat Extremes',
            body: `<p>The peak stat is chosen uniformly from 5 options. Our data confirms near-perfect uniformity:</p>
<table><thead><tr><th>Peak Stat</th><th>Count</th><th>Actual %</th><th>Expected %</th></tr></thead><tbody>
<tr><td>CHAOS</td><td>2,061</td><td>20.61%</td><td>20.00%</td></tr>
<tr><td>WISDOM</td><td>2,046</td><td>20.46%</td><td>20.00%</td></tr>
<tr><td>PATIENCE</td><td>2,002</td><td>20.02%</td><td>20.00%</td></tr>
<tr><td>DEBUGGING</td><td>1,968</td><td>19.68%</td><td>20.00%</td></tr>
<tr><td>SNARK</td><td>1,923</td><td>19.23%</td><td>20.00%</td></tr>
</tbody></table>
<p>No stat is favored as a peak. The dump stat (lowest stat) is also chosen uniformly, but is re-rolled if it matches the peak \u2014 this means each non-peak stat has a 25% chance of being the dump, which our data also confirms.</p>
<p><strong>Stat extremes across all 10,000 buddies:</strong> Every stat achieved both min=1 and max=100. The theoretical maximum for a single stat is 100 (Legendary peak: floor 50 + 50 + up to 29 = 100, capped). The theoretical minimum is 1 (Common dump: floor 5 - 10 + 0 = -5, clamped to 1).</p>`
          },
          {
            heading: 'The Hunt for Legendary Shiny',
            body: `<p>The holy grail of Buddy collecting: a <strong>Legendary Shiny</strong>. The probability is 1% (Legendary) \u00d7 1% (Shiny) = <strong>0.01%</strong>, or 1 in 10,000. In our simulation of exactly 10,000 trials, we found:</p>
<p style="text-align:center;font-size:1.5em;"><strong>0 Legendary Shiny Buddies</strong></p>
<p>This is actually the most likely outcome! With an expected value of 1.0, the Poisson distribution tells us there's a 36.8% chance of finding exactly zero in 10,000 trials. We were unlucky, but not unusually so. To have a 95% chance of seeing at least one Legendary Shiny, you'd need approximately <strong>30,000 trials</strong>.</p>
<p>For context, our 92 Legendary buddies had a 1% shiny chance each, giving an expected 0.92 shinies among them. The fact that none were shiny is a coin-flip outcome \u2014 not a bug in the algorithm.</p>
<p>The rarest possible combination \u2014 a specific Legendary Shiny species with a specific hat, eye, and peak stat \u2014 has a probability of approximately <strong>1 in 86,400,000</strong>. You'd need to generate UUIDs for the entire population of Germany to expect one.</p>`
          },
          {
            heading: 'Conclusions',
            body: `<p>After 10,000 simulations, we can confirm:</p>
<ul>
<li><strong>The PRNG is fair.</strong> Mulberry32 seeded by FNV-1a produces distributions that closely match theoretical expectations across all dimensions.</li>
<li><strong>No hidden weights.</strong> Species, eyes, hats, and peak stats are all uniformly distributed as documented.</li>
<li><strong>Rarity matters.</strong> Each tier adds ~50 total stat points, with Legendary buddies averaging 2.4\u00d7 the stats of Commons.</li>
<li><strong>Shiny is truly rare.</strong> At 1.12% observed (1.00% expected), the shiny rate is honest and independent of rarity.</li>
<li><strong>Legendary Shiny is a unicorn.</strong> 0 found in 10,000 trials. The math checks out \u2014 you need extraordinary luck or extraordinary patience.</li>
</ul>
<p>The beauty of deterministic generation is that your Buddy was decided the moment your UUID was created. These 10,000 simulations simply confirm that the dice are fair. Whether you got a Common Duck or a Legendary Shiny Dragon, the algorithm treated you honestly.</p>`
          },
        ],
      },
      zh: {
        title: 'Claude Code Buddy \u6982\u7387\u5b9e\u9a8c\u5ba4 \u2014 10,000 \u6b21\u6a21\u62df\u63ed\u793a\u7684\u771f\u76f8',
        metaTitle: 'Claude Code Buddy \u6982\u7387\u5b9e\u9a8c\u5ba4 \u2014 10,000 \u6b21\u6a21\u62df\u7ed3\u679c | Claude Buddy Checker',
        metaDescription: '\u6211\u4eec\u8fd0\u884c\u4e86 10,000 \u6b21 Buddy \u751f\u6210\u7b97\u6cd5\u3002\u67e5\u770b\u7a00\u6709\u5ea6\u5206\u5e03\u3001\u7269\u79cd\u9891\u7387\u3001\u95ea\u5149\u7387\u548c\u4f20\u8bf4\u7ea7\u95ea\u5149\u6982\u7387\u7684\u771f\u5b9e\u6570\u636e\u3002',
        excerpt: '\u6211\u4eec\u7528\u968f\u673a UUID \u8fd0\u884c\u4e86 10,000 \u6b21 Buddy \u751f\u6210\u7b97\u6cd5\uff0c\u8bb0\u5f55\u4e86\u6bcf\u4e00\u4e2a\u7ed3\u679c\u3002\u4ee5\u4e0b\u662f\u6570\u636e\u63ed\u793a\u7684\u5173\u4e8e\u7a00\u6709\u5ea6\u5206\u5e03\u3001\u7269\u79cd\u9891\u7387\u3001\u95ea\u5149\u7387\u548c\u96be\u4ee5\u6349\u6478\u7684\u4f20\u8bf4\u7ea7\u95ea\u5149\u7684\u771f\u76f8\u3002',
        sections: [
          {
            heading: '\u5b9e\u9a8c\u8bbe\u8ba1',
            body: `<p>\u7406\u8bba\u5f88\u4f18\u96c5\uff0c\u6570\u636e\u5f88\u8bda\u5b9e\u3002Claude Code Buddy \u5f15\u64ce\u4f7f\u7528\u786e\u5b9a\u6027\u7ba1\u7ebf \u2014 FNV-1a \u54c8\u5e0c \u2192 Mulberry32 PRNG \u2192 \u52a0\u6743\u62bd\u53d6 \u2014 \u7406\u8bba\u4e0a<em>\u5e94\u8be5</em>\u4ea7\u751f\u7279\u5b9a\u7684\u6982\u7387\u5206\u5e03\u3002\u4f46\u5b9e\u9645\u5982\u4f55\uff1f\u6211\u4eec\u751f\u6210\u4e86 10,000 \u4e2a\u968f\u673a UUID\uff0c\u5c06\u6bcf\u4e2a\u901a\u8fc7\u5b8c\u5168\u76f8\u540c\u7684 <code>rollBuddy()</code> \u51fd\u6570\u8fd0\u884c\uff0c\u5e76\u8bb0\u5f55\u4e86\u6bcf\u4e00\u4e2a\u7a00\u6709\u5ea6\u3001\u7269\u79cd\u3001\u773c\u775b\u6837\u5f0f\u3001\u5e3d\u5b50\u7c7b\u578b\u3001\u95ea\u5149\u72b6\u6001\u548c\u5c5e\u6027\u503c\u3002\u672c\u6587\u5c55\u793a\u539f\u59cb\u7ed3\u679c\u3002</p>
<p>\u6a21\u62df\u4ee3\u7801\u5b8c\u5168\u590d\u5236\u4e86\u751f\u4ea7\u5f15\u64ce\uff1a\u76f8\u540c\u7684 FNV-1a \u54c8\u5e0c\uff08\u4f7f\u7528 <code>friend-2026-401</code> \u76d0\u503c\uff09\u3001\u76f8\u540c\u7684 Mulberry32 PRNG\u3001\u76f8\u540c\u7684\u52a0\u6743\u9009\u62e9\u903b\u8f91\u3002\u552f\u4e00\u7684\u53d8\u91cf\u662f\u8f93\u5165\u7684 UUID\uff0c\u901a\u8fc7 Node.js <code>crypto.randomUUID()</code> \u751f\u6210\u3002</p>`
          },
          {
            heading: '\u7a00\u6709\u5ea6\u5206\u5e03\uff1a\u7406\u8bba vs \u73b0\u5b9e',
            body: `<p>\u7a00\u6709\u5ea6\u7cfb\u7edf\u4f7f\u7528\u52a0\u6743\u968f\u673a\u9009\u62e9\uff0c\u6743\u91cd\u4e3a 60/25/10/4/1\uff08\u603b\u8ba1 100\uff09\u3002\u4ee5\u4e0b\u662f 10,000 \u6b21\u8bd5\u9a8c\u4e0e\u7406\u8bba\u6982\u7387\u7684\u5bf9\u6bd4\uff1a</p>
<table><thead><tr><th>\u7a00\u6709\u5ea6</th><th>\u671f\u671b %</th><th>\u5b9e\u9645\u6570\u91cf</th><th>\u5b9e\u9645 %</th><th>\u504f\u5dee</th></tr></thead><tbody>
<tr><td><strong>\u666e\u901a</strong></td><td>60.0%</td><td>6,027</td><td>60.3%</td><td>+0.3%</td></tr>
<tr><td><strong>\u7a00\u6709</strong></td><td>25.0%</td><td>2,502</td><td>25.0%</td><td>+0.0%</td></tr>
<tr><td><strong>\u73cd\u7a00</strong></td><td>10.0%</td><td>974</td><td>9.7%</td><td>-0.3%</td></tr>
<tr><td><strong>\u53f2\u8bd7</strong></td><td>4.0%</td><td>405</td><td>4.0%</td><td>+0.0%</td></tr>
<tr><td><strong>\u4f20\u8bf4</strong></td><td>1.0%</td><td>92</td><td>0.9%</td><td>-0.1%</td></tr>
</tbody></table>
<p><strong>\u7ed3\u8bba\uff1a</strong>Mulberry32 PRNG \u63d0\u4f9b\u4e86\u975e\u5e38\u5fe0\u5b9e\u7684\u52a0\u6743\u9009\u62e9\u3002\u6700\u5927\u504f\u5dee\u4ec5\u4e3a \u00b10.3 \u4e2a\u767e\u5206\u70b9\u3002\u5927\u6570\u5b9a\u5f8b\u6210\u7acb\uff1a\u7ed9\u5b9a\u8db3\u591f\u7684\u8bd5\u9a8c\u6b21\u6570\uff0c\u89c2\u5bdf\u5230\u7684\u5206\u5e03\u4f1a\u7d27\u5bc6\u6536\u655b\u4e8e\u7406\u8bba\u6743\u91cd\u3002\u4f60\u62bd\u5230\u4f20\u8bf4\u7ea7\u7684\u673a\u4f1a\u786e\u5b9e\u662f\u767e\u5206\u4e4b\u4e00\u3002</p>`
          },
          {
            heading: '\u7269\u79cd\u9891\u7387\uff1a\u6bcf\u4e2a Buddy \u90fd\u540c\u6837\u53ef\u80fd\u5417\uff1f',
            body: `<p>18 \u4e2a\u7269\u79cd\u4f7f\u7528\u5747\u5300\u7684 <code>pick()</code> \u9009\u62e9\uff0c\u6bcf\u4e2a\u7269\u79cd\u5e94\u51fa\u73b0\u5728\u7ea6 5.56% \u7684\u62bd\u53d6\u4e2d\u3002\u4ee5\u4e0b\u662f\u524d 5 \u540d\u548c\u540e 5 \u540d\uff1a</p>
<table><thead><tr><th>\u6392\u540d</th><th>\u7269\u79cd</th><th>\u6570\u91cf</th><th>\u5b9e\u9645 %</th></tr></thead><tbody>
<tr><td>1</td><td>\ud83d\udc30 \u5154\u5b50</td><td>599</td><td>5.99%</td></tr>
<tr><td>2</td><td>\ud83d\udc27 \u4f01\u9e45</td><td>598</td><td>5.98%</td></tr>
<tr><td>3</td><td>\ud83e\udea2 \u9e45</td><td>596</td><td>5.96%</td></tr>
<tr><td>...</td><td>...</td><td>...</td><td>...</td></tr>
<tr><td>16</td><td>\ud83e\udd86 \u9e2d\u5b50</td><td>527</td><td>5.27%</td></tr>
<tr><td>17</td><td>\ud83e\udd16 \u673a\u5668\u4eba</td><td>521</td><td>5.21%</td></tr>
<tr><td>18</td><td>\ud83d\udc19 \u7ae0\u9c7c</td><td>510</td><td>5.10%</td></tr>
</tbody></table>
<p><strong>\u7ed3\u8bba\uff1a</strong>\u4ece\u6700\u5e38\u89c1\uff08\u5154\u5b50 5.99%\uff09\u5230\u6700\u7f55\u89c1\uff08\u7ae0\u9c7c 5.10%\uff09\u7684\u5dee\u8ddd\u4e0d\u5230 1 \u4e2a\u767e\u5206\u70b9\u3002\u8fd9\u5b8c\u5168\u5728 N=10,000 \u7684\u6b63\u5e38\u7edf\u8ba1\u65b9\u5dee\u8303\u56f4\u5185\u3002<strong>\u6ca1\u6709\u9690\u85cf\u7684\u7269\u79cd\u6743\u91cd</strong> \u2014 \u6bcf\u4e2a\u7269\u79cd\u786e\u5b9e\u540c\u6837\u53ef\u80fd\u3002</p>`
          },
          {
            heading: '\u773c\u775b\u3001\u5e3d\u5b50\u4e0e\u95ea\u5149\uff1a\u88c5\u9970\u6982\u7387',
            body: `<p><strong>\u773c\u775b</strong>\u4ece 6 \u79cd\u6837\u5f0f\u4e2d\u5747\u5300\u9009\u62e9\u3002\u89c2\u5bdf\u8303\u56f4\u4e3a 16.39% \u5230 17.11%\uff08\u671f\u671b\uff1a\u6bcf\u79cd 16.67%\uff09\u3002\u6ca1\u6709\u4efb\u4f55\u773c\u775b\u6837\u5f0f\u6bd4\u5176\u4ed6\u66f4\u7a00\u6709\u3002</p>
<p><strong>\u5e3d\u5b50</strong>\u4ec5\u5bf9\u975e\u666e\u901a\u7ea7 Buddy \u62bd\u53d6\uff08\u6837\u672c\u4e2d N=3,973\uff09\u30028 \u79cd\u5e3d\u5b50\u4e2d\uff0c\u7687\u51a0\u6700\u5e38\u89c1\uff0813.29%\uff09\uff0c\u6bdb\u7ebf\u5e3d\u6700\u5c11\uff0811.30%\uff09\uff08\u671f\u671b\uff1a12.50%\uff09\u3002</p>
<table><thead><tr><th>\u5e3d\u5b50</th><th>\u6570\u91cf</th><th>\u5b9e\u9645 %</th><th>\u671f\u671b %</th></tr></thead><tbody>
<tr><td>\ud83d\udc51 \u7687\u51a0</td><td>528</td><td>13.29%</td><td>12.50%</td></tr>
<tr><td>\ud83c\udfa9 \u9ad8\u793c\u5e3d</td><td>517</td><td>13.01%</td><td>12.50%</td></tr>
<tr><td>\ud83e\uddf2 \u87ba\u65cb\u6868</td><td>522</td><td>13.14%</td><td>12.50%</td></tr>
<tr><td>\ud83d\ude07 \u5149\u73af</td><td>485</td><td>12.21%</td><td>12.50%</td></tr>
<tr><td>\ud83e\uddd9 \u5deb\u5e08\u5e3d</td><td>461</td><td>11.60%</td><td>12.50%</td></tr>
<tr><td>\ud83e\udde2 \u6bdb\u7ebf\u5e3d</td><td>449</td><td>11.30%</td><td>12.50%</td></tr>
<tr><td>\ud83e\udd86 \u5c0f\u9e2d\u5b50</td><td>514</td><td>12.94%</td><td>12.50%</td></tr>
<tr><td>\u2205 \u65e0</td><td>497</td><td>12.51%</td><td>12.50%</td></tr>
</tbody></table>
<p><strong>\u95ea\u5149\u7387\uff1a</strong>10,000 \u53ea Buddy \u4e2d\u6709 112 \u53ea\u95ea\u5149 \u2014 \u6bd4\u7387\u4e3a <strong>1.12%</strong>\uff0c\u5bf9\u6bd4\u671f\u671b\u7684 1.00%\u3002\u8fd9\u79cd\u8f7b\u5fae\u8d85\u51fa\u5c5e\u4e8e\u6b63\u5e38\u65b9\u5dee\u3002\u6309\u7a00\u6709\u5ea6\u5206\u89e3\uff1a\u666e\u901a 1.14%\u3001\u7a00\u6709 1.20%\u3001\u73cd\u7a00 0.92%\u3001\u53f2\u8bd7 0.99%\u3001\u4f20\u8bf4 0.00%\u3002\u95ea\u5149\u62bd\u53d6\u4e0e\u7a00\u6709\u5ea6\u65e0\u5173\uff0c\u6570\u636e\u8bc1\u5b9e\u4e86\u8fd9\u4e00\u70b9\u3002</p>`
          },
          {
            heading: '\u5c5e\u6027\u7ecf\u6d4e\u5b66\uff1a\u6309\u7a00\u6709\u5ea6\u7684\u5e73\u5747\u6218\u529b',
            body: `<p>\u6bcf\u4e2a Buddy \u6709 5 \u9879\u5c5e\u6027\uff08DEBUGGING\u3001PATIENCE\u3001CHAOS\u3001WISDOM\u3001SNARK\uff09\uff0c\u57fa\u4e8e\u7a00\u6709\u5ea6\u7684\u4e0b\u9650\u751f\u6210\uff0c\u5e76\u6709\u4e00\u4e2a\u589e\u5f3a\u7684\u5cf0\u503c\u5c5e\u6027\u548c\u4e00\u4e2a\u60e9\u7f5a\u7684\u8c37\u5e95\u5c5e\u6027\u3002\u4ee5\u4e0b\u662f\u5e73\u5747\u603b\u5206\uff1a</p>
<table><thead><tr><th>\u7a00\u6709\u5ea6</th><th>\u5e73\u5747 DEBUGGING</th><th>\u5e73\u5747 PATIENCE</th><th>\u5e73\u5747 CHAOS</th><th>\u5e73\u5747 WISDOM</th><th>\u5e73\u5747 SNARK</th><th>\u603b\u5206</th></tr></thead><tbody>
<tr><td><strong>\u666e\u901a</strong></td><td>28.9</td><td>29.8</td><td>29.2</td><td>29.3</td><td>28.7</td><td>145.9</td></tr>
<tr><td><strong>\u7a00\u6709</strong></td><td>39.2</td><td>39.1</td><td>39.6</td><td>39.1</td><td>38.1</td><td>195.1</td></tr>
<tr><td><strong>\u73cd\u7a00</strong></td><td>49.2</td><td>47.5</td><td>49.0</td><td>49.5</td><td>49.1</td><td>244.3</td></tr>
<tr><td><strong>\u53f2\u8bd7</strong></td><td>59.5</td><td>59.2</td><td>59.1</td><td>59.2</td><td>56.2</td><td>293.2</td></tr>
<tr><td><strong>\u4f20\u8bf4</strong></td><td>68.0</td><td>70.6</td><td>72.3</td><td>70.3</td><td>71.2</td><td>352.4</td></tr>
</tbody></table>
<p><strong>\u5173\u952e\u53d1\u73b0\uff1a</strong>\u6bcf\u4e2a\u7a00\u6709\u5ea6\u7b49\u7ea7\u6bd4\u524d\u4e00\u4e2a\u7b49\u7ea7\u589e\u52a0\u7ea6 <strong>+50 \u603b\u5c5e\u6027\u70b9</strong>\u3002\u4f20\u8bf4\u7ea7 Buddy \u5e73\u5747 352 \u603b\u70b9 \u2014 \u662f\u666e\u901a\u7ea7 146 \u7684\u4e24\u500d\u591a\u3002\u4ece\u53f2\u8bd7\u5230\u4f20\u8bf4\u7684\u8df3\u8dc3\uff08+59 \u70b9\uff09\u662f\u6700\u5927\u7684\u5355\u7ea7\u589e\u5e45\uff0c\u4f7f\u4f20\u8bf4\u7ea7 Buddy \u771f\u6b63\u5c5e\u4e8e\u7cbe\u82f1\u9636\u5c42\u3002</p>
<p>\u6240\u6709 5 \u9879\u5c5e\u6027\u5728 10,000 \u4e2a\u6837\u672c\u4e2d\u90fd\u8fbe\u5230\u4e86\u6700\u5c0f\u503c\uff081\uff09\u548c\u6700\u5927\u503c\uff08100\uff09\uff0c\u786e\u8ba4\u4e86\u5168\u8303\u56f4\u53ef\u8fbe\u3002\u5168\u5c40\u5e73\u5747\u6bcf\u9879\u5c5e\u6027\u7ea6\u4e3a 35\uff0cSNARK \u7565\u4f4e\u4e3a 34.6\u3002</p>`
          },
          {
            heading: '\u5cf0\u503c\u5c5e\u6027\u5206\u5e03\u4e0e\u5c5e\u6027\u6781\u503c',
            body: `<p>\u5cf0\u503c\u5c5e\u6027\u4ece 5 \u4e2a\u9009\u9879\u4e2d\u5747\u5300\u9009\u62e9\u3002\u6211\u4eec\u7684\u6570\u636e\u786e\u8ba4\u4e86\u8fd1\u4e4e\u5b8c\u7f8e\u7684\u5747\u5300\u6027\uff1a</p>
<table><thead><tr><th>\u5cf0\u503c\u5c5e\u6027</th><th>\u6570\u91cf</th><th>\u5b9e\u9645 %</th><th>\u671f\u671b %</th></tr></thead><tbody>
<tr><td>CHAOS</td><td>2,061</td><td>20.61%</td><td>20.00%</td></tr>
<tr><td>WISDOM</td><td>2,046</td><td>20.46%</td><td>20.00%</td></tr>
<tr><td>PATIENCE</td><td>2,002</td><td>20.02%</td><td>20.00%</td></tr>
<tr><td>DEBUGGING</td><td>1,968</td><td>19.68%</td><td>20.00%</td></tr>
<tr><td>SNARK</td><td>1,923</td><td>19.23%</td><td>20.00%</td></tr>
</tbody></table>
<p>\u6ca1\u6709\u4efb\u4f55\u5c5e\u6027\u88ab\u504f\u597d\u4f5c\u4e3a\u5cf0\u503c\u3002\u8c37\u5e95\u5c5e\u6027\uff08\u6700\u4f4e\u5c5e\u6027\uff09\u4e5f\u662f\u5747\u5300\u9009\u62e9\u7684\uff0c\u4f46\u5982\u679c\u4e0e\u5cf0\u503c\u76f8\u540c\u5219\u91cd\u65b0\u62bd\u53d6 \u2014 \u8fd9\u610f\u5473\u7740\u6bcf\u4e2a\u975e\u5cf0\u503c\u5c5e\u6027\u6709 25% \u7684\u673a\u4f1a\u6210\u4e3a\u8c37\u5e95\uff0c\u6570\u636e\u4e5f\u8bc1\u5b9e\u4e86\u8fd9\u4e00\u70b9\u3002</p>
<p><strong>\u5c5e\u6027\u6781\u503c\uff1a</strong>\u6bcf\u9879\u5c5e\u6027\u90fd\u8fbe\u5230\u4e86 min=1 \u548c max=100\u3002\u7406\u8bba\u6700\u5927\u503c\u4e3a 100\uff08\u4f20\u8bf4\u7ea7\u5cf0\u503c\uff1a\u4e0b\u9650 50 + 50 + \u6700\u591a 29 = 100\uff0c\u5c01\u9876\uff09\u3002\u7406\u8bba\u6700\u5c0f\u503c\u4e3a 1\uff08\u666e\u901a\u7ea7\u8c37\u5e95\uff1a\u4e0b\u9650 5 - 10 + 0 = -5\uff0c\u94b3\u4f4d\u5230 1\uff09\u3002</p>`
          },
          {
            heading: '\u8ffd\u5bfb\u4f20\u8bf4\u7ea7\u95ea\u5149',
            body: `<p>Buddy \u6536\u96c6\u7684\u5723\u676f\uff1a<strong>\u4f20\u8bf4\u7ea7\u95ea\u5149</strong>\u3002\u6982\u7387\u4e3a 1%\uff08\u4f20\u8bf4\uff09\u00d7 1%\uff08\u95ea\u5149\uff09= <strong>0.01%</strong>\uff0c\u5373\u4e07\u5206\u4e4b\u4e00\u3002\u5728\u6211\u4eec\u6070\u597d 10,000 \u6b21\u7684\u6a21\u62df\u4e2d\uff0c\u6211\u4eec\u53d1\u73b0\u4e86\uff1a</p>
<p style="text-align:center;font-size:1.5em;"><strong>0 \u53ea\u4f20\u8bf4\u7ea7\u95ea\u5149 Buddy</strong></p>
<p>\u8fd9\u5b9e\u9645\u4e0a\u662f\u6700\u53ef\u80fd\u7684\u7ed3\u679c\uff01\u671f\u671b\u503c\u4e3a 1.0 \u65f6\uff0c\u6cca\u677e\u5206\u5e03\u544a\u8bc9\u6211\u4eec\u5728 10,000 \u6b21\u8bd5\u9a8c\u4e2d\u627e\u5230\u6070\u597d\u96f6\u4e2a\u7684\u6982\u7387\u4e3a 36.8%\u3002\u6211\u4eec\u53ea\u662f\u8fd0\u6c14\u4e0d\u597d\uff0c\u4f46\u5e76\u4e0d\u5f02\u5e38\u3002\u8981\u6709 95% \u7684\u673a\u4f1a\u770b\u5230\u81f3\u5c11\u4e00\u53ea\u4f20\u8bf4\u7ea7\u95ea\u5149\uff0c\u4f60\u9700\u8981\u5927\u7ea6 <strong>30,000 \u6b21\u8bd5\u9a8c</strong>\u3002</p>
<p>\u4f5c\u4e3a\u53c2\u8003\uff0c\u6211\u4eec\u7684 92 \u53ea\u4f20\u8bf4\u7ea7 Buddy \u6bcf\u53ea\u6709 1% \u7684\u95ea\u5149\u673a\u4f1a\uff0c\u671f\u671b\u4ea7\u751f 0.92 \u53ea\u95ea\u5149\u3002\u5b9e\u9645\u6ca1\u6709\u4e00\u53ea\u95ea\u5149\u662f\u4e00\u4e2a\u62db\u786c\u5e01\u7ea7\u522b\u7684\u7ed3\u679c \u2014 \u4e0d\u662f\u7b97\u6cd5\u7684 bug\u3002</p>
<p>\u6700\u7a00\u6709\u7684\u53ef\u80fd\u7ec4\u5408 \u2014 \u7279\u5b9a\u7684\u4f20\u8bf4\u7ea7\u95ea\u5149\u7269\u79cd\u52a0\u7279\u5b9a\u5e3d\u5b50\u3001\u773c\u775b\u548c\u5cf0\u503c\u5c5e\u6027 \u2014 \u6982\u7387\u7ea6\u4e3a <strong>\u516b\u5343\u4e07\u5206\u4e4b\u4e00</strong>\u3002\u4f60\u9700\u8981\u4e3a\u5fb7\u56fd\u5168\u90e8\u4eba\u53e3\u751f\u6210 UUID \u624d\u80fd\u671f\u671b\u627e\u5230\u4e00\u4e2a\u3002</p>`
          },
          {
            heading: '\u7ed3\u8bba',
            body: `<p>\u7ecf\u8fc7 10,000 \u6b21\u6a21\u62df\uff0c\u6211\u4eec\u53ef\u4ee5\u786e\u8ba4\uff1a</p>
<ul>
<li><strong>PRNG \u662f\u516c\u5e73\u7684\u3002</strong>Mulberry32 \u7531 FNV-1a \u64ad\u79cd\uff0c\u5728\u6240\u6709\u7ef4\u5ea6\u4e0a\u4ea7\u751f\u4e0e\u7406\u8bba\u671f\u671b\u5bc6\u5207\u5339\u914d\u7684\u5206\u5e03\u3002</li>
<li><strong>\u6ca1\u6709\u9690\u85cf\u6743\u91cd\u3002</strong>\u7269\u79cd\u3001\u773c\u775b\u3001\u5e3d\u5b50\u548c\u5cf0\u503c\u5c5e\u6027\u90fd\u5982\u6587\u6863\u6240\u8ff0\u5747\u5300\u5206\u5e03\u3002</li>
<li><strong>\u7a00\u6709\u5ea6\u5f88\u91cd\u8981\u3002</strong>\u6bcf\u4e2a\u7b49\u7ea7\u589e\u52a0\u7ea6 50 \u603b\u5c5e\u6027\u70b9\uff0c\u4f20\u8bf4\u7ea7\u5e73\u5747\u662f\u666e\u901a\u7ea7\u7684 2.4 \u500d\u3002</li>
<li><strong>\u95ea\u5149\u786e\u5b9e\u7a00\u6709\u3002</strong>\u89c2\u5bdf\u5230 1.12%\uff08\u671f\u671b 1.00%\uff09\uff0c\u95ea\u5149\u7387\u8bda\u5b9e\u4e14\u4e0e\u7a00\u6709\u5ea6\u65e0\u5173\u3002</li>
<li><strong>\u4f20\u8bf4\u7ea7\u95ea\u5149\u662f\u72ec\u89d2\u517d\u3002</strong>10,000 \u6b21\u8bd5\u9a8c\u4e2d\u627e\u5230 0 \u53ea\u3002\u6570\u5b66\u6ca1\u6709\u95ee\u9898 \u2014 \u4f60\u9700\u8981\u975e\u51e1\u7684\u8fd0\u6c14\u6216\u975e\u51e1\u7684\u8010\u5fc3\u3002</li>
</ul>
<p>\u786e\u5b9a\u6027\u751f\u6210\u7684\u7f8e\u5999\u4e4b\u5904\u5728\u4e8e\uff0c\u4f60\u7684 Buddy \u5728 UUID \u521b\u5efa\u7684\u90a3\u4e00\u523b\u5c31\u5df2\u7ecf\u51b3\u5b9a\u4e86\u3002\u8fd9 10,000 \u6b21\u6a21\u62df\u53ea\u662f\u786e\u8ba4\u4e86\u9ab0\u5b50\u662f\u516c\u5e73\u7684\u3002\u65e0\u8bba\u4f60\u5f97\u5230\u7684\u662f\u666e\u901a\u9e2d\u5b50\u8fd8\u662f\u4f20\u8bf4\u7ea7\u95ea\u5149\u9f99\uff0c\u7b97\u6cd5\u5bf9\u4f60\u662f\u8bda\u5b9e\u7684\u3002</p>`
          },
        ],
      },
      ko: {
        title: 'Claude Code Buddy \ud655\ub960 \uc2e4\ud5d8\uc2e4 \u2014 10,000\ud68c \uc2dc\ubbac\ub808\uc774\uc158\uc774 \ubc1d\ud78c \uc9c4\uc2e4',
        metaTitle: 'Claude Code Buddy \ud655\ub960 \uc2e4\ud5d8\uc2e4 \u2014 10,000\ud68c \uc2dc\ubbac\ub808\uc774\uc158 \uacb0\uacfc | Claude Buddy Checker',
        metaDescription: 'Buddy \uc0dd\uc131 \uc54c\uace0\ub9ac\uc998\uc744 10,000\ud68c \uc2e4\ud589\ud588\uc2b5\ub2c8\ub2e4. \ud76c\uadc0\ub3c4 \ubd84\ud3ec, \uc885 \ube48\ub3c4, \uc0e4\uc774\ub2c8 \ube44\uc728 \ubc0f \ub808\uc804\ub354\ub9ac \uc0e4\uc774\ub2c8 \ud655\ub960\uc758 \uc2e4\uc81c \ub370\uc774\ud130\ub97c \ud655\uc778\ud558\uc138\uc694.',
        excerpt: '\ub79c\ub364 UUID\ub85c Buddy \uc0dd\uc131 \uc54c\uace0\ub9ac\uc998\uc744 10,000\ud68c \uc2e4\ud589\ud558\uace0 \ubaa8\ub4e0 \uacb0\uacfc\ub97c \uae30\ub85d\ud588\uc2b5\ub2c8\ub2e4. \ud76c\uadc0\ub3c4 \ubd84\ud3ec, \uc885 \ube48\ub3c4, \uc0e4\uc774\ub2c8 \ube44\uc728, \uadf8\ub9ac\uace0 \uc804\uc124\uc801\uc778 \ub808\uc804\ub354\ub9ac \uc0e4\uc774\ub2c8\uc5d0 \ub300\ud574 \ub370\uc774\ud130\uac00 \ubc1d\ud78c \uc9c4\uc2e4\uc744 \uacf5\uac1c\ud569\ub2c8\ub2e4.',
        sections: [
          {
            heading: '\uc2e4\ud5d8 \uc124\uacc4',
            body: `<p>\uc774\ub860\uc740 \uc6b0\uc544\ud558\uace0, \ub370\uc774\ud130\ub294 \uc815\uc9c1\ud569\ub2c8\ub2e4. Claude Code Buddy \uc5d4\uc9c4\uc740 \uacb0\uc815\ub860\uc801 \ud30c\uc774\ud504\ub77c\uc778 \u2014 FNV-1a \ud574\uc2dc \u2192 Mulberry32 PRNG \u2192 \uac00\uc911 \ucd94\ucca8 \u2014 \uc744 \uc0ac\uc6a9\ud558\uc5ec \ud2b9\uc815 \ud655\ub960 \ubd84\ud3ec\ub97c <em>\uc0dd\uc131\ud574\uc57c</em> \ud569\ub2c8\ub2e4. \ud558\uc9c0\ub9cc \uc2e4\uc81c\ub85c \uadf8\ub7f4\uae4c\uc694? 10,000\uac1c\uc758 \ub79c\ub364 UUID\ub97c \uc0dd\uc131\ud558\uace0, \uac01\uac01\uc744 \ub3d9\uc77c\ud55c <code>rollBuddy()</code> \ud568\uc218\ub85c \uc2e4\ud589\ud558\uc5ec \ubaa8\ub4e0 \ud76c\uadc0\ub3c4, \uc885, \ub208 \uc2a4\ud0c0\uc77c, \ubaa8\uc790 \uc720\ud615, \uc0e4\uc774\ub2c8 \uc0c1\ud0dc \ubc0f \uc2a4\ud0ef \uac12\uc744 \uae30\ub85d\ud588\uc2b5\ub2c8\ub2e4.</p>
<p>\uc2dc\ubbac\ub808\uc774\uc158 \ucf54\ub4dc\ub294 \ud504\ub85c\ub355\uc158 \uc5d4\uc9c4\uc744 \uc815\ud655\ud788 \ubcf5\uc81c\ud569\ub2c8\ub2e4: \ub3d9\uc77c\ud55c FNV-1a \ud574\uc2dc(<code>friend-2026-401</code> \uc194\ud2b8), \ub3d9\uc77c\ud55c Mulberry32 PRNG, \ub3d9\uc77c\ud55c \uac00\uc911 \uc120\ud0dd \ub85c\uc9c1. \uc720\uc77c\ud55c \ubcc0\uc218\ub294 Node.js <code>crypto.randomUUID()</code>\ub85c \uc0dd\uc131\ub41c UUID\uc785\ub2c8\ub2e4.</p>`
          },
          {
            heading: '\ud76c\uadc0\ub3c4 \ubd84\ud3ec: \uc774\ub860 vs \ud604\uc2e4',
            body: `<p>\ud76c\uadc0\ub3c4 \uc2dc\uc2a4\ud15c\uc740 60/25/10/4/1(\ucd1d 100) \uac00\uc911\uce58\ub85c \uac00\uc911 \ub79c\ub364 \uc120\ud0dd\uc744 \uc0ac\uc6a9\ud569\ub2c8\ub2e4. 10,000\ud68c \uc2dc\ud5d8\uacfc \uc774\ub860\uc801 \ud655\ub960\uc758 \ube44\uad50:</p>
<table><thead><tr><th>\ud76c\uadc0\ub3c4</th><th>\uc608\uc0c1 %</th><th>\uc2e4\uc81c \uc218</th><th>\uc2e4\uc81c %</th><th>\ud3b8\ucc28</th></tr></thead><tbody>
<tr><td><strong>Common</strong></td><td>60.0%</td><td>6,027</td><td>60.3%</td><td>+0.3%</td></tr>
<tr><td><strong>Uncommon</strong></td><td>25.0%</td><td>2,502</td><td>25.0%</td><td>+0.0%</td></tr>
<tr><td><strong>Rare</strong></td><td>10.0%</td><td>974</td><td>9.7%</td><td>-0.3%</td></tr>
<tr><td><strong>Epic</strong></td><td>4.0%</td><td>405</td><td>4.0%</td><td>+0.0%</td></tr>
<tr><td><strong>Legendary</strong></td><td>1.0%</td><td>92</td><td>0.9%</td><td>-0.1%</td></tr>
</tbody></table>
<p><strong>\ud310\uc815:</strong> Mulberry32 PRNG\ub294 \ub9e4\uc6b0 \ucda9\uc2e4\ud55c \uac00\uc911 \uc120\ud0dd\uc744 \uc81c\uacf5\ud569\ub2c8\ub2e4. \ucd5c\ub300 \ud3b8\ucc28\ub294 \u00b10.3 \ud37c\uc13c\ud2b8 \ud3ec\uc778\ud2b8\uc5d0 \ubd88\uacfc\ud569\ub2c8\ub2e4. \ub300\uc218\uc758 \ubc95\uce59\uc774 \uc131\ub9bd\ud569\ub2c8\ub2e4: \ucda9\ubd84\ud55c \uc2dc\ud5d8\uc774 \uc8fc\uc5b4\uc9c0\uba74 \uad00\ucc30\ub41c \ubd84\ud3ec\ub294 \uc774\ub860\uc801 \uac00\uc911\uce58\uc5d0 \ubc00\uc811\ud558\uac8c \uc218\ub834\ud569\ub2c8\ub2e4.</p>`
          },
          {
            heading: '\uc885 \ube48\ub3c4: \ubaa8\ub4e0 Buddy\uac00 \ub3d9\uc77c\ud558\uac8c \uac00\ub2a5\ud55c\uac00\uc694?',
            body: `<p>18\uc885\uacfc \uade0\uc77c\ud55c <code>pick()</code> \uc120\ud0dd\uc73c\ub85c \uac01 \uc885\uc740 \uc57d 5.56%\uc758 \ud655\ub960\ub85c \ub098\ud0c0\ub098\uc57c \ud569\ub2c8\ub2e4:</p>
<table><thead><tr><th>\uc21c\uc704</th><th>\uc885</th><th>\uc218</th><th>\uc2e4\uc81c %</th></tr></thead><tbody>
<tr><td>1</td><td>\ud83d\udc30 \ud1a0\ub07c</td><td>599</td><td>5.99%</td></tr>
<tr><td>2</td><td>\ud83d\udc27 \ud3ad\uadc4</td><td>598</td><td>5.98%</td></tr>
<tr><td>3</td><td>\ud83e\udea2 \uac70\uc704</td><td>596</td><td>5.96%</td></tr>
<tr><td>...</td><td>...</td><td>...</td><td>...</td></tr>
<tr><td>16</td><td>\ud83e\udd86 \uc624\ub9ac</td><td>527</td><td>5.27%</td></tr>
<tr><td>17</td><td>\ud83e\udd16 \ub85c\ubd07</td><td>521</td><td>5.21%</td></tr>
<tr><td>18</td><td>\ud83d\udc19 \ubb38\uc5b4</td><td>510</td><td>5.10%</td></tr>
</tbody></table>
<p><strong>\ud310\uc815:</strong> \uac00\uc7a5 \ud754\ud55c \uc885(\ud1a0\ub07c 5.99%)\uacfc \uac00\uc7a5 \ub4dc\ubb38 \uc885(\ubb38\uc5b4 5.10%)\uc758 \ucc28\uc774\ub294 1 \ud37c\uc13c\ud2b8 \ud3ec\uc778\ud2b8 \ubbf8\ub9cc\uc785\ub2c8\ub2e4. <strong>\uc228\uaca8\uc9c4 \uc885 \uac00\uc911\uce58\ub294 \uc5c6\uc2b5\ub2c8\ub2e4</strong> \u2014 \ubaa8\ub4e0 \uc885\uc774 \uc9c4\uc815\uc73c\ub85c \ub3d9\uc77c\ud558\uac8c \uac00\ub2a5\ud569\ub2c8\ub2e4.</p>`
          },
          {
            heading: '\ub208, \ubaa8\uc790 & \uc0e4\uc774\ub2c8: \ucf54\uc2a4\uba54\ud2f1 \ud655\ub960',
            body: `<p><strong>\ub208</strong>\uc740 6\uac00\uc9c0 \uc2a4\ud0c0\uc77c\uc5d0\uc11c \uade0\uc77c\ud558\uac8c \uc120\ud0dd\ub429\ub2c8\ub2e4. \uad00\ucc30 \ubc94\uc704\ub294 16.39%~17.11%(\uc608\uc0c1: \uac01 16.67%). \uc5b4\ub5a4 \ub208 \uc2a4\ud0c0\uc77c\ub3c4 \ub2e4\ub978 \uac83\ubcf4\ub2e4 \ud76c\uadc0\ud558\uc9c0 \uc54a\uc2b5\ub2c8\ub2e4.</p>
<p><strong>\ubaa8\uc790</strong>\ub294 Common\uc774 \uc544\ub2cc Buddy\uc5d0\ub9cc \uc801\uc6a9\ub429\ub2c8\ub2e4(N=3,973). 8\uac00\uc9c0 \ubaa8\uc790 \uc911 \uc655\uad00\uc774 13.29%\ub85c \uac00\uc7a5 \ub9ce\uace0, \ube44\ub2c8\uac00 11.30%\ub85c \uac00\uc7a5 \uc801\uc2b5\ub2c8\ub2e4(\uc608\uc0c1: 12.50%).</p>
<table><thead><tr><th>\ubaa8\uc790</th><th>\uc218</th><th>\uc2e4\uc81c %</th><th>\uc608\uc0c1 %</th></tr></thead><tbody>
<tr><td>\ud83d\udc51 \uc655\uad00</td><td>528</td><td>13.29%</td><td>12.50%</td></tr>
<tr><td>\ud83c\udfa9 \uc2e4\ud06c\ud587</td><td>517</td><td>13.01%</td><td>12.50%</td></tr>
<tr><td>\ud83e\uddf2 \ud504\ub85c\ud3a0\ub7ec</td><td>522</td><td>13.14%</td><td>12.50%</td></tr>
<tr><td>\ud83d\ude07 \ud6c4\uad11</td><td>485</td><td>12.21%</td><td>12.50%</td></tr>
<tr><td>\ud83e\uddd9 \ub9c8\ubc95\uc0ac</td><td>461</td><td>11.60%</td><td>12.50%</td></tr>
<tr><td>\ud83e\udde2 \ube44\ub2c8</td><td>449</td><td>11.30%</td><td>12.50%</td></tr>
<tr><td>\ud83e\udd86 \ubbf8\ub2c8\uc624\ub9ac</td><td>514</td><td>12.94%</td><td>12.50%</td></tr>
<tr><td>\u2205 \uc5c6\uc74c</td><td>497</td><td>12.51%</td><td>12.50%</td></tr>
</tbody></table>
<p><strong>\uc0e4\uc774\ub2c8 \ube44\uc728:</strong> 10,000\ub9c8\ub9ac \uc911 112\ub9c8\ub9ac\uac00 \uc0e4\uc774\ub2c8 \u2014 <strong>1.12%</strong> \ube44\uc728\ub85c \uc608\uc0c1 1.00%\ubcf4\ub2e4 \uc57d\uac04 \ub192\uc2b5\ub2c8\ub2e4. \ud76c\uadc0\ub3c4\ubcc4: Common 1.14%, Uncommon 1.20%, Rare 0.92%, Epic 0.99%, Legendary 0.00%. \uc0e4\uc774\ub2c8 \ud310\uc815\uc740 \ud76c\uadc0\ub3c4\uc640 \ub3c5\ub9bd\uc801\uc785\ub2c8\ub2e4.</p>`
          },
          {
            heading: '\uc2a4\ud0ef \uacbd\uc81c\ud559: \ud76c\uadc0\ub3c4\ubcc4 \ud3c9\uade0 \uc804\ud22c\ub825',
            body: `<p>\uac01 Buddy\ub294 5\uac00\uc9c0 \uc2a4\ud0ef(DEBUGGING, PATIENCE, CHAOS, WISDOM, SNARK)\uc744 \uac00\uc9c0\uba70, \ud76c\uadc0\ub3c4 \uae30\ubc18 \ud558\ud55c\uc73c\ub85c \uc0dd\uc131\ub429\ub2c8\ub2e4:</p>
<table><thead><tr><th>\ud76c\uadc0\ub3c4</th><th>DEBUGGING</th><th>PATIENCE</th><th>CHAOS</th><th>WISDOM</th><th>SNARK</th><th>\ucd1d\uc810</th></tr></thead><tbody>
<tr><td><strong>Common</strong></td><td>28.9</td><td>29.8</td><td>29.2</td><td>29.3</td><td>28.7</td><td>145.9</td></tr>
<tr><td><strong>Uncommon</strong></td><td>39.2</td><td>39.1</td><td>39.6</td><td>39.1</td><td>38.1</td><td>195.1</td></tr>
<tr><td><strong>Rare</strong></td><td>49.2</td><td>47.5</td><td>49.0</td><td>49.5</td><td>49.1</td><td>244.3</td></tr>
<tr><td><strong>Epic</strong></td><td>59.5</td><td>59.2</td><td>59.1</td><td>59.2</td><td>56.2</td><td>293.2</td></tr>
<tr><td><strong>Legendary</strong></td><td>68.0</td><td>70.6</td><td>72.3</td><td>70.3</td><td>71.2</td><td>352.4</td></tr>
</tbody></table>
<p><strong>\ud575\uc2ec \ubc1c\uacac:</strong> \uac01 \ud76c\uadc0\ub3c4 \ub4f1\uae09\uc740 \uc774\uc804 \ub4f1\uae09\ubcf4\ub2e4 \uc57d <strong>+50 \ucd1d \uc2a4\ud0ef \ud3ec\uc778\ud2b8</strong>\uac00 \uc99d\uac00\ud569\ub2c8\ub2e4. Legendary Buddy\ub294 \ud3c9\uade0 352\uc810\uc73c\ub85c Common\uc758 146\uc810\uc758 2.4\ubc30\uc785\ub2c8\ub2e4.</p>`
          },
          {
            heading: '\ud53c\ud06c \uc2a4\ud0ef \ubd84\ud3ec & \uc2a4\ud0ef \uadf9\uac12',
            body: `<p>\ud53c\ud06c \uc2a4\ud0ef\uc740 5\uac00\uc9c0 \uc635\uc158\uc5d0\uc11c \uade0\uc77c\ud558\uac8c \uc120\ud0dd\ub429\ub2c8\ub2e4:</p>
<table><thead><tr><th>\ud53c\ud06c \uc2a4\ud0ef</th><th>\uc218</th><th>\uc2e4\uc81c %</th><th>\uc608\uc0c1 %</th></tr></thead><tbody>
<tr><td>CHAOS</td><td>2,061</td><td>20.61%</td><td>20.00%</td></tr>
<tr><td>WISDOM</td><td>2,046</td><td>20.46%</td><td>20.00%</td></tr>
<tr><td>PATIENCE</td><td>2,002</td><td>20.02%</td><td>20.00%</td></tr>
<tr><td>DEBUGGING</td><td>1,968</td><td>19.68%</td><td>20.00%</td></tr>
<tr><td>SNARK</td><td>1,923</td><td>19.23%</td><td>20.00%</td></tr>
</tbody></table>
<p>\uc5b4\ub5a4 \uc2a4\ud0ef\ub3c4 \ud53c\ud06c\ub85c \uc120\ud638\ub418\uc9c0 \uc54a\uc2b5\ub2c8\ub2e4. \ubaa8\ub4e0 \uc2a4\ud0ef\uc774 min=1\uacfc max=100\uc5d0 \ub3c4\ub2ec\ud588\uc2b5\ub2c8\ub2e4.</p>`
          },
          {
            heading: '\ub808\uc804\ub354\ub9ac \uc0e4\uc774\ub2c8\ub97c \ucc3e\uc544\uc11c',
            body: `<p>Buddy \uc218\uc9d1\uc758 \uc131\ubc30: <strong>\ub808\uc804\ub354\ub9ac \uc0e4\uc774\ub2c8</strong>. \ud655\ub960\uc740 1%(\ub808\uc804\ub354\ub9ac) \u00d7 1%(\uc0e4\uc774\ub2c8) = <strong>0.01%</strong>, \uc989 10,000\ubd84\uc758 1\uc785\ub2c8\ub2e4. \uc815\ud655\ud788 10,000\ud68c \uc2dc\ubbac\ub808\uc774\uc158\uc5d0\uc11c:</p>
<p style="text-align:center;font-size:1.5em;"><strong>0\ub9c8\ub9ac \ub808\uc804\ub354\ub9ac \uc0e4\uc774\ub2c8 Buddy</strong></p>
<p>\uc774\uac83\uc740 \uc2e4\uc81c\ub85c \uac00\uc7a5 \uac00\ub2a5\uc131 \ub192\uc740 \uacb0\uacfc\uc785\ub2c8\ub2e4! \uae30\ub300\uac12 1.0\uc77c \ub54c \ud3ec\uc544\uc1a1 \ubd84\ud3ec\uc5d0 \ub530\ub974\uba74 10,000\ud68c\uc5d0\uc11c 0\uac1c\ub97c \ucc3e\uc744 \ud655\ub960\uc740 36.8%\uc785\ub2c8\ub2e4. \uc6b4\uc774 \ub098\uc058\uc9c0\ub9cc \ube44\uc815\uc0c1\uc801\uc774\uc9c0\ub294 \uc54a\uc2b5\ub2c8\ub2e4. 95% \ud655\ub960\ub85c \ucd5c\uc18c 1\ub9c8\ub9ac\ub97c \ubcf4\ub824\uba74 \uc57d <strong>30,000\ud68c</strong>\uac00 \ud544\uc694\ud569\ub2c8\ub2e4.</p>
<p>\uac00\uc7a5 \ud76c\uadc0\ud55c \uc870\ud569 \u2014 \ud2b9\uc815 \ub808\uc804\ub354\ub9ac \uc0e4\uc774\ub2c8 \uc885 + \ud2b9\uc815 \ubaa8\uc790, \ub208, \ud53c\ud06c \uc2a4\ud0ef \u2014 \uc758 \ud655\ub960\uc740 \uc57d <strong>8,640\ub9cc \ubd84\uc758 1</strong>\uc785\ub2c8\ub2e4.</p>`
          },
          {
            heading: '\uacb0\ub860',
            body: `<p>10,000\ud68c \uc2dc\ubbac\ub808\uc774\uc158 \ud6c4 \ud655\uc778\ud560 \uc218 \uc788\ub294 \uac83:</p>
<ul>
<li><strong>PRNG\ub294 \uacf5\uc815\ud569\ub2c8\ub2e4.</strong> FNV-1a\ub85c \uc2dc\ub4dc\ub41c Mulberry32\ub294 \ubaa8\ub4e0 \ucc28\uc6d0\uc5d0\uc11c \uc774\ub860\uc801 \uae30\ub300\uc5d0 \ubc00\uc811\ud558\uac8c \uc77c\uce58\ud558\ub294 \ubd84\ud3ec\ub97c \uc0dd\uc131\ud569\ub2c8\ub2e4.</li>
<li><strong>\uc228\uaca8\uc9c4 \uac00\uc911\uce58\ub294 \uc5c6\uc2b5\ub2c8\ub2e4.</strong> \uc885, \ub208, \ubaa8\uc790, \ud53c\ud06c \uc2a4\ud0ef \ubaa8\ub450 \ubb38\uc11c\ud654\ub41c \ub300\ub85c \uade0\uc77c\ud558\uac8c \ubd84\ud3ec\ub429\ub2c8\ub2e4.</li>
<li><strong>\ud76c\uadc0\ub3c4\ub294 \uc911\uc694\ud569\ub2c8\ub2e4.</strong> \uac01 \ub4f1\uae09\uc740 ~50 \ucd1d \uc2a4\ud0ef \ud3ec\uc778\ud2b8\ub97c \ucd94\uac00\ud558\uba70, Legendary\ub294 Common\uc758 2.4\ubc30\uc785\ub2c8\ub2e4.</li>
<li><strong>\uc0e4\uc774\ub2c8\ub294 \uc9c4\uc815\uc73c\ub85c \ud76c\uadc0\ud569\ub2c8\ub2e4.</strong> \uad00\ucc30 1.12%(\uc608\uc0c1 1.00%), \ud76c\uadc0\ub3c4\uc640 \ub3c5\ub9bd\uc801\uc785\ub2c8\ub2e4.</li>
<li><strong>\ub808\uc804\ub354\ub9ac \uc0e4\uc774\ub2c8\ub294 \uc720\ub2c8\ucf58\uc785\ub2c8\ub2e4.</strong> 10,000\ud68c\uc5d0\uc11c 0\ub9c8\ub9ac. \uc218\ud559\uc740 \ub9de\uc2b5\ub2c8\ub2e4 \u2014 \ube44\ubc94\ud55c \ud589\uc6b4\uc774\ub098 \ube44\ubc94\ud55c \uc778\ub0b4\uac00 \ud544\uc694\ud569\ub2c8\ub2e4.</li>
</ul>
<p>\uacb0\uc815\ub860\uc801 \uc0dd\uc131\uc758 \uc544\ub984\ub2e4\uc6c0\uc740 UUID\uac00 \uc0dd\uc131\ub41c \uc21c\uac04 Buddy\uac00 \uacb0\uc815\ub418\uc5c8\ub2e4\ub294 \uac83\uc785\ub2c8\ub2e4. \uc774 10,000\ud68c \uc2dc\ubbac\ub808\uc774\uc158\uc740 \uc8fc\uc0ac\uc704\uac00 \uacf5\uc815\ud568\uc744 \ud655\uc778\ud560 \ubfd0\uc785\ub2c8\ub2e4.</p>`
          },
        ],
      },
    },
  },
  // Article 9: How to Find Your UUID - Complete Platform Guide
  {
    slug: "find-your-uuid-complete-platform-guide",
    publishedAt: "2026-04-06",
    readingTime: 7,
    tags: ["guide", "tutorial", "uuid", "setup"],
    content: {
      en: {
        title: "Find Your UUID: Complete Guide for macOS, Windows & Linux",
        metaTitle: "Find Your Claude Code UUID - Step-by-Step Guide for macOS, Windows & Linux (2026)",
        metaDescription: "Complete guide to finding your Claude Code accountUuid or userID on macOS, Windows, and Linux. Includes terminal commands, file locations, troubleshooting tips, and format explanations.",
        excerpt: "Can't find your UUID? This platform-specific guide walks you through every method on macOS, Windows, and Linux — with terminal commands, file paths, and troubleshooting for common issues.",
        sections: [
          {
            heading: "Why You Need Your UUID",
            body: `<p>Your Claude Code <strong>Buddy</strong> is deterministically generated from your account identifier — either an <code>accountUuid</code> (UUID format like <code>acde070d-8c4c-4f0d-9d8a-162843c10333</code>) or a <code>userID</code> (hex string like <code>a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6</code>). Both work with our <a href="/">Buddy Checker</a>.</p>
<p>This identifier is stored locally in your Claude configuration file at <code>~/.claude.json</code>. It is <strong>not a credential</strong> — it cannot be used to authenticate or impersonate your account. It's simply the seed that determines which of the 18 species, 5 rarity tiers, and countless stat combinations your Buddy will have.</p>
<p>Below we cover <strong>every method</strong> on all three major platforms, plus troubleshooting for common issues.</p>`
          },
          {
            heading: "Method 1: Terminal Command (Recommended)",
            body: `<p>The fastest and most reliable method. Open your terminal and run a single command.</p>
<h4>macOS (Terminal / iTerm2)</h4>
<p>Open <strong>Terminal.app</strong> (or iTerm2) and run:</p>
<pre><code>cat ~/.claude.json | grep -E 'accountUuid|userID'</code></pre>
<p>You should see output like:</p>
<pre><code>"accountUuid": "acde070d-8c4c-4f0d-9d8a-162843c10333"</code></pre>
<img src="https://d2xsxph8kpxj0f.cloudfront.net/310519663372140411/Y5jHNXbtf5LuBgzrPqTPag/blog-uuid-macos-terminal-Xbuydjbb6cT3r8mt9mMgTi.webp" alt="macOS Terminal showing the grep command to find accountUuid" style="width:100%;border-radius:8px;margin:16px 0;border:1px solid rgba(51,255,51,0.2);" />
<h4>Windows (PowerShell)</h4>
<p>Open <strong>PowerShell</strong> (press <code>Win + X</code> → "Windows PowerShell") and run:</p>
<pre><code>Select-String 'accountUuid|userID' ~\\.claude.json</code></pre>
<p>The output will show the matching line with your UUID:</p>
<img src="https://d2xsxph8kpxj0f.cloudfront.net/310519663372140411/Y5jHNXbtf5LuBgzrPqTPag/blog-uuid-windows-powershell-KATBboDrf35bepwaH3uvNU.webp" alt="Windows PowerShell showing the Select-String command to find accountUuid" style="width:100%;border-radius:8px;margin:16px 0;border:1px solid rgba(51,255,51,0.2);" />
<h4>Linux (Bash / Zsh)</h4>
<p>Open your terminal emulator and run the same command as macOS:</p>
<pre><code>cat ~/.claude.json | grep -E 'accountUuid|userID'</code></pre>
<img src="https://d2xsxph8kpxj0f.cloudfront.net/310519663372140411/Y5jHNXbtf5LuBgzrPqTPag/blog-uuid-linux-terminal-WfgKR4Mq46YhgArN2pqvMn.webp" alt="Linux Terminal showing the grep command to find accountUuid" style="width:100%;border-radius:8px;margin:16px 0;border:1px solid rgba(51,255,51,0.2);" />
<p><strong>Tip:</strong> If you get "No such file or directory", it means Claude Code hasn't created the config file yet. Make sure you've opened Claude Code at least once and signed in.</p>`
          },
          {
            heading: "Method 2: Open the Config File Manually",
            body: `<p>If you prefer a visual approach, you can open the configuration file directly in any text editor.</p>
<h4>File Location</h4>
<table>
<tr><th>Platform</th><th>File Path</th></tr>
<tr><td>macOS</td><td><code>~/.claude.json</code> → <code>/Users/yourname/.claude.json</code></td></tr>
<tr><td>Windows</td><td><code>~\\.claude.json</code> → <code>C:\\Users\\yourname\\.claude.json</code></td></tr>
<tr><td>Linux</td><td><code>~/.claude.json</code> → <code>/home/yourname/.claude.json</code></td></tr>
</table>
<p><strong>Note:</strong> The file starts with a dot (<code>.</code>), which means it's hidden by default on macOS and Linux.</p>
<h4>How to Show Hidden Files</h4>
<ul>
<li><strong>macOS Finder:</strong> Press <code>Cmd + Shift + .</code> (period) to toggle hidden files</li>
<li><strong>Windows Explorer:</strong> Click "View" tab → check "Hidden items"</li>
<li><strong>Linux (Nautilus):</strong> Press <code>Ctrl + H</code> to show hidden files</li>
</ul>
<h4>What to Look For</h4>
<p>Open the file in VS Code, Notepad, or any text editor. Look for these fields:</p>
<img src="https://d2xsxph8kpxj0f.cloudfront.net/310519663372140411/Y5jHNXbtf5LuBgzrPqTPag/blog-uuid-claude-json-file-cB3qe6fz3BKeF4uhs5v9Lx.webp" alt="VS Code showing .claude.json file with accountUuid highlighted" style="width:100%;border-radius:8px;margin:16px 0;border:1px solid rgba(51,255,51,0.2);" />
<p>You're looking for either:</p>
<ul>
<li><code>"accountUuid"</code> — inside the <code>oauthAccount</code> object (UUID format with dashes)</li>
<li><code>"userID"</code> — at the top level of the JSON (hex string without dashes)</li>
</ul>
<p>Either one works with our Buddy Checker. Copy the value (without quotes) and paste it into the <a href="/">checker tool</a>.</p>`
          },
          {
            heading: "Understanding UUID Formats",
            body: `<p>Our Buddy Checker accepts two different identifier formats. Here's how to tell them apart:</p>
<table>
<tr><th>Format</th><th>Field Name</th><th>Example</th><th>Where Found</th></tr>
<tr><td><strong>accountUuid</strong></td><td>accountUuid</td><td><code>acde070d-8c4c-4f0d-9d8a-162843c10333</code></td><td>Inside <code>oauthAccount</code> object</td></tr>
<tr><td><strong>userID</strong></td><td>userID</td><td><code>a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6</code></td><td>Top-level field in JSON</td></tr>
</table>
<p><strong>Which one should I use?</strong> Either works! The Buddy Checker automatically detects the format when you paste it in. You'll see a green indicator for accountUuid format or an amber indicator for userID format.</p>
<p><strong>Are they the same?</strong> No — they're different identifiers for the same account. The <code>accountUuid</code> is typically used by OAuth/Team/Pro accounts, while <code>userID</code> is an older format. Both produce valid Buddy results through different code paths in the generation algorithm.</p>`
          },
          {
            heading: "Troubleshooting",
            body: `<h4>"File not found" or "No such file"</h4>
<p>The <code>.claude.json</code> file is created when you first sign into Claude Code. If it doesn't exist:</p>
<ol>
<li>Open Claude Code in your terminal (<code>claude</code> command)</li>
<li>Sign in with your Anthropic account</li>
<li>Close Claude Code</li>
<li>Try the command again — the file should now exist</li>
</ol>
<h4>"Permission denied"</h4>
<p>On macOS/Linux, try:</p>
<pre><code>chmod 644 ~/.claude.json && cat ~/.claude.json | grep -E 'accountUuid|userID'</code></pre>
<h4>File exists but no accountUuid or userID found</h4>
<p>Your config file might have a different structure. Try viewing the entire file:</p>
<pre><code>cat ~/.claude.json</code></pre>
<p>Or on Windows:</p>
<pre><code>Get-Content ~\\.claude.json</code></pre>
<p>Look for any field containing a UUID-like string (8-4-4-4-12 format with dashes) or a long hexadecimal string (32+ characters, only 0-9 and a-f).</p>
<h4>"Can I ask Claude Code for my UUID?"</h4>
<p>This method is <strong>not reliable</strong>. Claude Code is an AI assistant, and its ability to read local files depends on version, permissions, and sandbox restrictions. We recommend using the terminal command or manual file inspection methods described above.</p>`
          },
          {
            heading: "Security & Privacy",
            body: `<p>A common concern: <strong>"Is it safe to share my UUID?"</strong></p>
<p>Yes. Your <code>accountUuid</code> and <code>userID</code> are <strong>not credentials</strong>. They cannot be used to:</p>
<ul>
<li>Log into your account</li>
<li>Access your conversations or data</li>
<li>Make API calls on your behalf</li>
<li>Impersonate you in any way</li>
</ul>
<p>They are simply identifiers used internally by Claude Code to generate your Buddy. Our <a href="/">Buddy Checker</a> runs the generation algorithm <strong>entirely in your browser</strong> — your UUID is never sent to any server.</p>
<p>That said, if you prefer to keep your UUID private, that's perfectly fine too. You can check your Buddy without sharing it with anyone.</p>`
          },
          {
            heading: "Next Steps",
            body: `<p>Found your UUID? Here's what to do next:</p>
<ol>
<li><strong><a href="/">Check your Buddy</a></strong> — paste your UUID into the checker and discover your companion</li>
<li><strong><a href="/species">Browse all 18 species</a></strong> — learn about each species' lore, stats, and rarity</li>
<li><strong>Share your result</strong> — use the Share Card feature to generate a social media-ready image of your Buddy</li>
<li><strong><a href="/blog/claude-code-buddy-rarity-guide">Understand your rarity</a></strong> — learn what your rarity tier means for your stats</li>
</ol>
<p>Remember: your Buddy is already determined. The same UUID will always produce the same result. Check it now before the official <code>/buddy</code> command launches!</p>`
          },
        ],
      },
      zh: {
        title: "查找你的 UUID：macOS、Windows 和 Linux 完整指南",
        metaTitle: "查找你的 Claude Code UUID - macOS、Windows 和 Linux 分步指南 (2026)",
        metaDescription: "在 macOS、Windows 和 Linux 上查找 Claude Code accountUuid 或 userID 的完整指南。包含终端命令、文件位置、故障排除和格式说明。",
        excerpt: "找不到你的 UUID？这份平台专属指南将带你逐步在 macOS、Windows 和 Linux 上完成操作——包含终端命令、文件路径和常见问题排除。",
        sections: [
          {
            heading: "为什么需要你的 UUID",
            body: `<p>你的 Claude Code <strong>Buddy</strong> 是根据你的账户标识符确定性生成的——可以是 <code>accountUuid</code>（UUID 格式，如 <code>acde070d-8c4c-4f0d-9d8a-162843c10333</code>）或 <code>userID</code>（十六进制字符串，如 <code>a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6</code>）。两者都可以在我们的 <a href="/">Buddy 查询器</a>中使用。</p>
<p>这个标识符存储在你本地的 Claude 配置文件 <code>~/.claude.json</code> 中。它<strong>不是凭证</strong>——不能用于身份验证或冒充你的账户。它只是决定你的 Buddy 属于 18 个物种中的哪一个、5 个稀有度等级中的哪一级，以及无数属性组合中的哪一种的种子。</p>
<p>下面我们将介绍三大平台上的<strong>所有方法</strong>，以及常见问题的排除方案。</p>`
          },
          {
            heading: "方法一：终端命令（推荐）",
            body: `<p>最快速、最可靠的方法。打开终端，运行一行命令即可。</p>
<h4>macOS（终端 / iTerm2）</h4>
<p>打开 <strong>Terminal.app</strong>（或 iTerm2），运行：</p>
<pre><code>cat ~/.claude.json | grep -E 'accountUuid|userID'</code></pre>
<p>你应该看到类似这样的输出：</p>
<pre><code>"accountUuid": "acde070d-8c4c-4f0d-9d8a-162843c10333"</code></pre>
<img src="https://d2xsxph8kpxj0f.cloudfront.net/310519663372140411/Y5jHNXbtf5LuBgzrPqTPag/blog-uuid-macos-terminal-Xbuydjbb6cT3r8mt9mMgTi.webp" alt="macOS 终端显示 grep 命令查找 accountUuid" style="width:100%;border-radius:8px;margin:16px 0;border:1px solid rgba(51,255,51,0.2);" />
<h4>Windows（PowerShell）</h4>
<p>打开 <strong>PowerShell</strong>（按 <code>Win + X</code> → 选择"Windows PowerShell"），运行：</p>
<pre><code>Select-String 'accountUuid|userID' ~\\.claude.json</code></pre>
<p>输出会显示包含你 UUID 的匹配行：</p>
<img src="https://d2xsxph8kpxj0f.cloudfront.net/310519663372140411/Y5jHNXbtf5LuBgzrPqTPag/blog-uuid-windows-powershell-KATBboDrf35bepwaH3uvNU.webp" alt="Windows PowerShell 显示 Select-String 命令查找 accountUuid" style="width:100%;border-radius:8px;margin:16px 0;border:1px solid rgba(51,255,51,0.2);" />
<h4>Linux（Bash / Zsh）</h4>
<p>打开终端模拟器，运行与 macOS 相同的命令：</p>
<pre><code>cat ~/.claude.json | grep -E 'accountUuid|userID'</code></pre>
<img src="https://d2xsxph8kpxj0f.cloudfront.net/310519663372140411/Y5jHNXbtf5LuBgzrPqTPag/blog-uuid-linux-terminal-WfgKR4Mq46YhgArN2pqvMn.webp" alt="Linux 终端显示 grep 命令查找 accountUuid" style="width:100%;border-radius:8px;margin:16px 0;border:1px solid rgba(51,255,51,0.2);" />
<p><strong>提示：</strong>如果提示"No such file or directory"（文件不存在），说明 Claude Code 还没有创建配置文件。请确保你已经至少打开过一次 Claude Code 并完成登录。</p>`
          },
          {
            heading: "方法二：手动打开配置文件",
            body: `<p>如果你更喜欢可视化操作，可以直接用文本编辑器打开配置文件。</p>
<h4>文件位置</h4>
<table>
<tr><th>平台</th><th>文件路径</th></tr>
<tr><td>macOS</td><td><code>~/.claude.json</code> → <code>/Users/你的用户名/.claude.json</code></td></tr>
<tr><td>Windows</td><td><code>~\\.claude.json</code> → <code>C:\\Users\\你的用户名\\.claude.json</code></td></tr>
<tr><td>Linux</td><td><code>~/.claude.json</code> → <code>/home/你的用户名/.claude.json</code></td></tr>
</table>
<p><strong>注意：</strong>文件名以点（<code>.</code>）开头，这意味着在 macOS 和 Linux 上默认是隐藏的。</p>
<h4>如何显示隐藏文件</h4>
<ul>
<li><strong>macOS Finder：</strong>按 <code>Cmd + Shift + .</code>（句号）切换显示隐藏文件</li>
<li><strong>Windows 资源管理器：</strong>点击"查看"选项卡 → 勾选"隐藏的项目"</li>
<li><strong>Linux（Nautilus）：</strong>按 <code>Ctrl + H</code> 显示隐藏文件</li>
</ul>
<h4>要找什么</h4>
<p>用 VS Code、记事本或任何文本编辑器打开文件，查找以下字段：</p>
<img src="https://d2xsxph8kpxj0f.cloudfront.net/310519663372140411/Y5jHNXbtf5LuBgzrPqTPag/blog-uuid-claude-json-file-cB3qe6fz3BKeF4uhs5v9Lx.webp" alt="VS Code 显示 .claude.json 文件，accountUuid 高亮显示" style="width:100%;border-radius:8px;margin:16px 0;border:1px solid rgba(51,255,51,0.2);" />
<p>你要找的是：</p>
<ul>
<li><code>"accountUuid"</code> — 在 <code>oauthAccount</code> 对象内（UUID 格式，带连字符）</li>
<li><code>"userID"</code> — 在 JSON 的顶层（十六进制字符串，不带连字符）</li>
</ul>
<p>两者都可以在 Buddy 查询器中使用。复制值（不含引号），粘贴到<a href="/">查询工具</a>即可。</p>`
          },
          {
            heading: "理解 UUID 格式",
            body: `<p>我们的 Buddy 查询器接受两种不同的标识符格式。以下是区分方法：</p>
<table>
<tr><th>格式</th><th>字段名</th><th>示例</th><th>位置</th></tr>
<tr><td><strong>accountUuid</strong></td><td>accountUuid</td><td><code>acde070d-8c4c-4f0d-9d8a-162843c10333</code></td><td><code>oauthAccount</code> 对象内</td></tr>
<tr><td><strong>userID</strong></td><td>userID</td><td><code>a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6</code></td><td>JSON 顶层字段</td></tr>
</table>
<p><strong>应该用哪个？</strong>都可以！Buddy 查询器会在你粘贴时自动检测格式。accountUuid 格式会显示绿色指示器，userID 格式会显示琥珀色指示器。</p>
<p><strong>它们是一样的吗？</strong>不是——它们是同一账户的不同标识符。<code>accountUuid</code> 通常用于 OAuth/团队/Pro 账户，而 <code>userID</code> 是较旧的格式。两者都能通过生成算法中不同的代码路径产生有效的 Buddy 结果。</p>`
          },
          {
            heading: "故障排除",
            body: `<h4>"文件不存在"或"No such file"</h4>
<p><code>.claude.json</code> 文件在你首次登录 Claude Code 时创建。如果文件不存在：</p>
<ol>
<li>在终端中打开 Claude Code（运行 <code>claude</code> 命令）</li>
<li>用你的 Anthropic 账户登录</li>
<li>关闭 Claude Code</li>
<li>重新运行命令——文件现在应该存在了</li>
</ol>
<h4>"权限被拒绝"（Permission denied）</h4>
<p>在 macOS/Linux 上，尝试：</p>
<pre><code>chmod 644 ~/.claude.json && cat ~/.claude.json | grep -E 'accountUuid|userID'</code></pre>
<h4>文件存在但找不到 accountUuid 或 userID</h4>
<p>你的配置文件可能有不同的结构。尝试查看整个文件：</p>
<pre><code>cat ~/.claude.json</code></pre>
<p>或在 Windows 上：</p>
<pre><code>Get-Content ~\\.claude.json</code></pre>
<p>查找任何包含 UUID 格式字符串（8-4-4-4-12 格式，带连字符）或长十六进制字符串（32+ 个字符，仅包含 0-9 和 a-f）的字段。</p>
<h4>"能不能直接问 Claude Code 要 UUID？"</h4>
<p>这个方法<strong>不太可靠</strong>。Claude Code 是一个 AI 助手，它能否读取本地文件取决于版本、权限和沙箱限制。我们建议使用上述终端命令或手动查看文件的方法。</p>`
          },
          {
            heading: "安全与隐私",
            body: `<p>一个常见的顾虑：<strong>"分享我的 UUID 安全吗？"</strong></p>
<p>安全。你的 <code>accountUuid</code> 和 <code>userID</code> <strong>不是凭证</strong>。它们不能用于：</p>
<ul>
<li>登录你的账户</li>
<li>访问你的对话或数据</li>
<li>以你的名义进行 API 调用</li>
<li>以任何方式冒充你</li>
</ul>
<p>它们只是 Claude Code 内部用于生成 Buddy 的标识符。我们的 <a href="/">Buddy 查询器</a>在你的<strong>浏览器中完全本地运行</strong>生成算法——你的 UUID 永远不会被发送到任何服务器。</p>
<p>当然，如果你更愿意保密你的 UUID，那也完全没问题。你可以在不与任何人分享的情况下查看你的 Buddy。</p>`
          },
          {
            heading: "下一步",
            body: `<p>找到你的 UUID 了？接下来可以：</p>
<ol>
<li><strong><a href="/">查询你的 Buddy</a></strong> — 将 UUID 粘贴到查询器中，发现你的伙伴</li>
<li><strong><a href="/species">浏览全部 18 个物种</a></strong> — 了解每个物种的传说、属性和稀有度</li>
<li><strong>分享你的结果</strong> — 使用分享卡片功能生成适合社交媒体的 Buddy 图片</li>
<li><strong><a href="/blog/claude-code-buddy-rarity-guide">了解你的稀有度</a></strong> — 了解你的稀有度等级对属性的影响</li>
</ol>
<p>记住：你的 Buddy 已经确定了。相同的 UUID 永远产生相同的结果。在官方 <code>/buddy</code> 命令上线前先来查看吧！</p>`
          },
        ],
      },
      ko: {
        title: "UUID 찾기: macOS, Windows, Linux 완전 가이드",
        metaTitle: "Claude Code UUID 찾기 - macOS, Windows, Linux 단계별 가이드 (2026)",
        metaDescription: "macOS, Windows, Linux에서 Claude Code accountUuid 또는 userID를 찾는 완전한 가이드. 터미널 명령어, 파일 위치, 문제 해결 및 형식 설명 포함.",
        excerpt: "UUID를 찾을 수 없나요? 이 플랫폼별 가이드가 macOS, Windows, Linux에서 단계별로 안내합니다 — 터미널 명령어, 파일 경로, 일반적인 문제 해결 방법 포함.",
        sections: [
          {
            heading: "UUID가 필요한 이유",
            body: `<p>Claude Code <strong>Buddy</strong>는 계정 식별자에서 결정론적으로 생성됩니다 — <code>accountUuid</code>(UUID 형식: <code>acde070d-8c4c-4f0d-9d8a-162843c10333</code>) 또는 <code>userID</code>(16진수 문자열: <code>a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6</code>). 두 가지 모두 <a href="/">Buddy 체커</a>에서 사용할 수 있습니다.</p>
<p>이 식별자는 로컬 Claude 설정 파일 <code>~/.claude.json</code>에 저장됩니다. 이것은 <strong>자격 증명이 아닙니다</strong> — 계정 인증이나 사칭에 사용할 수 없습니다. 단지 18종의 종, 5단계 희귀도, 수많은 스탯 조합 중 어떤 Buddy를 받게 될지 결정하는 시드일 뿐입니다.</p>
<p>아래에서 세 가지 주요 플랫폼의 <strong>모든 방법</strong>과 일반적인 문제 해결 방법을 다룹니다.</p>`
          },
          {
            heading: "방법 1: 터미널 명령어 (권장)",
            body: `<p>가장 빠르고 안정적인 방법입니다. 터미널을 열고 한 줄 명령어를 실행하세요.</p>
<h4>macOS (터미널 / iTerm2)</h4>
<p><strong>Terminal.app</strong>(또는 iTerm2)을 열고 실행:</p>
<pre><code>cat ~/.claude.json | grep -E 'accountUuid|userID'</code></pre>
<p>다음과 같은 출력이 표시됩니다:</p>
<pre><code>"accountUuid": "acde070d-8c4c-4f0d-9d8a-162843c10333"</code></pre>
<img src="https://d2xsxph8kpxj0f.cloudfront.net/310519663372140411/Y5jHNXbtf5LuBgzrPqTPag/blog-uuid-macos-terminal-Xbuydjbb6cT3r8mt9mMgTi.webp" alt="macOS 터미널에서 accountUuid를 찾는 grep 명령어" style="width:100%;border-radius:8px;margin:16px 0;border:1px solid rgba(51,255,51,0.2);" />
<h4>Windows (PowerShell)</h4>
<p><strong>PowerShell</strong>을 열고 (<code>Win + X</code> → "Windows PowerShell") 실행:</p>
<pre><code>Select-String 'accountUuid|userID' ~\\.claude.json</code></pre>
<p>UUID가 포함된 일치하는 줄이 출력됩니다:</p>
<img src="https://d2xsxph8kpxj0f.cloudfront.net/310519663372140411/Y5jHNXbtf5LuBgzrPqTPag/blog-uuid-windows-powershell-KATBboDrf35bepwaH3uvNU.webp" alt="Windows PowerShell에서 accountUuid를 찾는 Select-String 명령어" style="width:100%;border-radius:8px;margin:16px 0;border:1px solid rgba(51,255,51,0.2);" />
<h4>Linux (Bash / Zsh)</h4>
<p>터미널 에뮬레이터를 열고 macOS와 동일한 명령어를 실행:</p>
<pre><code>cat ~/.claude.json | grep -E 'accountUuid|userID'</code></pre>
<img src="https://d2xsxph8kpxj0f.cloudfront.net/310519663372140411/Y5jHNXbtf5LuBgzrPqTPag/blog-uuid-linux-terminal-WfgKR4Mq46YhgArN2pqvMn.webp" alt="Linux 터미널에서 accountUuid를 찾는 grep 명령어" style="width:100%;border-radius:8px;margin:16px 0;border:1px solid rgba(51,255,51,0.2);" />
<p><strong>팁:</strong> "No such file or directory" 오류가 나타나면 Claude Code가 아직 설정 파일을 생성하지 않은 것입니다. Claude Code를 최소 한 번 열고 로그인했는지 확인하세요.</p>`
          },
          {
            heading: "방법 2: 설정 파일 직접 열기",
            body: `<p>시각적인 방법을 선호한다면 텍스트 편집기에서 설정 파일을 직접 열 수 있습니다.</p>
<h4>파일 위치</h4>
<table>
<tr><th>플랫폼</th><th>파일 경로</th></tr>
<tr><td>macOS</td><td><code>~/.claude.json</code> → <code>/Users/사용자이름/.claude.json</code></td></tr>
<tr><td>Windows</td><td><code>~\\.claude.json</code> → <code>C:\\Users\\사용자이름\\.claude.json</code></td></tr>
<tr><td>Linux</td><td><code>~/.claude.json</code> → <code>/home/사용자이름/.claude.json</code></td></tr>
</table>
<p><strong>참고:</strong> 파일 이름이 점(<code>.</code>)으로 시작하므로 macOS와 Linux에서는 기본적으로 숨겨져 있습니다.</p>
<h4>숨김 파일 표시 방법</h4>
<ul>
<li><strong>macOS Finder:</strong> <code>Cmd + Shift + .</code>(마침표)를 눌러 숨김 파일 표시 전환</li>
<li><strong>Windows 탐색기:</strong> "보기" 탭 클릭 → "숨긴 항목" 체크</li>
<li><strong>Linux (Nautilus):</strong> <code>Ctrl + H</code>를 눌러 숨김 파일 표시</li>
</ul>
<h4>찾아야 할 것</h4>
<p>VS Code, 메모장 또는 아무 텍스트 편집기에서 파일을 열고 다음 필드를 찾으세요:</p>
<img src="https://d2xsxph8kpxj0f.cloudfront.net/310519663372140411/Y5jHNXbtf5LuBgzrPqTPag/blog-uuid-claude-json-file-cB3qe6fz3BKeF4uhs5v9Lx.webp" alt="VS Code에서 .claude.json 파일의 accountUuid 하이라이트" style="width:100%;border-radius:8px;margin:16px 0;border:1px solid rgba(51,255,51,0.2);" />
<p>찾아야 할 것:</p>
<ul>
<li><code>"accountUuid"</code> — <code>oauthAccount</code> 객체 안 (대시가 있는 UUID 형식)</li>
<li><code>"userID"</code> — JSON 최상위 레벨 (대시 없는 16진수 문자열)</li>
</ul>
<p>둘 다 Buddy 체커에서 사용할 수 있습니다. 값을 복사(따옴표 제외)하여 <a href="/">체커 도구</a>에 붙여넣으세요.</p>`
          },
          {
            heading: "UUID 형식 이해하기",
            body: `<p>Buddy 체커는 두 가지 다른 식별자 형식을 허용합니다. 구별 방법은 다음과 같습니다:</p>
<table>
<tr><th>형식</th><th>필드명</th><th>예시</th><th>위치</th></tr>
<tr><td><strong>accountUuid</strong></td><td>accountUuid</td><td><code>acde070d-8c4c-4f0d-9d8a-162843c10333</code></td><td><code>oauthAccount</code> 객체 안</td></tr>
<tr><td><strong>userID</strong></td><td>userID</td><td><code>a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6</code></td><td>JSON 최상위 필드</td></tr>
</table>
<p><strong>어떤 것을 사용해야 하나요?</strong> 둘 다 됩니다! Buddy 체커는 붙여넣기 시 형식을 자동으로 감지합니다. accountUuid 형식은 녹색 표시기, userID 형식은 호박색 표시기가 나타납니다.</p>
<p><strong>같은 건가요?</strong> 아닙니다 — 같은 계정의 다른 식별자입니다. <code>accountUuid</code>는 일반적으로 OAuth/팀/Pro 계정에서 사용되고, <code>userID</code>는 이전 형식입니다. 둘 다 생성 알고리즘의 다른 코드 경로를 통해 유효한 Buddy 결과를 생성합니다.</p>`
          },
          {
            heading: "문제 해결",
            body: `<h4>"파일을 찾을 수 없음" 또는 "No such file"</h4>
<p><code>.claude.json</code> 파일은 Claude Code에 처음 로그인할 때 생성됩니다. 파일이 없다면:</p>
<ol>
<li>터미널에서 Claude Code를 엽니다 (<code>claude</code> 명령어)</li>
<li>Anthropic 계정으로 로그인합니다</li>
<li>Claude Code를 닫습니다</li>
<li>명령어를 다시 실행합니다 — 이제 파일이 있어야 합니다</li>
</ol>
<h4>"권한 거부" (Permission denied)</h4>
<p>macOS/Linux에서 시도:</p>
<pre><code>chmod 644 ~/.claude.json && cat ~/.claude.json | grep -E 'accountUuid|userID'</code></pre>
<h4>파일은 있지만 accountUuid나 userID를 찾을 수 없음</h4>
<p>설정 파일의 구조가 다를 수 있습니다. 전체 파일을 확인해 보세요:</p>
<pre><code>cat ~/.claude.json</code></pre>
<p>또는 Windows에서:</p>
<pre><code>Get-Content ~\\.claude.json</code></pre>
<p>UUID 형식 문자열(대시가 있는 8-4-4-4-12 형식) 또는 긴 16진수 문자열(32자 이상, 0-9와 a-f만 포함)이 있는 필드를 찾으세요.</p>
<h4>"Claude Code에 직접 UUID를 물어볼 수 있나요?"</h4>
<p>이 방법은 <strong>신뢰할 수 없습니다</strong>. Claude Code는 AI 어시스턴트이며, 로컬 파일을 읽을 수 있는지는 버전, 권한, 샌드박스 제한에 따라 다릅니다. 위에서 설명한 터미널 명령어나 수동 파일 확인 방법을 권장합니다.</p>`
          },
          {
            heading: "보안 및 개인정보",
            body: `<p>일반적인 우려: <strong>"UUID를 공유해도 안전한가요?"</strong></p>
<p>네, 안전합니다. <code>accountUuid</code>와 <code>userID</code>는 <strong>자격 증명이 아닙니다</strong>. 다음과 같은 용도로 사용할 수 없습니다:</p>
<ul>
<li>계정 로그인</li>
<li>대화나 데이터 접근</li>
<li>대신 API 호출</li>
<li>어떤 방식으로든 사칭</li>
</ul>
<p>이것들은 단순히 Claude Code가 내부적으로 Buddy를 생성하는 데 사용하는 식별자입니다. <a href="/">Buddy 체커</a>는 생성 알고리즘을 <strong>브라우저에서 완전히 로컬로</strong> 실행합니다 — UUID는 어떤 서버로도 전송되지 않습니다.</p>
<p>물론 UUID를 비공개로 유지하고 싶다면 그것도 완전히 괜찮습니다. 누구와도 공유하지 않고 Buddy를 확인할 수 있습니다.</p>`
          },
          {
            heading: "다음 단계",
            body: `<p>UUID를 찾았나요? 다음으로 할 일:</p>
<ol>
<li><strong><a href="/">Buddy 확인하기</a></strong> — UUID를 체커에 붙여넣고 동반자를 발견하세요</li>
<li><strong><a href="/species">18종 모두 둘러보기</a></strong> — 각 종의 전설, 스탯, 희귀도에 대해 알아보세요</li>
<li><strong>결과 공유하기</strong> — 공유 카드 기능으로 소셜 미디어에 적합한 Buddy 이미지를 생성하세요</li>
<li><strong><a href="/blog/claude-code-buddy-rarity-guide">희귀도 이해하기</a></strong> — 희귀도 등급이 스탯에 미치는 영향을 알아보세요</li>
</ol>
<p>기억하세요: Buddy는 이미 결정되어 있습니다. 같은 UUID는 항상 같은 결과를 만듭니다. 공식 <code>/buddy</code> 명령어가 출시되기 전에 지금 확인하세요!</p>`
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

export function getAdjacentArticles(slug: string): {
  prev: BlogArticle | null;
  next: BlogArticle | null;
} {
  const idx = BLOG_ARTICLES.findIndex((a) => a.slug === slug);
  if (idx === -1) return { prev: null, next: null };
  return {
    prev: idx > 0 ? BLOG_ARTICLES[idx - 1] : null,
    next: idx < BLOG_ARTICLES.length - 1 ? BLOG_ARTICLES[idx + 1] : null,
  };
}
