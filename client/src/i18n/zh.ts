/**
 * 简体中文翻译 - Claude Buddy Checker
 */

import type { en } from "./en";

export const zh: typeof en = {
  meta: {
    title: "Claude Buddy 查询器 - 查看你的终端宠物",
    description:
      "提前查看你的 Claude Code Buddy 终端宠物。输入你的 UUID，即可发现专属宠物的物种、稀有度、属性和 ASCII 艺术形象。",
  },
  hero: {
    h1: "查看你的 Claude Code Buddy",
    subtitle:
      "Claude Code 内置了一个隐藏的电子宠物系统（类似拓麻歌子）。每个用户都会根据账户 UUID 获得一只独一无二的 Buddy。在下方输入你的 UUID，提前发现你的专属伙伴。",
    imgAlt: "CRT 终端显示 ASCII 宠物角色",
  },
  privacy: {
    label: "安全",
    text: "所有计算均在浏览器本地运行，你的 UUID 不会离开此页面。AccountUuid 和 UserID 不是凭证，无法用于身份验证或冒充。",
  },
  input: {
    terminalTitle: "buddy_checker.sh",
    howToFind: "// 如何找到你的 UUID：",
    option1Label: "方法一：",
    option1Text: "直接问 Claude Code：",
    option1Code: "What is my accountUuid?",
    option2Label: "方法二：",
    option2Text: "在终端运行：",
    option2Code: "cat ~/.claude.json | grep accountUuid",
    placeholder: "acde070d-8c4c-4f0d-9d8a-162843c10333",
    buttonCheck: "查询 BUDDY",
    buttonScanning: "扫描中...",
    errorEmpty: "错误：未提供输入。请输入你的 accountUuid 或 userID。",
    loading1: "$ 使用 FNV-1a 哈希 UUID...",
    loading2: "$ 初始化 Mulberry32 伪随机数生成器...",
    loading3: "$ 掷骰：稀有度、物种、属性...",
  },
  result: {
    terminalTitle: "buddy_result.log",
    shinyBadge: "闪光",
    attributes: "// 属性",
    labelSpecies: "物种",
    labelRarity: "稀有度",
    labelEyes: "眼睛",
    labelHat: "帽子",
    labelShiny: "闪光",
    labelRarityPct: "稀有度 %",
    shinyYes: "是 ✦",
    shinyNo: "否",
    hatNone: "无",
    stats: "// 属性值",
  },
  species: {
    title: "// 全部 18 种物种",
    gridAlt: "以复古终端风格渲染的 6 种 Claude Code Buddy 物种网格",
  },
  rarity: {
    title: "// 稀有度等级",
    colRarity: "稀有度",
    colChance: "概率",
    colStatFloor: "属性下限",
    colStars: "星级",
    common: "普通",
    uncommon: "非凡",
    rare: "稀有",
    epic: "史诗",
    legendary: "传说",
  },
  howItWorks: {
    title: "// 工作原理",
    p1: 'Claude Code 的 Buddy 系统使用<strong>确定性算法</strong>生成你的宠物。你的 <code>accountUuid</code> 与盐值（<code>friend-2026-401</code>）拼接后，通过 FNV-1a 哈希，再输入 Mulberry32 伪随机数生成器。',
    p2: "伪随机数生成器依次掷出你的<strong>稀有度</strong>（加权随机）、<strong>物种</strong>（18 选 1）、<strong>眼睛</strong>（6 选 1）、<strong>帽子</strong>（普通无帽，其他 8 选 1）、<strong>闪光</strong>（1% 概率）和 <strong>5 项属性</strong>（含一个峰值和一个低谷属性）。",
    p3: "由于算法是确定性的，你的 Buddy 永远不会改变——你可以在正式上线前在这里提前查看。",
  },
  faq: {
    title: "// 常见问题",
    items: [
      {
        q: "这是官方工具吗？",
        a: "不是。这是社区基于泄露的 Claude Code 源码构建的工具。Buddy 系统是在 npm 包的 .map 文件中发现的。",
      },
      {
        q: "我的 Buddy 会改变吗？",
        a: "不会。生成过程是确定性的——相同的 UUID 永远产生相同的 Buddy。你的 Buddy 已经确定了。",
      },
      {
        q: "什么是闪光 Buddy？",
        a: "闪光（Shiny）是 1% 概率的变体，会为你的 Buddy 添加闪烁特效。纯粹是装饰性的，但极其稀有。",
      },
      {
        q: "Buddy 系统什么时候上线？",
        a: "根据泄露的源码，/buddy 命令预计在 2026 年 4 月 1 日激活。",
      },
    ],
  },
  footer: {
    line1: "由社区构建，与 Anthropic 无关。",
    line2: "所有计算均在本地完成，不收集或传输任何数据。",
  },
};
