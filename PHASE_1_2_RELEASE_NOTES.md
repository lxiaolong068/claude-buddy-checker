# Phase 1+2 Release Notes

**发布日期**:2026-04-23
**生产 URL**:https://www.claudebuddy.art
**Git 范围**:`5ea9f71..a75ac33`(15 commits)

---

## TL;DR

30 秒版:Claude Buddy Checker 从"SPA 工具站 + 31 篇博客"升级为"静态预渲染 + 165 个 JSON-LD 富摘要 + 37 篇内容"的 SEO 权威站。Google Rich Results Test 四类代表页全部 Valid。

一句话:**SPA shell 里零 JSON-LD → 静态 HTML 里 195 个 JSON-LD,Google 能直接读**。

---

## Before / After 数据看板

| 指标 | Phase 1 前 | 今日生产 | 变化 |
|---|---|---|---|
| Blog 文章数 | 31 | **37** | +6 |
| 预渲染路由数 | 57 | **62** | +5 |
| 静态 HTML JSON-LD 总量 | **0** | **~195** | +195 |
| 平均 JSON-LD / 页 | 0 | **3.0** | +3.0 |
| FAQPage(blog) | 0 | **7** | +7(30 Q/A)|
| Canonical 错误页 | 5 | **0** | -5 |
| cleanUrls / trailing slash | 不一致 | 一致 | ✓ |
| 静态资产 Cache-Control | `max-age=0` | `immutable` | ✓ |
| Rich Results Valid | — | **全部通过** | Google 官方认证 |
| Pillar 覆盖 | buddy 单支柱 | buddy / claude-code / trends | +2 支柱 |

---

## Phase 1 — 技术 SEO 改造

### 1B.1 Playwright 快照预渲染(构建期)

**问题**:所有 JSON-LD Schema 仅在 React hydration 后由客户端注入,Googlebot Fast Fetch 看到的静态 HTML 零 Schema,全部失效。

**方案**:`vite build` 后启动 express 静态服务 + Playwright Chromium,逐页抓取 hydrated HTML 写回 `dist/public/<route>/index.html`。路由源:`sitemap.xml`。

**关键产物**:
- `scripts/prerender.mjs` — 双 backend 脚本(本地 playwright / Vercel sparticuz)
- `package.json` — 新增 `build` / `build:vercel` / `prerender` 脚本

**性能**:57-62 路由,全量耗时 25-30 秒(本地),~110 秒(Vercel 含 sparticuz 加载)

### 1B.2 Server 瘦身

**删除**:`server/index.ts` 里的 `injectOgMeta()` / `esc()` / `getBaseHtml()` 逻辑(运行时 OG meta regex 注入,在预渲染上线后 100% 冗余)

**结果**:server bundle 23.7 KB → **20.8 KB**,代码 130 行 → **55 行**

### 1C Canonical 修复 + PageSchema 补齐

**问题**:5 页(`/collection`、`/compare`、`/powerup-tracker`、`/revive`、`/hidden-features`)canonical 回落到首页,Google 视为重复内容合并。6 页(加上 `/species`)完全无 Schema。

**方案**:
1. `useHreflangLinks` hook 扩展集成 canonical 设置 — **单点修复 5 页**(无需逐页改动)
2. 新增 `client/src/components/PageSchema.tsx` 通用组件(WebPage + BreadcrumbList)
3. 6 页接入 PageSchema
4. `BuddyProfilePage` 新增 `noindex, follow` meta(UUID 空间无限,不应被索引)

### 1D Vercel 配置

三次迭代:
1. **cleanUrls + trailingSlash**:彻底消除 canonical loop(`/foo/` → 308 → `/foo`,与 canonical 约定一致)
2. **sparticuz chromium 切换**:Vercel Amazon Linux 2023 缺 libnspr4.so,Playwright 自带 chromium 启动失败。改用 `@sparticuz/chromium` + `puppeteer-core`(Lambda 优化版本,自带依赖)
3. **Cache-Control regex 修复**:`/assets/*.js` 原本被 catch-all 规则覆盖到 `max-age=0`,用 negative lookahead 排除 `/assets/`、`/sitemap.xml`、`/feed.xml` 后恢复 `immutable`

---

## Phase 2 — 内容扩张

按原定紧凑节奏(4 周 × 每周 2 篇),实际**在一个工作日内完成核心 6 篇**三语交付。

### Phase 2.1 — ArticleSchema FAQPage 自动注入(系统改进)

**问题**:ArticleSchema 组件注释声称"Supports FAQPage"但未实现,每篇博客的 FAQ section 内容存在,但 Googlebot 看不到 FAQPage schema。

**方案**:`extractFaqs()` 函数识别 FAQ section heading(多语言:Frequently Asked Questions / FAQ / 常见问题 / 자주 묻는 질문 / よくある質問),从 body HTML 中正则解析 `<h4>Q</h4><p>A</p>` 模式。

**Retroactive 收益**:现有 `how-to-find-your-claude-code-buddy` 自动获得 4 Q/A FAQPage schema(从未手动挂过)。Phase 2 新 6 篇全部自动获得。

**后续 bug 修复**:W2-2 cheat sheet 的 FAQ heading 含 `<code>/cost</code>` 内嵌标签,原 regex `[^<]+?` 在遇到 `<` 时停止,漏匹配。改为 `[\s\S]+?` + HTML strip,支持任意 inline tag。

### Phase 2 核心 6 篇

| # | Slug | 目标关键词 | Pillar | 字数 EN | FAQ |
|---|---|---|---|---|---|
| W1-1 | [claude-code-dotclaude-folder-complete-guide](https://www.claudebuddy.art/blog/claude-code-dotclaude-folder-complete-guide) | `claude code .claude folder` | claude-code | 1800 | 5 |
| W1-2 | [claude-code-hooks-cookbook-2026](https://www.claudebuddy.art/blog/claude-code-hooks-cookbook-2026) | `claude code hooks` | claude-code | 1900 | 5 |
| W2-1 | [top-10-mcp-servers-2026-developer-benchmark](https://www.claudebuddy.art/blog/top-10-mcp-servers-2026-developer-benchmark) | `best MCP servers 2026` | trends | 2000 | 5 |
| W2-2 | [claude-code-cheat-sheet-2026-printable](https://www.claudebuddy.art/blog/claude-code-cheat-sheet-2026-printable) | `claude code cheat sheet` | claude-code | 2100 | 5 |
| W3-1 | [claude-code-custom-slash-commands-guide](https://www.claudebuddy.art/blog/claude-code-custom-slash-commands-guide) | `claude code slash commands` | claude-code | 1900 | 5 |
| W3-2 | [claude-code-powerup-for-teams-workflow-automation](https://www.claudebuddy.art/blog/claude-code-powerup-for-teams-workflow-automation) | `claude code team workflow` | claude-code | 2100 | 5 |

**总量**:~11,800 字 EN + 全量 ZH + KO 翻译 = **~35,000 字跨三语**

### Content Topic Cluster 拓扑

```
                 ┌────────────────────────────────────────┐
                 │      .claude/ folder (W1-1)            │
                 │        [Pillar 入口]                    │
                 └──┬───────────┬──────────┬──────────┬──┘
                    │           │          │          │
                    ▼           ▼          ▼          ▼
                 ┌──────┐  ┌──────┐  ┌──────────┐  ┌──────────┐
                 │hooks │  │ MCP  │  │ commands │  │cheatsheet│
                 │W1-2  │  │ W2-1 │  │   W3-1   │  │   W2-2   │
                 └───┬──┘  └──┬───┘  └────┬─────┘  └──────────┘
                     │        │           │
                     └────────┼───────────┘
                              ▼
                        ┌─────────────┐
                        │ /powerup for│
                        │   Teams     │
                        │    W3-2     │
                        └─────────────┘
```

每篇互相内链,形成 Google 可识别的 **topic cluster**。

---

## Google Search Console 自验 Checklist

### 1. Rich Results Test(已完成)

**URL**:https://search.google.com/test/rich-results

Phase 1 测试结果(2026-04-23 14:36-14:38 UTC+8):

| 路由 | 类型数 | 警告 |
|---|---|---|
| `/` | 3 有效(Breadcrumb + FAQ + SoftwareApplication) | 1 非严重(aggregateRating 空) |
| `/species/dragon` | 2 有效(Breadcrumb + FAQ) | 0 |
| `/blog/find-your-uuid-complete-platform-guide` | 2 有效(Article + Breadcrumb) | 0 |
| `/revive` | 1 有效(Breadcrumb) | 0 |

**建议后续补测**:对 Phase 2 新 6 篇各跑一次(FAQPage + Article + Breadcrumb 齐全期望)

### 2. Schema.org Validator(建议跑一次)

**URL**:https://validator.schema.org/

Phase 2 新 6 篇 URL + 现有已改页的 URL,验证 JSON-LD 语法合法。

### 3. GSC 覆盖率监测(48-72h 后)

**URL**:https://search.google.com/search-console

预期观察:
- **"增强功能"** 报告显示 FAQ / Breadcrumb / Article 三个"有效"计数上升
- **"覆盖率"** 报告中原先 5 页 canonical 错误(被 "已排除 - 重复内容" 或 "已编入但未成为规范页面")脱离
- **"页面体验"** 报告中 CWV 指标(LCP)改善(immutable 缓存生效后)

### 4. 生产 curl 验证脚本

```bash
URL=https://www.claudebuddy.art

# 全站 JSON-LD 密度抽查
for p in "/" "/species/dragon" "/blog/claude-code-dotclaude-folder-complete-guide" "/revive" "/collection"; do
  N=$(curl -sL -A "Googlebot" "$URL$p" | grep -oE '<script[^>]*application/ld\+json[^>]*>' | wc -l | xargs)
  echo "$p: $N JSON-LD"
done

# Cache-Control 校验
curl -sI "$URL/assets/index-*.js" | grep -i cache-control
# 期望: public, max-age=31536000, immutable

# cleanUrls 行为
curl -sI "$URL/species/dragon/" | head -2
# 期望: HTTP/2 308  location: /species/dragon
```

---

## Git 历史(15 commits in range)

```
a75ac33  feat: Phase 2 W3-2 — /powerup for Teams(核心 6 篇完结)
43da406  feat: Phase 2 W3-1 — Custom Slash Commands Guide
f79fa1a  docs: CLAUDE.md 新增 Vercel Operations 操作规范
352dc35  fix: ArticleSchema FAQ regex 支持 heading 内嵌 inline tags
a3002b6  feat: Phase 2 W2-2 — Cheat Sheet 2026
c31c53d  feat: Phase 2 W2-1 — Top 10 MCP Servers 2026 Benchmark
c94c607  feat: Phase 2 W1-2 — Hooks Cookbook
4a8555d  feat: Phase 2.1 — ArticleSchema 自动注入 FAQPage
d023132  feat: Phase 2 W1-1 — .claude/ 目录完整配置指南
c8f199b  fix: 修复 vercel.json catch-all headers 覆盖 /assets immutable
b081f82  fix: 切换 Vercel prerender 到 @sparticuz/chromium(修 libnspr4)
ecf5d94  chore: Vercel 部署配置 + cleanUrls 修 canonical loop
8de1c1b  feat: Phase 1C — Canonical 修复 + PageSchema 补齐
cd5479d  refactor: Phase 1B.2 — 移除 server 运行时 OG meta 注入
63aee17  feat: Phase 1B.1 — 构建期 Playwright 快照预渲染
5ea9f71  (基线: Phase 1 之前)
```

---

## 变更清单

### 新增文件(3 个)

- `scripts/prerender.mjs` — Playwright/sparticuz 双 backend 预渲染脚本
- `client/src/components/PageSchema.tsx` — 通用 WebPage + BreadcrumbList schema 组件
- `PHASE_1_2_RELEASE_NOTES.md` — 本文档

### 修改文件(主要)

**Backend & Infrastructure**
- `server/index.ts` — 瘦身,移除 OG meta 注入
- `package.json` — 新增 build 脚本、puppeteer-core、@sparticuz/chromium、playwright 依赖
- `vercel.json` — cleanUrls + trailingSlash + Cache-Control regex + buildCommand
- `.vercelignore` — 加固忽略规则

**Frontend Components**
- `client/src/hooks/useHreflangLinks.ts` — 新增 canonical 设置
- `client/src/components/ArticleSchema.tsx` — 新增 FAQPage 自动注入
- `client/src/pages/BuddyProfilePage.tsx` — 新增 noindex meta
- `client/src/pages/CollectionPage.tsx` — PageSchema 接入
- `client/src/pages/ComparePage.tsx` — PageSchema 接入
- `client/src/pages/HiddenFeaturesPage.tsx` — PageSchema 接入
- `client/src/pages/PowerupTrackerPage.tsx` — PageSchema 接入
- `client/src/pages/RevivePage.tsx` — PageSchema 接入
- `client/src/pages/SpeciesIndex.tsx` — PageSchema 接入
- `client/src/pages/SpeciesDetail.tsx` — PageSchema 接入(+ FAQSchema 并存)

**Content**
- `client/src/lib/blog-data.ts` — 新增 6 篇三语文章(~3,000 行增量)

**Documentation**
- `CLAUDE.md` — 新增 Vercel Operations 操作规范章节

---

## 已知待办(Phase 1D / 2.2 / 3)

### Phase 1D — 小修(非阻塞)

- [ ] `/nonexistent-page` 返回 HTTP 200 而非 404,NotFound 组件可加 `noindex` meta
- [ ] Rich Results 首页 aggregateRating 非严重警告(合规后续可考虑真实评分回填)

### Phase 2.2 — Schema 增量(可选)

- [ ] `/revive` 添加 `HowTo` schema(5 步 MCP 安装流程符合 HowTo 规范)
- [ ] `/hidden-features` 添加 `Article` 或 `TechArticle` schema(深度分析文)
- [ ] `/revive` 添加 FAQPage schema(现有 FAQ 折叠项)

### Phase 3 — 路线图展望

路线图原稿方向三未补写。Phase 2 六篇已交付后建议:
1. **W4 Pillar 聚合页** — `/pillar/claude-code` + `/pillar/trends` 聚合页,强化 topic cluster
2. **基于 GSC 数据决定**:48-72h 后观察 Google 索引效果,再决定 W4 和 Phase 2.2 优先级
3. **内容侧扩张**:按初始路线图"方向二"继续,可能包括 agent SDK、IDE 集成、v2.2 新特性跟进

---

## 致谢

Phase 1+2 全部工作在一个协作会话内交付。
- 技术改造、内容写作、翻译、部署验证:Claude(claude-opus-4-7[1m])
- 路线图、决策、验收、Rich Results 测试:项目负责人

---

**文档维护**:本文档反映 2026-04-23 交付快照。Phase 3 启动后请另建 release notes,不在此文档上累积。
